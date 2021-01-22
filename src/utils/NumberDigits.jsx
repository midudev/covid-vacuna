export const toDigit = ({ locale, number }) => new Intl.NumberFormat(locale).format(number)

export default function NumberDigits ({ children }) {
  const locale = 'es' // recuperar del contexto más adelante
  return toDigit({ locale, number: children })
}
