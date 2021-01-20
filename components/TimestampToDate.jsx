const options = {
  month: 'long', day: 'numeric'
}

export default function TimestampToDate ({ timestamp }) {
  const locale = 'es'

  const date = new Date(timestamp)
  const formattedDate = new Intl.DateTimeFormat(locale, options).format(date)

  const datetime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return <time dateTime={datetime}>{formattedDate}</time>
}
