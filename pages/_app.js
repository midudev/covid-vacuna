import { DefaultSeo } from 'next-seo'

import SEO from '../lib/config/seo'

import '../styles/globals.css'

function App ({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
