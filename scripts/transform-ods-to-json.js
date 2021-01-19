const XLSX = require('xlsx')
const fs = require('fs-extra')

const workbook = XLSX.readFile('./data/Informe_Comunicacion_20210118.ods')

const { Sheets: { Hoja3 } } = workbook

const json = XLSX.utils.sheet_to_json(Hoja3)

;(async () => {
  const mappedJson = json.map(element => {
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

  await fs.writeJson('./data/20210118.json', mappedJson)
  await fs.writeJson('./data/latest.json', mappedJson)
})()
