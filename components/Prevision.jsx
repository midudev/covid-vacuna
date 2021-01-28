const START_DATA_VACCINATION = '01/04/2021'
const MILISECONDS_DAY = 1000 * 60 * 60 * 24

const getDaysFromStartVaccination = () => {
  return (new Date().getTime() - new Date(START_DATA_VACCINATION).getTime()) / MILISECONDS_DAY
}

const getDaysToAchievePercentage = (percentageGoal, actualPercentage) => {
  return getDaysFromStartVaccination() * percentageGoal / (actualPercentage * 100)
}

const addDaysToInitialData = (days) => {
  const initialData = new Date(START_DATA_VACCINATION).getTime() + (days * MILISECONDS_DAY)
  return new Date(initialData)
}

export default function Progress ({ totals }) {
  const locale = 'es' // get from context later
  const daysToHalfVaccination = getDaysToAchievePercentage(50, totals.porcentajePoblacionCompletas)
  const daysToFinalVaccination = getDaysToAchievePercentage(100, totals.porcentajePoblacionCompletas)

  return (
    <>
      <h3>Fechas estimadas de final de vacunación a la velocidad actual</h3>
      <>50% población {new Intl.DateTimeFormat(locale).format(addDaysToInitialData(daysToHalfVaccination))}</>
      <p>Total de la población {new Intl.DateTimeFormat(locale).format(addDaysToInitialData(daysToFinalVaccination))}</p>
    </>
  )
}
