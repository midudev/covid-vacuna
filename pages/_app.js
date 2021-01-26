import { DefaultSeo } from 'next-seo'

import SEO from 'config/seo'
import useFathom from 'hooks/useFathom'

import 'styles/globals.css'
import { MainContextProvider } from 'contexts'

function App ({ Component, pageProps }) {
  useFathom({ ID: 'MYEXKUNW', domains: ['covid-vacuna.app'] })

  return (
    <MainContextProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </MainContextProvider>
  )
}

export default App
