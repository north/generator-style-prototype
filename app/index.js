'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // // setup the test-framework property, Gruntfile template will need this
  // this.testFramework = options['test-framework'] || 'mocha';

  // // for hooks to resolve on mocha by default
  // if (!options['test-framework']) {
  //   options['test-framework'] = 'mocha';
  // }

  // // resolved to mocha by default (could be switched to jasmine for instance)
  // this.hookFor('test-framework', { as: 'app' });

  // this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  // this.mainJsFile = '';
  // this.mainCoffeeFile = 'console.log "\'Allo from CoffeeScript!"';

  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  // this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var welcome =
  '\n             ,.-----__'.red +
  '\n          ,:::://///,:::-.'.red +
  '\n        /:\'\'/////// ``:::`;/|/'.red + '     .------------------.'.magenta +
  '\n       /\'   ||||||     :://\'`\\'.red + '     | '.magenta + 'I\'m an Armadillo'.yellow.bold + ' |'.magenta +
  '\n      .\' ,   ||||||     `/(  '.red + 'e'.white + ' \\'.red + '   \'------------------\'' .magenta +
  '\n-===~__-\'\\__X_`````\\_____/~`-._ `.'.red + '  '.magenta +
  '\n            ~~        ~~       `~-\''.red + '\n';

  console.log(welcome);
  console.log('Out of the box I include Sass+Compass, Generator for Handlebars templating and Markdown powered pages, Image Optimization, JavaScript Hinting and Minification, and CSS Linting. I\'m also designed to make ');

  var prompts = [
  {
    name: 'projectName',
    message: 'The name of your project. (Required)',
    default: '',
    warning: 'You did not name your project',
    required: true
  },
  // {
  //   name: 'ghRepo',
  //   message: 'The name of your GitHub Repo.',
  //   default: '',
  //   warning: 'You did not include a GitHub Repo.',
  //   before: function(value) {
  //     if (value === '') {
  //       return false;
  //     }
  //     else {
  //       return value;
  //     }
  //   }
  // },
  // {
  //   name: 'devHost',
  //   message: 'The hostname for your local development server.',
  //   default: 'localhost',
  //   warning: 'You did not include a hostname.'
  // },
  // {
  //   name: 'devPort',
  //   message: 'The port for your local development server.',
  //   default: 8000,
  //   warning: 'You did not include a valid port.'
  // },
  {
    name: 'requireJS',
    message: 'Would you like to include RequireJS?',
    default: true,
    warning: 'Yes: RequireJS will be placed into the JavaScript vendor directory.'
  },
  {
    name: 'ghDeploy',
    message: 'Are you going to deploy to GitHub?',
    default: true,
    warning: 'You did not specify if you\'re going to deploy to GitHub'
  }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.projectName = props.projectName;
    this.projectSlug = this.projectName.toLowerCase().replace(' ', '-');
    // this.ghRepo = props.ghRepo;
    // this.devHost = props.devHost;
    // this.devPort = props.devPort;
    this.requireJS = props.requireJS;
    this.ghDeploy = props.ghDeploy;


    cb();
  }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('_gruntfile.js', 'Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

// AppGenerator.prototype.h5bp = function h5bp() {
//   // this.copy('favicon.ico', 'app/favicon.ico');
//   // this.copy('404.html', 'pages/404.html');
//   // this.copy('robots.txt', 'pages/robots.txt');
//   // this.copy('htaccess', 'pages/.htaccess');
// };

AppGenerator.prototype.app = function app() {
  this.copy('helpers.js');
  this.copy('Gemfile');
  this.copy('system.json', '.system.json');
  this.template('_config.json', 'config.json');

  this.mkdir('images');
  this.directory('sass');
  this.directory('pages');

  this.template('index.html', 'templates/index.html');
  this.template('main.js', 'js/main.js');
};