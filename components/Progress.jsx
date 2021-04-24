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
  const translate = useTranslate()
  const value = CALCULATIONS[FILTERS.parcial](totals)
  const valueCompleta = CALCULATIONS[FILTERS.completa](totals)

  return (
    <>
      <div className={styles.progress}>
        <label>{translate.progress.verPoblacionVacunada}</label>
        <section data-value={toPercentage({ locale, number: value })}>
          <progress max='100' value={value * 100} />
        </section>
        <label>{translate.progress.verPoblacionConPauta}</label>
        <section data-value={toPercentage({ locale, number: valueCompleta })}>
          <progress max='100' value={valueCompleta * 100} />
        </section>
      </div>
    </>
  )
}
