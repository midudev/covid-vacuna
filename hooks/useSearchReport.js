import { useState, useEffect } from 'react'

export default function useSearch ({ valueSearch }) {
  const [resultSearch, setresultSearch] = useState()

  useEffect(() => {
    if (valueSearch !== '') {
      window.fetch(`../data/${valueSearch}.json`)
        .then((res) => res.json())
        .then(setresultSearch)
    }
  }, [valueSearch])

  return resultSearch
}
