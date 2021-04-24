const XLSX = require('xlsx')
const { population } = require('../public/data/bbdd.json')
const { transformEtariosToJson, etariosForThisCCAA } = require('./transform-etarios-to-json')

module.exports = async function transformOdsToJson (odsFileName) {
  const workbook = XLSX.readFile(`./public/data/${odsFileName}`)

  const { Sheets } = workbook
  const [firstKey] = Object.keys(Sheets)
  const sheet = Sheets[firstKey]

  const json = XLSX.utils.sheet_to_json(sheet)

  const jsonEtarios = transformEtariosToJson(workbook)

  return json.map(element => {
    const {
      __EMPTY: ccaa,
      'Dosis entregadas Pfizer (1)': dosisEntregadasPfizer,
      'Dosis entregadas Moderna (1)': dosisEntregadasModerna,
      'Dosis entregadas AstraZeneca (1)': dosisEntregadasAstrazeneca,
      'Dosis entregadas Janssen (1)': dosisEntregadasJanssen,
      // usado en reporte antes del 13 de enero
      'Dosis entregadas (1)': dosisEntregadasDeprecated,
      'Total Dosis entregadas (1)': dosisEntregadasNew,
      'Dosis administradas (2)': dosisAdministradas,
      '% sobre entregadas': porcentajeEntregadas,
      'Nº Personas vacunadas\n(pauta completada)': dosisPautaCompletada,
      'Fecha de la última vacuna registrada (2)': fechaUltRegistroNumber
    } = element

    const normalizedCCAA = ccaa.trim()
    const populationCCAA = population[normalizedCCAA]
    const fechaUltRegistro = new Date(XLSX.SSF.format('YYYY-MM-DD,HH:MM:SS', fechaUltRegistroNumber))
    const etarios = etariosForThisCCAA(jsonEtarios, normalizedCCAA)

    return {
      ccaa: ccaa.trim(),
      dosisAdministradas,
      dosisEntregadas: dosisEntregadasDeprecated || dosisEntregadasNew,
      dosisEntregadasModerna,
      dosisEntregadasPfizer,
      dosisEntregadasAstrazeneca,
      dosisEntregadasJanssen,
      dosisPautaCompletada,
      porcentajeEntregadas,
      porcentajePoblacionAdministradas: dosisAdministradas / populationCCAA,
      porcentajePoblacionCompletas: dosisPautaCompletada / populationCCAA,
      fechaUltRegistro: fechaUltRegistro.getTime(),
      etarios
    }
  })
}
