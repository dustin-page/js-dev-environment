/* CommonJS Import Syntax that Node supports natively
var express = require('express');
var path = require('path');
var open = require('open');
*/

/* ES6 Import Syntax */
import express from 'express';
import path from 'path';
import open from 'open';

/* Configure Webpack to serve up bundle.js file */
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

/* app.use method tels Express other things we'd like to use */
app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function (err) {
	if (err) {
		console.log(err);
	} else {
		open('http://localhost:' + port);
	}
});
