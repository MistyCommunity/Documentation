# metalsmith-move-up
[![travis][travis-badge]][travis-url]
[![git][git-badge]][git-url]
[![npm][npm-badge]][npm-url]
[![standard][standard-badge]][standard-url]
[![nearform][nearform-badge]][nearform-url]

Metalsmith MoveUp is a [MetalSmith][] plugin for moving the full contents of a directory up one or more
levels. By default this plugin will move everything in your destination directory up one. Metalsmith MoveUp
supports multiple transforms, which are processed in the order they are provided, allowing for more complex
transforms to be done with a single call.

For globbing support we use [minimatch][]. To make matching easier we set dot matching to true meaning a global
match can be done using a single globstar `**`. MiniMatch options can be provided as a global or on a per transform
basis.

## Installation
To install Metalsmith MoveUp, simply use npm:

```
npm install metalsmith-move-up --save
```

## Usage
The example below can be found and ran from the [examples](./examples/) folder; it demonstrates
how to use Metalsmith MoveUp in a couple of different ways in a node.js app.

### Javascript
```javascript
'use strict'

var metalsmith = require('metalsmith'),
    moveUp = require('metalsmith-move-up')

// move everything in the build folder up one. The
// build folder always represents the root for operations.
metalsmith.use(moveUp())

// defaults are added as needed so input is easier. Input
// is simplified where possible. both lines will have a
// default .by of 1 and will use dot:true for mini-match.
metalsmith.use(moveUp('pages/*'))
metalsmith.use(moveUp({pattern: 'pages/*'}))

// multiple simple transforms are also supported.
metalsmith.use(moveUp([
  'lib/**',
  'test/*'
]))

// multiple, order specific, transforms can be done with one
// call. Each job only begins after the previous one finishes.
metalsmith.use(moveUp([
  '!*.css',
  'index.css'
]))

// the .by field moves everything N or as many times as
// possible. This means if a given match only has one path
// part, it will only be moved up one directory.
metalsmith.use(moveUp({
  pattern: 'pages/*',
  by: 2
}))

// globbing is supported via minimatch. default options for
// minimatch can be supplied at a global level using the .opts
// field. Transforms are added to the .transforms array, any
// transform that does not have a .opts field will get the
// global .opts value. This is a replace, not a merge.
metalsmith.use(moveUp({
  opts: {
    dot: false
  },
  transforms: [
    {pattern: 'pages/*', by: 2},
    {pattern: 'css/*', by: 2, opts: {dot: true}}
  ]
}))
```

### Metalsmith JSON
```json
{
  "source": "./src",
  "destination": "./dest",
  "plugins": {
    "metalsmith-move-up": {
      "opts": {"dot": "true"},
      "transforms": [
        {"pattern": "**", "by": "2"},
        {"pattern": "posts/*", "by": "2", "opts": {"dot": "false"}}
      ]
    }
  }
}
```

### Transform
The transform object has three fields, if no transforms are passed a default pattern will be ran that
pulls all applicable files and folders in the build directory up by one.

##### _pattern_
The glob pattern to use when locating files and directories for moving. See both [minimatch][] for
example patterns.

##### _by_
The maximum number of path parts to remove. Matches with less path segments than the count will have
all of their segments removed, as such, they will end up in the root (destination) folder.

##### _opts_
The options to use with minimatch, order is field > global > default each overriding the last. Note
that these options do not merge, they overwrite.

## Contributing
Metalsmith MoveUp is an __open project__ and encourages participation. If you feel you can help in
any way, be it with examples, extra testing, or new features please be our guest.

_See our [Contribution Guide][] for information on obtaining the source and an overview of the tooling used._

## License

Copyright Dean McDonnell 2015, Licensed under [MIT](./LICENSE)

[travis-badge]: https://img.shields.io/travis/mcdonnelldean/metalsmith-move-up.svg?style=flat-square
[travis-url]: https://travis-ci.org/mcdonnelldean/metalsmith-move-up
[git-badge]: https://img.shields.io/github/release/mcdonnelldean/metalsmith-move-up.svg?style=flat-square
[git-url]: https://github.com/mcdonnelldean/metalsmith-move-up/releases
[npm-badge]: https://img.shields.io/npm/v/metalsmith-move-up.svg?style=flat-square
[npm-url]: https://npmjs.org/package/metalsmith-move-up
[standard-badge]: https://img.shields.io/badge/code%20style-standard-blue.svg?style=flat-square
[standard-url]: https://npmjs.org/package/standard
[nearform-badge]: https://img.shields.io/badge/sponsored%20by-nearForm-red.svg?style=flat-square
[nearform-url]: http://nearform.com
[Metalsmith]: http://metalsmith.io
[MultiMatch]: https://www.npmjs.com/package/minimatch
[MiniMatch]: https://www.npmjs.com/package/minimatch
[Contribution Guide]: ./CONTRIBUTING.md
