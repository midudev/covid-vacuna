
const XLSX = require('xlsx')

const transformEtariosToJson = (workbook) => {
  try {
    return transformEtariosToJsonFromWorkbook(workbook)
  } catch (error) {
    console.error(error)
    return {
      unaDosis: {},
      pautaCompleta: {}
    }
  }
}

const transformEtariosToJsonFromWorkbook = (workbook) => {
  const { Sheets } = workbook
  const Etarios1dosisKey = 'Etarios_con_al_menos_1_dosis'
  const EtariosCompleteKey = 'Etarios_con_pauta_completa'
  const sheetEtarios1dosis = Sheets[Etarios1dosisKey]
  const sheetEtariosComplete = Sheets[EtariosCompleteKey]
  const unaDosis = etariosMapByCCAA(XLSX.utils.sheet_to_json(sheetEtarios1dosis), 'unaDosis')
  const pautaCompleta = etariosMapByCCAA(XLSX.utils.sheet_to_json(sheetEtariosComplete), 'pautaCompleta')
  return {
    unaDosis,
    pautaCompleta
  }
}

const etariosForThisCCAA = (jsonEtarios, ccaa) => {
  if (jsonEtarios.unaDosis[ccaa] && jsonEtarios.pautaCompleta[ccaa]) {
    return { unaDosis: jsonEtarios.unaDosis[ccaa], pautaCompleta: jsonEtarios.pautaCompleta[ccaa] }
  }
  return undefined
}

const etariosMapByCCAA = (json, etarioName) => {
  const etarios = json.reduce((map, row) => {
    const { ccaa, vacunados, personasINE, porcentaje } = etarioName === 'pautaCompleta' ? etariosPautaCompletaInfo(row) : etariosUnaDosisInfo(row)
    const normalizedCCAA = normalizeCCAA(ccaa)

    // Las fuerzas Armadas no dan muchos detalles. Es mejor no incluirlos en los etarios para evitar complejidad en el uso de los datos
    if (normalizedCCAA === 'Fuerzas Armadas') {
      return map
    }

    const etarioRangos = readEtariosVacunados(row, etarioName === 'pautaCompleta')

    return Object.assign(map, {
      [normalizedCCAA]: {
        etarioTotal: {
          vacunados,
          personasINE,
          porcentaje
        },
        etarioRangos: etarioRangos
      }
    })
  }, {})
  etarios.Totales = etarios['Total España']
  return etarios
}

const etariosUnaDosisInfo = (row) => {
  const {
    __EMPTY: ccaa,
    'Total Personas con al menos 1 dosis': vacunados,
    'Total Población INE Población a Vacunar (1)': personasINE,
    '% Con al menos 1 dosis sobre Población a Vacunar INE': porcentaje
  } = row
  return { ccaa, vacunados, personasINE, porcentaje }
}

const etariosPautaCompletaInfo = (row) => {
  const {
    __EMPTY: ccaa,
    'Total Personas pauta completa': vacunados,
    'Total Población INE Población a Vacunar (1)': personasINE,
    '% pauta completa sobre Población a Vacunar INE': porcentaje
  } = row
  return { ccaa, vacunados, personasINE, porcentaje }
}

const normalizeCCAA = (ccaa) => {
  return ccaa.trim()
}

const readEtariosVacunados = (row, complete = false) => {
  const etarioKey = complete ? 'Personas pauta completa' : 'Personas con al menos 1 dosis'
  return [
    {
      rango: { min: 12, max: 19 },
      vacunados: row[`${etarioKey} 12-19 años`],
      personasINE: row[`${etarioKey} 12-19 años`] / row['%_7'],
      porcentaje: row['%_6']
    },
    {
      rango: { min: 20, max: 29 },
      vacunados: row[`${etarioKey} 20-29 años`],
      personasINE: row[`${etarioKey} 20-29 años`] / row['%_6'],
      porcentaje: row['%_4']
    },
    {
      rango: { min: 30, max: 39 },
      vacunados: row[`${etarioKey} 30-39 años`],
      personasINE: row[`${etarioKey} 30-39 años`] / row['%_5'],
      porcentaje: row['%_4']
    },
    {
      rango: { min: 40, max: 49 },
      vacunados: row[`${etarioKey} 40-49 años`],
      personasINE: row[`${etarioKey} 40-49 años`] / row['%_4'],
      porcentaje: row['%_4']
    },
    {
      rango: { min: 50, max: 59 },
      vacunados: row[`${etarioKey} 50-59 años`],
      personasINE: row[`${etarioKey} 50-59 años`] / row['%_3'],
      porcentaje: row['%_3']
    },
    {
      rango: { min: 60, max: 69 },
      vacunados: row[`${etarioKey} 60-69 años`],
      personasINE: row[`${etarioKey} 60-69 años`] / row['%_2'],
      porcentaje: row['%_2']
    },
    {
      rango: { min: 70, max: 79 },
      vacunados: row[`${etarioKey} 70-79 años`],
      personasINE: row[`${etarioKey} 70-79 años`] / row['%_1'],
      porcentaje: row['%_1']
    },
    {
      rango: { min: 80, max: null },
      vacunados: row[`${etarioKey} ≥80 años`],
      personasINE: row[`${etarioKey} ≥80 años`] / row['%'],
      porcentaje: row['%']
    }
  ]
}

module.exports = { transformEtariosToJson, etariosForThisCCAA }
