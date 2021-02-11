import styles from 'styles/Select.module.css'
import { useTranslate } from 'hooks/useTranslate'
import { useLocale } from 'hooks/useLocale'
import formatDate from 'services/formatDateFromReport'

export default function Select ({ data, onChange }) {
  const { locale } = useLocale()
  const { home } = useTranslate()

  return (
    <>
      <section className={styles.sectionSelect}>
        <label htmlFor='date-select'>{home.mostrarReporteFecha}</label>
        <div>
          <select
            defaultValue={data[data.length - 1]}
            id='date-select'
            className={styles.select}
            onChange={(e) => onChange(e.target.value)}
          >
            {data &&
              data.map((date) => (
                <option key={date} value={date}>
                  {formatDate({ locale, value: date })}
                </option>
              ))}
          </select>
        </div>
      </section>
    </>
  )
}
