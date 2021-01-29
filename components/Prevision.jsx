import { useLocale } from 'hooks/useLocale.js'
import { useTranslate } from 'hooks/useTranslate'

const START_DATA_VACCINATION = '01/04/2021'
const MILISECONDS_DAY = 1000 * 60 * 60 * 24
const dateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

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

const points = [{
  color: '#dd8f01',
  percentage: 50
}, {
  color: '#a3dd01',
  percentage: 75
}, {
  color: '#41ca0d',
  percentage: 100
}]

export default function Progress ({ totals }) {
  const { locale } = useLocale()
  const translate = useTranslate()
  const intl = new Intl.DateTimeFormat(locale, dateTimeFormatOptions)

  const getDays = days => getDaysToAchievePercentage(days, totals.porcentajePoblacionCompletas)

  return (
    <>
      <h2>{translate.progress.estimacionPoblacionVacunada}</h2>
      {totals.porcentajePoblacionCompletas
        ? (
          <section>
            {
          points.map(({ color, percentage }) => (
            <div className='card' key={percentage}>
              <span style={{ '--color': color }}>{percentage}%</span>
              <time>{intl.format(addDaysToInitialData(getDays(percentage)))}</time>
            </div>
          ))
        }
          </section>)
        : (
          <p>
            <b>{translate.progress.noDatos}</b>
          </p>
          )}

      <style jsx>{`
        section {
          align-items: center;
          display: flex;
          display: grid;
          gap: 32px;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          justify-content: center;
          justify-items: center;
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
          background: #fff;
        }

        div time {
          color: #333;
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
          background: #ffffff;
          border-radius: 8px;
          border: 2px solid #111;
          margin: 1rem 0 0;
          padding: 1rem 1.5rem 1.5rem;
          text-align: center;
          box-shadow: rgb(210,239,253) 14px 14px;
          }
        }
    `}
      </style>
    </>
  )
}
