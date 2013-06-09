'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);


  this.on('end', function () {
    if (options['git']) {
      // Git Init
      var repo = this.ghRepo;
      var projectDir = this.projectDir;
      spawn('git', ['init'], {cwd: this.projectDir}).on('close', function() {
        // If we have a GitHub Repo, we're going to add the remote origin as well
        if (repo) {
          spawn('git', ['remote', 'add', 'origin', repo], {cwd: projectDir}).on('close', function() {
            console.log("I've added the remote origin, pointing to " + projectDir);
          });
        }
        else {
          console.log("I've initialized Git for you.");
        }
      });
    }

    if (!options['skip-install']) {
      // Spawn commands
      // Each will output their buffer unless the --slient flag is passed
      // Also available, this.spawnCommand

      // Bundle Install
      spawn('bundle', ['install'], {cwd: this.projectDir}).stdout.on('data', function(data) {
        if (!options['silent']) {
          console.log(data.toString());
        }
      });

      // Bower Install
      spawn('bower', ['install'], {cwd: this.projectDir}).stdout.on('data', function(data) {
        if (!options['silent']) {
          console.log(data.toString());
        }
      });

      // NPM Install
      spawn('npm', ['install'], {cwd: this.projectDir}).stdout.on('data', function(data) {
        if (!options['silent']) {
          console.log(data.toString());
        }
      });

      // Log the install
      console.log("\nI'm all done! If your installs did not finish properly, run ".white + "bundle install & bower install & npm install".yellow + " to finish installation.");
    }
    else {
      var bye = "\n I'm all done! Now run ".white + "bundle install & bower install & npm install".yellow + " to finish installation.";
      console.log(bye);
    }
  });

  // var sys = require('sys');
  // var exec = require('child_process').exec;
  // function puts(error, stdout, stderr) {sys.puts(stdout)}

  // exec('bundle install', puts);

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
  console.log("\nOut of the box I include Sass+Compass, Generator for Handlebars templating and Markdown powered pages, Image Optimization, JavaScript Hinting and Minification, and CSS Linting. I also make publishing sites to GitHub Pages very easy. If you have any questions, ask my handler at https://github.com/Snugug/generator-armadillo.\n");

    var prompts = [
      {
        name: 'projectName',
        message: 'The name of your project. (Required)',
        default: '',
        warning: 'You did not name your project',
        required: true
      },
      {
        name: 'requireJS',
        message: 'Would you like to include RequireJS?',
        default: true,
        warning: 'Yes: RequireJS will be placed into the JavaScript vendor directory.'
      }
    ];

  if (this.options['git']) {
    prompts.push({
      name: 'ghRepo',
      message: 'Add Origin Git Remote? [ex: git@github.com:Snugug/generator-armadillo] (false)',
      default: '',
      warning: 'You did not include a GitHub Repo.',
      before: function(value) {
        if (value === '') {
          return false;
        }
        else {
          return value;
        }
      }
    });
  }

  prompts.push({
    name: 'ghDeploy',
    message: 'Are you going to deploy to GitHub?',
    default: true,
    warning: 'You did not specify if you\'re going to deploy to GitHub'
  });

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.projectName = props.projectName;
    this.projectSlug = this.projectName.toLowerCase().replace(/\s+/g, '-');
    this.ghRepo = props.ghRepo;
    // this.devHost = props.devHost;
    // this.devPort = props.devPort;
    this.requireJS = props.requireJS;
    this.ghDeploy = props.ghDeploy;

    this.projectDir = './';
    if (this.options['new-dir']) {
      this.projectDir = this.projectSlug + '/';
    }


    cb();
  }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('_gruntfile.js', this.projectDir + 'Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', this.projectDir + 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', this.projectDir + '.gitignore');
  this.copy('gitattributes', this.projectDir + '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', this.projectDir + '.bowerrc');
  this.template('_bower.json', this.projectDir + 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', this.projectDir + '.jshintrc');
};

AppGenerator.prototype.csslint = function csslint() {
  this.copy('csslintrc', this.projectDir + '.csslintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', this.projectDir + '.editorconfig');
};

// AppGenerator.prototype.h5bp = function h5bp() {
//   // this.copy('favicon.ico', 'app/favicon.ico');
//   // this.copy('404.html', 'pages/404.html');
//   // this.copy('robots.txt', 'pages/robots.txt');
//   // this.copy('htaccess', 'pages/.htaccess');
// };

AppGenerator.prototype.app = function app() {
  this.copy('helpers.js', this.projectDir + 'helpers.js');
  this.copy('Gemfile', this.projectDir + 'Gemfile');
  this.copy('system.json', this.projectDir + '.system.json');
  this.template('_config.json', this.projectDir + 'config.json');

  this.mkdir(this.projectDir + 'images');
  this.directory('sass', this.projectDir + 'sass');
  this.directory('pages', this.projectDir + 'pages');

  this.template('index.html', this.projectDir + 'templates/index.html');
  this.template('main.js', this.projectDir + 'js/main.js');
};