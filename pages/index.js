import Head from 'next/head'
import Table from 'components/Table.jsx'
import styles from 'styles/Home.module.css'
import NumberDigits from 'components/NumberDigits'
import data from 'data/latest.json'
import NumberPercentage from 'components/NumberPercentage.jsx'

const totales = data.find(({ ccaa }) => ccaa === 'Totales')

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Estado y progreso vacunación COVID-19 España 2021</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Vacunación COVID-19 en España
        </h1>
        <small className={styles.description}>
          Datos actualizados a <date>15 de enero de 2021</date>
        </small>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div>
              <h3>Dosis distribuidas</h3>
              <p>
                <NumberDigits>{totales.dosisEntregadas}</NumberDigits>
              </p>
            </div>
            <div>
              <small>
                <img className={styles.companyLogo} src='pfizer-logo.png' />
                <NumberDigits>
                  {totales.dosisEntregadasPfizer}
                </NumberDigits>
              </small>
              <small>
                <img className={styles.companyLogo} src='moderna-logo.png' />{totales.dosisEntregadasModerna}
              </small>
            </div>
          </div>

          <div className={styles.card}>
            <div>
              <h3>Dosis administradas</h3>
              <p>
                <NumberDigits>{totales.dosisAdministradas}</NumberDigits>
              </p>
            </div>
            <div>
              <h4>% sobre distribuidas</h4>
              <p className={styles.secondary}>
                <NumberPercentage>
                  {totales.porcentajeEntregadas}
                </NumberPercentage>
              </p>
            </div>
          </div>
        </div>

        <h1 className={styles.subtitle}>
          Por comunidades autónomas
        </h1>
        <Table />
      </main>

      <footer className={styles.footer}>
        <a
          href='https://midu.dev'
          target='_blank'
          rel='noreferrer'
        >
          Desarrollado por{' '}
          <img src='https://midu.dev/logo.png' alt='midudev' className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
