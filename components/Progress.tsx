import { useState } from 'react'

import styles from 'styles/Progress.module.css'

import { toPercentage } from './NumberPercentage'

const FILTERS = {
  parcial: 'porcentajePoblacionAdministradas',
  completa: 'porcentajePoblacionCompletas'
}

const Progress: React.FC<any> = ({ data }) => {
  const locale = 'es' // get from context later
  const [filter, setFilter] = useState(FILTERS.parcial)

  const value = data.find(({ ccaa }: { ccaa: string }) => ccaa === 'Totales')[
    filter
  ] as number

  return (
    <>
      <form className={styles.progress}>
        <div>
          <label>
            <input
              checked={filter === FILTERS.parcial}
              onChange={() => setFilter(FILTERS.parcial)}
              type="radio"
              name="filter"
            />
            Ver población vacunada
          </label>
          <label>
            <input
              checked={filter === FILTERS.completa}
              name="filter"
              onChange={() => setFilter(FILTERS.completa)}
              type="radio"
            />
            Ver población con pauta completa
          </label>
        </div>

        <section data-value={toPercentage({ locale, num: value })}>
          <progress max="100" value={value * 100} />
        </section>
      </form>
    </>
  )
}

export default Progress
