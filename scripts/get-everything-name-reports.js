const fs = require('fs-extra')

const ignoredFiles = ['bbdd', 'info', 'latest', 'reports']

module.exports = async () => {
  const files = await fs.readdir('./public/data').catch(error => console.error(error))
  const json = files.filter(el =>
    !ignoredFiles.includes(el.replace('.json', '')) && el.includes('.json')
  )
  const reports = json.map(el => el.replace('.json', ''))

  await fs.writeJson('./public/data/reports.json', reports)
}
