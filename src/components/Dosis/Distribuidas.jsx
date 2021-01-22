import Image from 'next/image'
import NumberDigits from 'utils/NumberDigits'

export default function Distribuidas ({ styles, totals }) {
  return (
    <div className={styles.card}>
      <button
        title='Abrir diálogo con explicación sobre Dosis Distribuidas' onClick={() => {}}
      >❔
      </button>

      <header>
        <Image
          className={styles.cardImage}
          src='/mapa.png'
          alt='Vacunas distribuidas en España'
          width={150}
          height={150}
        />
      </header>
      <section>
        <div>
          <h3>Dosis distribuidas</h3>
          <p>
            <NumberDigits>{totals.dosisEntregadas}</NumberDigits>
          </p>
        </div>
        <div>
          <small>
            <Image
              alt='Pfizer Logo'
              className={styles.companyLogo}
              src='/pfizer-logo.png'
              height={29}
              width={72}
            />
            <span>
              <NumberDigits>
                {totals.dosisEntregadasPfizer}
              </NumberDigits>
            </span>
          </small>
          <small>
            <Image
              alt='Moderna Logo'
              className={styles.companyLogo}
              src='/moderna-logo.png'
              height={16.5}
              width={72}
            />
            <span>
              <NumberDigits>{totals.dosisEntregadasModerna}</NumberDigits>
            </span>
          </small>
        </div>
      </section>
    </div>
  )
}