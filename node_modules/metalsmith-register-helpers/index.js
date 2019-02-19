var extend = require('extend')
var fs = require('fs')
var Handlebars = require('handlebars')

module.exports = plugin

function plugin (options) {
  options = extend({
    directory: 'helpers'
  }, options || {})

  return function (files, metalsmith, done) {
    fs.readdir(metalsmith.path(options.directory), function (err, files) {
      if (err) throw err

      files.forEach(function (file) {
        var helperContents
        var path
        var templateName

        path = metalsmith.path(options.directory, file)
        helperContents = require(path)

        switch (typeof helperContents) {
          case 'function':
            templateName = helperContents.name || file.split('.').shift()
            Handlebars.registerHelper(templateName, helperContents)
            break
          case 'object':
            Handlebars.registerHelper(helperContents)
            break
        }
      })

      done()
    })
  }
}
