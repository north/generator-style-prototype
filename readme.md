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

Designing in browser is a long wished for goal but always has seemed just slightly out of reach. From the technical knowledge needed to set everything up to actually do the coding to getting sign off from clients, it seems like a daunting task to begin to do it. Style Prototypes aims to make the whole process much easier and much more approachable for everyone from Designers who don't know what a Git is to full on Unicorns. Style Prototypes grew from the wonderful Style Guide built by [Mason Wendell](http://twitter.com/codingdesigner) for his kick ass [Survival Kit](http://github.com/canarymason/survival-kit) and now constitutes a whole system for building [Style Tiles](http://styletil.es/), Style Guides, and Color Guides straight in browser. By leveraging the power of Sass, Compass, Jade, Yeoman, Grunt, and Bower, we are able have at our fingertips the tools necessary to sit back and just design. If you're a designer new to all of this, I've written up a [Designer's QuickStart Guide](https://github.com/Snugug/Style-Sites/blob/master/Designer's%20QuickStart%20Guide.md#designers-quickstart-guide) to get you started! Read it and enjoy it!

Style Prototypes are a unique tool because, not only are they responsive by default meaning your client will be able to sign off on styles they've been able to see natively on all browsers and devices, they encourage Style Guide driven Style Tile generation. This means that after you've built out your Style Tile, you'll be on your way to having finished your Style Guide, which you need to for [Style Guide Driven Design](https://speakerdeck.com/jina/style-guide-driven-ui-design-with-sass) (and coincidentally takes lots of design decisions off of the shoulders of Front End Developers). You'll also never need to have someone guess at what colors they can use with a fully built out Color Guide with both hex and Sass values.

Speaking of Sass values, the whole shebang is designed to be turned into a Compass Extension to easily distribute and reuse your finished Style Guide throughout your team in a way that doesn't require an additional website and inspectors flying all over the place. Truly drop in and use functionality. Yah, it's that awesome.

Come with me on this journey.

## Table of Contents

1. [Requirements and Installation](#requirements-and-installation)
2. [Starting Your Server](#starting-your-server)
3. [One Codebase, Multiple Clients](#once-codebase-multiple-clients)
4. [Setting Up Your Style Prototypes](#setting-up-your-style-prototypes)
	* [client.jade](#clientjade)
	* [webfonts.jade](#webfontsjade)
	* [sections.jade](#sectionsjade)
	* [assets.jade](#assetsjade)
	* [component.json](#componentjson)
	* [images/](#images)
	* [scripts/](#scripts)
	* [sections/](#sections)
	* [widgets/](#widgets)
	* [colors/](#colors)
	* [tile/](#tile)
	* [app/](#app)
5. [Your Style Guide](#your-style-guide)
6. [Your Compass Extension](#your-compass-extension)
7. [License](#license)

## Requirements and Installation

To get started using Style Prototypes, the first thing you need to download a copy of this repository. I encourage you to fork this repository and clone it locally to work with. After you've downloaded a copy of this repository, you need to make sure you have some basic requirements installed. Style Prototypes, a their core, are [Yeoman](http://yeoman.io/) powered webapps; so **make sure you've followed the Yeoman installation instructions** before continuing if you don't have it installed already. In addition, there are a handful of Node Modules, Bower Components and Compass Extensions that are required for everything to run properly. You have two ways of installing all of the requirements. If you are on a Mac, the easiest way is to launch the "Install Requirements" application. You will be prompted to type in your user password (you won't see anything when you type in your password, just trust it's there) and press enter. That'll install everything you need. If you're not on a Mac, or would like to do it the old fashioned way, open the `_server` folder in your terminal and type the following line and everything should install for you:

If you don't have [Bundler](http://gembundler.com) installed
```bash
(sudo) gem install bundler && npm install && bower install && bundle install
```

If you do have [Bundler](http://gembundler.com) installed
```bash
npm install && bower install && bundle install
```

## Starting Your Server

After you've got everything installed, you are going to need to start the server to see the website from the terminal. Again, if you are on a Mac, the easiest way is to open the "Launch Style Prototypes" application. This will launch the Terminal, start your server, and minimize the window so you can continue working. If you're not on a Mac, or want to do it the old fashioned way, simply `cd` to your project's `_server` folder, something like `cd /path/to/Style-Prototypes/_server` and then run the following:

```bash
grunt server
```

## Once Codebase, Multiple Clients

The best way to work with Style Prototypes is to have a branch or separate download for each of your clients. I prefer the branching method as it allows me to version the style changes and keep an easy log of everything that's changed. There are two ways you can do this; if you're uncomfortable or new to Git, I'd suggest downloading, installing, and using the official [GitHub for Mac](http://mac.github.com) client to handle your Git repositories and branches. Otherwise, use the command line! There's lots of [documentation on branching with Git](http://learn.github.com/p/branching.html), so read up if you're unfamiliar with the concept or are new to Git.

## Setting Up Your Style Prototypes

Things inside folders that start with an underscore (so `_server` and `_compass`) contain advanced, backbone type stuff so you generally won't touch anything inside of them for 90% of the work you do. If you absolutely need to change the way one of the core pages or stylesheets works, you'd edit it in `_server`. When you're ready to turn everything into a Compass extension, you'll work in `_compass`, but that's about it.

Once you have everything in place and you have your server running, setting up your Style Prototype is very easy. Inside the `setup` directory, you will find the following files and folders:

* client.jade
* webfonts.jade
* sections.jade
* assets.jade
* component.json
* images/
* scripts/
* sections/
* widgets/
* colors/
* tile/
* app/

### client.jade

This is where all of the basic information about you and your client goes. Fairly simple, replace "Client Name" in `var clientName` with your client's name, if you have a logo, put it in the `images/` folder and make sure the path is correct (otherwise, set it to `false`), and put a version and a language in! Also, be sure to replace "Author Name" in `var author` with your name!

### webfonts.jade

One of the most awesome things about designing in browser is being able to use real web fonts! Web fonts rock! There are two easy ways of using web fonts with Style Prototypes, the first is with [Typekit](https://typekit.com). Simply grab your Typekit Kid ID (at the bottom of the "Embed Code" popup) and replace the `false` in `var typekitID` with your kit ID, wrapped in "double quotes". Be sure to include `localhost` in the domains in your Kit Settings. If you'd like to use [Google Fonts](https://www.google.com/webfonts), simply pick out your fonts, and when you're ready to use, click on the Javascript tab in Step 3, and copy what's inside the [brackets] on line 3. For instance, if you had the following Goole Fonts code from the Javascript tab in Step 3:

`<script type="text/javascript">
  WebFontConfig = {
    google: { families: [ 'Offside::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })(); </script>
  `
  
You would replace `false` in `var googleFonts` with `"'Offside::latin'"`. Again, be sure to wrap the fonts in "double quotes". You can use both Typekit and Google Fonts at the same time

### sections.jade

This section allows you to choose what sections of you'd like in your Style Prototype. You can rename, redirect, or create new sections with ease. Creating a new section is easy, simply place the Jade file into the `sections` folder; there are plenty of examples there as to how to create a page and how to use reusable widgets. Once you've created your custom Jade files, add them to the `var sections` variable.

### assets.jade

All of your Asset needs! This file will allow you to quickly and easily add custom JavaScript and CSS files to all pages of your Style Prototype. There is one CSS variable and two JavaScript variables. The CSS variable will append the CSS URLs provided into the HEAD of the document for all pages. The two JavaScript variables, `var scriptsHead` and `var scriptsFooter` will place JavaScript in the HEAD of the document, or right before the closing BODY tag, respectively. The examples provided are from Bower installed components.

### component.json

This is your Bower Component.json file. Adding dependencies here will allow Bower to know what item you need when you run `bower install`. This will be included in your Compass extension.

### images/

A folder containing images for use in your Style Prototype. These images will be included in your Compass Extension

### scripts/

A folder containing JavaScript for use in your Style Prototype. You can include both JavaScript and CoffeeScript. These files will be included in your Compass Extension.

### sections/

A folder containing sections for your Style Prototypes. Out of the box, three sections will be included: markup, typography, and ui. Inside each of these is a Jade file for creating the associated page. The general pattern for creating a new page is fairly easy to follow from the examples, and you can create as many new pages as you'd like. Be sure to add any new pages to the `sections.jade` file when finished. When you create a new page, you may need to restart your server. If you started your server using the provided application, close the Terminal app and relaunch the application; otherwise, press `ctrl+c` in the terminal window running the server, and restarting the server.

### widgets/

Sometimes you may want to reuse a bit of code over and over again, and let's be honest, many pieces of functionality on our sites are a collection of things that exist elsewhere. Widgets are a great way to create a reusable chunk of HTML that can be used on multiple different pages without needing to rewrite the HTML each time. It's also a great way for you to see how your generic styling for a certain set of elements works when paired up together in a unified, usable piece. This is the place to build those pieces before actually going and using them.

### colors/

This folder holds setup files for your Color Guide. Inside the `colors/` folder are colors Sass and Jade files. The Sass file contains a mixin call to generate the CSS for your color guide. All of the colors you've defined inside of your Style Guide's Colors partial (`style-guide/global/_colors.scss`) are available for you to use here. The Jade file contains two variables, the first being the variable names of the colors you are using, in the same order you're using them in the Sass file, and the second is the total number of shades of the color that are available. The Color Guide assumes that each color will have the same number of shades. Toolkit's `tint-stack` or `shade-stack` functions both generate a total of 6 colors.

### tile/

This folder holds setup files for your Style Tile. Inside the `tile/` folder are style tile Sass and Jade files. The Sass file should contain styling specific to the Style Tile that you do not want to include in your final Style Guide (such as setting the colors under the Possible Colors section). The Jade file sets up each of the sections of the Style Tile: how many colors to include, what the inspirational images and patterns are, what keywords is the tile meant to embody, and what you'd like to call buttons as well as what classes you'd like applied to them.

### app/

This folder holds styling for your Style Prototype as a whole (the Style Prototype application, if you will). Inside the `app/` folder are two Sass files, `variables.scss` and `app.scss`. `variables.scss` is a file storing some basic setup variables for the Style Prototype as a whole. `app.scss` is a file for applying styles to your Style Prototype as a whole that you do not want included in your final Style Guide. This file should be edited sparingly and only to change how the Style Prototype itself looks, for instance floating groups around on various pages, but otherwise should not be really touched. Most of your styling you're going to want to do in your Style Guide.

## Your Style Guide

Your Style Guide is the driving force behind your Style Prototype! Use the Elements, Typography, and UI Patterns pages to help you build out your Style Guide, using as least specific selectors as possible. Included is a `global` folder containing the basic base items for sharing across the Color Guide and Style Tile, as well as other files you'd use your Style Guide with.

Inside your `global/_colors.scss` file are a handful of sample colors being generated by [Color Schemer](https://github.com/Team-Sass/color-schemer) and utilizing [Toolkit's Colour Stack](https://github.com/Team-Sass/toolkit#colour-stacks) functions to show how powerful those two tools are when used together to create color for your site. Inside of `global/_base.scss` you'll see active imports for Toolkit, Sassy Buttons, and Color Schemer, with commented out imports for Breakpoint, Singularity, and Modular Scale. There are also two CSS Resets, the hard [Eric Meyer style reset](http://meyerweb.com/eric/tools/css/reset/) (commented out, `compass/reset`), and the [CSS Normalize style reset](http://necolas.github.com/normalize.css/) (in use).

Remember! Any and all CSS that you put into files and folders in the `style-guide` folder *will be available in the generated Compass Extension!* Because of this, it's highly suggested that your styles be as concise as possible and not specific to the classes available in your Style Prototype unless you plan on using those attributes in your final project.

## Your Compass Extension

Once you're done with your Style Prototype, it's fairly easy to turn it into a Compass Extension to be used on any project you wish! Simply go into the `_compass` folder and do the following:

1. Rename `lib/client-styleguide.rb` to the name of your client, and change the two instances of Client Styleguide inside the file, one `client-styleguide` on line 16 and one `Client_Styleguide` on line 24 to the same. If you create new versions of your style guide, be sure to update Version and Date accordingly before building a new gem.
2. Rename `client-styleguide.gemspec` the same name you used for `lib/client-styleguide.rb`
3. Open `client-styleguide.gemspec`
4. Make sure that `require '/lib/client-styleguide.rb` is changed to your renamed `client-styleguide.rb`
5. Make sure that `Client_Styleguide` is changed to what you used in `client-styleguide` for `s.version` and `s.date`
6. Change the value of `s.name` and `s.rubyforge_project` to match the name of the file
7. Edit `s.description`, `s.summary`, `s.authors`, `s.email`, and `s.homepage` respectively.

Once you're done with the edits, save, and in your command line, run `gem build client-styleguide.gemspec` (using the name of your renamed gemspec) and you've got a working Compass extension! This will create a gem called `client-styleguide-1.0.gem` (the 1.0 is the version number from `lib/client-styleguide.rb`, and the `client-styleguide` will actually be the name you renamed everything).

Now comes the hard part, figuring out how to distribute your Style Guide. If you're OK with it being out in the open, make sure you've got a [RubyGems](http://rubygems.org/) account, then type `gem push client-styleguide-1.0.gem` (substituting name and version as appropriate). If you distribute this way, then installing and updating the style guide is the exact same as any other Compass Extension. A simple `gem install client-styleguide` will do. If you don't want it out in the open, you can email or self-serve the gem yourself, the only difference becomes `gem update` will no longer update the gem if you push an update. Users will then need to download the gem and, from the directory they've downloaded it to, run `gem install client-styleguide-1.0.gem` to install the extension.

In either case, it's easy to use. Simply add `require 'client-styleguide'` in your `config.rb` file and add `@import "style-guide";` to your Sass file, and you're set (no trailing semicolon if you're using SASS syntax instead of SCSS syntax). It's important to note that you shouldn't use two style guides generated from this system in the same project, as their `@import` will conflict I believe. You can bring your images and JavaScript in as well. From the command line, run `compass install client-styleguide`. If you're creating a new project, you can do the whole thing in one go! Simply type `compass create <my_project> -r client-styleguide` to just require the style guide and do the `@import` yourself, or `compass create <my_project> -r client-styleguide --using client-styleguide` to create a new project with everything.

If you're using Bower components, you won't get them when using Compass's install/create commands, but it's easy to install them once you're finished. From your project's root folder, just run `bower install` and you should be all set!

***That's It! Have Fun!***

## License
© Sam Richard and Mason Wendell

Original code licensed under [GLPv3](http://www.gnu.org/licenses/gpl-3.0.html)
Open Source projects used within this project retain their original licenses.

Launch icon by [Everaldo Coelho](http://www.everaldo.com/#3cf/twitter)
Gear icon by [Keyamoon](http://keyamoon.com/)
