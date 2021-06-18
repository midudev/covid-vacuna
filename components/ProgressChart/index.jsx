import { lazy, useRef, Suspense } from 'react'
import styles from './styles/ProgressChart.module.css'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

const ProgressChartComponent = lazy(() => import('./component.jsx'))

const placeholder = <div style={{ width: '100%', height: 450 }} />

export default function ProgressChart ({ dataset, tooltip }) {
  const elementRef = useRef(null)

  const [isVisible] = useIntersectionObserver({
    elementRef,
    freezeOnceVisible: true
  })

  if (!dataset) return null

  return (
    <div className={styles.chartContainer} ref={elementRef}>
      {isVisible
        ? (
          <Suspense fallback={placeholder}>
            <ProgressChartComponent dataset={dataset} tooltip={tooltip} />
          </Suspense>
          )
        : placeholder}
    </div>
  )
}
