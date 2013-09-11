```
 ______     ______   __  __     __         ______
/\  ___\   /\__  _\ /\ \_\ \   /\ \       /\  ___\
\ \___  \  \/_/\ \/ \ \____ \  \ \ \____  \ \  __\
 \/\_____\    \ \_\  \/\_____\  \ \_____\  \ \_____\
  \/_____/_   _\/_/_  \/_____/   \/_____/_  \/_____/
    /_____/\ /_____/\  /_____/\ /________/\/_____/\
    \:::_ \ \\:::_ \ \ \:::_ \ \\__.::.__\/\:::_ \ \
     \:(_) \ \\:(_) ) )_\:\ \ \ \  \::\ \   \:\ \ \ \
      \: ___\/ \: __ `\ \\:\ \ \ \  \::\ \   \:\ \ \ \
       \_\/_____\_\/_\_\/_\_____\/_  \__\/__  \_____\/
        /________/\/_/\/_/\ /_____/\ /_____/\ /_____/\
        \__.::.__\/\ \ \ \ \\:::_ \ \\::::_\/_\::::_\/_
           \::\ \   \:\_\ \ \\:(_) \ \\:\/___/\\:\/___/\
            \::\ \   \::::_\/ \: ___\/ \::___\/_\_::._\:\
             \::\ \    \::\ \  \ \ \    \:\____/\ /____\:\
              \__\/     \__\/   \_\/     \_____\/ \_____\/
