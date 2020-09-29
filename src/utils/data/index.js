/* eslint-disable no-plusplus */
import { parse } from 'date-fns'

const cache = {}

const headerMap = {
    'Data': 'date',
    'Regione/PA': 'region',
    'Città': 'city',
    'Nome scuola': 'school_name',
    'Tipo scuola': 'school_type',
    'Codice MG': 'mg_code',
    'Positivi': 'positive_count',
    'Categoria': 'category',
    'Isolamento': 'in_isolation',
    'Chiusura scuola': 'is_school_closed',
    'Contatti positivi': 'positive_contacts',
    'Fonte': 'source',
    'Note': 'notes',
    'Aggiornamento': 'updated_at',
    'Primo Caso': 'first_case',
    'Provincia': 'province',
}

export const updateData = async () => {
    cache.data = (
        await fetch(
            'https://spreadsheets.google.com/feeds/cells/111HISX9asdXADszmq0ppNvznRW_LFJyyCDcyfnPb87k/1/public/full?alt=json',
        )
    ).json()
    return cache.data
}

export const getData = async () => {
    if (cache.data) {
        return cache.data
    }
    return updateData()
}

export const getList = async () => {
    const { entry, gs$rowCount, ...rest } = (await getData()).feed
    const colsCount = entry.filter((row) => row.gs$cell.row === '1').length

    const headers = entry.slice(0, colsCount).map((row) => row.content.$t)
    const dataEntries = entry.slice(colsCount)
    const list = []

    dataEntries.forEach((e) => {
        if (list[parseInt(e.gs$cell.row, 10)] === undefined) {
            list[parseInt(e.gs$cell.row, 10)] = []
        }
        const key = headerMap[headers[parseInt(e.gs$cell.col, 10) - 1]]
            ? headerMap[headers[parseInt(e.gs$cell.col, 10) - 1]]
            : headers[parseInt(e.gs$cell.col, 10) - 1]
        const value = (() => {
            if (key === 'is_school_closed') {
                return e.content.$t === 'Si' || e.content.$t === 'Sì'
            }

            if (key === 'date') {
                return parse(e.content.$t, 'yyyy-MM-dd', new Date())
            }

            if (key === 'first_case') {
                return e.content.$t === 'Si' || e.content.$t === 'Sì'
            }

            if (key === 'positive_count') {
                const num = parseInt(e.content.$t, 10)
                if (Number.isNaN(num)) return 0

                return num
            }

            return e.content.$t
        })()

        list[parseInt(e.gs$cell.row, 10)][key] = value
    })

    cache.list = list

    return list
}

export const getRegionInfectedSchools = async () => {
    if (cache.list === undefined) {
        await getList()
    }

    if (cache.regionInfectedSchools) return cache.regionInfectedSchools

    const { list } = cache

    const regions = list.reduce((acc, curr) => {
        if (curr.region === undefined) return acc
        const index = acc.findIndex(
            (i) => i.region.trim().toLowerCase() === curr.region.trim().toLowerCase(),
        )

        if (index === -1) {
            return [...acc, { region: curr.region, count: 1 }]
        }

        const r = [
            ...acc.filter((i, n) => n !== index),
            { region: curr.region, count: acc[index].count + 1 },
        ]

        r.sort((a, b) => (a.count < b.count ? 1 : -1))

        return r
    }, [])

    cache.regionInfectedSchools = regions

    return regions
}

export const getSchoolsTotalCount = async () => {
    if (cache.list === undefined) {
        await getList()
    }

    return cache.list.length
}
