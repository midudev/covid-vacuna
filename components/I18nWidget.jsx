
import { useLocale } from 'hooks/useLocale'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from 'styles/I18nWidget.module.css'

const LOCALES = {
  'es-ES': {
    name: 'Castellano',
    zone: 'España'
  },
  'es-CA': {
    name: 'Català',
    zone: 'Catalunya'
  },
  'es-GA': {
    name: 'Galego',
    zone: 'Galicia'
  },
  'es-EU': {
    name: 'Euskara',
    zone: 'Euskadi'
  }
}

const I18nWidget = () => {
  const { asPath: currentPath } = useRouter()
  const { locale, locales } = useLocale()
  const [display, setDisplay] = useState(false)

  const options = locales?.filter(val => val !== locale)

  const { name, zone } = LOCALES[locale]

  return (
    <>
      <div className={styles.i18nWidget}>
        <button
          aria-label='Selector de idioma'
          type='button'
          onClick={() => setDisplay(!display)}
        >
          <img src={`flag-${locale}.svg`} alt={`Bandera de ${zone}`} />
          {name}
        </button>
        {options?.length && display
          ? (
            <ul>
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
