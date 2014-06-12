'use strict';

var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var chalk = require('chalk');
var inquirer = require("inquirer");
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var SPSectionGenerator = yeoman.generators.Base.extend({
  init: function () {
    try {
      this.sections = yaml.safeLoad(fs.readFileSync('config/sections.yml', 'utf8'));
    }
    catch (e) {
      if (e.errno && e.errno === 34) {
        console.log(chalk.red('Please run this generator from the root of your Style Prototype'));
      }
      else if (e.name && e.name === 'YAMLException') {
        if (e.message) {
          console.log(chalk.red(e.message));
        }
      }
    }

    this.on('end', function () {
      console.log(chalk.yellow('Please restart `gulp` in order for your new section to be picked up'));
    });
  },

  askFor: function () {
    var done = this.async();

    var _this = this;
    var line = new inquirer.Separator().line;

    var name = [
      {
        type: 'string',
        name: 'name',
        message: 'Section Name',
        default: this.args.join(' '),
        validate: function (answer) {
          if (answer === '') {
            return 'Section name cannot be empty';
          }
          if (_this.section === undefined) {
            return true;
          }
          if (Object.keys(_this.sections).indexOf(_s.slugify(answer)) > -1) {
            return 'Section ' + answer + ' already exists!';
          }
          else {
            return true;
          }
        }
      }
    ];

    this.prompt(name, function (props) {
      this.sectionName = _s.titleize(props.name);
      this.sectionSlug = _s.slugify(props.name);
      done();
    }.bind(this));
  },

  files: function () {
    var _this = this;

    //////////////////////////////
    // Create Section w/Yaml
    //////////////////////////////
    this.template('_section.yml', this.sectionSlug + '/' + this.sectionSlug + '.yml');

    //////////////////////////////
    // Add Section to Sections and save
    //////////////////////////////
    var sections = this.sections;
    if (sections === null) {
      sections = {};
    }
    sections[this.sectionSlug] = {
      title: this.sectionName
    }
    fs.writeFileSync('config/sections.yml', yaml.safeDump(sections));
    console.log('   ' + chalk.green('update ') + 'config/sections.yml');

    //////////////////////////////
    // Create Section Partial Hook
    //////////////////////////////
    var files = fs.readdirSync('sass');
    files.forEach(function (k, v) {
      var extension = k.split('.').pop();
      if (extension === 'scss' || extension === 'sass') {
        var content = decoder.write(fs.readFileSync('sass/' + k));
        var startSearch = '//////////////////////////////\n// ' + _this.sectionName.toUpperCase();
        var start = content.indexOf(startSearch);
        if (start < 0) {
          content += '\n\n' + startSearch + '\n\n' + '//////////////////////////////\n'

          fs.writeFileSync('sass/' + k, content);
          console.log('   ' + chalk.green('update ') + 'sass/' + k);
        }
      }
    });
  }
});

module.exports = SPSectionGenerator;
