'use strict';

var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var chalk = require('chalk');
var gutil = require('gulp-util');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var path = require('path');
var validator = require('validator');
var dateFormat = require('dateformat');

var SPExtensionGenerator = yeoman.generators.Base.extend({
  init: function () {
    if (!fs.existsSync('Gulpfile.js')) {
      console.log(chalk.red('Please run this generator from the root of your Style Prototype'));
    }

    try {
      this.extension = yaml.safeLoad(fs.readFileSync('config/extension.yml', 'utf8'));
    }
    catch (e) {
      this.extension = [];
      this.gems = fs.readFileSync('Gemfile');
      if (e.name && e.name === 'YAMLException') {
        if (e.message) {
          console.log(chalk.red(e.message));
        }
      }
    }

    this.on('end', function () {
      // console.log(chalk.yellow('Please restart `gulp` in order for your new section to be picked up'));
    });
  },

  askFor: function () {
    var done = this.async();

    var _this = this;

    if (this.extension.length === 0) {
      var name = path.resolve('.').split('/').pop();
      this.humanName = _s.titleize(_s.humanize(name));
      this.camelName = _s.capitalize(_s.camelize(name));
      this.slugName = _s.slugify(name);

      var prompts = [
        {
          type: 'string',
          name: 'authorName',
          message: 'Author Name',
          validate: function (answer) {
            if (answer === '') {
              return 'Author Name cannot be empty';
            }
            else {
              return true;
            }
          }
        },
        {
          type: 'string',
          name: 'authorEmail',
          message: 'Author Email',
          validate: function (answer) {
            if (answer === '') {
              return 'Author Email cannot be empty';
            }
            else if (!validator.isEmail(answer)) {
              return 'Author Email needs to be an email address'
            }
            else {
              return true;
            }
          }
        },
        {
          type: 'string',
          name: 'homepage',
          message: 'Homepage',
          validate: function (answer) {
            if (answer === '') {
              return 'Homepage cannot be empty';
            }
            else if (!validator.isURL(answer)) {
              return 'Homepage needs to be a URL';
            }
            else {
              return true;
            }
          }
        },
        {
          type: 'string',
          name: 'license',
          message: 'License',
          default: 'MIT',
          validate: function (answer) {
            if (answer === '') {
              return 'License cannot be empty';
            }
            else {
              return true;
            }
          }
        }
      ];

      this.prompt(prompts, function (props) {
        this.authorName = props.authorName;
        this.authorEmail = props.authorEmail;
        this.homepage = props.homepage;
        this.license = props.license;
        this.version = '0.0.0';
        this.files = ['sass/**/*', 'images/**/*', 'fonts/**/*', 'js/**/*', 'bower.json', 'Gemfile']

        done();
      }.bind(this));

    }
    else {
      this.humanName = this.extension.project;
      this.camelName = _s.capitalize(_s.camelize(this.extension.project));
      this.slugName = _s.slugify(this.extension.project);
      this.authorName = this.extension.author.name;
      this.authorEmail = this.extension.authorEmail;
      this.homepage = this.extension.homepage;
      this.license = this.extension.license;
      this.version = this.extension.version;
      this.files = this.extension.files;

      done();
    }
  },

  files: function () {
    var now = new Date();
    this.date = dateFormat(now, 'yyyy-mm-dd');

    if (this.files.indexOf('lib/**/*') < 0) {
      this.files.push('lib/**/*');
    }
    var _files = this.files;
    var files = '';
    for (var j in _files) {
      if (j === 0) {
        files += 's.files = ["' + this.files[j] + '"]\n';
      }
      else {
        files += 's.files += ["' + this.files[j] + '"]\n';
      }
    }

    this.specFiles = files;

    var gemfile = decoder.write(fs.readFileSync('Gemfile')).split('\ngem ');
    var dependencyGems = '';
    var requireGems = '';
    for (var i in gemfile) {
      var split = gemfile[i].replace(/'/g, '').replace(/"/g, '').replace(/\n/g, '').replace(/\s/g, '').split(',');
      if (split[0].charAt(0) !== '#') {
        dependencyGems += 's.add_dependency("' + split[0] + '", ["' + split[1] + '"])\n';
        requireGems += "require '" + split[0] + "'\n";
      }
    }

    this.dependencyGems = dependencyGems;
    this.requireGems = requireGems;

    if (this.extension.length === 0) {
      var extension = {};
        extension.project = this.humanName;
        extension.version = this.version;
        extension.files = _files;
        extension.author = {};
        extension.author.name = this.authorName;
        extension.author.email = this.authorEmail;
        extension.homepage = this.homepage;
        extension.license = this.license;
      this.extension = yaml.safeDump(extension);
      this.template('_extension.yml', 'config/extension.yml');
    }

    this.template('_prototype.rb', 'lib/' + this.slugName + '.rb');
    this.template('_prototype.gemspec', this.slugName + '.gemspec');

  }
});

module.exports = SPExtensionGenerator;