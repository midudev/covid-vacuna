// next.config.js
const withPWA = require('next-pwa')
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

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
  [withBundleAnalyzer],
  [
    withPWA,
    {
      pwa: {
        disable: process.env.NODE_ENV === 'development',
        dest: 'public',
        buildExcludes: ['/data/*.json', '/data/*.obs'],
        publicExcludes: ['/data/*.json', '/data/*.obs']
      }
    }
  ]
], nextConfig)
