// 404.js
import Head from 'next/head'
import Link from 'next/link'

export default function Custom404 () {
  return (
    <>
      <Head>
        <title>404 | covid-vacuna.app</title>
      </Head>
      <section>
        <div className='card'>
          <h1 className='title'>
            ¡Upps! 😔 No ha sido posible encontrar esta página.
          </h1>
          <Link href='/'>
            <a className='goBack'>Volvamos</a>
          </Link>
        </div>
      </section>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 0 2rem;
        }

        .card {
          background: var(--app-background-color);
          border-radius: 8px;
          border: 2px solid var(--app-border-color);
          margin: 1rem 0 3rem;
          padding: 1rem 1.5rem 2rem;
          box-shadow: var(--app-shadow-color) 14px 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .title {
          text-align: center;
        }

        .goBack {
          -webkit-align-items: center;
          align-items: center;
          color: #000;
          background: #fff;
          border-radius: 50000px;
          border: 1px solid #000;
          box-shadow: 4px 4px #92d5ff;
          display: -webkit-flex;
          display: flex;
          font-size: 0.7rem;
          font-weight: 500;
          -webkit-justify-content: center;
          justify-content: center;
          line-height: 110%;
          padding: 4px 16px;
          max-width: 100px;
        }

        .goBack:hover {
          background: rgb(210, 237, 255);
          box-shadow: none;
          transform: translate3d(4px, 4px, 0);
          transition: all 0.1s ease;
        }
      `}
      </style>
    </>
  )
}
