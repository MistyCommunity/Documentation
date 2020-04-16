/*
 * Generate the documentation website using the Metalsmith generator.
 *
 * Metalsmith reads all files in the source directory and passes an object of files through a set of plugins.
 * Each key in the files object is a path and the value is an object with many properties.
 * The contents properties has the contents of the file as a Buffer.
 * The frontmatter (stuff between --- at the top of the file) is added as additional properties.
 * When all the plugins are done running, the files object is written to the destination directory.
 * That's it!
 */
'use strict';

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var serve = require('metalsmith-serve');
var moveUp = require('metalsmith-move-up');
var less = require('metalsmith-less');
var ignore = require('metalsmith-ignore');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var cleanCSS = require('metalsmith-clean-css');
var compress = require('metalsmith-gzip');
var paths = require('metalsmith-paths');
var partials = require('metalsmith-register-partials');
var helpers = require('metalsmith-register-helpers');
var deviceFeatureFlags = require('./device_feature_flags');
var redirects = require('./redirects');
var metalsmithRedirect = require('metalsmith-redirect');
var copy = require('metalsmith-copy');
var fixLinks = require('./fixLinks');
var inPlace = require('metalsmith-in-place');
var watch = require('metalsmith-watch');
var autotoc = require('metalsmith-autotoc');
var lunr = require('metalsmith-lunr');
var lunr_ = require('lunr');
var fileMetadata = require('metalsmith-filemetadata');
var msIf = require('metalsmith-if');
var precompile = require('./precompile');
var apidoc = require('./apidoc');
var insertFragment = require('./insert_fragment');
var javascriptDocsPreprocess = require('./javascript_docs_preprocess');
var git = require('git-rev');
var path = require('path');


var handlebars = require('handlebars');
var prettify = require('prettify');
prettify.register(handlebars);

//disable autolinking
function noop() {}
noop.exec = noop;
var marked = require('marked');
marked.InlineLexer.rules.gfm.url = noop;

var environment;

var gitBranch;

var generateSearch = process.env.SEARCH_INDEX !== '0';

// Make Particle.function searchable with function only
lunr_.tokenizer.separator = /[\s\-.]+/;

