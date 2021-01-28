import { geoEqualEarth, geoPath } from 'd3-geo'
import { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import { feature } from 'topojson-client'
import NumberPercentage from './NumberPercentage'
import styles from 'styles/Map.module.css'
import spainMapa from 'public/maps/spain.json'
import NumberDigits from './NumberDigits'

const projection = geoEqualEarth()
  .scale(2500)
  .translate([500, 2100])

const SpainMap = ({ data, reportFound }) => {
  const [geoFile, setGeoFile] = useState([])
  const [content, setContent] = useState([])

  useEffect(() => {
    const object = feature(spainMapa, spainMapa.objects.ESP_adm1).features
    const values = reportFound !== undefined ? reportFound : data
    object.forEach(element => {
      values.map(el => {
        if (el.ccaa === element.properties.NAME) {
          Object.assign(element.properties, el)
        }
        return true
      })
    })
    console.log(object)
    setGeoFile(object)
  }, [reportFound])

  const coloringMap = porcentaje => {
    if (porcentaje) {
      const resultado = porcentaje >= 0.9 ? '#00414D' : (porcentaje >= 0.8 ? '#00778C' : (porcentaje >= 0.7 ? '#0097B3' : (porcentaje >= 0.6 ? '#00ADCC' : '#00B8D9')))
      return resultado
    }
  }

  const tooltipText = ({
    ccaa,
    dosisAdministradas,
    dosisEntregadas,
    dosisEntregadasModerna,
    dosisEntregadasPfizer,
    dosisPautaCompletada,
    porcentajeEntregadas,
    porcentajePoblacionAdministradas,
    porcentajePoblacionCompletas
  }) => {
    return (
      <div className={styles.tooltip}>
        <p>{ccaa}</p>
        <p className={styles.tooltipSubText}><NumberDigits>{dosisEntregadas}</NumberDigits> dosis Entregadas</p>
        <p className={styles.tooltipSubText}><NumberDigits>{dosisAdministradas}</NumberDigits> personas con primera dosis inyectada</p>
        <p className={styles.tooltipSubText}><NumberDigits>{dosisEntregadasPfizer}</NumberDigits> dosis Entregadas de Pfizer</p>
        <p className={styles.tooltipSubText}><NumberDigits>{dosisEntregadasModerna}</NumberDigits> dosis Entregadas de Moderna</p>
        <p className={styles.tooltipSubText}><NumberDigits>{dosisPautaCompletada}</NumberDigits> personas con segunda dosis inyectada</p>
        <p className={styles.tooltipSubText}><NumberPercentage>{porcentajeEntregadas}</NumberPercentage> sobre el total de entregadas</p>
        <p className={styles.tooltipSubText}><NumberPercentage>{porcentajePoblacionAdministradas}</NumberPercentage> población vacunada</p>
        <p className={styles.tooltipSubText}><NumberPercentage>{porcentajePoblacionCompletas}</NumberPercentage> población totalmente vacunada</p>
      </div>
    )
  }

  return (
    <>
      <div className={`mapa ${styles.container}`} data-tip=''>
        <svg className={styles.mapa} viewBox='0 0 800 450'>
          <g className='ESP_adm1'>
            {
                            geoFile.map((d, i) => (
                              <path
                                key={`path-${i}`}
                                d={geoPath().projection(projection)(d)}
                                className={`${styles.enabled}`}
                                fill={coloringMap(d.properties.porcentajeEntregadas)}
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
