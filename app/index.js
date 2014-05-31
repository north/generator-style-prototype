'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');
var sh = require('execSync');
var shared = require('../shared.js');

var SPGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      //////////////////////////////
      // If the --init flag isn't passed in, move into project dir
      //////////////////////////////
      if (!this.options['init']) {
        process.chdir(this.projectFolder);
      }

      var dir = this.projectFolder;

      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        sh.run('bundle install --path vendor');
        this.installDependencies({
          callback: function () {
            console.log('\n\nRunning ' + chalk.yellow('gulp init') + ' for you to initialize your project. If this fails, try running the command yourself\n\n');
            sh.run('gulp init');
            console.log('\u001b[2J\u001b[0;0H');
            console.log(chalk.yellow('★ ') + chalk.green('Installation Complete!\n') +
              '  ▪ Move into the ' + chalk.cyan(dir) + ' directory\n' +
              '  ▪ Run ' + chalk.yellow('gulp') + ' to start working with Style Prototypes!');
          }
        });
      }

      //////////////////////////////
      // If the --git flag is passed, initialize git and add for initial commit
      //////////////////////////////
      if (this.options['git']) {
        sh.run('git init');
        sh.run('git add . && git commit -m "Style Prototype Generation"');
      }
    });
  },

  askFor: function () {
    var done = this.async();
    var welcome = shared.welcome();

    // Have SP greet the user
    this.log(welcome);

    this.log(chalk.magenta('\nA system to design in browser; a companion for North. ') + chalk.cyan('http://pointnorth.io\n'));

    var prompts = [{
      type: 'string',
      name: 'projectName',
      message: 'What\'s your project\'s name?' + chalk.red(' (Required)'),
      validate: function (input) {
        if (input === '') {
          return 'Please enter your project\'s name';
        }
        return true;
      }
    }];

    if (!this.options['atomic'] && !this.options['north']) {
      prompts.push(
        {
          type: 'list',
          name: 'projectType',
          message: 'Would you like to include a base folder structure?',
          choices: ['North', 'Atomic Design', 'None'],
          default: 'North'
        }
      );
    }


    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectSlug = _s.slugify(this.projectName);

      //////////////////////////////
      // Initialization Options
      //////////////////////////////
      this.projectFolder = this.options['init'] ? './' : this.projectSlug + '/';
      if (this.options['north']) {
        this.projectType = 'north'
      }
      else if (this.options['atomic']) {
        this.projectType = 'atomic-design';
      }
      else {
        this.projectType = _s.slugify(props.projectType) === 'none' ? null : _s.slugify(props.projectType);
      }

      done();
    }.bind(this));
  },

  dotfiles: function () {
    //////////////////////////////
    // Code Quality
    //////////////////////////////
    this.copy('bowerrc', this.projectFolder + '.bowerrc');
    this.copy('csslintrc', this.projectFolder + '.csslintrc');
    this.copy('jshintrc', this.projectFolder + '.jshintrc');
    this.copy('editorconfig', this.projectFolder + '.editorconfig');

    //////////////////////////////
    // Git
    //////////////////////////////
    this.copy('gitattributes', this.projectFolder + '.gitattributes');
    this.copy('gitignore', this.projectFolder + '.gitignore');
  },

  managers: function () {
    //////////////////////////////
    // Managers
    //////////////////////////////
    this.template('_bower.json', this.projectFolder + 'bower.json');
    this.template('_package.json', this.projectFolder + 'package.json');
    this.copy('Gemfile', this.projectFolder + 'Gemfile');

    //////////////////////////////
    // Runners and Settings
    //////////////////////////////
    this.copy('Gulpfile.js', this.projectFolder + 'Gulpfile.js');
    this.copy('config.rb', this.projectFolder + 'config.rb');

    //////////////////////////////
    // Index
    //////////////////////////////
    this.template('_index.html', this.projectFolder + 'index.html');
  },

  prototypes: function () {
    //////////////////////////////
    // Folders
    //////////////////////////////
    if (this.projectType !== null) {
      this.directory(this.projectType, this.projectFolder);
    }
    else {
      this.copy('sections.yml', this.projectFolder + 'config/sections.yml');
    }

    //////////////////////////////
    // Config
    //////////////////////////////
    // this.copy('sections.yml', this.projectFolder + 'config/sections.yml');
    this.copy('style-tile.yml', this.projectFolder + 'config/style-tile.yml');
    this.copy('deploy.yml', this.projectFolder + 'config/deploy.yml');
  },

  sass: function () {
    // Move Style over
    if (this.projectType === 'north') {
      this.directory('base', this.projectFolder + 'sass/partials/components');
      this.copy('north.scss', this.projectFolder + 'sass/' + this.projectSlug + '.scss');
    }
    else if (this.projectType === 'atomic-design') {
      this.directory('base', this.projectFolder + 'sass/partials/atoms');
      this.copy('atomic.scss', this.projectFolder + 'sass/' + this.projectSlug + '.scss');
    }
    else {
      this.copy('default.scss', this.projectFolder + 'sass/' + this.projectSlug + '.scss');
    }


    // Loop over each Sass folder and throw a Sass file there
    var globals = ['variables', 'functions', 'mixins', 'extends'];
    for (var i in globals) {
      this.copy('all.scss', this.projectFolder + 'sass/partials/global/_' + globals[i] + '.scss');
      this.copy('gitkeep', this.projectFolder + 'sass/partials/global/' + globals[i] + '/.gitkeep');
    }
  },

  gitkeep: function () {
    // Loop over each folder and add a gitkeep
    var keep = ['sass', 'images', 'fonts', 'js', 'sass/partials', 'sass/enhancements', 'sass/fallbacks'];

    if (this.projectType === 'north') {
      keep.push('sass/partials/components', 'sass/partials/layouts')
    }
    else if (this.projectType === 'atomic-design') {
      keep.push('sass/partials/atoms', 'sass/partials/molecules', 'sass/partials/organisms', 'sass/partials/templates');
    }

    for (var i in keep) {
      this.copy('gitkeep', this.projectFolder + keep[i] + '/.gitkeep');
    }
  }

});

module.exports = SPGenerator;
