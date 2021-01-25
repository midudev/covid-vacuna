import { useEffect } from 'react'
import useStickyState from 'hooks/useStickyState'
import styles from 'styles/SchemeColorSwitcher.module.css'

const SCHEMES = {
  SYSTEM: 'system',
  DARK: 'dark-mode',
  LIGHT: 'light-mode'
}

export default function SchemeColorSwitcher () {
  const [scheme, setScheme] = useStickyState(SCHEMES.SYSTEM, 'schemeColor')

  useEffect(() => {
    const html = document.querySelector('html')
    scheme === SCHEMES.SYSTEM
      ? html.removeAttribute('scheme')
      : html.setAttribute('scheme', scheme)
  }, [scheme])

  const handleChange = e => {
    e.preventDefault()
    setScheme(e.target.value)
  }

  return (
    <section className={styles.colorSwitch}>
      <label data-checked={scheme === SCHEMES.LIGHT} title='Usa el tema claro'>
        <input
          onChange={handleChange}
          name='switch'
          value={SCHEMES.LIGHT}
          type='radio'
        />
        <span
          aria-label='Un sol que invertido parece el malo de Doom'
          role='img'
        >
          🌞
        </span>
      </label>

      <label
        data-checked={scheme === SCHEMES.SYSTEM}
        title='Usa el tema dependiendo tu configuración de sistema'
      >
        <input
          onChange={handleChange}
          name='switch'
          value={SCHEMES.SYSTEM}
          type='radio'
        />
        <span aria-label='Tus preferencias molonas de tu sistema' role='img'>
          💻
        </span>
      </label>

      <label data-checked={scheme === SCHEMES.DARK} title='Usa el tema oscuro'>
        <input
          onChange={handleChange}
          name='switch'
          value={SCHEMES.DARK}
          type='radio'
        />
        <span
          aria-label='Una luna con ojos sospechosos que parece que está tramando algo jodido'
          role='img'
        >
          🌚
        </span>
      </label>
    </section>
  )
}
