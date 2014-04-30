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
      if (!this.options['skip-install']) {
        if (!this.options['init']) {
          process.chdir(this.projectFolder);
        }
        sh.run('bundle install --path vendor');
        this.installDependencies();
      }

      this.log(chalk.magenta('Git: ' + this.git));

      // if (this.options['git']) {
      //   if (!this.options['init']) {
      //     process.chdir(this.projectFolder);
      //   }
      //   sh.run('git init');
      // }
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

    if (!this.options['atomic-design'] && !this.options['north']) {
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
      else if (this.options['atomic-design']) {
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
  },

  sass: function () {
    // Move Style over
    this.copy('style.scss', this.projectFolder + 'sass/' + this.projectSlug + '.scss');

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