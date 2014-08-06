'use strict';
var yeoman = require('yeoman-generator');

var SPStyleTileGenerator = yeoman.generators.Base.extend({
  build: function () {
    this.copy('style-tile.yml', 'pages/style-tile.yml');
    this.copy('style-tile.html', 'pages/style-tile.html');
  }
});

module.exports = SPStyleTileGenerator;
