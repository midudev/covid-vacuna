import download from 'download'
import fs from 'fs-extra'

import transformOdsToJson from './transform-ods-to-json'

const createUrl = (day: string) =>
  `https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_202101${day}.ods`

const downloadFile = async (url: string, filename: string) => {
  return download(url, 'public/data', { filename })
    .then(async () => {
      console.log(`${url} downloaded`)

      const json = await transformOdsToJson(filename)
      const jsonFileName = filename.replace('.ods', '.json')

      await fs.writeJson(`./public/data/${jsonFileName}`, json)
    })
    .catch(() => console.error(`${url} can't be downloaded. Error:`))
}

;(async () => {
  const days = [...Array(20).keys()].map((day) => {
    const dayToUse = `${day + 1}`.padStart(2, '0')
    return { day: dayToUse, url: createUrl(dayToUse) }
  })

  days.reduce(
    (promise, { day, url }) =>
      promise.then(() => downloadFile(url, `202101${day}.ods`)),
    Promise.resolve()
  )
})()
