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
      return this.page.title + ' | ' + this.options.userConfig.project;
    }
    else {
      return this.options.userConfig.project;
    }
  }
};