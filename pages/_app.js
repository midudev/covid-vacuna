import { DefaultSeo } from 'next-seo'

import SEO from 'config/seo'
import useFathom from 'hooks/useFathom'

import 'styles/globals.css'

function App ({ Component, pageProps }) {
  useFathom({ ID: 'MYEXKUNW', domains: ['covid-vacuna.app'] })

  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
