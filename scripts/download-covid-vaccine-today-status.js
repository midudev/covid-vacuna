// https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_20210119.ods

const download = require('download')
const fs = require('fs-extra')
const transformOdsToJson = require('./transform-ods-to-json')
const getNameReports = require('./get-everything-name-reports')

const PREFIX_URL = 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_'
const SUFFIX_URL = '.ods'

const date = new Date()
const year = date.getFullYear()
const day = `${date.getDate()}`.padStart(2, '0')
const month = `${date.getMonth() + 1}`.padStart(2, '0')

const url = `${PREFIX_URL}${year}${month}${day}${SUFFIX_URL}`

const filename = `${year}${month}${day}.ods`

download(url, 'public/data', { filename })
  .then(async () => {
    console.log(`${url} downloaded`)
    const json = await transformOdsToJson(filename)
    const jsonFileName = filename.replace('.ods', '.json')

    await fs.writeJson(`./public/data/${jsonFileName}`, json)
    await getNameReports()
    await fs.copyFile(`./public/data/${jsonFileName}`, './public/data/latest.json')
    await fs.writeJson('./public/data/info.json', { lastModified: +new Date() })
  })
  .catch(err => {
    console.error(`${url} can't be downloaded. Error:`)
    console.error(err)
  })
