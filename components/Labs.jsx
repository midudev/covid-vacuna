import Image from 'next/image'
import NumberDigits from './NumberDigits.jsx'
import { useTranslate } from 'hooks/useTranslate'
import styles from 'styles/Home.module.css'

const LABS = {
  pfizer: {
    dataFrom: 'dosisEntregadasPfizer'
  },
  astrazeneca: {
    dataFrom: 'dosisEntregadasAstrazeneca'
  },
  moderna: {
    dataFrom: 'dosisEntregadasModerna'
  },
  janssen: {
    dataFrom: 'dosisEntregadasJanssen'
  }
}

const Lab = ({ alt, labKey, dosisEntregadas }) => (
  <small>
    <Image
      alt={alt}
      className={styles.companyLogo}
      src={`/${labKey}-logo.png`}
      height={29}
      width={72}
      priority
      objectFit='contain'
    />
    <span>
      {isNaN(dosisEntregadas)
        ? 'Desconocido'
        : <NumberDigits>{dosisEntregadas}</NumberDigits>}
    </span>
  </small>
)

export const Labs = ({ totals }) => {
  const translate = useTranslate()

  return (
    <>
      {
        Object.entries(LABS).map(([labKey, { dataFrom }]) => {
          const alt = translate.home.alt[`${labKey}Logo`]
          const dosisEntregadas = totals[dataFrom]
          return (
            <Lab
              key={labKey}
              labKey={labKey}
              alt={alt}
              dosisEntregadas={dosisEntregadas}
            />
          )
        })
      }
    </>
  )
}
