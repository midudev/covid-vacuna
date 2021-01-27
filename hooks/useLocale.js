
import { useRouter } from 'next/router'

export const useLocale = () => {
  const { locales, locale } = useRouter()
  return { locale, locales }
}
