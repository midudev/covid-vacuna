import { LOCALE } from '@config/locale'

export default function TimestampToDate ({ timestamp }) {
  const date = new Date(timestamp)
  const formattedDate = new Intl.DateTimeFormat(LOCALE.DEFAULT, {
    month: 'long', day: 'numeric'
  }).format(date)

  const datetime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return <time dateTime={datetime}>{formattedDate}</time>
}
