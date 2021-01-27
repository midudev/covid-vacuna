import styles from '../styles/ProgressChart.module.css'

function formatNumberToLocale (value, locale = 'es-ES') {
  if (value === undefined) return

  const num = new Intl.NumberFormat(locale)
  return num.format(value)
}

function Bold ({ text }) {
  return <b style={{ color: 'var(--text-subtitle-color)' }}>{text}</b>
}

export function DosisAdministradasTooltip ({ active, payload, label }) {
  if (!active || !payload || (payload && payload.length === 0)) return null

  const { value } = payload[0]

  const _value = formatNumberToLocale(value)

  return (
    <div className={styles.chartTooltip}>
      <p>
        A día <Bold text={label} /> se han administrado{' '}
        <Bold text={_value} /> dosis.
      </p>
    </div>
  )
}

export function DosisEntregadasTooltip ({ active, payload, label }) {
  if (!active || !payload || (payload && payload.length === 0)) return null

  const { payload: _payload } = payload[0]

  const esEmpresa = empresa => !['name'].includes(empresa)

  const empresas = Object.keys(_payload)
    .filter(esEmpresa)

  // Se realiza el sumatorio eliminando el atributo "name"
  const total = empresas
    .reduce((total, empresa) => {
      total = esEmpresa(empresa)
        ? total + _payload[empresa]
        : total

      return total
    }, 0)

  return (
    <div className={styles.chartTooltip}>
      <p>A día <Bold text={label} /> se han entregado{' '} un total de
        {' '}<Bold text={formatNumberToLocale(total)} /> dosis.
      </p>
      <ul>
        {empresas.map((empresa, index) => {
          return <li key={index}>{empresa}: {formatNumberToLocale(_payload[empresa])}</li>
        })}
      </ul>
    </div>
  )
}
