# metalsmith-gzip [![Build Status](https://travis-ci.org/ludovicofischer/metalsmith-gzip.svg?branch=master)](https://travis-ci.org/ludovicofischer/metalsmith-gzip)

A [Metalsmith](http://metalsmith.io) plugin that creates gzipped copies of the site's content. This is useful for website hosting on Amazon S3, where on the fly compression in the server is impossible.

## Installation

```
$ npm install metalsmith-gzip
```

## Usage

```javascript
var Metalsmith = require('metalsmith');
var compress = require('metalsmith-gzip');

var metalsmith = new Metalsmith(__dirname)
  .use(compress());

```

`metalsmith-gzip` will gzip a file if the extension matches this regular expression:

```javascript
/\.[html|css|js|json|xml|svg|txt]/
```

The choice of files to compress is loosely based on the [HTML5 Boilerplate server configuration](https://github.com/h5bp/server-configs-apache).

### Customization

Pass an options object to customize metalsmith-gzip behaviour. These are the available options keys:

`src` is a [multimatch](https://github.com/sindresorhus/multimatch) pattern which specifies which types of files to compress.

```javascript
var metalsmith = new Metalsmith(__dirname)
  .use(compress({src: ['**/*.js', '**/*.css']})); // only compresses JavaScript and CSS

```

`gzip` is the same configuration object accepted by `zlib.createGzip` (http://nodejs.org/api/zlib.html#zlib_options). For example, you can set the compression level:

```javascript
var metalsmith = new Metalsmith(__dirname)
  .use(compress({
  src: ['**/*.js', '**/*.css'],
  gzip: {level: 6}
  })); // only compresses JavaScript and CSS

```

### Deployment

You need to create a script to upload the gzipped versions of the files to your preferred hosting provider yourself. Take care to serve the files with the correct Content-Encoding.

## Acknowledgements

This plugin was inspired by the [Middleman gzip extension](http://middlemanapp.com/advanced/file-size-optimization/).
