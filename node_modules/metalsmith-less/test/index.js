var assertDir = require('assert-dir-equal')
var less = require('../')
var Metalsmith = require('metalsmith')

describe('the plugin', function () {

    it('should convert less to css', function (done) {
        (new Metalsmith('test/fixtures/basic'))
            .use(less())
            .build(function (err) {
                if (err) return done(err)
                assertDir('test/fixtures/basic/expected', 'test/fixtures/basic/build')
                return done(null)
            })
    })

    it('should convert imported files', function (done) {
        (new Metalsmith('test/fixtures/import'))
            .use(less({
                pattern: 'less/index.less',
                render: {
                    paths: [
                        'test/fixtures/import/src/less',
                    ],
                },
            }))
            .build(function (err) {
                if (err) return done(err)
                assertDir('test/fixtures/import/expected', 'test/fixtures/import/build')
                return done(null)
            })
    })

    it('should create source map', function (done) {
        (new Metalsmith('test/fixtures/source-map'))
            .use(less({
                pattern: [
                    'less/entry-1.less',
                    'less/entry-2.less',
                ],
                render: {
                    paths: [
                        'test/fixtures/source-map/src/less',
                    ],
                },
                useDynamicSourceMap: true,
            }))
            .build(function (err) {
                if (err) return done(err)
                assertDir('test/fixtures/source-map/expected', 'test/fixtures/source-map/build')
                return done(null)
            })

    })

})
