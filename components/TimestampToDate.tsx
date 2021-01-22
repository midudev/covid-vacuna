const TimestampToDate: React.FC<{ timestamp: number }> = ({ timestamp }) => {
  const locale = 'es'

  const date = new Date(timestamp)
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'long',
    day: 'numeric'
  }).format(date)

  const datetime = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`
  return <time dateTime={datetime}>{formattedDate}</time>
}

export default TimestampToDate
