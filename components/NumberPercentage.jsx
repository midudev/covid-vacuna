import { useLocale } from 'hooks/useLocale'

const FRACTION_DIGITS = 2

export const toPercentage = ({ locale, number }) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: FRACTION_DIGITS, minimumFractionDigits: FRACTION_DIGITS }).format(number)

export default function NumberPercentage ({ children }) {
  const { locale } = useLocale()
  return toPercentage({ locale, number: children })
}
