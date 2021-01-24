import { LocaleContext } from 'contexts/local.context'
import { useContext } from 'react'

export const useLocale = () => {
  const { locale } = useContext(LocaleContext)
  return locale
}
