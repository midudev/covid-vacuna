import { useEffect, useState } from 'react'
import styles from 'styles/SchemeColorSwitcher.module.css'

const SCHEMES = {
  SYSTEM: 'system',
  DARK: 'dark-mode',
  LIGHT: 'light-mode'
}

export default function SchemeColorSwitcher () {
  const [scheme, setScheme] = useState(SCHEMES.SYSTEM)

  useEffect(() => {
    const html = document.querySelector('html')
    scheme === SCHEMES.SYSTEM
      ? html.removeAttribute('scheme')
      : html.setAttribute('scheme', scheme)
  }, [scheme])

  const handleChange = e => setScheme(e.target.id)

  return (
    <>
      <section className={styles.colorSwitch}>
        <label checked={scheme === SCHEMES.LIGHT} title='Usa el tema claro' for={SCHEMES.LIGHT}>
          <span aria-label='Un sol que invertido parece el malo de Doom' role='img'>🌞</span>
        </label>
        <input checked={scheme === SCHEMES.LIGHT} onChange={handleChange} name='switch' id={SCHEMES.LIGHT} type='radio' />

        <label checked={scheme === SCHEMES.SYSTEM} title='Usa el tema dependiendo tu configuración de sistema' for={SCHEMES.SYSTEM}>
          <span aria-label='Tus preferencias molonas de tu sistema' role='img'>💻</span>
        </label>
        <input checked={scheme === SCHEMES.SYSTEM} onChange={handleChange} name='switch' id={SCHEMES.SYSTEM} type='radio' />

        <label checked={scheme === SCHEMES.DARK} title='Usa el tema oscuro' for={SCHEMES.DARK}>
          <span aria-label='Una luna con ojos sospechosos que parece que está tramando algo jodido' role='img'>🌚</span>
        </label>
        <input checked={scheme === SCHEMES.DARK} onChange={handleChange} name='switch' id={SCHEMES.DARK} type='radio' />

        <div />
      </section>
    </>
  )
}
