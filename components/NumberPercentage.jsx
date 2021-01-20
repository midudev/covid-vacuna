export const toPercentage = ({ locale, number }) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 2 }).format(number)

export default function NumberPercentage ({ children }) {
  const locale = 'es' // recuperar del contexto más adelante
  return toPercentage({ locale, number: children })
}
