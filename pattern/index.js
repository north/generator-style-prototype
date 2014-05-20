'use strict';

var yeoman = require('yeoman-generator');
var _s = require('underscore.string');
var yaml = require('js-yaml');
var fs = require('fs-extra');
var chalk = require('chalk');
var gutil = require('gulp-util');
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var SPPatternGenerator = yeoman.generators.Base.extend({
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
      // console.log(chalk.yellow('Please restart `gulp` in order for your new section to be picked up'));
    });
  },

  askFor: function () {
    var done = this.async();

    var _this = this;
    // var line = new inquirer.Separator().line;
    var sections = Object.keys(_this.sections);
    var place = '';

    // Array.prototype.forEach.apply(_this.sections, function (k, v) {
    //   console.log(k);
    // });

    // console.log(_this.sections);

    var prompts = [
      {
        type: 'list',
        name: 'section',
        message: 'What section would you like to create a pattern in?',
        choices: Object.keys(_this.sections),
        validate: function (answer) {
          place = answer;
        }
      }
    ];

    var pattern = [
      {
        type: 'string',
        name: 'pattern',
        message: 'Pattern Name',
        default: this.args.join(' '),
        validate: function (answer) {
          var path = _this.sectionSlug + '/' + _s.slugify(answer);
          if (answer === '') {
            return 'Pattern name cannot be empty';
          }
          if (fs.existsSync(path)) {
            return 'Pattern ' + answer + ' already exists!';
          }
          else {
            return true;
          }
        }
      }
    ];

    var  addPattern = function () {
      _this.prompt(pattern, function (props) {
        _this.patternName = _s.titleize(props.pattern);
        _this.patternSlug = _s.slugify(props.pattern);

        done();

      }.bind(_this));
    }

    this.prompt(prompts, function (props) {
      this.sectionSlug = props.section;
      this.sectionName = _s.titleize(props.section);

      addPattern();


    }.bind(this));
  },

  files: function () {
    var _this = this;
    //////////////////////////////
    // Create HTML for pattern
    //////////////////////////////
    this.template('_pattern.html', this.sectionSlug + '/' + this.patternSlug + '/' + this.patternSlug + '.html');

    //////////////////////////////
    // Create Sass for pattern
    //////////////////////////////
    var types = {
      'extends': 'Extendable Classes',
      'mixins': 'Mixins',
      'variables': 'Variable Defaults'
    };

    this.sectionLowercase = this.sectionName.toLowerCase();

    this.template('_main.scss', 'sass/partials/' + this.sectionSlug + '/_' + this.patternSlug + '.scss');
    for (var i in types) {
      var path = 'sass/partials/' + this.sectionSlug + '/' + this.patternSlug + '/_' + i + '.scss';
      if (!fs.existsSync(path)) {
        this.type = types[i];
        this.template('_sub.scss', path);
      }
    }

    //////////////////////////////
    // Import pattern partial
    //////////////////////////////
    var files = fs.readdirSync('sass');
    var imported = false;
    files.forEach(function (k, v) {
      var extension = k.split('.').pop();
      if (extension === 'scss' || extension === 'sass') {
        var content = decoder.write(fs.readFileSync('sass/' + k));
        var startSearch = '//////////////////////////////\n// ' + _this.sectionName.toUpperCase();
        var start = content.indexOf(startSearch);
        if (start >= 0) {
          var end = content.indexOf('//////////////////////////////', start + startSearch.length);

          var importString = '@import "partials/' + _this.sectionSlug + '/' + _this.patternSlug + '"';
          if (extension === 'scss') {
            importString += ';';
          }
          importString += '\n';

          var output = [content.slice(0, end), importString, content.slice(end)].join('')

          fs.writeFileSync('sass/' + k, output);
          gutil.log('Updated ' + gutil.colors.magenta('sass/' + k));
          imported = true;
        }
      }
    });

    if (!imported) {
      gutil.log('Now import ' + gutil.colors.magenta('partials/' + _this.sectionSlug + '/' + _this.patternSlug) + ' into your Sass file');
    }


  }
});

module.exports = SPPatternGenerator;