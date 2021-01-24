import styles from '../styles/ProgressChart.module.css'

function formatNumberToLocale (payload, locale) {
  if (!payload) return

  const { value } = payload.pop()

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
