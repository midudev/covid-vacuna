import { useLocale } from 'hooks/useLocale'

const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000
const getUnitAndValueDate = (secondsElapsed) => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }
}

const getTimeAgo = (timestamp, locale) => {
  const rtf = new Intl.RelativeTimeFormat(locale)

  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit)
}

export default function TimeAgo ({ timestamp }) {
  const { locale } = useLocale()
  const timeago = getTimeAgo(timestamp, locale)

  const date = new Date(timestamp)
  const formattedDate = new Intl.DateTimeFormat(locale, {
    month: 'long', day: 'numeric'
  }).format(date)

  return <time title={formattedDate} dateTime={formattedDate}>{timeago}</time>
}
