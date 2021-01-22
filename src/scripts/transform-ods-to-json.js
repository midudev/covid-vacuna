const XLSX = require('xlsx')
const { population } = require('../../public/data/bbdd.json')

module.exports = async function transformOdsToJson (odsFileName) {
  const workbook = XLSX.readFile(`./public/data/${odsFileName}`)

  const { Sheets } = workbook
  const [firstKey] = Object.keys(Sheets)
  const sheet = Sheets[firstKey]

  const json = XLSX.utils.sheet_to_json(sheet)

  return json.map(element => {
    const {
      __EMPTY: ccaa,
      'Dosis entregadas Pfizer (1)': dosisEntregadasPfizer,
      'Dosis entregadas Moderna (1)': dosisEntregadasModerna,
      'Total Dosis entregadas (1)': dosisEntregadas,
      'Dosis administradas (2)': dosisAdministradas,
      '% sobre entregadas': porcentajeEntregadas,
      'Nº Personas vacunadas\n(pauta completada)': dosisPautaCompletada
    } = element

    const normalizedCCAA = ccaa.trim()
    const populationCCAA = population[normalizedCCAA]

    return {
      ccaa: ccaa.trim(),
      dosisAdministradas,
      dosisEntregadas,
      dosisEntregadasModerna,
      dosisEntregadasPfizer,
      dosisPautaCompletada,
      porcentajeEntregadas,
      porcentajePoblacionAdministradas: dosisAdministradas / populationCCAA,
      porcentajePoblacionCompletas: dosisPautaCompletada / populationCCAA
    }
  })
}
