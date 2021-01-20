import styles from 'styles/Footer.module.css'

export default function Footer () {
  return (
    <footer className={styles.footer}>
      <a
        href='https://midu.dev'
        target='_blank'
        rel='noreferrer'
      >
        Desarrollado por{' '}
        <img src='https://midu.dev/logo.png' alt='midudev' />
      </a>
    </footer>
  )
}
