import styles from 'styles/Select.module.css'
import { useTranslate } from 'hooks/useTranslate'
import { useLocale } from 'hooks/useLocale'

const REPORT_DATE_REGEXP = /(?<year>[0-9]{4})(?<month>[0-9]{2})(?<day>[0-9]{2})/

const toDate = (value) => {
  const { year, month, day } = value.match(REPORT_DATE_REGEXP).groups
  return new Date(+year, +month - 1, +day)
}

const formatDate = ({ locale, value }) => {
  const date = toDate(value)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric', month: '2-digit', day: '2-digit'
  }).format(date)
}

export default function Select ({ data, onChange }) {
  const { locale } = useLocale()
  const translate = useTranslate()

  return (
    <>
      <section className={styles.sectionSelect}>
        <label htmlFor='date-select'>{translate.home.mostrarReporteFecha}</label>
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
