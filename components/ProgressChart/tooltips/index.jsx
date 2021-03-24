import styles from '../styles/ProgressChart.module.css'
import { useTranslate } from 'hooks/useTranslate'

function formatNumberToLocale (payload, locale) {
  if (!payload) return
  const { value } = payload.pop()
  return formatValueToLocale(value, locale)
}

function formatValueToLocale (value, locale) {
  const num = new Intl.NumberFormat(locale)
  return num.format(value)
}

function Bold ({ text }) {
  return <b style={{ color: 'var(--text-subtitle-color)' }}>{text}</b>
}

export function DosisAdministradasTooltip ({ active, payload, label }) {
  if (!active) return null

  const value = formatNumberToLocale(payload, 'es-ES')

  return (
    <div className={styles.chartTooltip}>
      <p>
        A día <Bold text={label} /> se han administrado{' '}
        <Bold text={value} /> dosis.
      </p>
    </div>
  )
}

export function DosisEntregadasTooltip ({ active, payload, label }) {
  if (!active) return null

  const value = formatNumberToLocale(payload, 'es-ES')

  return (
    <div className={styles.chartTooltip}>
      <p>
        A día <Bold text={label} /> se han entregado{' '}
        <Bold text={value} /> dosis.
      </p>
    </div>
  )
}

export function DosisEntregadasVSAdministradasTooltip ({ active, payload, label }) {
  const translate = useTranslate()

  if (!active) return null
  if (!payload) return null
  const valueE = formatValueToLocale(payload[0].value, 'es-ES')
  const valueA = formatValueToLocale(payload[1].value, 'es-ES')
  const valueC = formatValueToLocale(payload[2].value, 'es-ES')

  return (
    <div className={styles.chartTooltip}>
      <p>
        {translate.chart.aDia} <Bold text={label} /> {translate.chart.seHanEntregado}
        <Bold text={valueE} />{translate.chart.dosisYSeHanAdministrado}<Bold text={valueA} />
        {translate.chart.deLosCualesPautaCompleta}<Bold text={valueC} />
      </p>
    </div>
  )
}
