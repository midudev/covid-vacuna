import { useLocale } from 'hooks/useLocale.js'
import { useTranslate } from 'hooks/useTranslate'

const START_DATA_VACCINATION = '01/04/2021'
const MILISECONDS_DAY = 1000 * 60 * 60 * 24
const dateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
const DAYS_BETWEEN_FIRST_AND_SECOND = 28

const getDaysFromStartVaccination = () => {
  return (new Date().getTime() - new Date(START_DATA_VACCINATION).getTime()) / MILISECONDS_DAY
}

const getDaysToAchievePercentage = (percentageGoal, actualPercentage) => {
  return (
    (getDaysFromStartVaccination() * percentageGoal) / (actualPercentage * 100) +
    DAYS_BETWEEN_FIRST_AND_SECOND
  )
}

const addDaysToInitialData = (days) => {
  const initialData = new Date(START_DATA_VACCINATION).getTime() + (days * MILISECONDS_DAY)
  return new Date(initialData)
}

export default function Prevision ({ totals }) {
  const { locale } = useLocale()
  const translate = useTranslate()
  const intl = new Intl.DateTimeFormat(locale, dateTimeFormatOptions)

  const getDays = (days) =>
    getDaysToAchievePercentage(
      days,
      totals.porcentajePoblacionPrimeraDosis || (totals.porcentajePoblacionAdministradas - totals.porcentajePoblacionCompletas)
    )
  const points = [
    {
      color: '#dd8f01',
      percentage: 50,
      show: !((totals.porcentajePoblacionCompletas >= 0.50))
    },
    {
      color: '#a3dd01',
      percentage: 75,
      show: !((totals.porcentajePoblacionCompletas >= 0.75))
    },
    {
      color: '#41ca0d',
      percentage: 100,
      show: !((totals.porcentajePoblacionCompletas >= 1))
    }]
  return (
    <>
      <h2>{translate.progress.estimacionPoblacionVacunada}</h2>
      {totals.porcentajePoblacionCompletas && totals.porcentajePoblacionCompletas < 1
        ? (
          <section>
            {
          points.map(({ color, percentage, show }) => (
            show &&
              <div className='card' key={percentage}>
                <span style={{ '--color': color }}>{percentage}%</span>
                <time>{intl.format(addDaysToInitialData(getDays(percentage)))}</time>
              </div>
          ))
        }
          </section>)
        : (
            totals.porcentajePoblacionCompletas >= 1
              ? (
                <h1>
                  TODOS VACUNADOS
                </h1>
                )
              : (
                <p>
                  <b>{translate.progress.noDatos}</b>
                </p>
                )
          )}

      <style jsx>{`
        section {
          align-items: center;
          display: flex;
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          justify-content: center;
          place-content: center;
          margin-bottom: 4rem;
          max-width: 1000px;
          place-content: center;
          width: 100%;
        }

        div {
          display: flex;
          flex-direction: column;
        }

        div span, div time {
          background: var(--app-background-color);
        }

        div time {
          color: var(--text-secondary-color);
          font-size: .9rem;
          font-weight: 500;
          margin-top: .7rem;
        }

        div span {
          color: var(--color);
          font-size: 5ch;
          font-weight: 500;
        }
        
        .card {
          background: var(--app-background-color);
          border-radius: 8px;
          border: 2px solid var(--app-border-color);
          margin: 1rem 0 0;
          padding: 1rem 1.5rem 1.5rem;
          text-align: center;
          box-shadow: var(--app-shadow-color) 14px 14px;
        }
    `}
      </style>
    </>
  )
}
