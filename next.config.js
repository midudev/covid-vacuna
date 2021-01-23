module.exports = {
	images: {
		domains: ['avatars.githubusercontent.com']
	},
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
}