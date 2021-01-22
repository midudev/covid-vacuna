
const fs = require('fs-extra');
const moment = require('moment')

module.exports = function agregateJsonAsTimeSeries (jsonToAdd, filename) {
  
  
  const monthDate = moment(filename, "YYYYMMDD")
  const unixDate = Date.parse(monthDate.format())

  // aggregated.push(monthData)
  fs.readJson('./public/data/aggregated.json')
  .then(existing => {
    const aggregated = existing
    const existing_date = aggregated.find(array => array[0] == unixDate)
    existing_date ? aggregated[unixDate] = jsonToAdd : aggregated.push([unixDate, jsonToAdd])
    
    fs.writeJson('./public/data/aggregated.json', aggregated)
    .then(() => {
      console.log('success!')
    })
    .catch(err => {
      console.error(err)
    })
  })
  .catch(err => {
    console.error(err)
  })
  
  
  
}

