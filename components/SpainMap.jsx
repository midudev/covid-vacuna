import { useState, useEffect } from 'react'
import { feature } from 'topojson-client'
import { geoEqualEarth, geoPath } from 'd3-geo'
import ReactTooltip from 'react-tooltip'
import useHasMounted from 'hooks/useHasMounted'
import { useTranslate } from 'hooks/useTranslate'

import NumberPercentage from './NumberPercentage'
import styles from 'styles/Map.module.css'
import spainMapa from 'public/maps/spain.json'
import NumberDigits from './NumberDigits'

const projection = geoEqualEarth().scale(2500).translate([500, 2100])

const SpainMap = ({ data, reportFound }) => {
  const [geoFile, setGeoFile] = useState([])
  const [content, setContent] = useState('')
  const translate = useTranslate()
  const hasMounted = useHasMounted()

  useEffect(() => {
    const object = feature(spainMapa, spainMapa.objects.ESP_adm1).features
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

  const updatePosition = ({ left, top }, node) => {
    const html = document.querySelector('html')
    if (html.getAttribute('scheme')) {
      const d = document.documentElement
      left = Math.min(d.clientWidth - node.clientWidth, left)
      top = Math.min(d.clientHeight - node.clientHeight, top)
      left = Math.max(0, left * 0.5)
      top = Math.max(0, top * 0.25)
    }
    return { top, left }
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
            {porcentajePoblacionAdministradas}
          </NumberPercentage>{' '}
          {translate.mapa.poblacionVacunada}
        </p>
        <p className={styles.tooltipSubText}>
          <NumberPercentage>{porcentajePoblacionCompletas}</NumberPercentage>{' '}
          {translate.mapa.poblacionTotalmenteVacunada}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className={`mapa ${styles.container}`} data-tip='' data-for='toolitpMap'>
        <svg className={styles.mapa} viewBox='0 0 800 450'>
          <g className='ESP_adm1'>
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
        {hasMounted && <ReactTooltip id='toolitpMap' overridePosition={({ left, top }, _currentEvent, _currentTarget, node) => updatePosition({ left, top }, node)}>{content}</ReactTooltip>}
      </div>
    </>
  )
}

export default SpainMap
