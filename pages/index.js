import Head from 'next/head'

import Footer from 'components/Footer.jsx'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage.jsx'
import Table from 'components/Table.jsx'

import styles from 'styles/Home.module.css'
import TimestampToDate from 'components/TimestampToDate.jsx'

export default function Home ({ data, info }) {
  const totals = data.find(({ ccaa }) => ccaa === 'Totales')

  return (
    <div className={styles.container}>
      <Head>
        <title>Estado y progreso vacunación COVID-19 España 2021</title>
        <link rel='icon' href='/favicon.ico' />
        <script src='https://cdn.usefathom.com/script.js' data-site='MYEXKUNW' defer />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Vacunación COVID-19 en España
        </h1>
        <small className={styles.description}>
          Datos actualizados a <TimestampToDate timestamp={info.lastModified} />
        </small>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div>
              <h3>Dosis distribuidas</h3>
              <p>
                <NumberDigits>{totals.dosisEntregadas}</NumberDigits>
              </p>
            </div>
            <div>
              <small>
                <img className={styles.companyLogo} src='pfizer-logo.png' />
                <NumberDigits>
                  {totals.dosisEntregadasPfizer}
                </NumberDigits>
              </small>
              <small>
                <img className={styles.companyLogo} src='moderna-logo.png' />{totals.dosisEntregadasModerna}
              </small>
            </div>
          </div>

          <div className={styles.card}>
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
          </div>
        </div>

        <h1 className={styles.subtitle}>
          Por comunidades autónomas
        </h1>
        <Table />
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps () {
  const data = require('../data/latest.json')
  const info = require('../data/info.json')

  return {
    props: {
      data,
      info
    }
  }
}
