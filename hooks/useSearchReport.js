import { useState, useEffect } from 'react'

export default function useSearch ({ valueSearch }) {
  const [resultSearch, setResultSearch] = useState()

  useEffect(() => {
    if (valueSearch !== '') {
      window.fetch(`../data/${valueSearch}.json`)
        .then(res => res.json())
        .then(setResultSearch)
    }
  }, [valueSearch])

  return resultSearch
}
