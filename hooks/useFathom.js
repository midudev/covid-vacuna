import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as Fathom from 'fathom-client'

export default function useFathom ({ ID, domains }) {
  const router = useRouter()

  useEffect(() => {
    // initialize Fathom when the app loads
    Fathom.load(ID, { includedDomains: [...domains] })

    function onRouteChangeComplete () {
      Fathom.trackPageview()
    }

    // record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])
}
