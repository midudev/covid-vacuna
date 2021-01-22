type ToDigit = {
  locale: string
  num: number
}

export const toDigit = ({ locale, num }: ToDigit) =>
  new Intl.NumberFormat(locale).format(num)

const NumberDigits: React.FC = ({ children }) => {
  const locale = 'es' // recuperar del contexto más adelante

  return <>{toDigit({ locale, num: children as number })}</>
}

export default NumberDigits
