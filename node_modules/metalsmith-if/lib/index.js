var debug = require('debug')('metalsmith-if');

function metalsmithIf (conditional, cb) {
  if (conditional) {
    return cb;
  } else {
    return function (files, metalsmith, done) {
      // noop
      debug("Skipping plugin.");
      done();
    };
  }
}

module.exports = metalsmithIf;