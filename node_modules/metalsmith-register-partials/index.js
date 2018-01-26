var extend = require('extend');
var fs = require('fs');
var handlebars = require('handlebars');

module.exports = plugin;

function plugin(options) {
  options = extend({
    directory: 'partials'
  }, options || {});

  return function(files, metalsmith, done) {
    fs.readdir(metalsmith.path(options.directory), function(err,files){
      if(err) throw err;
      
      files.forEach(function(file){
        var templateName = file.split('.').shift();
        var path = metalsmith.path(options.directory, file)
        var partialContents = fs.readFileSync(path).toString('utf8');
        handlebars.registerPartial(templateName, partialContents);
      });

      done();
    });
  };
}
