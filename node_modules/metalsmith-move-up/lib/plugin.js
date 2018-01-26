'use strict'

var multimatch = require('multimatch'),    // for glob matching the search pattern
    async = require('async'),              // for filtering and enumerating files
    path = require('path'),
    _ = require('lodash')

function normalizeInput (transforms) {
  var normalizedTransforms = [],
      defaultTransform = {
        pattern: '**',
        by: 1,
        opts: {
          dot: true
        }
      }

  // we'll need this to normalize individual transforms
  function addTransform (transform) {
    normalizedTransforms.push(_.merge({}, defaultTransform, transform))
    return normalizedTransforms
  }

  // if we got nothing we will just add a single default and return
  if (!transforms) return addTransform({})

  // single string simple transforms
  if (typeof transforms === 'string') return addTransform({pattern: transforms})

  // if we have an array, add each to normalizedTransforms
  if (Array.isArray(transforms)) {
    _.each(transforms, function (transform) {
      if (typeof transform === 'string') addTransform({pattern: transform})
      else addTransform(transform)
    })

    return normalizedTransforms
  }

  // An object can be a number of things
  if (typeof transforms === 'object') {
    // if we don't have .transforms then we have a single transform
    if (!transforms.transforms) return addTransform(transforms)

    // if we have default options use those instead
    if (transforms.opts) defaultTransform.opts = transforms.opts

    // loop through and add the inner transforms
    _.each(transforms.transforms, function (transform) {
      if (typeof transform === 'string') addTransform({pattern: transform})
      else addTransform(transform)
    })
  }

  return normalizedTransforms
}

module.exports = function moveUp (transforms) {
  transforms = normalizeInput(transforms)

  // metalsmith expects a function to be returned
  return function (files, metalsmith, callback) {
    // will be called once per transform
    function onNextTransform (transform, next) {
      // check if we should handle this filePath
      function shouldProcess (filePath, done) {
        done(!!multimatch(filePath, transform.pattern, transform.opts).length)
      }

      // transform the path
      function process (filePath, complete) {
        var filename = path.basename(filePath),
            pathParts = path.dirname(filePath).split(path.sep)

        // we'll get an empty arrary if we overslice
        pathParts = pathParts.slice(transform.by)
        pathParts.push(filename)

        var newPath = pathParts.join(path.sep),
            fileData = files[filePath]

        // don't need the old fileData anymore,
        // since we are re-adding with the new path
        delete files[filePath]
        files[newPath] = fileData

        complete()
      }

      // we do this for each option as the last may have modified the collection
      async.filter(Object.keys(files), shouldProcess, function (results) {
        async.each(results, process, next)
      })
    }

    // looping the optionsStore kicks off the proccess
    async.each(transforms, onNextTransform, callback)
  }
}
