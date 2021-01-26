import { useLocale } from 'hooks/useLocale'

export const toDigit = ({ locale, number }) => new Intl.NumberFormat(locale).format(number)

export default function NumberDigits ({ children }) {
  const { locale } = useLocale()
  return toDigit({ locale, number: children })
}
