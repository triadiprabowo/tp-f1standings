// define dependencies
const express = require('express'),
	bodyParser = require('body-parser'),
	compression = require('compression');

// helper constant
const app = express();
const PORT = 4000;

// express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ level: 9 }));

app.get('*.bundle.js', (req, res, next) => {
	req.url = `${req.url}.gz`;
	console.log(req.url)
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/javascript');

	next();
});

// serve static file from 'dist'
app.get('*.*', express.static('./dist', {
	maxAge: '1y'
}));

// serve static file for /dist
app.use('/dist', express.static('./dist', {
	index: false,
	maxAge: '1y'
}));

// render index page
// all request
app.get('*', (req, res) => {
	res.sendFile('index.html', { root: __dirname+'/dist' });
});

// startup express
// node.js process
app.listen(PORT, () => {
	console.log(`[START.OK]: Starting server on localhost at port ${PORT} / ${new Date()}`);
});
