
import { useLocale } from 'hooks/useMainContexts'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from 'styles/I18nWidget.module.css'

const LOCALES = {
  'es-ES': {
    name: 'Castellano'
  },
  'es-CA': {
    name: 'Catalán'
  },
  'es-GA': {
    name: 'Gallego'
  },
  'es-EU': {
    name: 'Euskera'
  }
}

const I18nWidget = () => {
  const { locale, locales, defaultLocale = 'es-ES', asPath: currentPath } = useRouter()
  const [display, setDisplay] = useState(false)
  const { setLocale } = useLocale()
  const options = locales?.filter(val => val !== locale)
  const currentLocale = locale || defaultLocale
  setLocale(currentLocale)

  return (
    <>
      <div className={styles.i18nWidget}>
        <button
          aria-label='Selector de idioma'
          type='button'
          onClick={() => setDisplay(!display)}
        >
          <img src='flag-es.svg' alt='Bandera de España' />
          {LOCALES[currentLocale].name}
        </button>
      </div>
      <div>
        {options?.length && display
          ? (
            <ul className={styles.dropDown}>
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
