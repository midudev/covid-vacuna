const FRACTION_DIGITS = 2

type ToPercentage = {
  locale: string
  num: number
}

export const toPercentage = ({ locale, num }: ToPercentage) =>
  new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: FRACTION_DIGITS,
    minimumFractionDigits: FRACTION_DIGITS
  }).format(num)

const NumberPercentage: React.FC = ({ children }) => {
  const locale = 'es' // recuperar del contexto más adelante

  return <>{toPercentage({ locale, num: children as number })}</>
}

export default NumberPercentage
