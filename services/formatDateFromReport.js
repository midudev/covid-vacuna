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

export default formatDate
