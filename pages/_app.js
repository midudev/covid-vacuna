import { DefaultSeo } from 'next-seo'

import SEO from 'config/seo'
import useFathom from 'hooks/useFathom'

import 'styles/globals.css'
import { ModalContextProvider } from 'contexts/modal.context'
import { TermModal } from 'components/TermModal'

function App ({ Component, pageProps }) {
  useFathom({ ID: 'MYEXKUNW', domains: ['covid-vacuna.app'] })

  return (
    <>
      <DefaultSeo {...SEO} />
      <ModalContextProvider>
        <TermModal />
        <Component {...pageProps} />
      </ModalContextProvider>
    </>
  )
}

export default App
