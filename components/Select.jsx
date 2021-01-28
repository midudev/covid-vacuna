import styles from 'styles/Select.module.css'
import { useTranslate } from 'hooks/useTranslate'

export default function Select ({ data, onChange }) {
  const translate = useTranslate()
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
        <h3>{translate.home.mostrarReporteFecha}: </h3>
        <select className={styles.select} onChange={(e) => onChange(e.target.value)}>
          <option disabled selected>
            {translate.home.seleccionarFecha}
          </option>
          {data &&
            data.map((date) => (
              <option key={date} value={date}>
                {normalizedDate(date)}
              </option>
            ))}
        </select>
      </section>
    </>
  )
}
