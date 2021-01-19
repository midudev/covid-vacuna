const XLSX = require('xlsx')

module.exports = async function transformOdsToJson (odsFileName) {
  const workbook = XLSX.readFile(`./data/${odsFileName}`)

  const { Sheets: { Hoja3 } } = workbook

  const json = XLSX.utils.sheet_to_json(Hoja3)

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
