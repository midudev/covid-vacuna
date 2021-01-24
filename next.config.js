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
  webpack: (config, { dev, isServer }) => {
		// replace React with Preact only in client production build
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat'
			})
		}

		return config
	}
})
