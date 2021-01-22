import Image from 'next/image'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage.jsx'

export default function Administradas ({styles, totals}) {
  return (
    <div className={styles.card}>
      <header>
        <Image
          src='/vacuna.png'
          alt='Vacunas administradas en España'
          width={150}
          height={150}
        />
      </header>
      <section>
        <div>
          <h3>Dosis administradas</h3>
          <p>
            <NumberDigits>{totals.dosisAdministradas}</NumberDigits>
          </p>
        </div>
        <div>
          <h4>% sobre distribuidas</h4>
          <p className={styles.secondary}>
            <NumberPercentage>
              {totals.porcentajeEntregadas}
            </NumberPercentage>
          </p>
        </div>
      </section>
    </div>
  )
}