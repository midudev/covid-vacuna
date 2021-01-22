import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class _Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang='es'>
        <Head>
          <link
            rel='preload'
            href='/fonts/inter/var.woff2'
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
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
