import useFathom from '../lib/hooks/useFathom'

import '../styles/globals.css'

function App ({ Component, pageProps }) {
  useFathom({ ID: 'MYEXKUNW', domains: ['covid-vacuna.app'] })

  return <Component {...pageProps} />
}

export default App
