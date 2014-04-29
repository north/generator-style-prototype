'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var check = require('validator').check;
var chalk = require('chalk');


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
      // var projectDir = this.projectDir;
      // spawn('bundle', ['install'], {cwd: this.projectDir}).stdout.on('data', function(data) {
      //   if (!options['silent']) {
      //     console.log(data.toString());
      //   }
      // }).on('close', function() {
      //   if (options['git'] && options['commit']) {
      //     spawn('git', ['add', '.'], {cwd: projectDir}).on('close', function() {
      //       spawn('git', ['commit', '-m', '"Initial Commit"'], {cwd: projectDir});
      //     });
      //   }
      // });

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
      console.log("\nI'm all done! If your installs did not finish properly, run " + chalk.yellow("bower install & npm install") + " to finish installation.");
    }
    else {
      var bye = "\n I'm all done! Now run " + chalk.yellow("bower install & npm install") + " to finish installation.";
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
  chalk.magenta('\n ______     ______   __  __     __         ______') +
  chalk.magenta('\n/\\  ___\\   /\\__  _\\ /\\ \\_\\ \\   /\\ \\       /\\  ___\\      ') + chalk.yellow.bold('D  B  S  i') +
  chalk.magenta('\n\\ \\___  \\  \\/_/\\ \\/ \\ \\____ \\  \\ \\ \\____  \\ \\  __\\      ') + chalk.yellow.bold('e  u  i  n') +
  chalk.magenta('\n \\/\\_____\\    \\ \\_\\  \\/\\_____\\  \\ \\_____\\  \\ \\_____\\    ') + chalk.yellow.bold('s  i  g') +
  chalk.magenta('\n  \\/_____/') + chalk.cyan('_') + chalk.magenta('   ')+ chalk.cyan('_') + chalk.magenta('\\/_/') + chalk.cyan('_') + chalk.magenta('  \\/_____/   \\/_____/')+ chalk.cyan('_') + chalk.magenta('  \\/_____/    ') + chalk.yellow.bold('i  l  n  B') +
  chalk.cyan('\n    /_____/\\ /_____/\\  /_____/\\ /________/\\/_____/\\') + chalk.yellow.bold('     g  d     r') +
  chalk.cyan('\n    \\:::_ \\ \\\\:::_ \\ \\ \\:::_ \\ \\\\__.::.__\\/\\:::_ \\ \\') + chalk.yellow.bold('    n     o  o') +
  chalk.cyan('\n     \\:(_) \\ \\\\:(_) ) )_\\:\\ \\ \\ \\  \\::\\ \\   \\:\\ \\ \\ \\') + chalk.yellow.bold('         f  w') +
  chalk.cyan('\n      \\: ___\\/ \\: __ `\\ \\\\:\\ \\ \\ \\  \\::\\ \\   \\:\\ \\ \\ \\') + chalk.yellow.bold('        f  s') +
  chalk.cyan('\n       \\_\\/_____\\_\\/_\\_\\/_\\_____\\/_  \\__\\/__  \\_____\\/') + chalk.yellow.bold('           e') +
  chalk.cyan('\n        /________/\\/_/\\/_/\\ /_____/\\ /_____/\\ /_____/\\') + chalk.yellow.bold('           r') +
  chalk.cyan('\n        \\__.::.__\\/\\ \\ \\ \\ \\\\:::_ \\ \\\\::::_\\/_\\::::_\\/_') +
  chalk.cyan('\n           \\::\\ \\   \\:\\_\\ \\ \\\\:(_) \\ \\\\:\\/___/\\\\:\\/___/\\') +
  chalk.cyan('\n            \\::\\ \\   \\::::_\\/ \\: ___\\/ \\::___\\/_\\_::._\\:\\') +
  chalk.cyan('\n             \\::\\ \\    \\::\\ \\  \\ \\ \\    \\:\\____/\\ /____\\:\\') +
  chalk.cyan('\n              \\__\\/     \\__\\/   \\_\\/     \\_____\\/ \\_____\\/');

  console.log(welcome);
  console.log("\nOut of the box I include Sass+Compass, Generator for Handlebars templating and Markdown powered pages, Image Optimization, JavaScript Hinting and Minification, and CSS Linting. I also make publishing sites to GitHub Pages very easy. If you have any questions, ask my handler at https://github.com/Team-Sass/generator-style-prototype.\n");

    var prompts = [
      {
        name: 'clientName',
        message: 'The name of your client. (Required)',
        default: '',
        validate: function (input) {
          try {
            check(input).notEmpty();
          }
          catch (err) {
            return 'Please enter the name of your client';
          }
          return true;
        }
      },
      {
        name: 'clientHomepage',
        message: 'The client\'s URL. (Required)',
        default: '',
        validate: function (input) {
          try {
	    check(input).isUrl();
          }
          catch (err) {
            return 'Please enter a valid URL';
          }
          return true;
        }
      },
      {
        name: 'authorName',
        message: 'The author of the Style Prototype. (Required)',
        validate: function (input) {
          try {
            check(input).notEmpty();
          }
          catch (err) {
            return 'Please enter the name of the author';
          }
          return true;
        }
      },
      {
        name: 'authorEmail',
        message: 'The email address of the author. (Required)',
        default: '',
        validate: function (input) {
          try {
            check(input).isEmail();
          }
          catch (err) {
            return 'Please enter a valid email address';
          }
          return true;
        }
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
      message: 'Add Origin Git Remote? [ex: git@github.com:Team-Sass/generator-style-prototype] (false)'
    });
  }

  // prompts.push({
  //   name: 'ghDeploy',
  //   message: 'Are you going to deploy to GitHub?',
  //   default: true,
  //   warning: 'You did not specify if you\'re going to deploy to GitHub'
  // });

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.clientName = props.clientName;
    this.clientSlug = _s.slugify(this.clientName);
    this.clientCamelCase = this.clientName.replace(/\s+/g, '');
    this.clientHomepage = props.clientHomepage;
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    if (props.ghRepo === '') {
      props.ghRepo = false;
    }
    this.ghRepo = props.ghRepo;
    // this.devHost = props.devHost;
    // this.devPort = props.devPort;
    // this.requireJS = props.requireJS;
    this.ghDeploy = true;
    // this.ghDeploy = props.ghDeploy;

    this.projectDir = this.clientSlug + '/';
    if (this.options['init']) {
      this.projectDir = './';
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

AppGenerator.prototype.bundler = function bundler() {
  this.directory('bundle', this.projectDir + '.bundle');
  this.directory('bundle', this.projectDir + '.compass/.bundle');
}

// AppGenerator.prototype.h5bp = function h5bp() {
//   // this.copy('favicon.ico', 'app/favicon.ico');
//   // this.copy('404.html', 'pages/404.html');
//   // this.copy('robots.txt', 'pages/robots.txt');
//   // this.copy('htaccess', 'pages/.htaccess');
// };

AppGenerator.prototype.app = function app() {
  this.copy('helpers.js', this.projectDir + 'helpers.js');
  // this.copy('Gemfile', this.projectDir + 'Gemfile');
  this.copy('system.json', this.projectDir + '.system.json');
  this.template('_config.yml', this.projectDir + 'config.yml');

  this.directory('images', this.projectDir + 'images');
  this.directory('sass', this.projectDir + 'sass');
  this.template('_style-guide.scss', this.projectDir + 'sass/_' + this.clientSlug + '-style-guide.scss');
  this.template('_prototype.scss', this.projectDir + 'sass/prototype.scss');
  this.directory('pages', this.projectDir + 'pages');
  this.directory('partials', this.projectDir + 'partials');
  this.directory('templates', this.projectDir + 'templates');

  this.template('main.js', this.projectDir + 'js/main.js');
};

AppGenerator.prototype.compass = function compass() {
  var today = new Date();
  this.today = today.getFullYear() + '-' + ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);

  this.template('_extension.json', this.projectDir + '.extension.json');
  this.copy('styleguide.gemspec', this.projectDir + '.compass/.template/style-guide.gemspec');
  this.copy('styleguide.rb', this.projectDir + '.compass/.template/style-guide.rb');
  this.template('manifest.rb', this.projectDir + '.compass/templates/project/manifest.rb');
};