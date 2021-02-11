import { useTranslate } from 'hooks/useTranslate'
import styles from 'styles/Header.module.css'
import SchemeColorSwitcher from 'components/SchemeColorSwitcher'
import ClientSideComponent from 'components/ClientSideComponent'
import Share from 'components/Share.jsx'
import I18nWidget from 'components/I18nWidget.jsx'
import { useEffect, useState } from 'react'

const Header = ({ titleRef, filter }) => {
  const [scrolling, setScrolling] = useState(false)
  const translate = useTranslate()

  useEffect(() => {
    const onScroll = e => {
      const top = e.target.documentElement.scrollTop
      if (titleRef.current) {
        setScrolling(top >= titleRef.current.clientHeight)
      }
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={styles.headerSticky}>
      <div className={`${styles.headerContent} ${scrolling ? styles.headerContentScrolling : ''}`}>
        {scrolling && <h2 className={styles.title}> {translate.home.tituloPrincipal} {filter === 'Totales' ? 'España' : filter}</h2>}
        <div className={`${styles.actions} ${scrolling ? styles.actionsScrolling : ''}`}>
          <ClientSideComponent>
            <SchemeColorSwitcher />
          </ClientSideComponent>

          <I18nWidget />

          <Share />
        </div>
      </div>
    </div>
  )
}

export default Header
