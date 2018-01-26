'use strict'

var metalsmith = require('metalsmith'),
    moveUp = require('metalsmith-move-up')

// move everything in the build folder up one. The
// build folder always represents the root for operations.
metalsmith.use(moveUp())

// defaults are added as needed so input is easier. Input
// is simplified where possible. both lines will have a
// default .by of 1 and will use dot:true for minimatch.
metalsmith.use(moveUp('pages/*'))
metalsmith.use(moveUp({pattern: 'pages/*'}))

// mutiple simple transforms are also supported.
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
