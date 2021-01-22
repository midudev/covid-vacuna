import { useEffect, useState } from 'react'

const SCHEMES = {
  SYSTEM: '',
  DARK: 'dark-mode',
  LIGHT: 'light-mode'
}

export default function SchemeColorSwitcher () {
  const [scheme, setScheme] = useState()

  useEffect(() => {
    const html = document.querySelector('html')
    scheme === SCHEMES.SYSTEM
      ? html.removeAttribute('scheme')
      : html.setAttribute('scheme', scheme)
  }, [scheme])

  return (
    <>
      <button onClick={() => setScheme(SCHEMES.LIGHT)}>
        <span aria-label='Un sol que invertido parece el malo de Doom' role='img'>🌞</span>
      </button>
      <button onClick={() => setScheme(SCHEMES.DARK)}>
        <span aria-label='Una luna con ojos sospechosos que parece que está tramando algo jodido' role='img'>🌚</span>
      </button>
      <button onClick={() => setScheme(SCHEMES.SYSTEM)}>
        <span aria-label='Tus preferencias molonas de tu sistema' role='img'>💻</span>
      </button>
    </>
  )
}
