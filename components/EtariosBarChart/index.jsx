import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import EtariosToolTip from './tooltips'
import styles from './styles/EtariosBarChart.module.css'
import { CustomXTick, CustomYTick } from './ticks'
import { useTranslate } from 'hooks/useTranslate'

const EtariosBarChart = ({ data, ccaa, titleClass }) => {
  const translate = useTranslate()
  const keyCharts = getKeyChartsFromTranslate(translate)
  const dataChart = normalizeBarCharData(data, keyCharts)
  if (!dataChart) {
    return <></>
  }
  return (
    <>
      <h2 className={titleClass}>{translate.etariosBarChart.titulo} {ccaa}</h2>
      <div className={styles.chartContainer}>
        <div style={{ width: '100%', height: 450 }}>
          <ResponsiveContainer>
            <BarChart
              data={dataChart}
              margin={{
                top: 30,
                right: 0,
                left: 0,
                bottom: 50
              }}
            >
              <CartesianGrid strokeDasharray='3 3 3' />
              <XAxis dataKey='name' tick={<CustomXTick />} />
              <YAxis
                interval='preserveStartEnd'
                width={100}
                scale='linear'
                tick={<CustomYTick />}
              />
              <Tooltip content={<EtariosToolTip />} />
              <Legend verticalAlign='top' />
              <Bar dataKey={keyCharts.poblacionINE} fill='#6cd0ff' />
              <Bar dataKey={keyCharts.unaDosis} fill='#00778c' />
              <Bar dataKey={keyCharts.pautaCompleta} fill='#00414d' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

const getKeyChartsFromTranslate = (translate) => {
  return {
    poblacionINE: translate.etariosBarChart.keyPoblacionINE,
    unaDosis: translate.etariosBarChart.keyUnaDosis,
    pautaCompleta: translate.etariosBarChart.keyPautaCompleta
  }
}

const normalizeBarCharData = (selectedCCAAData, keyCharts) => {
  if (!selectedCCAAData.etarios || !selectedCCAAData.etarios.unaDosis || !selectedCCAAData.etarios.pautaCompleta) {
    return
  }
  return selectedCCAAData.etarios.unaDosis.etarioRangos.map((etario, index) => {
    const name =
      etario.rango.max !== null
        ? `${etario.rango.min}-${etario.rango.max}`
        : `${'\u2265'}${etario.rango.min}`
    const poblacionINE = etario.personasINE
    const unaDosis = etario.vacunados
    const pautaCompleta = selectedCCAAData.etarios.pautaCompleta.etarioRangos[index].vacunados
    return {
      name,
      [keyCharts.poblacionINE]: poblacionINE,
      [keyCharts.unaDosis]: unaDosis,
      [keyCharts.pautaCompleta]: pautaCompleta
    }
  })
}

export default EtariosBarChart
