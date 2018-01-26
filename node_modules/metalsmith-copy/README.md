# metalsmith-copy

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependency Status][david-badge]][david-url]
[![Slack chat][slack-badge]][slack-url]

This is a plugin for [Metalsmith][] that copies files matching a `pattern` based on either a `transform` function or a `directory` and `extension`.  Think of metalsmith-copy as a file converter plugin like metalsmith-markdown, but it doesn't make any changes to the content and name changes are programmatically specified in its options.

[metalsmith]: http://metalsmith.io

##  Usage

If using the CLI for Metalsmith, metalsmith-copy can be used like any other plugin by including it in `metalsmith.json`.  For example:

```json
{
  "plugins": {
    "metalsmith-copy": {
      "pattern": "*.md",
      "directory": "markdown-files"
    }
  }
}
```

Note that the `transform` option cannot be used, as JSON doesn't serialize JavaScript functions. 

For Metalscript's JavaScript API, metalsmith-copy can be used like any other plugin, by attaching it to the function invocation chain on the Metalscript object.  For example:

```js
var copy = require('metalsmith-copy');
require('metalsmith')(__dirname)
  .use(copy({
    pattern: '*.md',
    transform: function (file) {
      return file + '.bak';
    }
  })
  .build();
```

## Options

metalsmith-copy requires a `pattern` option as well as at least one of the transformation options: `extension`, `directory`, or `transform`.

- `pattern` is a globbing pattern that specifies which files to copy.
- `extension` is an extension (starting with `.`) that replaces the file's current last extension.
- `directory` is a directory relative to the build directory for the new file to be copied.
- `transform` supercedes both `extension` and `directory` and is a function which takes one argument (the path to the file being copied) and returns a new path for the file to be copied to.
- `move` is boolean value indication files should be moved instead of copied.

## Use Cases

If you're running a blog, perhaps you want to mimic John Gruber's articles, where he provides both an HTML version of his article and a Markdown version (ending in `.text`).  To set this up with metalsmith-copy, provide the following options to the plugin:

```json
{
  "pattern": "articles/*.md",
  "extension": ".text"
}
```

To move all files in a given folder to the root of your build directory, you could try the following options:

```json
{
  "pattern": "static/*",
  "directory": "",
  "move": true

}
```

[npm-badge]: https://img.shields.io/npm/v/metalsmith-copy.svg
[npm-url]: https://www.npmjs.com/package/metalsmith-copy
[travis-badge]: https://travis-ci.org/mattwidmann/metalsmith-copy.svg
[travis-url]: https://travis-ci.org/mattwidmann/metalsmith-copy
[david-badge]: https://david-dm.org/mattwidmann/metalsmith-copy.svg
[david-url]: https://david-dm.org/mattwidmann/metalsmith-copy
[slack-badge]: https://img.shields.io/badge/Slack-Join%20Chat%20→-blue.svg
[slack-url]: http://metalsmith-slack.herokuapp.com/
