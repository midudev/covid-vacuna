/* global fetch */
import { useMemo, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Contributors from 'components/Contributors.jsx'
import Footer from 'components/Footer.jsx'
import NumberDigits from 'components/NumberDigits'
import NumberPercentage from 'components/NumberPercentage.jsx'
import Progress from 'components/Progress.jsx'
import I18nWidget from 'components/I18nWidget.jsx'
import Share from 'components/Share.jsx'
import Table from 'components/Table.jsx'
import SchemeColorSwitcher from 'components/SchemeColorSwitcher'

import styles from 'styles/Home.module.css'
import TimeAgo from 'components/TimeAgo.jsx'

import ProgressChart from 'components/ProgressChart'
import {
  DosisAdministradasTooltip,
  DosisEntregadasTooltip
} from 'components/ProgressChart/tooltips'
import normalizeChartData from 'components/ProgressChart/utils/normalize-data'
import { useTranslate } from 'hooks/useTranslate'

export default function Home ({ contributors, data, info, chartDatasets }) {
  const [filter, setFilter] = useState('Totales')
  const translate = useTranslate()

  const totals = useMemo(
    () => data.find(({ ccaa }) => ccaa === filter),
    [data, filter]
  )

  return (
    <>
      <Head>
        <link
          rel='alternate icon'
          href='https://covid-vacuna.app/vacuna.png'
          type='image/png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#d2effd' />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            {translate.home.tituloPricipal} {filter === 'Totales' ? 'España' : filter}
          </h1>
          <small className={styles.description}>
            {translate.home.datosActualizados} <TimeAgo timestamp={info.lastModified} />.
            {' '}{translate.home.fuente}{' '}
            <a href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm'>
              {translate.home.ministerioDeSanidad}
            </a>
          </small>

          <div className={styles.grid}>
            <div className={styles.card}>
              <button
                title='Abrir diálogo con explicación sobre Dosis Distribuidas'
                onClick={() => {}}
              >
                ❔
              </button>

              <header>
                <Image
                  className={styles.cardImage}
                  src='/mapa.png'
                  alt={translate.home.alt.vacunasDistribuidas}
                  width={150}
                  height={150}
                  priority
                />
              </header>
              <section>
                <div>
                  <h3>{translate.terminos.dosisDistribuidas}</h3>
                  <p>
                    <NumberDigits>{totals.dosisEntregadas}</NumberDigits>
                  </p>
                </div>
                <div>
                  <small>
                    <Image
                      alt={translate.home.alt.pfizerLogo}
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
                      alt={translate.home.alt.modernaLogo}
                      className={styles.companyLogo}
                      src='/moderna-logo.png'
                      height={16.5}
                      width={72}
                      priority
                    />
                    <span>
                      <NumberDigits>
                        {totals.dosisEntregadasModerna}
                      </NumberDigits>
                    </span>
                  </small>
                </div>
              </section>
            </div>

            <div className={styles.card}>
              <header>
                <Image
                  src='/vacuna.png'
                  alt={translate.home.alt.vacunasAdministradas}
                  width={150}
                  height={150}
                  priority
                />
              </header>
              <section>
                <div>
                  <h3>{translate.terminos.dosisAdministradas}</h3>
                  <p>
                    <NumberDigits>{totals.dosisAdministradas}</NumberDigits>
                  </p>
                </div>
                <div>
                  <h4>{translate.terminos.sobreDistribuidas}</h4>
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
                  alt={translate.home.alt.dosisCompletas}
                  width={150}
                  height={150}
                  priority
                />
              </header>
              <section>
                <div>
                  <h3>{translate.terminos.personasConPautaCompleta}</h3>
                  <p>
                    <NumberDigits>{totals.dosisPautaCompletada}</NumberDigits>
                  </p>
                </div>
                <div>
                  <h4>{translate.terminos.sobreAdministradas}</h4>
                  <p className={styles.secondary}>
                    <NumberPercentage>
                      {totals.dosisPautaCompletada / totals.dosisAdministradas}
                    </NumberPercentage>
                  </p>
                </div>
              </section>
            </div>
          </div>

          <Progress totals={totals} />

          <a className={styles.download} download href='/data/latest.json'>
            <Image
              width={32}
              height={32}
              src='/download.png'
              alt={translate.home.alt.descargarDatos}
            />
            {translate.home.descargarDatosJSON}
          </a>

          <Link href='/como-incrustar'>
            <a className={styles.download}>
              <Image
                width={32}
                height={32}
                src='/embed.png'
                alt={translate.home.alt.incrustarDatos}
              />
              {translate.home.incrustarDatos}
            </a>
          </Link>
        </main>

        <h2 className={styles.subtitle}>{translate.home.porComunidadesAutonomas}</h2>

        <Table data={data} filter={filter} setFilter={setFilter} />

        <h2 className={styles.subtitle}>{translate.home.evolucionDosisEntregadas}</h2>

        <ProgressChart
          dataset={chartDatasets.dosisEntregadas}
          tooltip={DosisEntregadasTooltip}
        />

        <h2 className={styles.subtitle}>{translate.home.evolucionDosisAdministradas}</h2>

        <ProgressChart
          dataset={chartDatasets.dosisAdministradas}
          tooltip={DosisAdministradasTooltip}
        />

        <h2 className={styles.subtitle}>
          {translate.home.fuenteDatosEnlacesInteres}
        </h2>
        <ul>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm'
            >
              {translate.home.fuente1}
            </a>
          </li>
          <li>
            <a
              target='_blank'
              rel='noreferrer'
              href='https://www.vacunacovid.gob.es'
            >
              {translate.home.fuente2}
            </a>
          </li>
        </ul>

        <h2 className={styles.subtitle}>{translate.home.changelog}</h2>
        <ul>
          <li>
            <strong>1.5.0</strong>: {translate.home.changelog5}{' '}
            <span aria-label={translate.home.alt.graficaSubiendo} role='img'>
              📈
            </span>{' '}
            {translate.home['changelog5.1']}{' '}
            <span aria-label={translate.home.alt.emojiCiclista} role='img'>
              🚵‍♀️
            </span>
          </li>
          <li>
            <strong>1.4.0</strong>: {translate.home.changelog4}{' '}
            <span aria-label={translate.home.alt.globoMundo} role='img'>
              🌐
            </span>
          </li>
          <li>
            <strong>1.3.0</strong>: {translate.home.changelog3}{' '}
            <span aria-label={translate.home.alt.luna} role='img'>
              🌚
            </span>
          </li>
          <li>
            <strong>1.2.0</strong>: {translate.home.changelog2}{' '}
            <span aria-label={translate.home.alt.globoTerricola} role='img'>
              🌎
            </span>
          </li>
          <li>
            <strong>1.1.0</strong>: {translate.home.changelog1}{' '}
            <span aria-label={translate.home.alt.jeringuilla} role='img'>
              💉
            </span>
          </li>
          <li>
            <strong>1.0.0</strong>: {translate.home.changelog0}{' '}
            <span aria-label={translate.home.alt.fuego} role='img'>
              🔥
            </span>
          </li>
        </ul>

        <h2 className={styles.subtitle}>{translate.home.enLosMedios}</h2>
        <ul>
          <li>
            <a
              className={styles.news}
              target='_blank'
              rel='noreferrer'
              href='https://www.20minutos.es/noticia/4552926/0/lanzan-una-web-con-datos-del-gobierno-que-permite-ver-como-avanza-en-espana-la-vacunacion-contra-el-coronavirus/'
            >
              {translate.home.medio1}
            </a>
          </li>
          <li>
            <a
              className={styles.news}
              target='_blank'
              rel='noreferrer'
              href='https://www.meneame.net/m/actualidad/web-revisar-estado-progreso-vacunacion-covid-19-espana'
            >
              {translate.home.medio2}
            </a>
          </li>
        </ul>

        <h2 className={styles.subtitle}>{translate.home.contribuidores}</h2>
        <Contributors contributors={contributors} />
      </div>

      <dialog id='vacunas-distribuidas-dialog'>
        <h2>Sobre las vacunas distribuidas</h2>
        <p>Las vacunas distribuidas...</p>
      </dialog>

      <SchemeColorSwitcher />

      <I18nWidget />

      <Share />

      <Footer />
    </>
  )
}

export async function getStaticProps () {
  const data = require('../public/data/latest.json')
  const info = require('../public/data/info.json')
  const contributors = await fetch('https://api.github.com/repos/midudev/covid-vacuna/contributors')
    .then(res => res.json())
    .then(json =>
      json.map(
        ({ login, avatar_url: avatar, html_url: url }) => ({ login, avatar, url })
      )
    ).catch(() => [])

  const chartDatasets = normalizeChartData()

  return {
    props: {
      data,
      info,
      chartDatasets,
      contributors
    }
  }
}
