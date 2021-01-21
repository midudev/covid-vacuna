const XLSX = require('xlsx')

module.exports = async function transformOdsToJson (odsFileName) {
  const workbook = XLSX.readFile(`./public/data/${odsFileName}`)

  const { Sheets } = workbook

  const Hoja = Sheets[Object.keys(Sheets)[0]]

  const json = XLSX.utils.sheet_to_json(Hoja)

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

    return {
      ccaa,
      dosisAdministradas,
      dosisEntregadas,
      dosisEntregadasModerna,
      dosisEntregadasPfizer,
      dosisPautaCompletada,
      porcentajeEntregadas
    }
  })
}
