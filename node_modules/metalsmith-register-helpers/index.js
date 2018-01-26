var extend = require('extend');
var fs = require('fs');
var Handlebars = require('handlebars');

module.exports = plugin;

function plugin(options) {
  options = extend({
    directory: 'helpers'
  }, options || {});

  return function(files, metalsmith, done) {
    fs.readdir(metalsmith.path(options.directory), function(err, files) {
      if(err) throw err;

      files.forEach(function(file){
        var templateName = file.split('.').shift();
        var path = metalsmith.path(options.directory, file)
        var helperContents = require(path);
        Handlebars.registerHelper(templateName, helperContents);
      });

      done();
    });
  };
}
