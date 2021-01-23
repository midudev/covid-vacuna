export const LOCALE = (() => {
  const locales = {
    es: {
      short: 'es',
      long: 'es-ES'
    }
  }

  return {
    DEFAULT: locales.es.short,
    DEFAULT_LONG: locales.es.long
  }
})()
