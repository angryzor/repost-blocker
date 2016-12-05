const platform = 'chrome'

const path = require('path')
const platformPath = `platform/${platform}`

module.exports = {
	entry: {
		content: './src/content.jsx',
		background: './src/background.jsx'
	},
	output: {
		filename: `build/${platform}/[name].js`
	},
	resolve: {
		extensions: [".js", ".json", ".jsx"],
		modules: ['node_modules', platformPath],
		alias: {
			'react': 'preact-compat',
			'react-dom': 'preact-compat'
		}
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			include: [
				path.resolve(__dirname, 'src'),
				path.resolve(__dirname, platformPath),
				path.resolve(__dirname, 'node_modules/preact-compat/src/index.js')
			],
			loader: 'babel-loader',
			options: {
				presets: ['es2015', 'es2016', 'es2017'],
				plugins: [
					'transform-react-jsx',
					'transform-react-display-name',
					'transform-object-rest-spread',
					'transform-runtime'
				]
			}
		}]
	}
}