'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var check = require('validator').check;


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
  '\n ______     ______   __  __     __         ______'.magenta +
  '\n/\\  ___\\   /\\__  _\\ /\\ \\_\\ \\   /\\ \\       /\\  ___\\      '.magenta + 'D  B  S  i'.yellow.bold +
  '\n\\ \\___  \\  \\/_/\\ \\/ \\ \\____ \\  \\ \\ \\____  \\ \\  __\\      '.magenta + 'e  u  i  n'.yellow.bold +
  '\n \\/\\_____\\    \\ \\_\\  \\/\\_____\\  \\ \\_____\\  \\ \\_____\\    '.magenta + 's  i  g'.yellow.bold +
  '\n  \\/_____/'.magenta+ '_'.cyan + '   '.magenta+ '_'.cyan + '\\/_/'.magenta+ '_'.cyan + '  \\/_____/   \\/_____/'.magenta+ '_'.cyan + '  \\/_____/    '.magenta + 'i  l  n  B'.yellow.bold +
  '\n    /_____/\\ /_____/\\  /_____/\\ /________/\\/_____/\\'.cyan + '     g  d     r'.yellow.bold +
  '\n    \\:::_ \\ \\\\:::_ \\ \\ \\:::_ \\ \\\\__.::.__\\/\\:::_ \\ \\'.cyan + '    n     o  o'.yellow.bold +
  '\n     \\:(_) \\ \\\\:(_) ) )_\\:\\ \\ \\ \\  \\::\\ \\   \\:\\ \\ \\ \\'.cyan + '         f  w'.yellow.bold +
  '\n      \\: ___\\/ \\: __ `\\ \\\\:\\ \\ \\ \\  \\::\\ \\   \\:\\ \\ \\ \\'.cyan + '        f  s'.yellow.bold +
  '\n       \\_\\/_____\\_\\/_\\_\\/_\\_____\\/_  \\__\\/__  \\_____\\/'.cyan + '           e'.yellow.bold +
  '\n        /________/\\/_/\\/_/\\ /_____/\\ /_____/\\ /_____/\\'.cyan + '           r'.yellow.bold +
  '\n        \\__.::.__\\/\\ \\ \\ \\ \\\\:::_ \\ \\\\::::_\\/_\\::::_\\/_'.cyan +
  '\n           \\::\\ \\   \\:\\_\\ \\ \\\\:(_) \\ \\\\:\\/___/\\\\:\\/___/\\'.cyan +
  '\n            \\::\\ \\   \\::::_\\/ \\: ___\\/ \\::___\\/_\\_::._\\:\\'.cyan +
  '\n             \\::\\ \\    \\::\\ \\  \\ \\ \\    \\:\\____/\\ /____\\:\\'.cyan +
  '\n              \\__\\/     \\__\\/   \\_\\/     \\_____\\/ \\_____\\/'.cyan;

  console.log(welcome);
  console.log("\nOut of the box I include Sass+Compass, Generator for Handlebars templating and Markdown powered pages, Image Optimization, JavaScript Hinting and Minification, and CSS Linting. I also make publishing sites to GitHub Pages very easy. If you have any questions, ask my handler at https://github.com/Snugug/generator-armadillo.\n");

    var prompts = [
      {
        name: 'clientName',
        message: 'The name of your client. (Required)',
        default: '',
        warning: 'You did include your client name.',
        required: true
      },
      {
        name: 'clientHomepage',
        message: 'The client\'s URL. (Required)',
        default: '',
        warning: 'You need to include your client URL',
        required: true,
        validate: function(value) {
          console.log(value);
          return false;
        }
      },
      {
        name: 'authorName',
        message: 'The author of the Style Prototype. (Required)',
        default: '',
        warning: 'You did not include the author',
        required: true
      },
      {
        name: 'authorEmail',
        message: 'The email address of the author. (Required)',
        default: '',
        warning: 'You did not include the author email address',
        required: true
      }
      //,
      // {
      //   name: 'requireJS',
      //   message: 'Would you like to include RequireJS?',
      //   default: true,
      //   warning: 'Yes: RequireJS will be placed into the JavaScript vendor directory.'
      // }
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
    this.clientName = props.clientName;
    this.clientSlug = _s.slugify(this.clientName);
    this.clientCamelCase = this.clientName.replace(/\s+/g, '');
    this.clientHomepage = props.clientHomepage;
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.ghRepo = props.ghRepo;
    // this.devHost = props.devHost;
    // this.devPort = props.devPort;
    // this.requireJS = props.requireJS;
    this.ghDeploy = props.ghDeploy;

    this.projectDir = './';
    if (this.options['new-dir']) {
      this.projectDir = this.clientSlug + '/';
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
  this.template('_config.yml', this.projectDir + 'config.yml');

  this.mkdir(this.projectDir + 'images');
  this.directory('sass', this.projectDir + 'sass');
  this.mkdir(this.projectDir + 'sass/partials');
  this.directory('pages', this.projectDir + 'pages');

  this.template('index.html', this.projectDir + 'templates/index.html');
  this.template('main.js', this.projectDir + 'js/main.js');
};

AppGenerator.prototype.compass = function compass() {
  var today = new Date();
  this.today = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);

  this.copy('extension.json', this.projectDir + '.extension.json');
  this.template('styleguide.gemspec', this.projectDir + '.compass/' + this.clientSlug + '-styleguide.gemspec');
  this.copy('styleguide.rb', this.projectDir + '.compass/.template/' + this.clientSlug + '-styleguide.rb');
};