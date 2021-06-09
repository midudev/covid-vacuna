// https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_20210119.ods

const download = require('download')
const fs = require('fs')
const transformOdsToJson = require('./transform-ods-to-json')

const PREFIX_URL = 'https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/documentos/Informe_Comunicacion_'
const SUFFIX_URL = '.ods'

const date = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());
const [day, month, year] = date.split('/');

const url = `${PREFIX_URL}${year}${month}${day}${SUFFIX_URL}`

const filename = `${year}${month}${day}.ods`

download(url, 'public/data', { filename })
  .then(async () => {
    console.log(`${url} downloaded`)
    const json = await transformOdsToJson(filename)
    const jsonFileName = filename.replace('.ods', '.json')

    await fs.promises.writeFile(`./public/data/${jsonFileName}`, JSON.stringify(json))
    await fs.promises.copyFile(`./public/data/${jsonFileName}`, './public/data/latest.json')
    await fs.promises.writeFile('./public/data/info.json', JSON.stringify({ lastModified: +new Date() }))
  })
  .catch(err => {
    console.error(`${url} can't be downloaded. Error:`)
    console.error(err)
  })
