import { useLocale } from './useLocale'

export const useTranslate = () => {
  const { locale } = useLocale()
  const lang = require(`public/i18n/${locale}.json`)
  return lang
}
