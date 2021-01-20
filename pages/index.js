import Head from 'next/head'
import Image from 'next/image'

import Footer from 'components/Footer.jsx'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage.jsx'
import Table from 'components/Table.jsx'

import styles from 'styles/Home.module.css'
import TimeAgo from 'components/TimeAgo.jsx'

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
          Datos actualizados a <TimeAgo timestamp={info.lastModified} />
        </small>

        <div className={styles.grid}>
          <div className={styles.card}>
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
                  <img className={styles.companyLogo} src='pfizer-logo.png' />
                  <NumberDigits>
                    {totals.dosisEntregadasPfizer}
                  </NumberDigits>
                </small>
                <small>
                  <img className={styles.companyLogo} src='moderna-logo.png' />
                  <NumberDigits>{totals.dosisEntregadasModerna}</NumberDigits>
                </small>
              </div>
            </section>
          </div>

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
        </div>

        <a className={styles.download} download href='/data/latest.json'>
          <Image
            width={32}
            height={32}
            src='/download.png'
            alt='Descargar datos'
          />
          Descargar últimos datos en formato JSON
        </a>
      </main>

      <h2 className={styles.subtitle}>
        Por comunidades autónomas
      </h2>

      <Table data={data} />

      <h2>Fuentes de datos y enlaces de interés</h2>
      <ul>
        <li><a href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm'>Estrategia de Vacunación COVID-19 en España</a></li>
        <li><a href='https://www.vacunacovid.gob.es'>Información oficial sobre la vacunación contra el nuevo coronavirus</a></li>
      </ul>
      <h2 className={styles.attibutes}>
        Changelog
      </h2>
      <li>1.0.0: Primera versión</li>

      <Footer />
    </div>
  )
}

export async function getStaticProps () {
  const data = require('../public/data/latest.json')
  const info = require('../public/data/info.json')

  return {
    props: {
      data,
      info
    }
  }
}
