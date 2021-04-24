import styles from '../styles/EtariosBarChart.module.css'
import { useTranslate } from 'hooks/useTranslate'

function formatValueToLocale (value, locale) {
  const num = new Intl.NumberFormat(locale)
  return num.format(value)
}

function Bold ({ text }) {
  return <b style={{ color: 'var(--text-subtitle-color)' }}>{text}</b>
}

const EtariosBarChartToolTip = ({ active, payload, label }) => {
  const translate = useTranslate()

  if (!active) return null
  if (!payload) return null
  const poblacionINE = formatValueToLocale(payload[0].value, 'es-ES')
  const unaDosis = formatValueToLocale(payload[1].value, 'es-ES')
  const unaDosisPorcentaje = `(${((100 * payload[1].value) / payload[0].value).toFixed(1)}%)`
  const pautaCompleta = formatValueToLocale(payload[2].value, 'es-ES')
  const pautaCompletaPorcentaje = `(${((100 * payload[2].value) / payload[0].value).toFixed(1)}%)`
  return (
    <div className={styles.chartTooltip}>
      <p>
        {translate.etariosBarChart.paraLasPersonas} <Bold text={label} /> {translate.etariosBarChart.conUnaPoblacion} <Bold text={poblacionINE} />
        {translate.etariosBarChart.unaDosis} <Bold text={unaDosis} /> <Bold text={unaDosisPorcentaje} /> {translate.etariosBarChart.pautaCompleta}
        <Bold text={pautaCompleta} /> <Bold text={pautaCompletaPorcentaje} />
      </p>
    </div>
  )
}
export default EtariosBarChartToolTip
