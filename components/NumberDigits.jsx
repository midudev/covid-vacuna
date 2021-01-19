export default function NumberDigits ({ children }) {
  const locale = 'es' // recuperar del contexto más adelante
  return new Intl.NumberFormat(locale).format(children)
}
