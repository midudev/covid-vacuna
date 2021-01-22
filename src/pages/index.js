import Header from 'layouts/Header'
import Title from 'layouts/Title'
import Footer from 'layouts/Footer'
import Distribuidas from 'components/Dosis/Distribuidas'
import Completadas from 'components/Dosis/Completadas'
import Administradas from 'components/Dosis/Administradas'
import Download from 'components/Download'
import Progress from 'components/Progress'
import Share from 'components/Share'
import Table from 'components/Table'
import Changelog from 'components/Changelog'

import styles from 'styles/Home.module.css'

export default function Home ({ data, info }) {
  const totals = data.find(({ ccaa }) => ccaa === 'Totales')
  const locale = 'es' // get from context later

  return (
    <>
      <div className={styles.container}>
        <Header locale={locale} />
        <main className={styles.main}>
          <Title styles={styles} info={info} />

          <div className={styles.grid}>
            <Distribuidas totals={totals} styles={styles} />
            <Administradas totals={totals} styles={styles} />
            <Completadas totals={totals} styles={styles} />
          </div>

          <Progress data={data} />

          <Download styles={styles} />
        </main>

        <h2 className={styles.subtitle}>
          Por comunidades autónomas
        </h2>

        <Table data={data} />

        <h2 className={styles.subtitle}>Fuentes de datos y enlaces de interés</h2>
        <ul>
          <li><a target='_blank' rel='noreferrer' href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm'>Estrategia de Vacunación COVID-19 en España</a></li>
          <li><a target='_blank' rel='noreferrer' href='https://www.vacunacovid.gob.es'>Información oficial sobre la vacunación contra el nuevo coronavirus</a></li>
        </ul>
        
      </div>

      <dialog id='vacunas-distribuidas-dialog'>
        <h2>Sobre las vacunas distribuidas</h2>
        <p>Las vacunas distribuidas...</p>
      </dialog>

      <Share />

      <Footer />
    </>
  )
}

export async function getStaticProps () {
  const data = require('../../public/data/latest.json')
  const info = require('../../public/data/info.json')

  return {
    props: {
      data,
      info
    }
  }
}
