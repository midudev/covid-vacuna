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

  const fields = Object.keys(dataset[0])
    .filter(item => !['name']
      .includes(item))

  const coloresAleatorios = ['red', 'blue', 'brown', '#d2effd']

  const getRandomColor = coloresAleatorios[Math.floor(Math.random() * coloresAleatorios.length)]

  return (
    <div className={styles.chartContainer} ref={elementRef}>
      {isVisible && (
        <div style={{ width: '100%', height: 450 }}>
          <ResponsiveContainer>
            <AreaChart
              data={dataset}
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
              {fields.map((field, index) => {
                return (
                  <Area
                    type='monotone'
                    key={`area-${index}`}
                    dataKey={field}
                    stroke='var(--text-subtitle-color)'
                    fill={getRandomColor}
                  />
                )
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
