var http = require('http');
var fs = require('fs');
var glob = require('glob');
var mime = require('mime');

var PORT = 12306,
	SOURCE_PATH = '/example/path/**/*.css';

http.createServer(function (req, res) {
	var data = '';
	glob(SOURCE_PATH, function (err, files) {
		files.forEach(function (v, i) {
			data += fs.readFileSync(v);
		});
		res.writeHead(200, {
			'Content-Type': mime.lookup(SOURCE_PATH)
		});
		res.end(data);
	});
}).listen(PORT);