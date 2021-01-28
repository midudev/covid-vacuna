import { useEffect, useRef } from 'react'
import useStickyState from 'hooks/useStickyState'
import styles from 'styles/SchemeColorSwitcher.module.css'
import { useTranslate } from 'hooks/useTranslate'

const SCHEMES = {
  SYSTEM: 'system',
  DARK: 'dark-mode',
  LIGHT: 'light-mode'
}

export default function SchemeColorSwitcher () {
  const [scheme, setScheme] = useStickyState(SCHEMES.SYSTEM, 'schemeColor')
  const slider = useRef(null)
  const switcher = useRef(null)
  const translate = useTranslate()
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
      <label data-checked={scheme === SCHEMES.LIGHT} title={translate.colorSwitcher.lightTitleLabel}>
        <input
          onChange={handleChange}
          name='switch'
          value={SCHEMES.LIGHT}
          type='radio'
          data-location='0'
        />
        <span
          aria-label={translate.colorSwitcher.lightAriaLabel}
          role='img'
        >
          🌞
        </span>
      </label>

      <label
        data-checked={scheme === SCHEMES.SYSTEM}
        title={translate.colorSwitcher.standardTitleLabel}
      >
        <input
          onChange={handleChange}
          name='switch'
          value={SCHEMES.SYSTEM}
          type='radio'
          data-location='calc(100% - 2px)'
        />
        <span aria-label={translate.colorSwitcher.standardAriaLabel} role='img'>
          💻
        </span>
      </label>

      <label data-checked={scheme === SCHEMES.DARK} title={translate.colorSwitcher.darkTitleLabel}>
        <input
          onChange={handleChange}
          name='switch'
          value={SCHEMES.DARK}
          type='radio'
          data-location='calc(200% - 4px)'
        />
        <span
          aria-label={translate.colorSwitcher.darkAriaLabel}
          role='img'
        >
          🌚
        </span>
      </label>
    </section>
  )
}
