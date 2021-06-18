import { useRef, lazy, Suspense } from 'react'
import styles from './styles/EtariosBarChart.module.css'
import { useTranslate } from 'hooks/useTranslate'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const EtariosBarChartComponent = lazy(() => import('./component.jsx'))

const placeholder = (
  <div style={{ width: '100%', height: 450 }} />
)
const EtariosBarChart = ({ data, ccaa, titleClass }) => {
  const translate = useTranslate()
  const elementRef = useRef(null)
  const [isVisible] = useIntersectionObserver({
    elementRef,
    freezeOnceVisible: true
  })

  if (!data.etarios) return null

  return (
    <>
      <h2 className={titleClass} ref={elementRef}>
        {translate.etariosBarChart.titulo} {ccaa}
      </h2>
      <div className={styles.chartContainer}>
        {isVisible
          ? (
            <Suspense fallback={placeholder}>
              <div style={{ width: '100%', height: 450 }}>
                <EtariosBarChartComponent data={data} />
              </div>
            </Suspense>
            )
          : placeholder}
      </div>
    </>
  )
}

export default EtariosBarChart
