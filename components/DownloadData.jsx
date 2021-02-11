import Image from 'next/image'
import { useTranslate } from 'hooks/useTranslate'
import { useLocale } from 'hooks/useLocale'
import formatDate from 'services/formatDateFromReport'
import styles from 'styles/DownloadData.module.css'

export default function DownloadData ({ valueSearch }) {
  const translate = useTranslate()
  const { locale } = useLocale()
  const dataFilePath = `../data/${valueSearch}.json`

  const date = valueSearch ? `(${formatDate({ locale, value: valueSearch })})` : ''

  return (
    <a className={styles.download} download href={dataFilePath}>
      <Image
        width={32}
        height={32}
        src='/download.png'
        alt={translate.home.alt.descargarDatos}
      />
      {translate.home.descargarDatosJSON}{date}
    </a>
  )
}
