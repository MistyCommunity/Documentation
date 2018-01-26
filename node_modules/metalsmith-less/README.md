# metalsmith-less

[![Build Status](https://travis-ci.org/christophercliff/metalsmith-less.png?branch=master)](https://travis-ci.org/christophercliff/metalsmith-less)

A [LESS](http://lesscss.org/) plugin for [Metalsmith](http://www.metalsmith.io/).

## Installation

```
npm install metalsmith-less
```

## Usage

```js
var less = require('metalsmith-less')

new Metalsmith(__dirname)
    .use(less(options))
    .build()
```

### **`options`** `Object`

- **`pattern`** `String|Array<String>`

    The [pattern](https://github.com/sindresorhus/multimatch) to filter source files. Default `**/*.less`.

- **`render`** `Object`

    The options passed to [`less.render(String[, Object])`](http://lesscss.org/usage/#programmatic-usage). Unfortunately, this method is *undocumented*. See https://github.com/less/less-docs/issues/212 for more information. Default `undefined`.

- **`useDynamicSourceMap`** `Boolean`

    Overrides the supplied source map configuration with a dynamic file-level configuration. This is the easiest way to enable source maps in your Metalsmith build. Default `false`.

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-less/blob/master/LICENSE.md) for details.
