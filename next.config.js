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
  async headers () {
		return [
			{
				source: '/fonts/inter/var.woff2',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable'
					}
				]
			}
		]
	}
})