exports.metalsmith = function() {
  function removeEmptyTokens(token) {
    if (token.length > 0) {
      return token;
    }
  };
  var metalsmith = Metalsmith(__dirname)
    .concurrency(100)
    .source('../src')
    .destination('../build')
    // Convert assets/less/style.less to assets/css/style.css
    // Put new styles in a .less file in assets/less and include it in style.less
    .use(less({
      pattern: '**/less/style.less',
      useDynamicSourceMap: true
    }))
    // Don't copy the styless partials to the build folder
    // Add other patterns of files that should not be copied
    .use(ignore([
      '**/less/*.less',
      'content/languages/**/*',
      'assets/images/**/*.ai'
    ]))
    // Minify CSS
    .use(cleanCSS({
      files: '**/*.css'
    }))
    .use(
      apidoc({
        destFile: 'content/reference/api.md',
        apis: [
          {
            src: '../api-node/',
            config: '../api-node/',
            includeFilters: ['.*[vV]iews[^.]*\\.js$', 'lib/AccessTokenController.js']
          },
          {
            src: '../api-service-libraries/',
            config: '../api-node/',
            includeFilters: ['.*Controller\\.js$']
          },
        ]
      })
    )
    // Auto-generate documentation for the Javascript client library
    .use(insertFragment({
      destFile: 'content/reference/javascript.md',
      srcFile: '../particle-api-js/docs/api.md',
      fragment: 'GENERATED_JAVASCRIPT_DOCS',
      preprocess: javascriptDocsPreprocess,
    }))
    // Make all files in this directory available to any Handlebar template
    // Use partials like this: {{> arrows}}
    .use(partials({
      directory: '../templates/partials'
    }))
    // Add properties to files that match the pattern
    .use(fileMetadata([
      {pattern: 'content/**/*.md', metadata: {lunr: generateSearch, assets: '/assets', branch: gitBranch}}
    ]))
    .use(msIf(
      environment === 'development',
      fileMetadata([
        {pattern: 'content/**/*.md', metadata: {development: true}},
        {pattern: '**/*.hbs', metadata: {development: true}}
      ])
    ))
    // Handlebar templates for use in the front-end JS code
    .use(precompile({
      directory: '../templates/precompile',
      dest: 'assets/js/precompiled.js',
      knownHelpers: {
        'each': true,
        'if': true
      }
    }))
    // Move files like contents/reference/firmware.md to reference/firmware.md
    .use(moveUp(['content/**/*']))
    // Add a path key to each file, with sub-keys base, dir, ext, name
    .use(paths())
    // Handlebar helpers to use in any Handlebar template
    // Use helpers like this: {{ reset-button }}
    // Note that the last parameter to the helper will be a context object with the file metadata in context.data.root
    .use(helpers({
      directory: '../templates/helpers'
    }))
    // Group files into collections and add collection metadata
    // This plugin is complex and buggy.
    // It causes the duplicate nav bar bug during development with livereload
    .use(collections({
      misty_i: {
        pattern: 'misty-i/:section/*.md',
        sortBy: 'order',
        orderDynamicCollections: [
          'robot',
          'coding-misty',
          'reference',
        ]
      },
      misty_ii: {
        pattern: 'misty-ii/:section/*.md',
        sortBy: 'order',
        orderDynamicCollections: [
          'get-started',
          'robot',
          'javascript-sdk',
          'dotnet-sdk',
          'rest-api'
        ]
      },
      tools_and_apps: {
        pattern: 'tools-&-apps/:section/*md',
        sortBy: 'order',
        orderDynamicCollections: [
          'tools-&-apps',
          'mobile',
          'web-based-tools',
          'plugins-&-extensions'
        ]
      }
    }))
    //end of collections/sections
    // Fix previous / next links when a page doesn't exist for a specific device
    .use(fixLinks({
      key: 'devices'
    }))
    // For files that have the devices key set, add a bunch of properties like has-wifi, has-cellular
    // Use them in Handlebar templates like this:
    // {{#if has-wifi}}Connect to Wi-Fi{{/if}}
    .use(deviceFeatureFlags({
      config: '../config/device_features.json'
    }))

	// Create HTML pages with meta http-equiv='refresh' redirects
    .use(redirects({
        config: '../config/redirects.json'
    }))
    .use(metalsmithRedirect({
      preserveHash: true,
      redirections: {
          "/casestudies" : "/casestudies/skills-developed/",
          "/codesamples" : "/codesamples/sample1/",
          "/faq" : "/faq/question/",
          "/getstarted": "/misty-ii/robot/get-started",
          "/get-started": "/misty-ii/robot/get-started",
          "/gettingstarted": "/misty-ii/robot/get-started",
          "/getting-started": "/misty-ii/robot/get-started",
          "/onboarding": "/docs/robots/introduction",
          "/docs/robots/introduction": "/misty-ii/robot/get-started",
          "/docs/robots/misty-i": "/misty-i/robot/introduction",
          "/docs/robots/misty-ii": "/misty-ii/robot/get-started",
          "/docs/skills/introduction": "/misty-ii/robot/introduction-to-skills",
          "/docs/skills/local-skill-architecture": "/misty-ii/coding-misty/local-skill-architecture",
          "/docs/skills/remote-command-architecture": "/misty-ii/coding-misty/remote-command-architecture",
          "/docs/skills/local-skill-tutorials": "/misty-ii/coding-misty/local-skill-tutorials",
          "/docs/skills/remote-command-tutorials": "/misty-ii/coding-misty/remote-command-tutorials",
          "/docs/reference/rest": "/misty-ii/reference/rest",
          "/docs/reference/javascript-api": "/misty-ii/reference/javascript-api",
          "/docs/reference/sensor-data": "/misty-ii/reference/sensor-data",
          "/docs/apps/introduction": "/tools-&-apps/tools-&-apps/introduction",
          "/docs/apps/misty-app": "/tools-&-apps/mobile/misty-app",
          "/docs/apps/command-center": "/tools-&-apps/web-based-tools/command-center",
          "/docs/apps/api-explorer": "/tools-&-apps/web-based-tools/api-explorer",
          "/docs/apps/skill-runner": "/tools-&-apps/web-based-tools/skill-runner",
          "/docs/apps/misty-skills-extension": "/tools-&-apps/plugins-&-extensions/misty-skills-extension",
          "/docs/apps/blockly": "/tools-&-apps/web-based-tools/blockly",
          "/onboarding/3-ways-to-interact-with-misty/blockly/": "/tools-&-apps/web-based-tools/blockly",
          "/misty-ii/robot/get-started": "/misty-ii/get-started/meet-misty",
          "/misty-ii/robot/hello-world": "/misty-ii/get-started/hello-world",
          "/misty-ii/reference/sensor-data": "/misty-ii/robot/sensor-data",
          "/misty-ii/coding-misty/introduction": "/misty-ii/coding-misty/introduction-to-skills",
          "/misty-ii/coding-misty/javascript-sdk-architecture": "/misty-ii/javascript-sdk/javascript-sdk-architecture",
          "/misty-ii/coding-misty/javascript-sdk-code-samples": "/misty-ii/javascript-sdk/code-samples",
          "/misty-ii/coding-misty/javascript-api": "/misty-ii/javascript-sdk/api-reference",
          "/misty-ii/coding-misty/javascript-sdk-tutorials": "/misty-ii/javascript-sdk/api-reference",
          "/misty-ii/coding-misty/remote-command-architecture": "/misty-ii/rest-api/overview",
          "/misty-ii/coding-misty/remote-command-tutorials": "/misty-ii/rest-api/tutorials",
          "/misty-ii/reference/rest": "/misty-ii/rest-api/api-reference",
          "/misty-ii/reference/javascript-api": "/misty-ii/javascript-sdk/api-reference",
          "/misty-ii/javascript-sdk/overview": "/misty-ii/javascript-sdk/javascript-skill-architecture",
          "/misty-ii/net-sdk/getting-started": "/misty-ii/dotnet-sdk/getting-started",
          "/misty-ii/net-sdk/net-skill-architecture": "/misty-ii/dotnet-sdk/dotnet-skill-architecture",
          "/misty-ii/net-sdk/overview": "/misty-ii/dotnet-sdk/overview",
          "/misty-ii/net-sdk/sample-project": "/misty-ii/dotnet-sdk/sample-project"
        },
      }
    ))

    // Replace the {{handlebar}} markers inside Markdown files before they are rendered into HTML and
    // any other files with a .hbs extension in the src folder
    .use(inPlace({
      engine: 'handlebars',
      pattern: ['**/*.md', '**/*.hbs']
    }))
	// Remove the .hbs extension from generated files that contained handlebar markers
    .use(copy({
        pattern: '**/*.hbs',
        transform: function removeLastExtension(file) {
			return path.join(path.dirname(file), path.basename(file, path.extname(file)));
		},
        move: true
    }))
	// THIS IS IT!
	// Render the main docs files into HTML
    .use(markdown())
    // Add a toc key for each file based on the HTML header elements in the file
    .use(autotoc({
      selector: 'h2, h3',
      pattern: '**/**/*.md'
    }))
    // Generate Lunr search index for all the files that have lunr: true
    // This is slow. Use SEARCH_INDEX=0 in development to avoid creating this file
    .use(lunr({
      indexPath: 'search-index.json',
      fields: {
          contents: 1,
          title: 10
      },
      pipelineFunctions: [
          removeEmptyTokens
      ]
    }))
    // For files that have a template frontmatter key, look for that template file in the configured directory and
    // render that template using the Metalsmith file with all its keys as context
    .use(layouts({
      engine: 'handlebars',
      directory: '../templates/layouts'
    }))
    // Rename files so that about.html is converted into about/index.html
    .use(permalinks({
      relative: false
    }))

  return metalsmith;
};

