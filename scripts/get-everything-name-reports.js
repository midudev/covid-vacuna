const fs = require('fs')

const ignoredFiles = ['bbdd', 'info', 'latest', 'reports']

module.exports = async () => {
  const files = await fs.promises.readdir('./public/data').catch(error => console.error(error))
  const json = files.filter(el =>
    !ignoredFiles.includes(el.replace('.json', '')) && el.includes('.json')
  )
  const reports = json.map(el => el.replace('.json', ''))

  await fs.promises.writeFile('./public/data/reports.json', JSON.stringify(reports))
}
