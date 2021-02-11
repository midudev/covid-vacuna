import { useState } from 'react'
import { useLocale } from 'hooks/useLocale.js'
import { useTranslate } from 'hooks/useTranslate'

const { population } = require('public/data/bbdd.json')
const dataLatest = require('public/data/latest.json')

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

function getTotalPopulationToBeVaccinated (filter) {
  const populationCCAA = population[filter]
  const vaccinatedPopuplation = dataLatest.find(({ ccaa }) => ccaa === filter)
  const totalPopulationToBeVaccinated = populationCCAA - vaccinatedPopuplation.dosisPautaCompletada
  return totalPopulationToBeVaccinated
}

function getMedia (newReports, filter) {
  let vacunadosCompletos = 0
  let base = 0
  for (let i = 0; i < newReports.length; i++) {
    const element = newReports[i]
    const actualCCAA = element.find(({ ccaa }) => ccaa === filter)
    if (i === 0) {
      base = actualCCAA.dosisPautaCompletada
    } else {
      vacunadosCompletos = vacunadosCompletos + actualCCAA.dosisPautaCompletada - base
      base = actualCCAA.dosisPautaCompletada
    }
  }

  const mediaOfLastsDays = vacunadosCompletos / 7 // la media es en la semana
  return mediaOfLastsDays
}

function previsionCalculo (filter, percentage, newReports) {
  const mediaOfLastsDays = getMedia(newReports, filter)
  const totalPopulationToBeVaccinated = getTotalPopulationToBeVaccinated(filter) * percentage / 100
  const daysToComplete = parseInt((totalPopulationToBeVaccinated / mediaOfLastsDays))

  const ahora = new Date()
  const previsionCalculada = ahora.setDate(ahora.getDate() + daysToComplete)

  return new Date(previsionCalculada)
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

export default function Prevision ({ data, totals }) {
  const { locale } = useLocale()
  const translate = useTranslate()
  const intl = new Intl.DateTimeFormat(locale, dateTimeFormatOptions)
  const [showPrevisionLastsDays, setShowPrevisionLastsDays] = useState(false)

  const getDays = (days) =>
    getDaysToAchievePercentage(
      days,
      totals.porcentajePoblacionAdministradas - totals.porcentajePoblacionCompletas
    )

  return (
    <>
      <h2>{translate.progress.estimacionPoblacionVacunada}</h2>
      <label>
        <input
          type='checkbox'
          defaultChecked={showPrevisionLastsDays}
          onChange={() => setShowPrevisionLastsDays(!showPrevisionLastsDays)}
        />
        Mostrar Prevision segun media de ultimos 7 dias.
      </label>
      {showPrevisionLastsDays ? <small>Se toma en cuenta la media de los ultimos 7 dias.</small> : null}
      {totals.porcentajePoblacionCompletas
        ? (
          <section>
            {
          points.map(({ color, percentage }) => (
            <div className='card' key={percentage}>
              <span style={{ '--color': color }}>{percentage}%</span>
              {showPrevisionLastsDays
                ? <time>{intl.format(previsionCalculo(totals.ccaa, percentage, data))}</time>
                : <time>{intl.format(addDaysToInitialData(getDays(percentage)))}</time>}
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
            background: #ffffff;
            border-radius: 8px;
            border: 2px solid #111;
            margin: 1rem 0 0;
            padding: 1rem 1.5rem 1.5rem;
            text-align: center;
            box-shadow: rgb(210,239,253) 14px 14px;
            }
            label {
              font-weight: 500;
              line-height: 150%;
              margin-right: 1rem;
              display: flex;
              align-items: center;
              border-radius: 10px;
              cursor: pointer;
              padding: 6px;
            }

            label:hover {
              background-color: #d2effd;
            }

            label input[type="checkbox"] {
              appearance: none;
              background: #ffffff;
              border: 2px solid #111;
              border-radius: 500%;
              box-shadow: rgb(210, 239, 253) 4px 4px;
              margin-right: 8px;
              padding: 6px;
              outline: 0;
            }
            label input[type="checkbox"]:checked {
              background: radial-gradient(currentcolor 50%, rgba(255, 0, 0, 0) 51%);
            }
          }
      `}
      </style>
    </>
  )
}
