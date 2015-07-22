### How to use

Open `start.js`

Modify `port` if you want.

Modify `SOURCE_PATH` which direct to files folder, should keep `**/*.ext` behind it.

If needing exclude files just modify `EXCLUDE_FILES` regular expression.

Then

`$ npm install`

You should create your own config.json under app folder before app start.

config.json sample:

    {
      "sourcePath": "/your/source/path/**/*.css", //mandatory
      "excludeFiles": "min.css|dist.css", //optional
      "port": 12306 //optional
    }


`$ node start.js`

Visit `http://localhost:port`
