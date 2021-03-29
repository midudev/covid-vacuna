// next.config.js
const withPWA = require('next-pwa')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  future: {
    webpack5: true,
    strictPostcssConfiguration: true
  },
  i18n: {
    localeDetection: false,
    locales: ['es', 'ca', 'gl', 'eu'],
    defaultLocale: 'es'
  }
}

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
], nextConfig)
