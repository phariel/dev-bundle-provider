var http = require('http');
var fs = require('fs');
var glob = require('glob');
var mime = require('mime');

var PORT = 8080,
	ROOT_PATH = '';

var PROP_PORT = 'port',
	PROP_ROOT_PATH = 'rootPath',
	PROP_SOURCE_RULE = 'sourceRule',
	PROP_EXCLUDE_FILES = 'excludeFiles';

var configPath = __dirname + '/config.json';

if (!fs.existsSync(configPath)) {
	console.log('config.json mandatory!');
	return;
}

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));

config['port'] && (PORT = config['port']);
if (!config[PROP_SOURCE_RULE]) {
	console.log('"sourcePath" property in config.json mandatory!');
	return;
} else {
	ROOT_PATH = config[PROP_SOURCE_RULE];
}

if (config[PROP_EXCLUDE_FILES]) {
	EXCLUDE_FILES = new RegExp(config[PROP_EXCLUDE_FILES]);
}

http.createServer(function (req, res) {
	var url = req.url;
	var rules = config['rules'];
	var matchRule;
	if (rules.length) {
		rules.forEach(function (v, i) {
			if (v['url'].indexOf(url) > -1) {
				glob(v[PROP_SOURCE_RULE], function (err, files) {
					files.forEach(function (v, i) {
						if (!v.match(EXCLUDE_FILES)) {
							data += fs.readFileSync(v);
						}
					});
					res.writeHead(200, {
						'Content-Type': mime.lookup(SOURCE_PATH),
						'Cache-Control': 'no-cache, no-store, must-revalidate',
						'Pragma': 'no-cache',
						'Expires': 0
					});
					res.end(data);
				});
			}
		});
	}

	var data = '';

}).listen(PORT);
console.log('Bundle provider started at port:' + PORT);
