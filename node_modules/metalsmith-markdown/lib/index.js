
var basename = require('path').basename;
var debug = require('debug')('metalsmith-markdown');
var dirname = require('path').dirname;
var extname = require('path').extname;
var marked = require('marked');
var url = require('url');
var renderer = new marked.Renderer();

renderer.table = function (header, body) {
  return '<div class="table-scrollable"><table>' +
    '<thead>' + header + '</thead>' +
    '<tbody>' + body + '</tbody>' +
    '</table></div>';
};

renderer.link = function(href, title, text) {
  if (this.options.sanitize) {
    var prot;
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var parsedUrl = url.parse(href);
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  if (parsedUrl.host) {
    out += ' target="_blank" rel="noopener noreferrer"';
  }
  out += '>' + text + '</a>';
  return out;
};

var headingCount = {};
renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^\w]+/g, '-');
  if (escapedText === 'constructor') {
		escapedText += '-';
	}
  var count = headingCount[escapedText] || 0;
  var escapedWithCounter = escapedText;
  if (count) {
    escapedWithCounter += '-' + count;
  }

  var header = '<h' + level + ' id="'+ escapedWithCounter +'">'+ text +'<a href="#' + escapedWithCounter + '" class="header-permalinks"><i class="ion-link"></i></a></h' + level + '>';

  headingCount[escapedText] = count + 1;
  return header;
};

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to convert markdown files.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin(options){
  options = options || {};
  var keys = options.keys || [];
  options.renderer = renderer;


  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      headingCount = {};
      if (!markdown(file)) return;
      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + '.html';
      if ('.' != dir) html = dir + '/' + html;

      debug('converting file: %s', file);
      var str = marked(data.contents.toString(), options);
      data.contents = new Buffer(str);
      keys.forEach(function(key) {
        data[key] = marked(data[key], options);
      });

      delete files[file];
      files[html] = data;
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file){
  return /\.md|\.markdown/.test(extname(file));
}
