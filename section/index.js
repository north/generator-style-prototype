'use strict';

var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var chalk = require('chalk');
var inquirer = require("inquirer");

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
      console.log(chalk.yellow('Please restart `gulp` for your new section to be picked up'));
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
    //////////////////////////////
    // Create Section w/Yaml
    //////////////////////////////
    this.template('_section.yml', this.sectionSlug + '/' + this.sectionSlug + '.yml');

    //////////////////////////////
    // Add Section to Sections and save
    //////////////////////////////
    var sections = this.sections;
    sections[this.sectionSlug] = {
      title: this.sectionName
    }
    fs.writeFileSync('config/sections.yml', yaml.safeDump(sections));
    console.log('   ' + chalk.green('update ') + 'config/sections.yml');


  }
});

module.exports = SPSectionGenerator;