# Armadillo Generator

```
             ,.-----__
          ,:::://///,:::-.
        /:''/////// ``:::`;/|/      .------------------.
       /'   ||||||     :://'`\      | I'm an Armadillo |
      .' ,   ||||||     `/(  e \    |------------------'
-===~__-'\__X_`````\_____/~`-._ `.  /
            ~~        ~~       `~-'
```

Yeoman generator for scaffolding out a static site. Designed to make it easy to write great code and easily publish static sites to GitHub Pages.


## Getting Started

- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo grunt-cli bower`
- Install the generator: `npm install -g generator-armadillo`
- Run: `yo armadillo` to create your project
	- Project Name: Your Project's Name.
	- RequireJS: Includes [Require.js](http://requirejs.org/) (defaults `true`)
	- GitHub Pages: Whether or not you'll be publishing to GitHub Pages (defaults `true`)

## Using Armadillo

To develop your site, run `grunt server` to run a development server. Include `--launch` to launch the site after the server has started.
To package your site, run `grunt build`. This will package your site for production. Include `--commit` or `--commit="message"` to automatically commit the packaged site into your Git version control
To deploy your site to GitHub Pages, run `grunt deploy` after you've built your site.
If you would like to export your packaged site, run `grunt export`. This will export your packaged site to an `export` folder. If you would like to choose where to export the package to, include `--to="~/path/to/destination"`.

## Helper Functions

Armadillo comes with helper functions for use in your HTML and Markdown pages to ease development.

* `{{image-url 'foo.png'}}`: Absolute path to an image in your Images directory. The file included should be relative to that directory.
* `{{script-url 'foo.js'}}`: Absolute path to a JavaScript file in your JavaScript directory. The file should be relative to that directory.
* `{{style-url 'foo.css'}}`: Absolute path to a CSS file in your CSS directory. The file should be relative to that directory, or it's relative path from your Sass directory (as the CSS will be compiled from your Sass)
* `{{component-url 'foo/foo.js'}}`: Absolute path to a file from a component in your Component directory. The file should be relative to that directory
* `{{{style-ext 'foo.css'}}}`: Writes a `<link>` tag to that CSS file. Can write as `{{{ext-style 'foo/foo.css' true}}}` to specify it's from a component. Paths should be relative to either the CSS directory or the Component directory.
* `{{{script-ext 'foo.js'}}}`: Writes a `<script>` tag to that JS file. Can write as `{{{ext-script 'foo/foo.js' true}}}` to specify it's from a component. Paths should be relative to either the JS directory or the Component directory.
* `{{page-title}}`: Writes out the page title, in the form of `Page Title | Project Name` for pages with a specified Page Title or `Project Name` if it doesn't. Used for setting the `<title>` tag in the `<head>`.

## Basic Configuration

There is a `config.json` file that will allow you to control many of the aspects of Armadillo.

* **project**: The name of your project. Will be used for your site's page title
* **server**
	* *port*: The port the development server will run from
* **export**
	* *path*: The default path for `grunt export` to export to.
	* *assetPrefix*: A prefix for all assets when used through the asset helper functions. When using GitHub Pages, this will be the name of your GitHub project.
* **compass**
	* *debugInfo*: Whether you would like Sass Debug Info enabled during development
	* *extensions*: A list of Compass extensions you'd like to include. This replaces `require "extension"` that would go in your `config.rb` file.
	* *importPaths*: A list of additional import paths, mostly for use with Bower Components
* **git**
	* *defaultCommit*: The default commit message if you run `grunt build --commit`.
	* *deployUpstream*: The upstream remote name. Will only see this if you're deploying to GitHub
	* *deployBranch*: The branch you're deploying to. This uses a git subtree method, so this branch should be empty. Will only see this if you're deploying to GitHub

## Advanced Configuration

There is a `.system.json` file that has advanced system-level settings that, if you change, will change many things throughout the project, so change with care. 

* **generator**
	* *pagesDir*: The directory of your content pages.
	* *templatesDir*: The directory of your page templates.
	* *partialsDir*: The directory of your partials
	* *helpers*: The file name of your helper JavaScript file
* **assets**
	* *imagesDir*: Images directory
	* *cssDir*: CSS Directory
	* *sassDir*: Sass Directory
	* *jsDir*: JavaScript Directory
	* *fontsDir*: Fonts Directory
	* *componentsDir*: Bower Components Directory
* **server**
	* *root*: Your web root directory
* **export**
	* *distPath*: Your build path directory

## Configuring JSHint and CSS Lint

Armadillo will help you make your code better by running your JavaScript through [JSHint](http://jshint.com/) and your CSS through [CSS Lint](http://csslint.net/). You can configure JSHint by editing `.jshintrc` and CSS Lint by editing `.csslintrc`.
	

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
