'use strict';
var os = require('os');
var _ = require('underscore');
var _s = require('underscore.string');
var modRewrite = require('connect-modrewrite');
var Handlebars = require('handlebars');
var iniparser = require('iniparser');

//////////////////////////////
// Handlebars Helpers for component templating
//////////////////////////////
Handlebars.registerHelper('slugify', function(input) {
  return _s.slugify(input);
});
Handlebars.registerHelper('capitalize', function(input) {
  return _s.capitalize(input);
});
Handlebars.registerHelper('uppercase', function(input) {
  return input.toUpperCase();
});
Handlebars.registerHelper('aspect', function(object, aspect) {
  return _s.slugify(object) + '--' + _s.slugify(aspect).toUpperCase();
});
Handlebars.registerHelper('element', function(object, element) {
  return _s.slugify(object) + '--' + _s.slugify(element).toLowerCase();
});
Handlebars.registerHelper('flatten', function (input, separator) {
  if (typeof(input) === 'object') {
    input = Array.prototype.slice.call(input);
    if (separator !== 'space') {
      return input.join(', ');
    }
    else {
      return input.join(' ');
    }
  }
  else {
    return input;
  }
});

module.exports = function (grunt) {

  //////////////////////////////
  // Import Grunt Configuration
  //
  // Combine with System options
  //////////////////////////////
  var deepmerge = require('deepmerge');
  var userConfig = grunt.file.readYAML('config.yml');
  userConfig = deepmerge(userConfig, grunt.file.readJSON('.system.json'));
  userConfig = deepmerge(userConfig, grunt.file.readJSON('.extension.json'));

  grunt.userConfig = userConfig;

  // Slugs and Stuff
  grunt.userConfig.clientSlug = _s.slugify(userConfig.client.name);
  grunt.userConfig.clientCamelCase = _s.camelize(grunt.userConfig.clientSlug);
  grunt.userConfig.clientCamelCase = grunt.userConfig.clientCamelCase.charAt(0).toUpperCase() + grunt.userConfig.clientCamelCase.slice(1);

  // Asset Paths
  var imagesDir = userConfig.assets.imagesDir;
  var cssDir = userConfig.assets.cssDir;
  var sassDir = userConfig.assets.sassDir;
  var jsDir = userConfig.assets.jsDir;
  var fontsDir = userConfig.assets.fontsDir;
  var componentsDir = userConfig.assets.componentsDir;

  // Generator Configuration
  var pagesDir = userConfig.generator.pagesDir;
  var templatesDir = userConfig.generator.templatesDir;
  var partialsDir = userConfig.generator.partialsDir;

  var helpers = userConfig.generator.helpers;
  helpers = require('./' + helpers);

  // Server Configuration
  var port = userConfig.server.port;
  var lrport = port + 1;
  var wnport = port + 2;
  var root = userConfig.server.root;
  var hostname = 'localhost';
  var remoteDebug = false;
  if (userConfig.server.remoteAccess) {
    hostname = '*';
    remoteDebug = true;
  }
  var remoteHost = os.networkInterfaces();
  for (var dev in remoteHost) {
    var alias = 0;

    if (remoteHost[dev] === undefined) {
      continue;
    }

    remoteHost[dev].forEach(function (details) {
      if (details.family=='IPv4') {
        if (dev === 'en0') {
          remoteHost = details.address;
        }
      }
    });
  };

  var firstSection = userConfig.sections;
  for (var a in firstSection) {
    if (typeof(firstSection[a]) === 'string') {
      firstSection = firstSection[a];
      if (firstSection.indexOf('.html', firstSection.length - 5) === -1) {

        firstSection += '/';
      }
      break;
    }
    break;
  }

  // Compass Configuration
  var debugInfo = userConfig.compass.debugInfo;
  var extensions = [];
  _.forEach(userConfig.compass.dependencies, function(v, e) {
    extensions.push(e);
  });
  if (userConfig.compass.importOnce === true) {
    extensions.push('compass/import-once/activate');
  }

  // Export Configuration
  var distPath = userConfig.export.distPath;
  var exportPath = userConfig.export.path;
  var assetPrefix = '';

  // Github Configuration
  var gh_commit = userConfig.git.defaultCommit;<% if (ghDeploy) { %>
  var gh_upstream = userConfig.git.deployUpstream;
  var gh_deploy = userConfig.git.deployBranch;
  <% } %>

  // Base URL
  var baseURL = '/';

  if (grunt.file.exists('.git/config')) {
    var git = iniparser.parseSync('.git/config') || false;
    var gitURL = git['remote "' + userConfig.git.deployUpstream + '"'].url;
    if (gitURL.indexOf('git@github.com:') >= 0) {
      gitURL = gitURL.replace('git@github.com:', '');
      gitURL = gitURL.split('/');
      gitURL[1] = gitURL[1].replace('.git', '');
      baseURL = 'http://' + gitURL[0].toLowerCase() + '.github.io/' + gitURL[1] + '/';
      assetPrefix = gitURL[1];
    }
  }

  //////////////////////////////
  //Grunt Config
  //////////////////////////////
  grunt.initConfig({
    // Development Server
    connect: {
      server: {
        options: {
          port: port,
          base: root,
          hostname: hostname,
          middleware: function (connect, options) {
            return [
              modRewrite([
                '^/$ /' + firstSection
              ]),
              connect.static(options.base)
            ];
          }
        }
      }
    },

    // Watch Task
    watch: {
      options: {
        livereload: lrport
      },
      html: {
        files: [
          pagesDir + '/**/*.html',
          pagesDir + '/**/*.md',
          pagesDir + '/**/*.yml',
          partialsDir + '/**/*.html',
          templatesDir + '/**/*.html',
          '!' + templatesDir + '/components/**/*.html',
          helpers + '.js'
        ],
        tasks: ['generator:dev']
      },
      generatedComponents: {
        files: [
          templatesDir + '/components/**/*.html',
	  templatesDir + '/layouts/**/*.html',
          'config.yml'
        ],
	tasks: ['create-components', 'create-layouts']
      },
      js: {
        files: [
          jsDir + '/**/*.js',
          '!' + jsDir + '/**/*.min.js'
        ],
        tasks: ['jshint', 'uglify:dev']
      },
      images: {
        files: [imagesDir + '/**/*'],
        tasks: ['copy:dev']
      },
      fonts: {
        files: [fontsDir + '/**/*'],
        tasks: ['copy:dev']
      },
      components: {
        files: [componentsDir + '/**/*'],
        tasks: ['copy:dev']
      },
      css: {
        files: [root + '/' + cssDir + '/**/*.css'],
        tasks: ['csslint']
      },
      config: {
        files: [
          'config.yml',
          '.system.yml'
        ],
        tasks: ['generator:dev']
      }
    },

    // Generator Task
    generator: {
      dev: {
        files: [{
          cwd: pagesDir,
          src: ['**/*'],
          dest: root,
          ext: '.html'
        }],
        options: {
          partialsGlob: [partialsDir + '/**/*.html', partialsDir + '/**/*.md'],
          templates: templatesDir,
          handlebarsHelpers: helpers,
          userConfig: userConfig,
          environment: 'dev',
          development: true,
          lrport: lrport,
          wnport: wnport,
          remoteDebug: remoteDebug,
          assets: ''
        }
      },
      dist: {
        files: [{
          cwd: pagesDir,
          src: ['**/*'],
          dest: distPath,
          ext: '.html'
        }],
        options: {
          partialsGlob: [partialsDir + '/**/*.html', partialsDir + '/**/*.md'],
          templates: templatesDir,
          handlebarsHelpers: helpers,
          userConfig: userConfig,
          environment: 'prod',
          development: false,
          assets: '/' + assetPrefix
        }
      }
    },

    // Compass Task
    compass: {
      options: {
        sassDir: sassDir,
        require: extensions,
        relativeAssets: true,
        importPath: componentsDir,
        debugInfo: debugInfo,
        bundleExec: true
      },
      dev: {
        options: {
          imagesDir: root + '/' + imagesDir,
          cssDir: root + '/' + cssDir,
          javascriptsDir: root + '/' + jsDir,
          fontsDir: root + '/' + fontsDir,
          environment: 'development',
          watch: true
        }
      },
      dist: {
        options: {
          imagesDir: distPath + '/' + imagesDir,
          cssDir: distPath + '/' + cssDir,
          javascriptsDir: distPath + '/' + jsDir,
          fontsDir: distPath + '/' + fontsDir,
          environment: 'production',
          force: true
        }
      }
    },

    // JSHint Task
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        jsDir + '/{,**/}*.js',
        '!' + jsDir + '/{,**/}*.min.js'
      ]
    },

    // CSS Lint
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: [
        root + '/' + cssDir + '/{,**/}*.css'
      ]
    },

    // Image Min Task
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: imagesDir,
          src: ['**/*.png', '**/*.jpg'],
          dest: distPath + '/' + imagesDir
        }]
      }
    },

    // SVG Min Task
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: imagesDir,
          src: '**/*.svg',
          dest: distPath + '/' + imagesDir
        }]
      }
    },

    // Uglify Task
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [{
          expand: true,
          cwd: jsDir,
          src: ['**/*.js', '!**/*.min.js'],
          dest: root + '/' + jsDir,
          ext: '.js'
        }]
      },
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: [{
          expand: true,
          cwd: jsDir,
          src: ['**/*.js', '!**/*.min.js'],
          dest: distPath + '/' + jsDir,
          ext: '.js'
        }]
      }
    },

    // Copy Task
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: fontsDir,
            src: ['**'],
            dest: root + '/' + fontsDir
          },
          {
            expand: true,
            cwd: imagesDir,
            src: ['**'],
            dest: root + '/' + imagesDir
          },
          {
            expand: true,
            cwd: componentsDir,
            src: ['**'],
            dest: root + '/' + componentsDir
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: fontsDir,
            src: ['**'],
            dest: distPath + '/' + fontsDir
          },
          {
            expand: true,
            cwd: imagesDir,
            src: [
              '**',
              '!**/*.png',
              '!**/*.jpg',
              '!**/*.svg'
            ],
            dest: distPath + '/' + imagesDir
          },
          {
            expand: true,
            cwd: componentsDir,
            src: ['**'],
            dest: distPath + '/' + componentsDir
          }
        ]
      },
      ext: {
        files: [
          {
            expand: true,
            cwd: sassDir,
            src: userConfig.extension.sass,
            dest: '.compass/stylesheets'
          },
          {
            expand: true,
            cwd: imagesDir,
            src: userConfig.extension.images,
            dest: '.compass/templates/project'
          },
          {
            expand: true,
            cwd: jsDir,
            src: userConfig.extension.js,
            dest: '.compass/templates/project'
          },
          {
            expand: true,
            cwd: fontsDir,
            src: userConfig.extension.fonts,
            dest: '.compass/templates/project'
          }
        ]
      }
    },

    // Concat
    concat: {
      rb: {
        options: {
          process: true
        },
        files: {
          '.compass/lib/<%= clientSlug %>-style-guide.rb': ['.compass/.template/style-guide.rb']
        }
      },
      gemspec: {
        options: {
          process: true
        },
        files: {
          '.compass/<%= clientSlug %>-style-guide.gemspec': ['.compass/.template/style-guide.gemspec']
        }
      }
    },

    // Parallel Task
    parallel: {
      assets: {
        options: {
          grunt: true
        },
        tasks: ['imagemin', 'svgmin', 'uglify:dist', 'copy:dist', 'generator:dist']
      },
      ext: {
        options: {
          grunt: true
        },
        tasks: ['copy:ext', 'concat:rb', 'concat:gemspec']
      },
      remote: {
        options: {
          grunt: true,
          stream: true
        },
        tasks: ['parallel:watch', 'exec:weinre']
      },
      remoteLaunch: {
        options: {
          grunt: true,
          stream: true
        },
        tasks: ['parallel:watch', 'exec:weinre', 'exec:launch:' + remoteHost, 'exec:launch:' + remoteHost + ':' + wnport + ':client']
      },
      watch: {
        options: {
          grunt: true,
          stream: true
        },
        tasks: ['watch', 'compass:dev']
      }
    },

    // Exec Task
    exec: {
      launch: {
        cmd: function(host, prt, suffix) {
          prt = prt || port;
          suffix = suffix || '';
          return 'open http://' + host + ':' + prt + '/' + suffix;
        }
      },
      commit: {
        cmd: function(commit) {
          return 'git add ' + distPath + ' && git commit -m "' + commit + '" ' + distPath;
        }
      },
      tagMake: {
        cmd: 'git tag ' + userConfig.client.version
      },
      tagPush: {
        cmd: 'git push --tags ' + userConfig.git.deployUpstream
      },<% if (ghDeploy) { %>
      deploy: {
        cmd: 'git subtree push --prefix .dist ' + gh_upstream + ' ' + gh_deploy
      },<% } %>
      export: {
        cmd: function(path) {
          return 'cp -r ' + distPath + ' ' + path;
        }
      },
      ext: {
        cmd: 'cd .compass && bundle exec gem build <%= clientSlug %>-style-guide.gemspec && mv <%= clientSlug %>-style-guide-' + userConfig.client.version + '.gem ../<%= clientSlug %>-style-guide-' + userConfig.client.version + '.gem && cd ..'
      },
      install: {
        cmd: 'gem install <%= clientSlug %>-style-guide-' + userConfig.client.version + '.gem && rm <%= clientSlug %>-style-guide-' + userConfig.client.version + '.gem'
      },
      weinre: {
        cmd: 'weinre --httpPort ' + wnport + ' --boundHost -all-'
      },
      bundle: {
        cmd: function(path) {
          if (path === '.') {
            return 'bundle install';
          }
          else {
            return 'cd ' + path + '/ && bundle install && cd ..';
          }
        }
      },
    },

    bump: {
      options: {
        files: [
          'package.json',
          'bower.json',
          '.system.json'
        ],
        commit: userConfig.bump.commit,
        commitFiles: userConfig.bump.files,
        createTag: userConfig.bump.tag,
        push: userConfig.bump.push,
        pushTo: userConfig.git.deployUpstream
      }
    }

  });

  grunt.event.on('watch', function(action, filepath) {
    grunt.config([
      'copy:dev',
      'uglify:dev',
      'generator:dev',
      'jshint',
      'csslint'
    ], filepath);
  });

  //////////////////////////////
  // Grunt Task Loads
  //////////////////////////////
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //////////////////////////////
  // Build Task
  //////////////////////////////
  grunt.registerTask('build', 'Production build', function() {
    var commit = grunt.option('commit');
    var deploy = grunt.option('deploy');
    var first = userConfig.sections[Object.keys(userConfig.sections)[0]];

    grunt.task.run(['parallel:assets', 'compass:dist', 'jshint']);

    var baseURL = '/';

    if (grunt.file.exists('.git/config')) {
      var git = iniparser.parseSync('.git/config') || false;
      var gitURL = git['remote "' + userConfig.git.deployUpstream + '"'].url;
      if (gitURL.indexOf('git@github.com:') >= 0) {
	gitURL = gitURL.replace('git@github.com:', '');
	gitURL = gitURL.split('/');
	gitURL[1] = gitURL[1].replace('.git', '');
	baseURL = 'http://' + gitURL[0].toLowerCase() + '.github.io/' + gitURL[1] + '/';
      }
    }

    var redirect = "<!doctype html><html lang=\"en\"><head><meta charset=\"UTF-8\" /><meta name=\"robots\" content=\"noindex\"><meta http-equiv=\"refresh\" content=\"0;URL='" + baseURL + first + "'\"><title>" + userConfig.client.name + " Style Prototype</title></head><body></body></html>";

    grunt.file.write('./.dist/index.html', redirect);

    if (commit) {
      if (commit === true) {
        commit = gh_commit;
      }
      grunt.task.run(['exec:commit:' + commit]);
    }

    <% if (ghDeploy) { %>
    if (deploy) {
      grunt.task.run(['exec:deploy']);
    }
    <% } %>
  });

  //////////////////////////////
  // Tag Task
  //////////////////////////////
  grunt.registerTask('tag', 'Tags your release', function() {
    var push = grunt.option('push');

    grunt.task.run('exec:tagMake');

    if (push) {
      grunt.task.run('exec:tagPush');
    }
  });

  <% if (ghDeploy) { %>
  //////////////////////////////
  // Deploy Task
  //////////////////////////////
  grunt.registerTask('deploy', [
    'exec:deploy'
  ]);<% } %>

  //////////////////////////////
  // Export Task
  //////////////////////////////
  grunt.registerTask('export', 'Exports your build', function() {
    var path = grunt.option('to') || exportPath;

    if (grunt.file.exists(path)) {
      grunt.file.delete(path, {force: true});
      console.log('Folder `' + path + '` removed to ensure a clean build.');
    }

    grunt.task.run('build', 'exec:export:' + path);
  });

  //////////////////////////////
  // Server Task
  //////////////////////////////
  grunt.registerTask('server-init', [
    'copy:dev',
    'uglify:dev',
    'generator:dev',
    'jshint',
    'csslint'
  ]);

  grunt.registerTask('server', 'Starts a development server', function() {

    var launch = grunt.option('launch');

    grunt.task.run(['bundler']);
    grunt.task.run(['create-components', 'create-layouts']);


    grunt.task.run(['server-init', 'connect']);

    if (hostname == '*') {
      grunt.task.run(['hostname']);
      if (launch) {
        grunt.task.run(['parallel:remoteLaunch']);
      }
      else {
        grunt.task.run(['parallel:remote']);
      }
    }
    else {
      if (launch) {
        grunt.task.run('exec:launch:localhost');
      }
      grunt.task.run('parallel:watch');
    }
  });

  //////////////////////////////
  // Hostname
  //////////////////////////////
  grunt.registerTask('hostname', 'Find Hostname', function() {
    console.log('Server available on local network at http://' + remoteHost + ':' + port);
    console.log('Remote inspector available on local network at http://' + remoteHost + ':' + wnport + '/client');
  });

  //////////////////////////////
  // Update Bundler
  //////////////////////////////
  grunt.registerTask('bundler', 'Manages Development Dependencies', function(path) {
    path = path || '.';
    var gemfileContent = '# Pull gems from RubyGems\nsource "https://rubygems.org"\n';
    _.forEach(grunt.userConfig.compass.dependencies, function(v, e) {
      gemfileContent += 'gem "' + e + '", "' + v + '"\n';
    });
    grunt.file.write(path + '/Gemfile', gemfileContent);

    grunt.task.run(['exec:bundle:' + path]);
  });

  //////////////////////////////
  // Compass Extension
  //////////////////////////////
  grunt.registerTask('extension', 'Build your Compass Extension', function() {
    grunt.task.run(['bundler:.compass']);

    grunt.file.copy('bower.json', '.compass/templates/project/bower.json');
    grunt.file.copy('.editorconfig', '.compass/templates/project/editorconfig.txt');
    grunt.file.copy('.bowerrc', '.compass/templates/project/bowerrc.txt');
    grunt.file.copy('.jshintrc', '.compass/templates/project/jshintrc.txt');
    grunt.file.copy('.csslintrc', '.compass/templates/project/csslintrc.txt');

    // Add Styleguide to Gemfile
    var gemfile = grunt.file.read('Gemfile');
    gemfile += '\ngem "bar-style-guide", "~>' + grunt.userConfig.client.version + '"';
    grunt.file.write('.compass/templates/project/Gemfile.txt', gemfile);

    grunt.task.run(['parallel:ext', 'exec:ext']);

    var install = grunt.option('install');

    if (install) {
      grunt.task.run(['exec:install']);
    }
  });

  //////////////////////////////
  // Create Items from Templates
  //////////////////////////////
  grunt.registerTask('create-components', 'Build real component from template', function() {
    grunt.task.run(['generate-items:components']);
  });

  grunt.registerTask('create-layouts', 'Build real layout from template', function() {
    grunt.task.run(['generate-items:layouts']);
  });

  grunt.registerTask('generate-items', 'Build real components from component templates', function(type) {

    var items = (type === 'components') ? grunt.userConfig.components : (type === 'layouts') ? grunt.userConfig.layouts : {};
    var typeSubstring = type.substr(0, type.length - 1);
    items = (items !== undefined) ? items : {};

    // Loop over each item in components
    _.forEach(items, function(v, e) {
      // Grab the template prefix for this component
      var tmpl = _s.slugify(e);
      // Check to see if the template exists, and if not, create it
      var tmplPath = 'templates/' + type + '/' + tmpl + '.html';
      if (!grunt.file.exists(tmplPath)) {
	var tmplContent = '<!-- ' + _s.capitalize(type) + ': {{capitalize ' + typeSubstring + '}},  Type: {{capitalize type}} -->';
        grunt.file.write(tmplPath, tmplContent);
      }
      // Load the template from the templates directory
      var template = grunt.file.read(tmplPath);
      // Create Holder Partial
      var partial = '<div class="' + typeSubstring + '-group--' + tmpl + '">' +
'\n\n  {{#if page.examples}}' +
'\n    {{{create-example-sass "' + tmpl + '" all true "' + type + '"}}}' +
'\n  {{/if}}' +
'\n  <ul ' + type + '-list>' +
'\n    {{#each options.grunt.userConfig.' + type + '.' + tmpl + '}}' +
'\n      <li>' +
'\n        {{{component "' + tmpl + '" this "' + type + '"}}}' +
'\n\n        {{#if ../page.examples}}' +
'\n          {{{create-example-html "' + tmpl + '" ../this "' + type + '"}}}' +
'\n          {{{create-example-sass "' + tmpl + '" ../this false "' + type + '"}}}' +
'\n        {{/if}}' +
'\n      </li>' +
'\n    {{/each}}' +
'\n  </ul>' +
'\n</div>';
      grunt.file.write('partials/' + type + '/' + typeSubstring + '-group--' + tmpl + '.html', partial);

      var basePath = 'sass/' + type + '/_' + tmpl + '.scss';
      var varsPath = 'sass/' + type + '/' + tmpl + '/_variables.scss';
      var mixinPath = 'sass/' + type + '/' + tmpl + '/_mixins.scss';
      var extendsPath = 'sass/' + type + '/' + tmpl + '/_extends.scss';

      var supportHeader = '//////////////////////////////' +
'\n// ' + _s.capitalize(e) + ' ' + _s.capitalize(type) + ' {{type}}' +
'\n//////////////////////////////';
      var basePartial = '//////////////////////////////' +
'\n// ' + _s.capitalize(e) + ' ' + _s.capitalize(type) + '' +
'\n//' +
'\n// The partial and folder structure for this ' + type + ' should be as follows:' +
'\n// _' + tmpl + '.scss' +
'\n// ' + tmpl + ' (folder)' +
'\n//   _variables.scss' +
'\n//   _mixins.scss' +
'\n//   _extends.scss' +
'\n//' +
'\n// Automatic Sass parsing is done through special comment blocks' +
'\n//  - Start styling block for base ' + type + ': @{' + type + '}' +
'\n//  - End styling block for base ' + type + ':   {' + type + '}@' +
'\n//' +
'\n//  - Start styling block for specific ' + type + ' configuration: @{' + type + '--configuration}' +
'\n//  - End styling block for specific ' + type + ' configuration:   {' + type + '--configuration}@' +
'\n//////////////////////////////\n' +
'\n@import "' + tmpl + '/variables";' +
'\n@import "' + tmpl + '/mixins";' +
'\n@import "' + tmpl + '/extends";' +
'\n\n//////////////////////////////' +
'\n// Having $output-selectors and $output-selectors--' + tmpl + ' set to `true` will output the CSS selectors for ' + _s.capitalize(e) + '' + _s.capitalize(type) + '' +
'\n$output-selectors--' + tmpl + ': true !default;' +
'\n@if $output-selectors and $output-selectors--' + tmpl + '-' + typeSubstring + ' {' +
'\n//////////////////////////////' +
'\n\n//////////////////////////////' +
'\n// @{' + tmpl + '}' +
'\n// Styling for ' + _s.capitalize(e) + ' ' + _s.capitalize(type) + '' +
'\n\n// {' + tmpl + '}@' +
'\n//////////////////////////////\n\n';

      if (!grunt.file.exists(mixinPath)) {
        grunt.file.write(mixinPath, supportHeader.replace('{{type}}', 'Mixins'));
      }
      if (!grunt.file.exists(varsPath)) {
	grunt.file.write(varsPath, supportHeader.replace('{{type}}', 'Variables'));
      }
      if (!grunt.file.exists(extendsPath)) {
	grunt.file.write(extendsPath, supportHeader.replace('{{type}}', 'Extendable Classes'));
      }

      // Loop over each version of the component
      _.forEach(v, function(value, name) {
        var singleton = true;
        // If there are no properties to this component, set the name to the value
        if (typeof(name) === 'number') {
          name = value;
        }
        // If the name is an object, pluck off its key
        if (typeof(name) === 'object') {
          singleton = false;
          name = Object.keys(name)[0];
          value = value[name];
        }
        // Set up Name and Component Context
	var typeKey = typeSubstring;
	var typeVal = e;
	var context = JSON.parse('{"' + typeKey + '":"' + typeVal + '"}');
	context.type = name;
	// var context = {'type': name, typeSubstring: e};

        // Create comment for base partial if it the partial doesn't exist
        basePartial += '\n//////////////////////////////' +
'\n// @{' + tmpl + '--' + _s.slugify(name) + '}' +
'\n// ' + _s.capitalize(name) + ' styling for ' + _s.capitalize(e) + ' ' + _s.capitalize(type) + '' +
'\n\n// {' + tmpl + '--' + _s.slugify(name) + '}@' +
'\n//////////////////////////////\n\n';

        if (!singleton) {
          // Loop over each property of the component
          _.forEach(value, function(p, k) {
            // Set up key context in Handlebars
            context[k] = p;
          });
        }
        // Compile the template through Handlebars
        var hbCompile = Handlebars.compile(template);
        // Write component to disk
	grunt.file.write('partials/' + type + '/' + tmpl + '/' + tmpl + '--' + _s.slugify(name) + '.html', hbCompile(context));
      });
      // If the base partial doesn't exist, create it.
      basePartial += '}';
      if (!grunt.file.exists(basePath)) {
        grunt.file.write(basePath, basePartial);
      }
    });
  });
};