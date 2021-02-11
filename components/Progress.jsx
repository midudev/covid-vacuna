import { useState } from 'react'
import styles from 'styles/Progress.module.css'
import { toPercentage } from 'components/NumberPercentage.jsx'
import { useLocale } from 'hooks/useLocale'
import { useTranslate } from 'hooks/useTranslate'
import { getPartialVacunationPopulation, getCompleteVacunationPopulation } from 'services/getProgressCalculations'

const FILTERS = {
  parcial: 0,
  completa: 1
}

const CALCULATIONS = {
  [FILTERS.parcial]: getPartialVacunationPopulation,
  [FILTERS.completa]: getCompleteVacunationPopulation
}

export default function Progress ({ totals }) {
  const { locale } = useLocale()
  const [filter, setFilter] = useState(FILTERS.parcial)
  const translate = useTranslate()
  const value = CALCULATIONS[filter](totals)

  return (
    <>
      <form className={styles.progress}>
        <div>
          <label>
            <input
              checked={filter === FILTERS.parcial}
              onChange={() => setFilter(FILTERS.parcial)}
              type='radio'
              name='filter'
            />
            {translate.progress.verPoblacionVacunada}
          </label>
          <label>
            <input
              checked={filter === FILTERS.completa}
              name='filter'
              onChange={() => setFilter(FILTERS.completa)}
              type='radio'
            />
            {translate.progress.verPoblacionConPauta}
          </label>
        </div>

        <section data-value={toPercentage({ locale, number: value })}>
          <progress max='100' value={value * 100} />
        </section>
      </form>
    </>
  )
}
