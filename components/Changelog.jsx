import { useTranslate } from 'hooks/useTranslate'

export default function Changelog () {
  const { home } = useTranslate()

  return (
    <ul>
      <li>
        <strong>1.5.0</strong>: {home.changelog5}{' '}
        <span aria-label={home.alt.graficaSubiendo} role='img'>
          📈
        </span>{' '}
        {home['changelog5.1']}{' '}
        <span aria-label={home.alt.emojiCiclista} role='img'>
          🚵‍♀️
        </span>
      </li>
      <li>
        <strong>1.4.0</strong>: {home.changelog4}{' '}
        <span aria-label={home.alt.globoMundo} role='img'>
          🌐
        </span>
      </li>
      <li>
        <strong>1.3.0</strong>: {home.changelog3}{' '}
        <span aria-label={home.alt.luna} role='img'>
          🌚
        </span>
      </li>
      <li>
        <strong>1.2.0</strong>: {home.changelog2}{' '}
        <span aria-label={home.alt.globoTerricola} role='img'>
          🌎
        </span>
      </li>
      <li>
        <strong>1.1.0</strong>: {home.changelog1}{' '}
        <span aria-label={home.alt.jeringuilla} role='img'>
          💉
        </span>
      </li>
      <li>
        <strong>1.0.0</strong>: {home.changelog0}{' '}
        <span aria-label={home.alt.fuego} role='img'>
          🔥
        </span>
      </li>
    </ul>
  )
}
