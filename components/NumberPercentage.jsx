import { LOCALE } from '@config/locale'

const FRACTION_DIGITS = 2

export const toPercentage = ({ locale = LOCALE.DEFAULT, number }) => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: FRACTION_DIGITS, minimumFractionDigits: FRACTION_DIGITS }).format(number)

export default function NumberPercentage ({ children }) {
  return toPercentage({ number: children })
}
