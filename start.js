var http = require('http');
var fs = require('fs');
var glob = require('glob');
var mime = require('mime');
var path = require('path');
var urlObj = require('url');

var PORT = 8080,
  ROOT_PATH = '';

var PROP_PORT = 'port',
  PROP_ROOT_PATH = 'rootPath',
  PROP_SOURCE_RULE = 'sourceRule',
  PROP_EXCLUDE_FILES = 'excludeFiles',
  PROP_URL = 'url';

var configPath = __dirname + '/config.json';

if (!fs.existsSync(configPath)) {
  console.log('config.json mandatory!');
  return;
}

var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));

config['port'] && (PORT = config['port']);
if (!config[PROP_ROOT_PATH]) {
  console.log('"rootPath" property in config.json mandatory!');
  return;
} else {
  ROOT_PATH = config[PROP_ROOT_PATH];
}

http.createServer(function(req, res) {
  var url = req.url;
  var rules = config['rules'];
  var matchRule;
  if (rules.length) {
    rules.forEach(function(v, i) {
      var excludeFiles = null;
      v[PROP_EXCLUDE_FILES] && (excludeFiles = new RegExp(v[PROP_EXCLUDE_FILES]));
      if (url.indexOf(v[PROP_URL]) > -1) {
        matchRule = true;
        glob(path.join(ROOT_PATH, v[PROP_SOURCE_RULE]), function(err, files) {
          var data = '';
          files.forEach(function(v, i) {
            if (!v.match(excludeFiles)) {
              data += fs.readFileSync(v);
            }
          });
          res.writeHead(200, {
            'Content-Type': mime.lookup(url),
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0
          });
          res.end(data);
        });
      }
    });
  }

  if (!matchRule) {
    var pathName = urlObj.parse(url).pathname;
    var file = path.join(ROOT_PATH, pathName);
    if (fs.existsSync(file)) {
      res.writeHead(200, {
        'Content-Type': mime.lookup(pathName),
        'Access-Control-Allow-Origin': '*'
      });
      res.end(fs.readFileSync(file));
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      });
      res.end('<h1>Not found.</h1>');
    }
  }
}).listen(PORT);
console.log('Bundle provider started at port:' + PORT);
