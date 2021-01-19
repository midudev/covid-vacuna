export default function NumberPercentage ({ children }) {
  const locale = 'es' // recuperar del contexto más adelante
  return new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(children)
}
