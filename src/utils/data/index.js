/* eslint-disable no-plusplus */
import { parse } from 'date-fns'

let data

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
    'Provincia': 'province'
}

export const updateData = async () =>
    (
        await fetch(
            'https://spreadsheets.google.com/feeds/cells/111HISX9asdXADszmq0ppNvznRW_LFJyyCDcyfnPb87k/1/public/full?alt=json',
        )
    ).json()

export const getData = async () => {
    if (data) {
        return data
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
        const key = headerMap[headers[parseInt(e.gs$cell.col, 10) - 1]] ? headerMap[headers[parseInt(e.gs$cell.col, 10) - 1]] : headers[parseInt(e.gs$cell.col, 10) - 1]
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

            return e.content.$t
        })()

        list[parseInt(e.gs$cell.row, 10)][key] = value
    })
    
    return list
}
