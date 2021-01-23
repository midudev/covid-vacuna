import { LOCALE } from '@config/locale'

export const toDigit = ({ locale = LOCALE.DEFAULT, number }) => new Intl.NumberFormat(locale).format(number)

export default function NumberDigits ({ children }) {
  return toDigit({ number: children })
}
