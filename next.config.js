// next.config.js
const withPWA = require('next-pwa')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([
  [
    withImages,
    {
      images: {
        domains: ['avatars.githubusercontent.com']
      }
    }
  ],
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public'
      }
    }
  ]
], {
  i18n: {
    localeDetection: false,
    locales: ['es', 'ca', 'gl', 'eu'],
    defaultLocale: 'es'
  }
})
