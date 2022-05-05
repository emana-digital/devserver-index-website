const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevMode ? 'development' : 'production',
	devtool: isDevMode ? 'inline-source-map' : 'source-map',
	entry: {
		website: resolve(__dirname, 'resources/assets')
	},
	output: {
		path: resolve(__dirname, 'public/assets'),
		filename: isDevMode ? 'js/[name].js' : 'js/[name].[chunkhash].js',
		chunkFilename: isDevMode ? 'js/[name].chunk.js' : 'js/[name].chunk.[chunkhash].js',
		publicPath: isDevMode ? 'http://localhost:3030/assets/' : '/assets/'
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin()],
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	optimization: {
		splitChunks: {
			chunks: 'all'
		}
	},
	devServer: {
		static: {
			directory: resolve(__dirname, 'public')
		},
		host: '0.0.0.0',
		port: 3030,
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				enforce: 'pre',
				loader: 'source-map-loader'
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					cacheDirectory: true
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
					{ loader: 'postcss-loader', options: { sourceMap: true } },
					{ loader: 'resolve-url-loader', options: { sourceMap: true } },
					{ loader: 'sass-loader', options: { sourceMap: true } }
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {
					name: isDevMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
					outputPath: 'images'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				exclude: /node_modules/,
				loader: 'file-loader',
				options: {
					name: isDevMode ? '[name].[ext]' : '[name].[contenthash].[ext]',
					outputPath: 'fonts'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: isDevMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
			chunkFilename: isDevMode ? '[name].chunk.css' : '[name].[contenthash].chunk.css'
		}),
		new AssetsPlugin({
			manifestFirst: true,
			useCompilerPath: true,
			fullPath: true,
			includeAllFileTypes: true,
			keepInMemory: false,
			entrypoints: true,
			filename: 'assets.json'
		}),
		isDevMode && new ReactRefreshWebpackPlugin()
	].filter(Boolean)
};
