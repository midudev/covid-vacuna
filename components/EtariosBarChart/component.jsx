import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import EtariosToolTip from './tooltips'
import { CustomXTick, CustomYTick } from './ticks'
import { useTranslate } from 'hooks/useTranslate.js'

const getKeyChartsFromTranslate = ({ etariosBarChart }) => {
  return {
    poblacionINE: etariosBarChart.keyPoblacionINE,
    unaDosis: etariosBarChart.keyUnaDosis,
    pautaCompleta: etariosBarChart.keyPautaCompleta
  }
}

const normalizeBarCharData = (selectedCCAAData, keyCharts) => {
  if (!selectedCCAAData.etarios || !selectedCCAAData.etarios.unaDosis || !selectedCCAAData.etarios.pautaCompleta) {
    return
  }

  return selectedCCAAData.etarios.unaDosis.etarioRangos.map((etario, index) => {
    const { personasINE, vacunados, rango: { min, max } } = etario

    const name = max !== null
      ? `${min}-${max}`
      : `${'\u2265'}${min}`

    const pautaCompleta = selectedCCAAData.etarios.pautaCompleta.etarioRangos[index].vacunados

    return {
      name,
      [keyCharts.poblacionINE]: personasINE,
      [keyCharts.unaDosis]: vacunados,
      [keyCharts.pautaCompleta]: pautaCompleta
    }
  })
}

export default function EtariosBarChart ({ data }) {
  const translate = useTranslate()
  const keyCharts = getKeyChartsFromTranslate(translate)
  const dataChart = normalizeBarCharData(data, keyCharts)

  return (
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
  )
}
