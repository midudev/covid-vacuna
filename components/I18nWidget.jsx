import { useLocale } from 'hooks/useLocale'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import styles from 'styles/I18nWidget.module.css'

const LOCALES = {
  es: {
    name: 'Castellano',
    zone: 'España'
  },
  ca: {
    name: 'Català',
    zone: 'Catalunya'
  },
  gl: {
    name: 'Galego',
    zone: 'Galicia'
  },
  eu: {
    name: 'Euskara',
    zone: 'Euskadi'
  },
  ast: {
    name: 'Asturianu',
    zone: 'Asturies'
  }
}

const I18nWidget = () => {
  const { asPath: currentPath } = useRouter()
  const { locale, locales } = useLocale()
  const [display, setDisplay] = useState(false)
  const buttonLangRef = useRef(null)
  const languagesRef = useRef(null)

  const options = locales?.filter(val => val !== locale)
  const { name, zone } = LOCALES[locale]

  useEffect(() => {
    function handleClickOutside (event) {
      if (languagesRef.current && !languagesRef.current.contains(event.target) &&
          buttonLangRef.current && !buttonLangRef.current.contains(event.target)) {
        setDisplay(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [languagesRef])

  return (
    <>
      <div className={styles.i18nWidget}>
        <button
          aria-label='Selector de idioma'
          type='button'
          onClick={() => setDisplay(!display)}
          ref={buttonLangRef}
        >
          <Image width={16} height={16} src={require(`public/flag-${locale}.svg`)} alt={`Bandera de ${zone}`} />
          <span className={styles.i18nWidgetName}>{name}</span>
        </button>
        {options?.length && display
          ? (
            <ul ref={languagesRef}>
              {options.map(locale =>
                <li key={locale}>
                  <Link href={currentPath} locale={locale}>
                    <a onClick={() => setDisplay(false)}>
                      {LOCALES[locale].name}
                    </a>
                  </Link>
                </li>)}
            </ul>
            )
          : null}
      </div>
    </>
  )
}

export default I18nWidget
