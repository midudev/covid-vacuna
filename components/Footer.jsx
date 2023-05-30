import { useTranslate } from 'hooks/useTranslate'
import styles from 'styles/Footer.module.css'
import Image from 'next/image'
import { AiFillGithub, AiFillYoutube } from 'react-icons/ai'
import { BsTwitch } from 'react-icons/bs'
import { IconContext } from 'react-icons'

export default function Footer () {
  const translate = useTranslate()
  return (
    <footer className={styles.footer}>
      <div>
        <a
          href='https://midu.dev'
          target='_blank'
          rel='noreferrer'
        >
          {translate.footer.desarrolladoPor}{' '}
          <picture>
            <Image
              width='92'
              height='28'
              loading='lazy'
              src='https://midu.dev/logo.png' alt='midudev logo'
            />
          </picture>
        </a>
        <IconContext.Provider value={{ size: '1.9em' }}>
          <span>&bull;</span>
          <a className={styles.footerLogos} href='https://github.com/midudev/covid-vacuna' rel='nofollow noreferrer' target='_blank'><AiFillGithub /></a>
          <span>&bull;</span>
          <a className={styles.footerLogos} href='https://midu.tube' rel='nofollow noreferrer' target='_blank'><AiFillYoutube /></a>
          <span>&bull;</span>
          <a className={styles.footerLogos} href='https://midu.live' rel='nofollow noreferrer' target='_blank'><BsTwitch /></a>
          <span>&bull;</span>
          <a href='https://app.usefathom.com/share/myexkunw/covid-vacuna.vercel.app' rel='nofollow noreferrer' target='_blank'>{translate.footer.estadisticas}</a>
          <span>&bull;</span>
          <a href='https://github.com/midudev/covid-vacuna/issues/new' rel='nofollow noreferrer' target='_blank'>{translate.footer.enviarSugerencia}</a>
        </IconContext.Provider>
      </div>
    </footer>
  )
}
