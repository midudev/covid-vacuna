import fs from 'fs'
import path from 'path'

/**
 * Take data files and process json for chart model type
 * Type: Array of { name: string, value: number }
 */
export default function normalizeChartData () {
  // read files names from dir
  const dataPath = path.join('public', 'data')
  let files = fs.readdirSync(dataPath)

  // remove unused names with match regExp
  const matchExp = /[0-9].json/g
  const matchFilter = (v) => matchExp.test(v)
  files = files.filter(matchFilter)

  // remove file-type substring
  const replaceMap = (v) => v.replace(/.json/g, '')
  files = files.map(replaceMap)

  // transform string names to matrix [year, month, day]
  const year = (s) => s.slice(0, 4)
  const month = (s) => s.slice(4, 6)
  const day = (s) => s.slice(6, 8)

  const matrixMap = (v) => [year(v), month(v), day(v)]
  files = files.map(matrixMap)

  // extract content with CCAA
  // --> files state: [..., ['2021', '01', '12'], ...]
  const ccaaHashMap = new Map()

  const filePath = (s) => path.join(dataPath, s + '.json')

  for (const i of files) {
    const jsonPath = filePath(i.join(''))

    const mapKey = i
    const mapValue = fs.readFileSync(jsonPath, { encoding: 'utf8' })

    ccaaHashMap.set(mapKey, JSON.parse(mapValue))
  }

  // totals dataset
  const dataset = {}

  for (const [k, v] of ccaaHashMap) {
    const TOTALS = 'Totales'
    const filterOnlyTotals = (v) => v.ccaa === TOTALS

    const getLastFilteredValue = v.filter(filterOnlyTotals).pop()

    // prepare name and value fields
    const reversedMatrix = k.reverse()
    const beautifyName = [reversedMatrix[0], reversedMatrix[1]].join('/') // <day/month>
    const getSpecificField = (v) => getLastFilteredValue[v] ?? 0 // some fields don't no exists on data files yet

    const createDatasetElement = (i) => {
      return {
        name: beautifyName,
        value: getSpecificField(i)
      }
    }

    // push to dataset
    const pushToDataset = (field) =>
      dataset[field].push(createDatasetElement(field))

    // nested loop, ups
    for (const field of datasetFields) {
      if (!dataset[field]) dataset[field] = []

      pushToDataset(field) // ex: { name: 'pepito', value: 9.87776 }
    }
  }

  return dataset
}

// fields to export to chart
export const datasetFields = [
  'dosisAdministradas',
  'dosisEntregadas',
  'dosisEntregadasModerna',
  'dosisEntregadasPfizer',
  'dosisPautaCompletada',
  'porcentajeEntregadas',
  'porcentajePoblacionAdministradas',
  'porcentajePoblacionCompletas'
]
