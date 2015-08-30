'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _s = require('underscore.string');
var shared = require('../shared.js');
var run = require('child_process').exec;


var SPGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      //////////////////////////////
      // If the --init flag isn't passed in, move into project dir
      //////////////////////////////
      var dir = this.projectFolder;

      //////////////////////////////
      // Install dependencies unless --skip-install is passed
      //////////////////////////////
      if (!this.options['skip-install']) {
        run('bundle install --path vendor')
              
        this.installDependencies({
          callback: function () {
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
        run('git init && git add . && git commit -m "Style Prototype Generation"');
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

  enforceFolderName: function () {
    this.projectFolder = this.options['init'] ? './' : this.projectSlug + '/';
    this.destinationRoot(this.projectFolder);
  },

  dotfiles: function () {
    //////////////////////////////
    // Code Quality
    //////////////////////////////
    this.copy('bowerrc', '.bowerrc');
    this.copy('csslintrc', '.csslintrc');
    this.copy('jshintrc', '.jshintrc');
    this.copy('editorconfig', '.editorconfig');

    //////////////////////////////
    // Git
    //////////////////////////////
    this.copy('gitattributes', '.gitattributes');
    this.copy('gitignore', '.gitignore');
  },

  managers: function () {
    //////////////////////////////
    // Managers
    //////////////////////////////
    this.template('_bower.json', 'bower.json');

    if (this.options['dev']) {
      this.template('_package-dev.json', 'package.json');
    }
    else {
      this.template('_package.json', 'package.json');
    }

    this.copy('Gemfile', 'Gemfile');

    //////////////////////////////
    // Runners and Settings
    //////////////////////////////
    if (this.options['dev']) {
      this.copy('Gulpfile-dev.js', 'Gulpfile.js');
    }
    else {
      this.copy('Gulpfile.js', 'Gulpfile.js');
    }

    this.copy('config.rb', 'config.rb');

    //////////////////////////////
    // Index
    //////////////////////////////
    if (this.options['dev']) {
      this.template('_index-dev.html', 'index.html');
    }
    else {
      this.template('_index.html', 'index.html');
    }

  },

  prototypes: function () {
    //////////////////////////////
    // Folders
    //////////////////////////////
    if (this.projectType !== null) {
      this.directory(this.projectType, './');
    }
    else {
      this.copy('sections.yml', 'config/sections.yml');
    }

    //////////////////////////////
    // Config
    //////////////////////////////
    // this.copy('sections.yml', 'config/sections.yml');
    // this.copy('style-tile.yml', 'config/style-tile.yml');
    this.invoke('style-prototype:style-tile');
    this.copy('deploy.yml', 'config/deploy.yml');
  },

  sass: function () {
    // Move Style over
    if (this.projectType === 'north') {
      this.directory('base', 'sass/partials/components');
      this.copy('north.scss', 'sass/' + this.projectSlug + '.scss');
    }
    else if (this.projectType === 'atomic-design') {
      this.directory('base', 'sass/partials/atoms');
      this.copy('atomic.scss', 'sass/' + this.projectSlug + '.scss');
    }
    else {
      this.copy('default.scss', 'sass/' + this.projectSlug + '.scss');
    }


    // Loop over each Sass folder and throw a Sass file there
    var globals = ['variables', 'functions', 'mixins', 'extends'];
    for (var i in globals) {
      this.copy('all.scss', 'sass/partials/global/_' + globals[i] + '.scss');
      this.copy('gitkeep', 'sass/partials/global/' + globals[i] + '/.gitkeep');
    }
  },

  gitkeep: function () {
    // Loop over each folder and add a gitkeep
    var keep = ['sass', 'images', 'fonts', 'js', 'sass/partials'];

    if (this.projectType === 'north') {
      keep.push('sass/partials/components', 'sass/partials/layouts')
    }
    else if (this.projectType === 'atomic-design') {
      keep.push('sass/partials/atoms', 'sass/partials/molecules', 'sass/partials/organisms', 'sass/partials/templates');
    }

    for (var i in keep) {
      this.copy('gitkeep', keep[i] + '/.gitkeep');
    }
  }

});

module.exports = SPGenerator;