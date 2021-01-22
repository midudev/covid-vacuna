import Head from 'next/head'

export default function Header ({ locale }) {
  return (
    <Head>
      <html lang={locale} />
      <link rel='alternate icon' href='https://covid-vacuna.app/vacuna.png' type='image/png' />
      <link rel='icon' href='/favicon.ico' />
      <title>Estado y progreso vacunación COVID-19 España 2021</title>
      <meta name='theme-color' content='#d2effd' />
      <meta
        name='description'
        content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno'
      />
      <meta property='og:locale' content='es_ES' />
      <meta property='og:type' content='website' />

      <meta property='og:title' content='Estado y progreso vacunación COVID-19 España 2021' />
      <meta property='og:image' content='https://covid-vacuna.vercel.app/og.png' />
      <meta property='og:description' content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno' />
      <meta property='og:site_name' content='Estado vacunación en España' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='midudev' />
      <meta name='twitter:description' content='Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno' />
      <meta name='twitter:image' content='https://covid-vacuna.vercel.app/og.png' />
      <meta name='twitter:site' content='midudev' />
      <meta name='twitter:title' content='Estado y progreso vacunación COVID-19 España 2021' />
      <meta property='twitter:domain' content='covid-vacuna.vercel.app' />
      <meta property='twitter:url' content='https://covid-vacuna.vercel.app/' />

      <link rel='canonical' href='https://covid-vacuna.app' />
      <script src='https://cdn.usefathom.com/script.js' data-site='MYEXKUNW' defer />
    </Head>
  )
};
