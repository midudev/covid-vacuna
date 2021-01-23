import styles from '../styles/ProgressChart.module.css'

function EnhanceText ({ children }) {
  return <b style={{ color: 'var(--text-subtitle-color)' }}>{children}</b>
}

export function DosisAdministradasTooltip ({ active, payload, label }) {
  if (!active) return null

  return (
    <div className={styles.chartTooltip}>
      <p>
        A día <EnhanceText>{label}</EnhanceText> se han administrado{' '}
        <EnhanceText>{payload?.pop().value}</EnhanceText> dosis.
      </p>
    </div>
  )
}

export function DosisEntregadasTooltip ({ active, payload, label }) {
  if (!active) return null

  return (
    <div className={styles.chartTooltip}>
      <p>
        A día <EnhanceText>{label}</EnhanceText> se han entregado{' '}
        <EnhanceText>{payload?.pop().value}</EnhanceText> dosis.
      </p>
    </div>
  )
}
