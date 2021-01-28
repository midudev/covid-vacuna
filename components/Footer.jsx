import { useTranslate } from 'hooks/useTranslate'
import styles from 'styles/Footer.module.css'

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
          <img width='92' height='24' loading='lazy' src='https://midu.dev/logo.png' alt='midudev' />
        </a>
        <span>&bull;</span>
        <a href='https://github.com/midudev/covid-vacuna' rel='nofollow noreferrer' target='_blank'>GitHub</a>
        <span>&bull;</span>
        <a href='https://midu.tube' rel='nofollow noreferrer' target='_blank'>YouTube</a>
        <span>&bull;</span>
        <a href='https://midu.live' rel='nofollow noreferrer' target='_blank'>Twitch</a>
        <span>&bull;</span>
        <a href='https://app.usefathom.com/share/myexkunw/covid-vacuna.vercel.app' rel='nofollow noreferrer' target='_blank'>{translate.footer.estadisticas}</a>
        <span>&bull;</span>
        <a href='https://github.com/midudev/covid-vacuna/issues/new' rel='nofollow noreferrer' target='_blank'>{translate.footer.enviarSugerencia}</a>
      </div>
    </footer>
  )
}
