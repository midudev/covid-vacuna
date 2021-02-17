import Image from 'next/image'

import styles from '../styles/Home.module.css'

import NumberDigits from 'components/NumberDigits'

export default function Lab ({ lab }) {
  return (
    <small>
      <Image
        alt={lab.labAlt}
        className={styles.companyLogo}
        src={lab.labSrc}
        height={29}
        width={72}
        priority
      />
      <span>
        {isNaN(lab.dosisEntregadas) ? 'Desconocido' : <NumberDigits>{lab.dosisEntregadas}</NumberDigits>}
      </span>
    </small>
  )
}
