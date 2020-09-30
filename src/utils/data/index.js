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
    const { entry } = (await getData()).feed
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

export const getInfectedSchoolsPerRegion = async () => {
    if (cache.list === undefined) await getList()
    if (cache.infectedSchoolsPerRegion) return cache.infectedSchoolsPerRegion

    const { list } = cache

    const regions = list.reduce((acc, curr) => {
        const UNKNOWN_REGION_LABEL = 'N/A'

        // if region field is not present, accumulate on NA field
        if (curr.region === undefined) curr.region = UNKNOWN_REGION_LABEL

        return { ...acc, [curr.region]: acc[curr.region] ? acc[curr.region] + 1 : 1 }
    }, [])

    const sortedRegions = Object.entries(regions)
        .map(([desc, count]) => ({ desc, count }))
        .sort((a, b) => (a.count < b.count ? 1 : -1))

    cache.infectedSchoolsPerRegion = sortedRegions

    return sortedRegions
}

export const getInfectedSchoolsPerCity = async () => {
    if (cache.list === undefined) await getList()
    if (cache.infectedSchoolsPerCity) return cache.infectedSchoolsPerCity

    const { list } = cache

    const cities = list.reduce((acc, curr) => {
        const UNKNOWN_CITY_LABEL = 'N/A'

        // if city field is not present, accumulate on NA field
        if (curr.city === undefined) curr.city = UNKNOWN_CITY_LABEL

        return { ...acc, [curr.city]: acc[curr.city] ? acc[curr.city] + 1 : 1 }
    }, [])

    const sortedCities = Object.entries(cities)
        .map(([desc, count]) => ({ desc, count }))
        .sort((a, b) => (a.count < b.count ? 1 : -1))

    cache.getInfectedSchoolsPerCity = sortedCities

    return sortedCities
}

export const getInfectedSchoolsCount = async () => {
    if (cache.list === undefined) await getList()
    return cache.list.length
}

export const getInfectedSchoolsClosedCount = async () => {
    if (cache.list === undefined) await getList()
    return cache.list.filter((s) => s.is_school_closed).length
}

export const getInfectionSources = async () => {
    if (cache.list === undefined) await getList()
    if (cache.infectionSourced) return cache.infectionSources

    const { list } = cache

    const sources = list.reduce((acc, curr) => {
        const UNKNOWN_SOURCE_LABEL = 'N/A'

        // if city field is not present, accumulate on NA field
        if (curr.category === undefined) curr.category = UNKNOWN_SOURCE_LABEL

        return { ...acc, [curr.category]: acc[curr.category] ? acc[curr.category] + 1 : 1 }
    }, [])

    const sortedSources = Object.entries(sources)
        .map(([desc, count]) => ({ desc, count }))
        .sort((a, b) => (a.count < b.count ? 1 : -1))

    cache.infectionSourced = sortedSources

    return sortedSources
}
