const { LocaleContext } = require('contexts/local.context')
const { useContext } = require('react')

export const useTranslate = () => {
  const { locale } = useContext(LocaleContext)
  const lang = require(`public/i18n/${locale}.json`)
  return lang
}
