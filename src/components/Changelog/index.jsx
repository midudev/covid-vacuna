import styles from 'styles/Share.module.css'

export default function Changelog () {
  return (
    <>
      <h2 className={styles.subtitle}>
        Changelog
      </h2>
      <ul>
        <li>
          <strong>1.2.0</strong>: Añadida barra de progreso de vacunación en población <span aria-label='Globo terrícola con vistas a América' role='img'>🌎</span>
        </li>
        <li>
          <strong>1.1.0</strong>: Añadidas personas con pauta completa <span aria-label='Jeringuilla con sangre contaminada con T-Virus' role='img'>💉</span>
        </li>
        <li>
          <strong>1.0.0</strong>: Primera versión <span aria-label='Fuego del olimpo que derrite corazones' role='img'>🔥</span>
        </li>
      </ul>
    </>
  )
}
