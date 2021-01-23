import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Footer from 'components/Footer.jsx'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage.jsx'
import Progress from 'components/Progress.jsx'
import Share from 'components/Share.jsx'
import Table from 'components/Table.jsx'
import SchemeColorSwitcher from 'components/SchemeColorSwitcher'

import styles from 'styles/Home.module.css'
import TimeAgo from 'components/TimeAgo.jsx'
import { Term } from 'components/Term'

import ProgressChart from 'components/ProgressChart'
import {
  DosisAdministradasTooltip,
  DosisEntregadasTooltip
} from 'components/ProgressChart/tooltips'
import normalizeChartData from 'components/ProgressChart/utils/normalize-data'

export default function Home ({ data, info, chartDatasets }) {
  const totals = data.find(({ ccaa }) => ccaa === 'Totales')

  return (
    <>
      <Head>
        <link rel='alternate icon' href='https://covid-vacuna.app/vacuna.png' type='image/png' />
        <meta name='theme-color' content='#d2effd' />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Vacunación COVID-19 en España
          </h1>
          <small className={styles.description}>
            Datos actualizados <TimeAgo timestamp={info.lastModified} />. Fuente: <a href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm'>Gobierno de España</a>
          </small>

          <div className={styles.grid}>
            <div className={styles.card}>
              <Term title='Abrir diálogo con explicación sobre Dosis Distribuidas'>
                lorem <strong>ipsum</strong> dolor sit amet
              </Term>

              <header>
                <Image
                  className={styles.cardImage}
                  src='/mapa.png'
                  alt='Vacunas distribuidas en España'
                  width={150}
                  height={150}
                  priority
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
                      priority
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
                      priority
                    />
                    <span>
                      <NumberDigits>{totals.dosisEntregadasModerna}</NumberDigits>
                    </span>
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
                  priority
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
                  priority
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

          <Progress data={data} />

          <a className={styles.download} download href='/data/latest.json'>
            <Image
              width={32}
              height={32}
              src='/download.png'
              alt='Descargar datos'
            />
            Descargar últimos datos en formato JSON
          </a>

          <Link href='/como-incrustar'>
            <a className={styles.download}>
              <Image
                width={32}
                height={32}
                src='/embed.png'
                alt='Incrustar datos en una página web'
              />
              Quiero incrustar los datos de vacunación en otra página web
            </a>
          </Link>
        </main>
        <h2 className={styles.subtitle}>
          Por comunidades autónomas
        </h2>

        <Table data={data} />

        <h2 className={styles.subtitle}>
          Dosis entregadas totales
        </h2>

        <ProgressChart dataset={chartDatasets.dosisEntregadas} tooltip={DosisEntregadasTooltip} />

        <h2 className={styles.subtitle}>
          Dosis administradas totales
        </h2>

        <ProgressChart dataset={chartDatasets.dosisAdministradas} tooltip={DosisAdministradasTooltip} />

        <h2 className={styles.subtitle}>Fuentes de datos y enlaces de interés</h2>
        <ul>
          <li><a target='_blank' rel='noreferrer' href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm'>Estrategia de Vacunación COVID-19 en España</a></li>
          <li><a target='_blank' rel='noreferrer' href='https://www.vacunacovid.gob.es'>Información oficial sobre la vacunación contra el nuevo coronavirus</a></li>
        </ul>

        <h2 className={styles.subtitle}>
          Changelog
        </h2>
        <ul>
          <li>
            <strong>1.4.0</strong>: Añadida la posibilidad de incrustar los datos en otra página <span aria-label='Globo del mundo con meridianos' role='img'>🌐</span>
          </li>
          <li>
            <strong>1.3.0</strong>: Añadido modo oscuro a la app <span aria-label='Luna' role='img'>🌚</span>
          </li>
          <li>
            <strong>1.2.0</strong>: Añadida barra de progreso de vacunación en población <span aria-label='Globo terrícola con vistas a América' role='img'>🌎</span>
          </li>
          <li>
            <strong>1.1.0</strong>: Añadidas personas con pauta completa <span aria-label='Jeringuilla' role='img'>💉</span>
          </li>
          <li>
            <strong>1.0.0</strong>: Primera versión <span aria-label='Fuego' role='img'>🔥</span>
          </li>
        </ul>

        <h2 className={styles.subtitle}>
          En los medios
        </h2>
        <ul>
          <li><a target='_blank' rel='noreferrer' href='https://www.20minutos.es/noticia/4552926/0/lanzan-una-web-con-datos-del-gobierno-que-permite-ver-como-avanza-en-espana-la-vacunacion-contra-el-coronavirus/'>Lanzan una web con datos del Gobierno que permite ver cómo avanza en España la vacunación contra el coronavirus (20 Minutos)</a></li>
          <li><a target='_blank' rel='noreferrer' href='https://www.meneame.net/m/actualidad/web-revisar-estado-progreso-vacunacion-covid-19-espana'>Web para revisar el estado y progreso de la vacunación del COVID-19 en España (Menéame)</a></li>
        </ul>
      </div>

      <dialog id='vacunas-distribuidas-dialog'>
        <h2>Sobre las vacunas distribuidas</h2>
        <p>Las vacunas distribuidas...</p>
      </dialog>

      <SchemeColorSwitcher />

      <Share />

      <Footer />
    </>
  )
}

export async function getStaticProps () {
  const data = require('../public/data/latest.json')
  const info = require('../public/data/info.json')

  const chartDatasets = normalizeChartData()

  return {
    props: {
      data,
      info,
      chartDatasets
    }
  }
}
