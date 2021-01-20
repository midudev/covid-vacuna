import styles from 'styles/Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <div>
        <a
          href='https://midu.dev'
          target='_blank'
          rel='noreferrer'
        >
          Desarrollado por{' '}
          <img src='https://midu.dev/logo.png' alt='midudev' />
        </a>
        <span>&bull;</span>
        <a href='https://github.com/midudev/covid-vacuna' rel='nofollow noreferrer' target='_blank'>GitHub</a>
        <span>&bull;</span>
        <a href='https://midu.tube' rel='nofollow noreferrer' target='_blank'>YouTube</a>
        <span>&bull;</span>
        <a href='https://twitch.tv' rel='nofollow noreferrer' target='_blank'>Twitch</a>
      </div>
    </footer>
  )
}
