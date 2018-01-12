/* Since Babel is setup to transpile JS code we can use ES6 features */

import path from 'path';

export default {
  debug: true,
  devtool: 'inline-source-map', //Probably want this set to 'source-map' so a separate sourcemap is created that doesn't impact ther user. It is only downlaoded when dev tools is open
  noInfo: false, //Tells Webpack to display a list of files that it is bundling. Typically turn this off during development to reduce command line noise
  entry: [
    path.resolve(__dirname, 'src/index') //refers to src/index.js
  ],
  target: 'web', //Target 'web' options: web | node | electron
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js' //Note: Webpack won't actually generate any physical files for our development build. It will serve our build from memory! The "bundle.js" file will be created in memory and served to the browser. Need to define path and name in order to simulate the files existence.
  },
  plugins: [], //Optionally add plugins like hot reloading, catching errors, linting styles, etc.
  module: { //Define the file types we want Webpack to handle
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loaders: ['style','css']}
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
