/* Since Babel is setup to transpile JS code we can use ES6 features */

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash'; //use for cache busting
import ExtractTextPlugin from 'extract-text-webpack-plugin'; //Extract CSS into a separate file

export default {
  debug: true,
  devtool: 'source-map', //Probably want this set to 'source-map' so a separate sourcemap is created that doesn't impact the user. It is only downlaoded when dev tools is open
  noInfo: false, //Tells Webpack to display a list of files that it is bundling. Typically turn this off during development to reduce command line noise
  entry: { //Add bundle splitting
		vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index') //refers to src/index.js
	},
  target: 'web', //Target 'web' options: web | node | electron
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js' //Square brackets tells webpack to use the names in the "entry" object above to create the file names
  },
  plugins: [
		// Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),

		// Hash the files using MD5 so that their names change when the content changes.
		new WebpackMd5Hash(),

		// Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

		//Create HTML file that includes reference to bundled JS.
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true //tells webpack to inject any necessary script tags for me
		}),

		//Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),

		//Minify JS
		new webpack.optimize.UglifyJsPlugin()

	], //Optionally add plugins like hot reloading, catching errors, linting styles, etc.
  module: { //Define the file types we want Webpack to handle
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')}
    ]
  }
}

/* For Webpack 3.6 Implementation
//https://gist.github.com/coryhouse/d611e83e432f3ae65cc46ebb9b599930

import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
        debug: true,
        noInfo: false,
      })
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.css$/, loaders: ['style-loader','css-loader']}
    ]
  }
}
*/
