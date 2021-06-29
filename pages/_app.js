import { DefaultSeo } from 'next-seo'

import { useTranslate } from 'hooks/useTranslate'
import SEO from 'config/seo'
import useFathom from 'hooks/useFathom'

import 'styles/globals.css'

function App ({ Component, pageProps }) {
  useFathom({ ID: 'MYEXKUNW', domains: ['covid-vacuna.app'] })
  const translate = useTranslate()

  SEO.title = translate.seo.title
  SEO.description = translate.seo.description
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
