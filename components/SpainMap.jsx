import { useState, useEffect } from 'react'
import { feature } from 'topojson-client'
import { geoPath } from 'd3-geo'
import { geoConicConformalSpain } from 'd3-composite-projections'
import ReactTooltip from 'react-tooltip'
import useHasMounted from 'hooks/useHasMounted'
import { useTranslate } from 'hooks/useTranslate'

import NumberPercentage from './NumberPercentage'
import styles from 'styles/Map.module.css'
import spainMap from 'public/maps/spain.json'
import canaryIslandsMap from 'public/maps/canaryIslands.json'
import NumberDigits from './NumberDigits'
import { getPartialVacunationPopulation, getCompleteVacunationPopulation } from 'services/getProgressCalculations'

const projection = geoConicConformalSpain()

const SpainMap = ({ data, reportFound }) => {
  const [geoFile, setGeoFile] = useState([])
  const [content, setContent] = useState('')
  const translate = useTranslate()
  const hasMounted = useHasMounted()

  useEffect(() => {
    const spainFeatures = feature(spainMap, spainMap.objects.ESP_adm1).features
    const canaryIslandsFeatures = feature(canaryIslandsMap, canaryIslandsMap.objects.ESP_adm2).features
    const object = [...spainFeatures, ...canaryIslandsFeatures]
    const values = reportFound !== undefined ? reportFound : data
    object.forEach((element) => {
      values.map((el) => {
        if (el.ccaa === element.properties.NAME) {
          Object.assign(element.properties, el)
        }
        return true
      })
    })

    setGeoFile(object)
  }, [reportFound])

  const coloringMap = (porcentaje) => {
    if (porcentaje) {
      const resultado =
        porcentaje >= 0.9
          ? '#00414D'
          : porcentaje >= 0.8
            ? '#00778C'
            : porcentaje >= 0.7
              ? '#0097B3'
              : porcentaje >= 0.6
                ? '#00ADCC'
                : '#00B8D9'
      return resultado
    }
  }

  const tooltipText = ({
    ccaa,
    dosisAdministradas,
    dosisEntregadas,
    dosisPautaCompletada,
    porcentajeEntregadas,
    porcentajePoblacionAdministradas,
    porcentajePoblacionCompletas
  }) => {
    return (
      <div className={styles.tooltip}>
        <p>{ccaa}</p>
        <p className={styles.tooltipSubText}>
          <NumberDigits>{dosisEntregadas}</NumberDigits> {translate.home.dosisEntregadas}
        </p>
        <p className={styles.tooltipSubText}>
          <NumberDigits>{dosisAdministradas}</NumberDigits> {translate.home.dosisAdministradas}
        </p>
        <p className={styles.tooltipSubText}>
          <NumberDigits>{dosisPautaCompletada}</NumberDigits> {translate.home.pautaCompleta}
        </p>
        <p className={styles.tooltipSubText}>
          <NumberPercentage>{porcentajeEntregadas}</NumberPercentage> {translate.mapa.sobreEntregadas}
        </p>
        <p className={styles.tooltipSubText}>
          <NumberPercentage>
            {getPartialVacunationPopulation({ porcentajePoblacionAdministradas, porcentajePoblacionCompletas })}
          </NumberPercentage>{' '}
          {translate.mapa.poblacionVacunada}
        </p>
        <p className={styles.tooltipSubText}>
          <NumberPercentage>{getCompleteVacunationPopulation({ porcentajePoblacionCompletas })}</NumberPercentage>{' '}
          {translate.mapa.poblacionTotalmenteVacunada}
        </p>
      </div>
    )
  }

  const CanaryIslandsContainer = ({ closed }) => {
    const openContainerSVGPath = 'M 120,375 L 370,375 L 400,400 L 400, 510'
    const closedContainerSVGPath = 'M 120,375 L 370,375 L 400,400 L 400, 510 L 120,510 Z'
    const containerSVGPath = closed ? closedContainerSVGPath : openContainerSVGPath
    return (
      <path
        className={`${styles.enabled}`}
        d={containerSVGPath}
        key='path-canary-islands-box'
        fillOpacity={0.0}
        stroke='#BBBBBB'
        strokeWidth={1.0}
      />
    )
  }

  return (
    <>
      <div className={`mapa ${styles.container}`} data-tip='' data-for='toolitpMap'>
        <svg className={styles.mapa} viewBox='100 0 800 520'>
          <g className='ESP_adm1'>
            <CanaryIslandsContainer closed={false} />
            {geoFile.map((d, i) => (
              <path
                className={`${styles.enabled}`}
                d={geoPath().projection(projection)(d)}
                fill={coloringMap(d.properties.porcentajeEntregadas)}
                key={`path-${i}`}
                onMouseEnter={() => setContent(tooltipText(d.properties))}
                onMouseLeave={() => setContent('')}
                stroke='#FFFFFF'
                strokeWidth={0.5}
              />
            ))}
          </g>
        </svg>
        {hasMounted && <ReactTooltip id='toolitpMap'>{content}</ReactTooltip>}
      </div>
    </>
  )
}

export default SpainMap
