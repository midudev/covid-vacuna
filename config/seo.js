import { LOCALE } from '@config/locale'

// global SEO config
const title = 'Estado y progreso vacunación COVID-19 España 2021'
const description =
  'Consulta el estado y progreso de la vacunación del COVID-19 de forma diaria según datos del gobierno.'

const SEO = {
  title,
  description,
  canonical: 'https://covid-vacuna.app',
  openGraph: {
    type: 'website',
    locale: LOCALE.DEFAULT_LONG,
    url: 'https://covid-vacuna.app',
    title,
    description,
    images: [
      {
        url: 'https://covid-vacuna.app/og.png',
        alt: title,
        width: 1200,
        height: 627
      }
    ]
  },
  twitter: {
    handle: '@midudev',
    site: '@midudev',
    cardType: 'summary_large_image'
  }
}

export default SEO
