var zlib = require('zlib'),
    each = require('async').each,
    clone = require('lodash.clone'),
    defaults = require('lodash.defaults'),
    multimatch = require('multimatch');

function plugin(options) {
    var defaultOptions = {
        src: "**/*.+(html|css|js|json|xml|svg|txt)",
        gzip: {
            level: 6
        },
        overwrite: false
    };

    if (typeof options === 'object') {
        options = defaults(options, defaultOptions);
    } else {
        options = defaultOptions;
    }

    return function metalsmithGzip(files, metalsmith, done) {

        var filesTbCompressed = multimatch(Object.keys(files), options.src);

        each(filesTbCompressed, function compress(file, asyncDone) {
            var gzip = zlib.createGzip(options.gzip);
            var data = files[file];
            var compressedChunks = [];

            gzip.on('data', function storeCompressedChunk(chunk) {
                compressedChunks.push(chunk);
            });

            gzip.on('error', function signalError(error) {
                asyncDone(error);
            });

            gzip.on('end', function concatenateCompressedChunks() {
                var compressedFile;

                if (options.overwrite) {
                    files[file].contents = Buffer.concat(compressedChunks);
                } else {
                    compressedFile = file + '.gz';
                    files[compressedFile] = clone(data);
                    files[compressedFile].contents = Buffer.concat(compressedChunks);
                }
                asyncDone();
            });

            gzip.write(data.contents);
            gzip.end();

        }, done);
    };
}

module.exports = plugin;
