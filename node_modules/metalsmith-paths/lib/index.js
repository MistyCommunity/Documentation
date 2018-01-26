'use strict'

var debug = require('debug-log')('metalsmith-paths')
var path = require('path')

/**
 * @param {Object} options
 * @return {Function}
 */

module.exports = function plugin (options) {
  var opts = options || {}
  var prop = opts.property || 'path'

  return function (files, metalsmith, done) {
    setImmediate(done)

    Object.keys(files).forEach(function (file) {
      debug('process file: %s', file)

      if (path.parse) {
        debug('[node >= 0.11.15] using path.parse')

        files[file][prop] = path.parse(file)
      } else {
        // add file path info
        var extname = path.extname(file)

        files[file][prop] = {
          base: path.basename(file),
          dir: path.dirname(file),
          ext: extname,
          name: path.basename(file, extname)
        }
      }

      // default to root
      files[file][prop].href = '/'

      // add path meta for use in links in templates
      if (files[file][prop].dir !== '') {
        files[file][prop].href = '/' + files[file][prop].dir + '/'
      }
    })
  }
}
