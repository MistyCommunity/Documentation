var _ = require('lodash')
var BPromise = require('bluebird')
var Joi = require('joi')
var less = require('less')
var multimatch = require('multimatch')
var path = require('path')

var MAP_INPUT_KEY = 'input'
var MAP_RE = /less/g
var OPTIONS_SCHEMA = Joi.object().keys({
    pattern: Joi.any([
        Joi.string(),
        Joi.array().items(Joi.string()),
    ]).default('**/*.less'),
    render: Joi.object(),
    useDynamicSourceMap: Joi.boolean().default(false),
})

module.exports = plugin

function plugin(options) {
    var validation = Joi.validate((options || {}), OPTIONS_SCHEMA)
    if (validation.error) throw validation.error
    var useDynamicSourceMap = validation.value.useDynamicSourceMap
    var renderOptions = validation.value.render
    return function (files, metalsmith, done) {
        return BPromise
            .filter(Object.keys(files), function (_path) {
                return multimatch(_path, validation.value.pattern).length > 0
            })
            .map(function (_path) {
                var destination = _path.replace(MAP_RE, 'css')
                var mapDestination
                var map
                if (useDynamicSourceMap) {
                    mapDestination = destination + '.map'
                    renderOptions = _.chain(renderOptions)
                        .cloneDeep()
                        .omit('useDynamicSourceMap')
                        .extend({
                            sourceMap: {
                                outputSourceFiles: true,
                                sourceMapURL: path.basename(mapDestination),
                            },
                        })
                        .value()
                }
                return less.render(files[_path].contents.toString(), renderOptions)
                    .then(function (output) {
                        var mapInputIndex
                        files[destination] = {
                            contents: new Buffer(output.css),
                        }
                        if (useDynamicSourceMap) {
                            map = JSON.parse(output.map)
                            mapInputIndex = map.sources.indexOf(MAP_INPUT_KEY)
                            if (mapInputIndex) map.sources[mapInputIndex] = path.join(metalsmith._source, _path)
                            files[mapDestination] = {
                                contents: new Buffer(JSON.stringify(map)),
                            }
                        }
                    })
            })
            .nodeify(done)
    }
}
