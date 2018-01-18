/* This is NOT for actual production use. This is just useful for hosting
the minified production build for local debugging purposes */

/* ES6 Import Syntax */
import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression'

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression()); //enable gzip compression in express
app.use(express.static('dist')); //Tells express to serve static files in the dist directory

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/* Removed this section because we are now hitting production API on Heroku instead of localhost
app.get('/users', function(req, res) {
	// Hard coding for simplicity. Pretend this hits a real database
	res.json([
		{"id": 1, "firstName": "Bob", "lastName": "Smith", "email":"bob@gmail.com"},
		{"id": 2, "firstName": "Tammy", "lastName": "Norton", "email":"tnorton@yahoo.com"},
		{"id": 3, "firstName": "Dustin", "lastName": "Page", "email":"dustin@test.com"}
	]);
});
*/

app.listen(port, function (err) {
	if (err) {
		console.log(err);
	} else {
		open('http://localhost:' + port);
	}
});
