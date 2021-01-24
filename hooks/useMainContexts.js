import { LocaleContext } from 'contexts/local.context'
import { useContext } from 'react'

export const useLocale = () => {
  const { locale, setLocale } = useContext(LocaleContext)
  return { locale, setLocale }
}
