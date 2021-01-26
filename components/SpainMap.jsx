import { geoEqualEarth, geoPath } from 'd3-geo'
import { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { feature } from 'topojson-client'
import NumberPercentage from './NumberPercentage'
import styles from 'styles/Map.module.css'
import spainMapa from 'public/maps/spain.json'

const projection = geoEqualEarth()
  .scale(2500)
  .translate([500, 2150])

const SpainMap = ({ data }) => {
  const [geoFile, setGeoFile] = useState([])
  const [content, setContent] = useState([])

  useEffect(() => {
    const object = feature(spainMapa, spainMapa.objects.ESP_adm1).features
    object.forEach(element => {
      data.map(el => {
        if (el.ccaa === element.properties.NAME) {
          element.properties.porcentaje = el.porcentajeEntregadas
        }
        return true
      })
    })
    setGeoFile(object)
  }, [])

  const colorearMapa = porcentaje => {
    if (porcentaje) {
      const resultado = porcentaje >= 0.95 ? '#2c7cdc' : (porcentaje >= 0.90 ? '#5995dd' : (porcentaje >= 0.85 ? '#80abdf' : '#a8c0e2'))
      return resultado
    }
  }

  const tooltipText = ({ NAME, porcentaje }) => {
    return (
      <div className={styles.tooltip}>
        <p>{NAME}</p>
        <p><NumberPercentage>{porcentaje}</NumberPercentage> de las distribuidas</p>
      </div>
    )
  }

  return (
    <>
      <div className={styles.container} data-tip=''>
        <svg className={styles.mapa} viewBox='0 0 800 450'>
          <g className='ESP_adm1'>
            {
                            geoFile.map((d, i) => (
                              <path
                                key={`path-${i}`}
                                d={geoPath().projection(projection)(d)}
                                className={`${styles.enabled}`}
                                fill={colorearMapa(d.properties.porcentaje)}
                                stroke='#FFFFFF'
                                strokeWidth={0.5}
                                onMouseEnter={() => {
                                  setContent(tooltipText(d.properties))
                                }}
                                onMouseLeave={() => {
                                  setContent('')
                                }}
                              />
                            ))
                        }
          </g>
        </svg>
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    </>
  )
}

export default SpainMap
