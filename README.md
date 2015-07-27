# How to use
##### `$ npm install`
##### Rename `config-sample.json` to `config.json`.
##### Open `config.json`:
Modify `port` if you want.

Modify `rootPath` which direct to app root folder.

If you need a handler which provides files' contents aggregation,

you could create `rules` by yourself.

##### config.json sample:

```
{
  // when visiting http://localhost:9527/style/min.css
  // it should provide all .css contents aggregation under /path/to/root/style/ folder
  // excluded "other.css" and "exclude.css".

  "port": 9527, //optional, default to 8080
  "rootPath": "/path/to/root",
  "rules": [{
    "url": "/style/min.css",
    "sourceRule": "/style/**/*.css",
    "excludeFiles": "other.css|exclude.css" //optional
  }]
}
```

##### `$ node start.js`
