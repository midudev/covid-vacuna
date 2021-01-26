import { useEffect, useRef } from 'react'
import useStickyState from 'hooks/useStickyState'
import styles from 'styles/SchemeColorSwitcher.module.css'

const SCHEMES = {
  SYSTEM: 'system',
  DARK: 'dark-mode',
  LIGHT: 'light-mode'
}

export default function SchemeColorSwitcher () {
  const [scheme, setScheme] = useStickyState(SCHEMES.SYSTEM, 'schemeColor')
  const slider = useRef(null)
  const switcher = useRef(null)

  useEffect(() => {
    const html = document.querySelector('html')
    scheme === SCHEMES.SYSTEM
      ? html.removeAttribute('scheme')
      : html.setAttribute('scheme', scheme)
    const target = switcher.current.querySelector('[data-checked="true"]').querySelector('input')
    slider.current.style = 'transform: translateX(' + target.dataset.location + ')'
  }, [scheme])

  const handleChange = e => {
    e.preventDefault()
    const { target } = e
    setScheme(target.value)
    slider.current.style = 'transform: translateX(' + target.dataset.location + ')'
  }

  return (
    <section ref={switcher} className={styles.colorSwitch}>
      <div ref={slider} className={styles.slider} />
      <label data-checked={scheme === SCHEMES.LIGHT} title='Usa el tema claro'>
        <input
          onChange={handleChange}
          name='switch'
          value={SCHEMES.LIGHT}
          type='radio'
          data-location='0'
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
          data-location='calc(100% - 2px)'
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
          data-location='calc(200% - 4px)'
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
