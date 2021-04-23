import { useRef } from 'react'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import styles from './styles/ProgressChart.module.css'
import { CustomXTick, CustomYTick } from './ticks'
import useIntersectionObserver from 'hooks/useIntersectionObserver'

export default function ProgressChart ({ dataset, tooltip: CustomTooltip }) {
  const elementRef = useRef(null)

  const [isVisible] = useIntersectionObserver({
    elementRef,
    freezeOnceVisible: true
  })

  if (!dataset) return null

  // Join dosisAdministradas y dosisEntregadas to make an unique graph
  const joinDataset = []
  for (const data of dataset.dosisEntregadas) {
    const valueAdministradas = dataset.dosisAdministradas.find(x => x.name === data.name)?.value
    joinDataset.push({ name: data.name, ve: data.value, va: valueAdministradas })
  }

  return (
    <div className={styles.chartContainer} ref={elementRef}>
      {isVisible && (
        <div style={{ width: '100%', height: 450 }}>
          <ResponsiveContainer>
            <AreaChart
              data={joinDataset}
              margin={{
                top: 50,
                right: 0,
                left: 0,
                bottom: 50
              }}
            >
              <XAxis dataKey='name' tick={<CustomXTick />} />
              <YAxis
                domain={[0, 'dataMax + 1000000']}
                interval='preserveStartEnd'
                width={100}
                scale='linear'
                tick={<CustomYTick />}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type='monotone'
                dataKey='ve'
                stroke='var(--text-subtitle-color)'
                fill='var(--app-shadow-color)'
              />
              <Area
                type='monotone'
                dataKey='va'
                stroke='var(--text-subtitle-color)'
                fill='var(--graph-fill-color)'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
