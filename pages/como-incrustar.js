import Image from 'next/image'
import Link from 'next/link'

export default function EjemploEmbed () {
  const handleFocus = e => {
    e.currentTarget.select()
    try {
      document.execCommand('copy')
    } catch (e) {}
  }

  return (
    <>
      <section>
        <Link href='/'>
          <a>
            🡐 Volver a la página principal
          </a>
        </Link>
        <span>
          <Image
            width={64}
            height={64}
            src='/embed.png'
            alt='Incrustar datos en una página web'
          />
        </span>
        <h1>¿Cómo incrustar la información en mi página?</h1>

        <h2>Copia este código</h2>
        <textarea
          onChange={() => {}} onFocus={handleFocus} autoComplete='off' autoCapitalize='none' value='&lt;div style=&quot;position: relative; padding-bottom: 56.25%;&quot;&gt;&lt;iframe width=&quot;800&quot; height=&quot;450&quot; src=&quot;http://localhost:3000/embed&quot; frameborder=&quot;0&quot; style=&quot;position: absolute; top: 0; left: 0; width: 100%; height: 100%;&quot;/&gt;&lt;/div&gt;'
        />
        <h2>Previsualización</h2>
        <p>Así es como quedará el embed en tu página web.</p>
        <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
          <iframe width='800' height='450' src='/embed' frameBorder='0' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
        </div>

      </section>
      <style jsx>{`
        a {
          color: #444;
          margin-bottom: 3rem;
          display: inline-block;
          width: auto;
        }

        a:hover {
          color: #09f;
        }

        section {
          display: grid;
          place-content: center;
          min-height: 100vh;
          text-align: center;
        }

        textarea {
          background: #fff;
          border: 1px solid #eee;
          cursor: text;
          display: flex;
          flex-direction: column;
          font-family: Menlo, monospace;
          font-size: 1rem;
          height: auto;
          min-height: 125px;
          max-height: 500px;
          overflow-wrap: break-word;
          padding: 8px 16px;
          resize: none;
          text-align: left;
          white-space: pre-wrap;
        }

        iframe {
          border: 1px solid #ccc;
          margin: 0 auto;
        }
      `}
      </style>
    </>
  )
}
