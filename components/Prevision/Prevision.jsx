import { useLocale } from 'hooks/useLocale.js'

const { population } = require('public/data/bbdd.json')
const dataLatest = require('public/data/latest.json')
const dateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

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

function prevision (filter, percentage, newReports) {
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

export default function Progress ({ data, totals }) {
  const { locale } = useLocale()
  const intl = new Intl.DateTimeFormat(locale, dateTimeFormatOptions)

  return (
    <>
      <h2>Estimación población vacunada</h2>
      <small>Se toma en cuenta la media de los ultimos 7 dias.</small>
      {totals.dosisPautaCompletada
        ? (
          <section>
            {
          points.map(({ color, percentage }) => (
            <div className='card' key={percentage}>
              <span style={{ '--color': color }}>{percentage}%</span>
              <time>{intl.format(prevision(totals.ccaa, percentage, data))}</time>
              {data.ccaa}
            </div>
          ))
        }
          </section>)
        : (
          <p>
            <b>No disponemos de datos para esa fecha.</b>
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
