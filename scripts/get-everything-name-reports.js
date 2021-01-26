const fs = require('fs-extra')

module.exports = fs.readdir('./public/data', (error, files) => {
  if (error) return console.log(error)

  const json = files.filter(
    (element) =>
      element !== 'bbdd.json' &&
      element !== 'info.json' &&
      element !== 'latest.json' &&
      element.includes('.json')
  )
  const reports = json.map((el) => el.replace('.json', ''))

  fs.writeJson('./public/data/reports.json', reports)
})
