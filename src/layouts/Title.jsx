import TimeAgo from 'utils/TimeAgo'

export default function Footer ({styles, info}) {
  return (
    <>
      <h1 className={styles.title}>
        Vacunación COVID-19 en España
      </h1>
      <small className={styles.description}>
        Datos actualizados <TimeAgo timestamp={info.lastModified} />. Fuente: <a href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm'>Gobierno de España</a>
      </small>
    </>
  )
}