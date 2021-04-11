
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
  const [, , , Etarios1dosisKey, EtariosCompleteKey] = Object.keys(Sheets)
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
  etarios.Totales = calculateCCAATotales(etarios)
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
      rango: { min: 16, max: 17 },
      vacunados: row['16-17 años'],
      personasINE: row['Población INE16-17 años'],
      porcentaje: row['%_6']
    },
    {
      rango: { min: 18, max: 24 },
      vacunados: row['18-24 años'],
      personasINE: row['Población INE18-24 años'],
      porcentaje: row['%_5']
    },
    {
      rango: { min: 25, max: 49 },
      vacunados: row[`${etarioKey} 25-49 años`],
      personasINE: row['Población INE25-49 años'],
      porcentaje: row['%_4']
    },
    {
      rango: { min: 50, max: 59 },
      vacunados: row[`${etarioKey} 50-59 años`],
      personasINE: row['Población INE50-59 años'],
      porcentaje: row['%_3']
    },
    {
      rango: { min: 60, max: 69 },
      vacunados: row[`${etarioKey} 60-69 años`],
      personasINE: row['Población INE60-69 años'],
      porcentaje: row['%_2']
    },
    {
      rango: { min: 70, max: 79 },
      vacunados: row[`${etarioKey} 70-79 años`],
      personasINE: row['Población INE70-79 años'],
      porcentaje: row['%_1']
    },
    {
      rango: { min: 80, max: null },
      vacunados: row[`${etarioKey} ≥80 años`],
      personasINE: row['Población INE≥80 años'],
      porcentaje: row['%']
    }
  ]
}

const calculateCCAATotales = (etarios) => {
  const etarioCCAATotalesInit = {
    etarioTotal: {
      vacunados: 0,
      personasINE: 0
    },
    etarioRangos: []
  }
  return Object.values(etarios).reduce((totales, etario) => {
    totales.etarioTotal.vacunados += etario.etarioTotal.vacunados
    totales.etarioTotal.personasINE += etario.etarioTotal.personasINE
    totales.etarioTotal.porcentaje = totales.etarioTotal.vacunados / totales.etarioTotal.personasINE
    etario.etarioRangos.forEach((etarioRango, index) => {
      if (totales.etarioRangos[index] === undefined) {
        totales.etarioRangos[index] = { rango: etarioRango.rango, vacunados: 0, personasINE: 0 }
      }
      totales.etarioRangos[index].vacunados += etarioRango.vacunados
      totales.etarioRangos[index].personasINE += etarioRango.personasINE
      totales.etarioRangos[index].porcentaje =
        totales.etarioRangos[index].vacunados / totales.etarioRangos[index].personasINE
    })
    return totales
  }, etarioCCAATotalesInit)
}

module.exports = { transformEtariosToJson, etariosForThisCCAA }
