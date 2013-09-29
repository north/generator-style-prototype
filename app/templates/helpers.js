var fs = require('fs');
var _s = require ('underscore.string');
var yaml = require('js-yaml');
var marked = require('marked');
marked.setOptions({
  gfm: true,
  langPrefix: 'language-',
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true
});

module.exports = {
  'image-url': function(src) {
    var path = this.options.assets;
    if (path === '/') {
      path = '';
    }
    return path + '/' + this.options.userConfig.assets.imagesDir + '/' + src;
  },
  'script-url': function(src) {
    var path = this.options.assets;
    if (path === '/') {
      path = '';
    }
    return path + '/' + this.options.userConfig.assets.jsDir + '/' + src;
  },
  'style-url': function(href) {
    var path = this.options.assets;
    if (path === '/') {
      path = '';
    }
    return path + '/' + this.options.userConfig.assets.cssDir + '/' + href;
  },
  'component-url': function(src) {
    var path = this.options.assets;
    if (path === '/') {
      path = '';
    }
    return path + '/' + this.options.userConfig.assets.componentsDir + '/' + src;
  },
  'style-ext': function(href, component) {
    var path = this.options.assets;
    if (path === '/') {
      path = '';
    }

    if (component.data === undefined) {
      path += '/' + this.options.userConfig.assets.componentsDir + '/';
    }
    else {
      path += '/' + this.options.userConfig.assets.cssDir + '/';
    }

    return '<link rel="stylesheet" href="' + path + href + '">';
  },
  'script-ext': function(src, component) {
    var path = this.options.assets;
    if (path === '/') {
      path = '';
    }

    if (component.data === undefined) {
      path += '/' + this.options.userConfig.assets.componentsDir + '/';
    }
    else {
      path += '/' + this.options.userConfig.assets.jsDir + '/';
    }

    return '<script src="' + path + src + '"></script>';
  },
  'page-title': function() {
    if (this.page.title) {
      return this.page.title + ' | ' + this.options.userConfig.client.name + ' Style Prototype';
    }
    else {
      return this.options.userConfig.client.name + ' Style Prototype';
    }
  },
  'classify': function(list) {
    return list.toString().replace(/,/g , ' ');
  },
  'show-example': function() {
    return this.page.examples;
  },
  'markdown': function(md) {
    return marked(md.fn(1));
  },
  'for': function(from, to, incr, block) {
    var accum = '';
    for (var i = from; i < to; i += incr) {
      accum += block.fn(i);
    }
    return accum;
  },
  'possible-pattern': function(index, src, context) {
    var output = "<li class='pattern-" + index + "'><img src='";

    var ext = src.match('^(http|https):\/\/');

    if (ext) {
      output += src;
    }
    else {
      output += context.options.assets + '/' + context.options.userConfig.assets.imagesDir + '/' + src;
    }

    output += "' alt='Patten " + index + "'></li>";

    return output;
  },
  'create-example-html': function(component, type) {
    var name = type;
    if (typeof(type) === 'object') {
      name = Object.keys(type)[0];
    }
    name = _s.slugify(name);

    var path = 'partials/components/' + component + '/' + component + '--' + name + '.html';
    var code = fs.readFileSync('templates/code.html').toString('utf-8');
    code = code.replace('{{summary}}', 'HTML Source');
    code = code.replace('{{language}}', 'markup');

    var file = fs.readFileSync(path).toString('utf-8');
    file = file.replace(new RegExp('<', 'g'), '&lt;');
    file = file.replace(new RegExp('>', 'g'), '&gt;');

    code = code.replace('{{code}}', file);

    return code;
  },
  'create-example-sass': function(component, type, support) {
    var name = type;
    if (typeof(type) === 'object') {
      name = Object.keys(type)[0];
    }
    name = _s.slugify(name);

    if (typeof(support) === 'object') {
      support = false;
    }

    if (support) {
      var mixins = 'sass/components/' + component + '/_mixins.scss';
      var extend = 'sass/components/' + component + '/_extends.scss';

      var mixinFile = '';
      var extendFile = '';

      var code = fs.readFileSync('templates/code.html').toString('utf-8');

      var mixinCode = '';
      var extendCode = '';

      if (fs.existsSync(mixins)) {
        mixinFile = fs.readFileSync(mixins).toString('utf-8') + '\n';

        mixinCode = code.replace('{{summary}}', 'Sass Mixin Source');
        mixinCode = mixinCode.replace('{{language}}', 'scss');
        mixinCode = mixinCode.replace('{{code}}', mixinFile);
      }
      if (fs.existsSync(extend)) {
        extendFile = fs.readFileSync(extend).toString('utf-8');

        extendCode = code.replace('{{summary}}', 'Sass Extend Source');
        extendCode = extendCode.replace('{{language}}', 'scss');
        extendCode = extendCode.replace('{{code}}', extendFile);
      }

      return mixinCode + extendCode;
    }
    else {
      var path = 'sass/components/_' + component + '.scss';

      var code = fs.readFileSync('templates/code.html').toString('utf-8');
      code = code.replace('{{summary}}', 'Sass Source');
      code = code.replace('{{language}}', 'scss');

      var file = fs.readFileSync(path).toString('utf-8');

      var startType = '// @{' + component + '}';
      var endType = '// {' + component + '}@';
      var typeFindLength = startType.length;
      var indexStartType = file.indexOf(startType) >= 0 ? file.indexOf(startType) + typeFindLength + 1 : false;
      var indexEndType = file.indexOf(endType) >= 0 ? file.indexOf(endType) : false;

      var startComp = '// @{' + component + '--' + name + '}';
      var endComp = '// {' + component + '--' + name + '}@';
      var compFindLength = startComp.length;
      var indexStartComp = file.indexOf(startComp) >= 0 ? file.indexOf(startComp) + compFindLength + 1 : false;
      var indexEndComp = file.indexOf(endComp) >= 0 ? file.indexOf(endComp) : false;

      var typeSass = indexStartType && indexEndType ? file.slice(indexStartType, indexEndType) + '\n' : '';

      var compSass = indexStartComp && indexEndComp ? file.slice(indexStartComp, indexEndComp) : '';

      var fullSass = typeSass + compSass;

      code = code.replace('{{code}}', fullSass);

      return code;
    }
  },
  'component': function(component, type) {

    var name = type;
    if (typeof(type) === 'object') {
      name = Object.keys(type)[0];
    }
    name = _s.slugify(name);

    var path = 'partials/components/' + component + '/' + _s.slugify(component) + '--' + name + '.html';

    var file = fs.readFileSync(path).toString('utf-8');

    return file;
  },
  'prototype-navigation': function(menu) {
    var basePath = this.options.assets;
    if (basePath === '/') {
      basePath = '';
    }
    var path = basePath + this.options.userConfig.generator.pagesDir + '/';

    var output = '';

    function recurseSections(obj) {
      for (var k in obj) {
        if (typeof(obj[k]) === 'object') {
          output += '<b role="menuitem" data-menu-toggle="closed">' + k + '</b>';
          output += '\n<div role="menubar">';
          recurseSections(obj[k]);
        }
        else {
          if (k !== 'undefined') {
            output += '\n<a href="' + basePath + '/' + obj[k] + '" role="menuitem">' + k + '</a>';
          }
        }
      }
      output += '\n</div>';
    }

    for (var k in menu) {
      if (typeof(k) === 'string' && typeof(menu[k] === 'string')) {
        var sectionsPath = path + menu[k];
        if (menu[k] !== '') {
          sectionsPath += '/';
        }
        sectionsPath += 'sections.yml';

        var file = fs.existsSync(sectionsPath);

        if (!file) {
          output += '\n<a href="' + basePath + '/' + menu[k] + '" role="menuitem">' + k + '</a>';
        }
        else {

          output += '\n<b role="menuitem" data-menu-toggle="closed">' + k + '</b>';

          file = fs.readFileSync(sectionsPath).toString('utf-8');
          output += '<div role="menubar">';
          output += '\n<a href="' + basePath + '/' + menu[k] + '" role="menuitem">' + k + '</a>';
          var sections = yaml.safeLoad(file);
          recurseSections(sections);
        }
      }
    }
    return output;
  }
};