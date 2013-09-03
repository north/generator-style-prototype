var fs = require('fs');
var _s = require ('underscore.string');
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
    return this.options.assets + '/' + this.options.userConfig.assets.imagesDir + '/' + src;
  },
  'script-url': function(src) {
    return this.options.assets + '/' + this.options.userConfig.assets.jsDir + '/' + src;
  },
  'style-url': function(href) {
    return this.options.assets + '/' + this.options.userConfig.assets.cssDir + '/' + href;
  },
  'component-url': function(src) {
    return this.options.assets + '/' + this.options.userConfig.assets.componentsDir + '/' + src;
  },
  'style-ext': function(href, component) {
    var path = this.options.assets;

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
  'create-example-html': function(type, component) {
    var name = component;
    if (typeof(component) === 'object') {
      name = Object.keys(component)[0];
    }
    name = _s.slugify(name);

    var path = 'partials/components/' + type + '/' + type + '--' + name + '.html';
    var code = fs.readFileSync('templates/code.html').toString('utf-8');
    code = code.replace('{{summary}}', 'HTML Source');
    code = code.replace('{{language}}', 'markup');

    var file = fs.readFileSync(path).toString('utf-8');
    file = file.replace(new RegExp('<', 'g'), '&lt;');
    file = file.replace(new RegExp('>', 'g'), '&gt;');

    code = code.replace('{{code}}', file);

    return code;
  },
  'component': function(type, component) {

    var name = component;
    if (typeof(component) === 'object') {
      name = Object.keys(component)[0];
    }
    name = _s.slugify(name);

    var path = 'partials/components/' + type + '/' + type + '--' + name + '.html';

    var file = fs.readFileSync(path).toString('utf-8');

    return file;
  }
};