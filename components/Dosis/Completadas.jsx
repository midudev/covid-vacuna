import Image from 'next/image'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage.jsx'

export default function Completadas ({styles, totals}) {
  return (
    <div className={styles.card}>
      <header>
        <Image
          src='/vacunas-completas.png'
          alt='Dosis completas subministradas'
          width={150}
          height={150}
        />
      </header>
      <section>
        <div>
          <h3>Personas con pauta completa</h3>
          <p>
            <NumberDigits>{totals.dosisPautaCompletada}</NumberDigits>
          </p>
        </div>
        <div>
          <h4>% sobre administradas</h4>
          <p className={styles.secondary}>
            <NumberPercentage>
              {totals.dosisPautaCompletada / totals.dosisAdministradas}
            </NumberPercentage>
          </p>
        </div>
      </section>
    </div>
  )
}