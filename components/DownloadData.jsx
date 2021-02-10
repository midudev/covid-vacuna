import { useTranslate } from 'hooks/useTranslate'

import Image from 'next/image'

import styles from 'styles/DownloadData.module.css'

export default function DownloadData (props) {
  const translate = useTranslate()
  const dataFilePath = `../data/${props.valueSearch}.json`

  const normalizedDate = (date) => {
    let dateFormat = ''
    for (let i = 0; i < date.length; i++) {
      dateFormat = dateFormat + date[i]
      if (i === 3) {
        dateFormat = dateFormat + '/'
      } if (i === 5) {
        dateFormat = dateFormat + '/'
      }
    }
    return dateFormat
  }

  return (
    <a className={styles.download} download href={dataFilePath}>
      <Image
        width={32}
        height={32}
        src='/download.png'
        alt={translate.home.alt.descargarDatos}
      />
      {translate.home.descargarDatosJSON} ({normalizedDate(props.valueSearch)})
    </a>
  )
}
