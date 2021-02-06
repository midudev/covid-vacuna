import { useState, useEffect } from 'react'
import { useTranslate } from 'hooks/useTranslate'

import Image from 'next/image'

import styles from 'styles/DownloadData.module.css'

const reports = require('../public/data/reports.json')

export default function DownloadData (props) {
  const translate = useTranslate()

  const lastReportName = reports.sort()[reports.length - 1]
  const [dataFileName, setdataFileName] = useState(lastReportName)

  const valueSearchFileName = props.valueSearch

  useEffect(() => {
    if (valueSearchFileName) {
      setdataFileName(valueSearchFileName)
    }
  })

  const dataFilePath = `../data/${dataFileName}.json`

  return (
    <a className={styles.download} download href={dataFilePath}>
      <Image
        width={32}
        height={32}
        src='/download.png'
        alt={translate.home.alt.descargarDatos}
      />
      {translate.home.descargarDatosJSON}
    </a>
  )
}
