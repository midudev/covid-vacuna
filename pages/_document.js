import Document, { Html, Head, Main, NextScript } from 'next/document'

class _Document extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head>
          <meta httpEquiv='content-type' content='text/html' />
          <meta
            name='keywords'
            content='covid, vacuna, análisis, casos, midudev, vacunación, comunidades autónomas, covid-19, datos'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default _Document