```

**Design In Browser, Build In Browser, Sign Off In Browser**

Designing in browser is a long wished for goal but always has seemed just slightly out of reach. From the technical knowledge needed to set everything up to actually do the coding to getting sign off from clients, it seems like a daunting task to begin to do it. Style Prototypes aims to make the whole process much easier and much more approachable for everyone from Designers who don't know what a Git is to full on Unicorns. Style Prototypes grew from the wonderful Style Guide built by [Mason Wendell](http://twitter.com/codingdesigner) for his kick ass [Survival Kit](http://github.com/canarymason/survival-kit) and now constitutes a whole system for building [Style Tiles](http://styletil.es/), Style Guides, Component Guides, and Color Guides straight in browser. By leveraging the power of Sass, Compass, Yeoman, Grunt, and Bower, we are able have at our fingertips the tools necessary to sit back and just design. If you're a designer new to all of this, I've written up a [Designer's QuickStart Guide](https://github.com/Team-Sass/Style-Prototypes/blob/master/Designer's%20QuickStart%20Guide.md#designers-quickstart-guide) to get you started! Read it and enjoy it!

Style Prototypes are a unique tool because, not only are they responsive by default (meaning your client will be able to sign off on styles they've been able to see natively on all browsers and devices), they encourage Style and Color Guide driven Style Tile and Component Guide generation. This means that after you've built out your Style Tile, you'll be on your way to having finished your Style Guide, which you need to for [Style Guide Driven Design](https://speakerdeck.com/jina/style-guide-driven-ui-design-with-sass) (and coincidentally takes lots of design decisions off of the shoulders of Front End Developers). You'll also never need to have someone guess at what colors they can use with a fully built out Color Guide with both hex and Sass values.

Speaking of Sass values, the whole shebang is designed to be turned into a Compass Extension to easily distribute and reuse your finished Style Guide throughout your team in a way that doesn't require an additional website and inspectors flying all over the place. Truly drop in and use functionality. Yah, it's that awesome.

Come with me on this journey.

## Table of Contents

1. [Requirements](#requirements)
2. [Creating a Style Prototype](#creating-a-style-prototype)
3. [Anatomy of a Style Prototype](#anatomy-of-a-style-prototype)
	* [App Files and Folders](#app-files-and-folders)
	* [Design Files and Folders](#design-files-and-folders)
	* [Development Files and Folders](#development-files-and-folders)
4. [Running Style Prototypes](#running-style-prototypes)
	* [Development Server](#development-server)
	* [Exporting Final Site](#exporting-final-site)
	* [Changing Version Number](#changing-version-number)
	* [Creating a Compass Extension](#creating-a-compass-extension)
5. [Working with Style Prototypes](#working-with-style-prototypes)
	* [Handlebars](#handlebars)
	* [Sass+Compass](#sasscompass)
6. [Components](#components)
7. [Your Style Guide](#your-style-guide)
8. [Your Compass Extension](#your-compass-extension)
9. [License](#license)

## Requirements

Style Prototypes are available as a [Yeoman](http://yeoman.io/) Generator that utilizes [Sass](https://github.com/Snugug/training-glossary/wiki/Sass#head)+[Compass](https://github.com/Snugug/training-glossary/wiki/Compass#head). This makes it drop-dead easy to create a new Style Prototype. So, in order to use them, you first need to make sure you have the underlying dependencies installed.

* [Node.js](http://nodejs.org/)
* [Ruby](http://www.ruby-lang.org/) (at least version 1.8.7, pre-installed on Apple computers)
* [RubyGems](http://rubygems.org/pages/download) (pre-installed on Apple computers)
* [Git](http://git-scm.com/)

After you have installed the underlying dependencies, you need to install the generator dependencies. From your Command Line, type in the following:

```bash
npm install -g yo grunt-cli bower generator-style-prototype weinre
```

You may need to run these as an administrator. To do so, type `sudo` in front of both `gem` and `npm`. This command will install the Ruby gem [Bundler](http://gembundler.com/) for handling gem dependencies, Yeoman, [Grunt](http://gruntjs.com/), [Bower](http://bower.io/), and the Style Prototype generator.

#### Please Note
While a Unix based system (Mac, Linux, etc…, basically not Windows) isn't required *per se* to run Style Prototypes, some of the advanced functionality available uses Unix commands.

## Creating a Style Prototype

Once you have all of the dependencies installed, it's time to create a new Style Prototype. From the command line, type in the following:

```bash
yo style-prototype
```

This will start a wizard for you to set up your Style Prototype. There are four optional flags you can pass into this command:

* `--git`: Initializes the newly created Style Prototype with Git
* `--commit`: Automatically commits all files created by the installer under the commit `"Initial Commit"` when paired with the Git flag
* `--init`: Will install Style Prototypes to the current directory instead of creating a new directory
* `--skip-install`: Will skip the automatic installation of your Bundler, Bower, and Node dependencies. If you choose to skip the automatic installation, you can install the dependencies manually by running `bower install && bundle install && npm install` after completing the setup wizard

After you have started the wizard, you will be presented with a series of prompts to set up your Style Prototype:

* **Client Name**: The name of your client. Can use spaces
* **Client URL**: The URL of the final site. This is required for generating a Compass Extension
* **Author Name**: The author of the Style Prototype, either an individual's name or your agency's name.
* **Author Email**: An email that the author can be reached at.
* **Git Remote**: The Git `origin` remote you'd like to set. If not included, no remotes will be set. Only visible if the Git flag is included

Once you've filled out the wizard, Yeoman will work its magic and generate your Style Prototype for you!

## Anatomy of a Style Prototype

Upon install, a bunch of files and folders will be created for you. If you haven't run the dependency installation, please do so now. The files and folders are generally, divided into three categories: App, Design, and Development.

### App Files and Folders

Files and folders listed below are all part of the underlying system that make up Style Prototypes and generally should only ever be edited by advanced users. 

* **Gemfile/Gemfile.lock**: Ruby gems dependencies as dictated by [Bundler](http://gembundler.com/). Only edit the Gemfile, and be sure to keep `style-prototypes` available in the Gemfile, as it provides access to the following Compass extensions, some of which are needed for Style Prototypes to function properly:
	* [Breakpoint](https://github.com/team-sass/breakpoint) - Media Query Handling
	* [Singularity](https://github.com/Team-Sass/Singularity) - Fluid grid framework
	* [Color Schemer](https://github.com/Team-Sass/color-schemer) - Robust color toolset
	* [Sassy Strings](https://github.com/Snugug/Sassy-Strings) - Advanced string functions
	* [Toolkit](https://github.com/Team-Sass/toolkit) - Modern Web Development tools
	* [Sassy Buttons](http://jaredhardy.com/sassy-buttons/) - Fancy CSS3 Buttons
	* [Modular Scale](https://github.com/Team-Sass/modular-scale) - Ratio based calculations
	* [Compass Normalize](https://github.com/ksmandersen/compass-normalize) - CSS Normalize
* **bower.json**: The Bower configuration for components to be pulled in. *Do not change the version number in this file*
* **components/**: The folder where downloaded Bower components get placed
* **package.json**: The Node configuration for node modules to be pulled in. *Do not change the version number in this file*
* **node_modules/**: The folder where downloaded node modules get placed
* **.www/**: The webroot while you are developing. This should generally never be touched.
* **.dist/**: The distribution folder if you choose to build out a static version of your site. This should generally never be touched.
* **.system.json**: Advanced configuration settings. *Do not change the version number in this file*
* **helpers.js**: [Handlebars](http://handlebarsjs.com/) helper functions
* **Gruntfile.js**: Configuration file for Grunt. This is the brain of Style Prototypes.

### Design Files and Folders

Files and folders listed below make up the bread and butter of what you will be working with when using Style Prototypes. Everything listed below you should feel free to edit.

* **templates/**: The wrapper templates that the content of each page get put into
* **pages/**: The individual pages of your Style Prototype
* **partials/**: Pieces of reusable content to be used inside of pages
* **sass/**: Your style guide styling, as well as styling for the Style Prototype as a whole
* **images/**: The directory to hold images
* **js/**: The directory to hold custom JavaScript
* **config.yml**: Configuration file for your Style Prototype.

### Development Files and Folders

Files and folders listed below make up development-related files that should only be edited by users who understand their contents as they will affect how your output behaves.

* **.editorconfig**: Configuration file for editors to maintain coding standards
* **.jshintrc**: Configuration file for [JSHint](http://jshint.com/)
* **.csslintrc**: Configuration file for [CSS Lint](http://csslint.net/)
* **sass/.prototype/**: The folder that contains styling specific to the needs of the Style Prototype. Generally this shouldn't need to be touched.
* **.compass/**: The folder where your Compass extension will be built in. Generally should not need to be touched, but can be manually built/tweaked if preferred.

## Running Style Prototypes

Style Prototypes runs atop of Grunt, making doing things like running a development server and compiling your files easy.

### Development Server

You can run a development server to build on by running the following command:

```
grunt server
```

If you include `--launch`, it will also launch your site for you after the server is running. Your development server will be available at `localhost:8000` by default. Running the server will also listen for changes in Sass, HTML, Images, JavaScript, and Configuration and will do all necessary recompiling and reloading of the page for you. It also runs your CSS and JavaScript through CSS Lint and JSHint for you automatically.

### Exporting Final Site

Once you have your Style Prototype built, you can run the following command:

```
grunt build
```

This will build a static version of your assets for you. If you include `--commit` it will also automatically commit these files to your Git repository for you.

If you are planning on deploying your site to an external server, you can then run the following command:

```
grunt export
```

This will export your static assets to a folder (by default `export`). If you include the `--to=/path/to/export`, it will export to the folder of your choosing.

If you would like to deploy your final site to [GitHub pages](http://pages.github.com/), you can run the following command after having built your site using `grunt build`:

```
grunt deploy
```

### Changing Version Number

To properly change the version number of your Style Prototype, you should run one of the following commands:

* `grunt bump:major`: Backwards incompatible changes are made to your Style Prototype
* `grunt bump:minor`: Add new functionality to your Style Prototype, but the new functionality is backwards compatible
* `grunt bump:patch`: Backwards compatible bug fixes

Versioning is done in the style of [SemVer](http://semver.org/). In your `config.yml` file, under the Versioning heading, there are options for controlling if you'd like to automatically commit and tag your repository when you bump your project

### Creating a Compass Extension

One of the most useful features of Style Prototypes is being able to easily generate a Compass Extension from your developed Style Guide. This is made extremely easy with Grunt, simply run the following command:

```
grunt extension
```

This will build your Compass extension out of your Sass, Images, and JavaScript directory and include your `Gemfile`, `bower.json`, `.editorconfig`, `.jshintrc`, and `.csslintrc` files as well. If you include `--install`, it will install the Compass extension for you too.

## Working with Style Prototypes

When working with Style Prototypes, there are two main preprocessing languages you're working with, Sass and [Handlebars](http://handlebarsjs.com/). Sass is used for CSS and Handlebars is used for HTML. In addition, there are a handful of Grunt commands to allow you to work with and build your Style Prototypes.

### Handlebars

Handlebars is a JavaScript based HTML preprocessor. Anything you can do in Handlebars normally you can do in Style Prototypes. You can create custom helpers inside of `helpers.js` and, in addition to the standard helpers that come with Handlebars, the following are also available:

* `{{image-url 'foo.png'}}`: Absolute path to an image in your Images directory. The file included should be relative to that directory.
* `{{script-url 'foo.js'}}`: Absolute path to a JavaScript file in your JavaScript directory. The file should be relative to that directory.
* `{{style-url 'foo.css'}}`: Absolute path to a CSS file in your CSS directory. The file should be relative to that directory, or it's relative path from your Sass directory (as the CSS will be compiled from your Sass)
* `{{component-url 'foo/foo.js'}}`: Absolute path to a file from a component in your Component directory. The file should be relative to that directory
* `{{{style-ext 'foo.css'}}}`: Writes a `<link>` tag to that CSS file. Can write as `{{{ext-style 'foo/foo.css' true}}}` to specify it's from a component. Paths should be relative to either the CSS directory or the Component directory.
* `{{{script-ext 'foo.js'}}}`: Writes a `<script>` tag to that JS file. Can write as `{{{ext-script 'foo/foo.js' true}}}` to specify it's from a component. Paths should be relative to either the JS directory or the Component directory.
* `{{page-title}}`: Writes out the page title, in the form of `Page Title | Project Name` for pages with a specified Page Title or `Project Name` if it doesn't. Used for setting the `<title>` tag in the `<head>`.
* `{{classify ['foo', 'bar', 'baz']}}`: Will convert an array into a space separated list for use as a class
* `{{#markdown}}…{{/markdown}}`: Markdown filter as a block. Allows you to write Markdown within your non-markdown pages.
* `{{#for 0 1 1}}…{{/for}}`: For loop as a block; inputs are from, to, and increment.

In addition to handlebars pages, you can write [Markdown](https://help.github.com/articles/github-flavored-markdown) files and they will be converted into pages as well.

All pages that you create can contain at the top a JSON declaration to provide scoped variables to work with under the `page` variable (including Markdown files). These JSON declarations look like the following:

```json
{
  "title": "Hello World",
  "examples": false
}
---
```

### Sass+Compass

The bread and butter of your Style Prototype is your Style Guide. There are going to be two Sass files in your Sass directory, one called `prototype.scss` and a style guide partial named after your client. Do not rename these files unless you are an advanced user. These are the files and folders you'll find in your Sass folder:

* `prototype.scss`: The file that will actually get added to the browser. Only Sass related directly to the styling of the Style Prototype should go in here. Any styling you want as part of your final Style Guide should not go in here.
* `client-name-style-guide.scss`: The partial for your client's style guide.
* `global/variables`: A folder containing partials dedicated to variables
* `global/functions`: A folder containing partials dedicated to globally useful functions
* `global/mixins`: A folder containing partials dedicated to globally useful mixins
* `global/extends`: A folder containing partials dedicated to globally useful extendables
* `bases/`: A folder containing partials for base level styling that applies across components, such as baseline typography or accessibility styling
* `components/`: A folder containing partials for component level styling. Components are individual, reusable pieces. Examples include links, headers, messages, and buttons
* `layouts/`: A folder containing partials for defining specific layouts.

The following Compass extensions are available to you out-of-the-box:

* [Breakpoint](https://github.com/team-sass/breakpoint) - Media Query Handling
* [Singularity](https://github.com/Team-Sass/Singularity) - Fluid grid framework
* [Color Schemer](https://github.com/Team-Sass/color-schemer) - Robust color toolset
* [Sassy Strings](https://github.com/Snugug/Sassy-Strings) - Advanced string functions
* [Toolkit](https://github.com/Team-Sass/toolkit) - Modern Web Development tools
* [Modular Scale](https://github.com/Team-Sass/modular-scale) - Ratio based calculations
* [Compass Normalize](https://github.com/ksmandersen/compass-normalize) - CSS Normalize

When creating Style Guide, it is a best practice to create partials in the `components` folder for discrete functionality, built as both a [mixin](https://github.com/Snugug/training-glossary/wiki/Sass#mixins) and as an [extendable selector](https://github.com/Snugug/training-glossary/wiki/Sass#selector-inheritance), with a selector extending said extendable selector. This way, when going to use the Style Guide, you have both the mixin and the selector to choose from. When creating a new Style Prototype, you will be presented with some common components with example styling to guide you through the process.

## Components

Components are the bread and butter of your style guide. They are reusable patterns comprised of HTML and CSS that can be used in multiple places throughout your site. Style Prototypes provides an easy interface for creating new components. In your `config.yml` file, under `components`, you can define a component (they must be in slug form, no capitals, no spaces). Each component will correspond to a component template inside of `templates/components`, so a `button` component will have a `templates/components/button.html` file. When adding a new component, this file, as well as the corresponding Sass files and a group partial, will be automatically generated for you. The templates for components do not have access to handlebars, but they do have access to variable replacements. The following replacements are available:

```
{{component}}: The name of the component (*i.e.* message)
{{type}}: The type of component (*i.e.* error)
{{property}}: Any custom property defined on the component
```

Each variable also has access to `.slug` for a slugified version of the name, and `.cap` for a capitalized version of the name.

Each component should have a corresponding group partial under `partials/components` with a folder for containing individual component instance's HTML under `partials/components/{{component.slug}}`. Each individual component instance's HTML should be named `{{component}}--{{type}}.html`.

This will allow the `component` and `create-example-html` helper function to bring in the correct HTML. In addition, each component should have a Sass file at `sass/components/_{{component.slug}}.scss` that contains it's theming, as well as a `_mixins.scss` and a `_extends.scss` file under `sass/components/{{component.slug}}`.

Styling for the general component inside of the main component Sass file should be wrapped in the following comments:

```scss
//////////////////////////////
// @{component.slug}
// Styling for component.cap Component

// {component.slug}@
//////////////////////////////
```

Styling for an individual component instance inside of the main component Sass file should be wrapped in the following comments:

```scss
//////////////////////////////
// @{component.slug--type.slug}
// type.cap styling for component.cap Component

// {component.slug--type.slug}@
//////////////////////////////
```

By wrapping your code in these special blocks, the `create-example-sass` helper function will be able to bring in the correct Sass that corresponds to the component.

* `{{{component "component" "type"}}}`: Pulls in the HTML of a component of instance type from `partials/components/{{component.slug}}`
* `{{{create-example-html "component" "type"}}}`: Pulls in the HTML of a component of instance type from `partials/components/{{component.slug}}` and writes it out as a `<details>` element with code example.
* `{{{create-example-sass "component" "type" "support"}}}`: Pulls in the Sass of a component of instance type from `sass/components/_{{component.slug}}.scss` if the Sass is correctly wrapped. This will pull in both the base component styling and the individual instance styling. The `support` argument is optional, but if set to `true` will pull in the Sass from `sass/components/{{component.slug}}/_mixins.scss` and `sass/components/{{component.slug}}/_extends.scss` instead.

For an in-depth look at dynamic components, take a look at the `message` and `button` components supplied. For an in-depth look at custom components, take a look at the supplied pager `component`.

## Your Style Guide

Your Style Guide is the driving force behind your Style Prototype! Use the Elements, Typography, and Components pages to help you build out your Style Guide, using as least specific selectors as possible. Included is a `global` folder containing the basic base items for sharing across the Color Guide and Style Tile, as well as other files you'd use your Style Guide with.

Inside of `global/variables/_colors.scss` file are a handful of sample colors being generated by [Color Schemer](https://github.com/Team-Sass/color-schemer) and utilizing [Toolkit's Colour Stack](https://github.com/Team-Sass/toolkit#colour-stacks) functions to show how powerful those two tools are when used together to create color for your site. Inside of `client-name-style-guide.scss` you'll see active imports for Toolkit, Breakpoint, Singularity, Modular Scale, and Color Schemer. [CSS Normalize](http://necolas.github.com/normalize.css/) is being brought in through a Compass extension, but you can use the hard [Eric Meyer style reset](http://meyerweb.com/eric/tools/css/reset/) if you'd like by replacing it with `compass/reset`.

## Your Compass Extension

Generating your Compass Extension is easy! Simply follow the steps in [Creating a Compass Extension](#creating-a-compass-extension), and you'll have your Compass Extension built!

Now comes the hard part, figuring out how to distribute your Style Guide. If you're OK with it being out in the open, make sure you've got a [RubyGems](http://rubygems.org/) account, then type `gem push client-name-style-guide-1.0.0.gem` (substituting name and version as appropriate). If you distribute this way, then installing and updating the style guide is the exact same as any other Compass Extension. A simple `gem install client-name-style-guide` will do. If you don't want it out in the open, you can email or self-serve the gem yourself, the only difference becomes `gem update` will no longer update the gem if you push an update. Users will then need to download the gem and, from the directory they've downloaded it to, run `gem install client-name-style-guide-1.0.0.gem` to install the extension.

In either case, it's easy to use. Simply add `require 'client-name-style-guide'` in your `config.rb` file and add `@import "client-name-style-guide";` to your Sass file, and you're set (no trailing semicolon if you're using SASS syntax instead of SCSS syntax). It's important to note that you shouldn't use two style guides generated from this system in the same project, as their `@import` will conflict I believe. You can bring your images and JavaScript in as well. From the command line, run `compass install client-name-style-guide`. If you're creating a new project, you can do the whole thing in one go! Simply type `compass create <my_project> -r client-name-style-guide` to just require the style guide and do the `@import` yourself, or `compass create <my_project> -r client-name-style-guide --using client-name-style-guide` to create a new project with everything.

If you're using Bower components, you won't get them when using Compass's install/create commands, but it's easy to install them once you're finished. From your project's root folder, just run `bower install` and you should be all set! Also remember to run `bundle install` to install your Bundler dependencies!

***That's It! Have Fun!***

## License
© Sam Richard, Mason Wendell

Original code licensed under [GLPv3](http://www.gnu.org/licenses/gpl-3.0.html)
Open Source projects used within this project retain their original licenses.