exports.compress = function(callback) {
  Metalsmith(__dirname)
    .clean(false)
    .concurrency(100)
    .source('../build')
    .destination('../build')
    .use(compress({
      src: ['search-index.json'],
      overwrite: true
    }))
    .build(callback);
};

exports.build = function(callback) {
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith()
      .use(compress({
        src: ['search-index.json'],
        overwrite: true
      }))
      .build(function(err, files) {
        if (err) {
          throw err;
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
};

exports.test = function(callback) {
  var server = serve({ cache: 300, port: 8081 });
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    generateSearch = true;
    exports.metalsmith()
      .use(server)
      .build(function(err, files) {
        if (err) {
          console.error(err, err.stack);
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
  return server;
};

exports.server = function(callback) {
  environment = 'development';
  git.branch(function (str) {
    gitBranch = process.env.TRAVIS_BRANCH || str;
    exports.metalsmith().use(serve())
      .use(watch({
        paths: {
          '${source}/content/**/*.md': true,
          '${source}/assets/less/*.less': 'assets/less/*.less',
          '../templates/layouts/reference.hbs': 'content/reference/*.md',
          '../templates/layouts/guide.hbs': 'content/guide/**/*.md',
          '../templates/layouts/datasheet.hbs': 'content/datasheets/*.md',
          '../templates/layouts/support.hbs': 'content/support/**/*.md',
          '../templates/layouts/suppMenu.hbs': 'content/support/**/*.md',
          '../templates/partials/**/*.hbs': 'content/**/*.md',
          '${source}/assets/js/*.js*' : true,
          '${source}/assets/images/**/*' : true,
          '../config/device_features.json': 'content/**/*.md',
          '../api-node/lib/**/*.js': 'content/reference/api.md'
          // '../config/redirects.json': '**/*'
        },
        livereload: true
      }))
      .build(function(err, files) {
        if (err) {
          console.error(err, err.stack);
        }
        if (callback) {
          callback(err, files);
        }
      });
  });
};
