var lunr = require('lunr');
var cheerio = require('cheerio');

module.exports = plugin;

function plugin(opts){
  return function(files, metalsmith, done){
    opts = setDefaultOptions(opts);
    var index = setIndexOptions(opts);
    var store = {};
    indexDocs(index,files, opts, store);
    addJSONtoMetalsmith(index, files, opts, store);
    done();
  };
};

//Creates the lunr object
function setIndexOptions(opts){
  var fields = opts.fields;
  var index =  lunr(function(){
    if (opts.pipelineFunctions) {
      //this.pipeline.reset();
      opts.pipelineFunctions.forEach(function(f){
        lunr.Pipeline.registerFunction(f, f.name);
        this.pipeline.add(f);

      }, this);
    }
    for(field in fields){
      this.field(field, {boost: fields[field]});
    }
    this.ref(opts.ref);
  });
  return index;
}

//Adds docs to the lunr object if docs is flagged to be indexed
function indexDocs(index, files, opts, store){
  for (file in files){
    if(files[file].lunr){
      //var docIndex = createDocumentIndex(opts, files[file], file);
      //index.add(docIndex);
      var inPageIndexes = createInPageIndexes(opts, files[file], file, store);
      inPageIndexes.forEach(index.add.bind(index));
    }
  }
}

function createInPageIndexes(opts, file, path, store) {
  var indexes = [];
  var $ = cheerio.load(file.contents.toString());
  var current = $('h1').first();
  while(current.length > 0) {
    var contents = current.nextUntil('h1,h2,h3')
    var isH1 = current.is('h1');
    var index = {
      filePath: isH1 ? path.replace('.html', '/') : path.replace('.html', '/') + "#" + current.attr('id'),
      contents: contents.text(),
      title: current.text()
    };
    if(current.attr('id')) {
      indexes.push(index);
      var fileCollection = (file.collection[0]).split('.')[0];
      var pageTitle = file.title;
      var device = null;
      if(file.photon) {
        device = 'photon'
      } else if (file.core) {
        device = 'core';
      } else if (file.electron) {
        device = 'electron'
      }
      store[index.filePath] = { title: index.title, collection: fileCollection, pageTitle: pageTitle, device: device };
    }
    current = contents.length ? contents.last().next() : current.next();
  }
  return indexes;
};

//Creates new object to add to the lunr search index
function createDocumentIndex(opts, file, path){
  var contents, index = {};
  if(opts.ref == 'filePath'){
    index.filePath = path.replace('.html', '/');
  }else{
    index[opts.ref] = file[opts.ref];
  }
  for (field in opts.fields){
    if(field === 'contents'){
      /*if(typeof opts.preprocess === 'function'){
        contents = opts.preprocess.call(file, file.contents.toString());
        index.contents = String(contents);
      }else{
        index.contents = file.contents.toString();
      }*/
    }else{
      index[field] = file[field];
    }
  }
  // console.log(index);
  return index;
}

//Adds the search index JSON file to Metalsmith metadata for build
function addJSONtoMetalsmith(index, files, opts, store){
  var contents = new Buffer(JSON.stringify({ index: index, store: store }));
  files[opts.indexPath] = {contents: contents};
}

function setDefaultOptions(opts){
    opts = opts || {};
    opts.indexPath = opts.indexPath || 'searchIndex.json';
    opts.fields = opts.fields || {contents: 1};
    opts.ref = opts.ref || 'filePath';
    opts.pipelineFunctions = opts.pipelineFunctions || [];
    return opts;
}
