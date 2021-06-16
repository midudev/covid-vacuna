// next.config.js
const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')

const nextConfig = {
  webpack5: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'midu.dev']
  },
  future: {
    strictPostcssConfiguration: true
  },
  i18n: {
    localeDetection: false,
    locales: ['es', 'ca', 'gl', 'ast', 'eu'],
    defaultLocale: 'es'
  }
}

module.exports = withPlugins([
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
