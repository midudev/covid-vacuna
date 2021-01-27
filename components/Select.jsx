import styles from 'styles/Select.module.css'

export default function Select ({ data, onChange }) {
  const normalizedDate = (date) => {
    let dateFormat = ''
    for (let i = 0; i < date.length; i++) {
      dateFormat = dateFormat + date[i]
      if (i === 3) {
        dateFormat = dateFormat + '/'
      } if (i === 5) {
        dateFormat = dateFormat + '/'
      }
    }
    return dateFormat
  }

  return (
    <>
      <section className={styles.sectionSelect}>
        <h3>Mostrar reporte a la fecha: </h3>
        <select className={styles.select} onChange={(e) => onChange(e.target.value)}>
          <option disabled selected>
            Seleccionar Fecha
          </option>
          {data &&
            data.map((date) => (
              <option key={date} value={date}>
                {normalizedDate(date)}
              </option>
            ))}
        </select>
      </section>
      <style jsx>{styles}</style>
    </>
  )
}
