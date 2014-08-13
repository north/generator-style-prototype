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

[![NPM version](https://badge.fury.io/js/generator-style-prototype.png)](http://badge.fury.io/js/generator-style-prototype)

**Design In Browser, Build In Browser, Sign Off In Browser**

Style Prototypes are a Pattern Library tool for [designing in browser](http://pointnorth.io/#visual-design). [Style prototyping](http://pointnorth.io/#style-prototyping) is a technique used to create a typical instance of a design from which a final site can be assembled.

Designing in browser is a long wished for goal but always has seemed just slightly out of reach. From the technical knowledge needed to set everything up to actually do the coding to getting sign off from clients, it seems like a daunting task to begin to do it. Style Prototypes aims to make the whole process much easier and much more approachable for everyone from Designers who don't know what a Git is to full on Unicorns. Style Prototypes grew from the wonderful Style Guide built by [Mason Wendell](http://twitter.com/codingdesigner) for his kick ass [Survival Kit](http://github.com/canarymason/survival-kit) and now constitutes a whole system for building [Style Tiles](http://styletil.es/), Style Guides, Component Guides, and Color Guides straight in browser. By leveraging the power of Sass, Compass, Yeoman, Grunt, and Bower, we are able have at our fingertips the tools necessary to sit back and just design. If you're a designer new to all of this, I've written up a [Designer's QuickStart Guide](https://github.com/north/Style-Prototypes/blob/master/Designer's%20QuickStart%20Guide.md#designers-quickstart-guide) to get you started! Read it and enjoy it!

Style Prototypes are a unique tool because, not only are they responsive by default (meaning your client will be able to sign off on styles they've been able to see natively on all browsers and devices), they encourage Style and Color Guide driven Style Tile and Component Guide generation. This means that after you've built out your Style Tile, you'll be on your way to having finished your Style Guide, which you need to for [Style Guide Driven Design](http://vimeo.com/45897176) (and coincidentally takes lots of design decisions off of the shoulders of Front End Developers). You'll also never need to have someone guess at what colors they can use with a fully built out Color Guide with both hex and Sass values.

Speaking of Sass values, the whole shebang is designed to be turned into a Compass Extension to easily distribute and reuse your finished Style Guide throughout your team in a way that doesn't require an additional website and inspectors flying all over the place. Truly drop in and use functionality. Yah, it's that awesome.

Come with me on this journey.

## Installation

To install the generator, make sure you have [NodeJS](http://nodejs.org/) installed (if using an Apple computer, it is recommended to install [Homebrew](http://brew.sh/) then install NodeJS by running `brew install node`), then run the following from the command line:

```bash
$ npm install -g yo gulp bower generator-style-prototype
```

Ensure you have [Ruby](https://www.ruby-lang.org/en/) with [RubyGems](http://rubygems.org/) installed as well. If you are on an Apple computer, you need at least Ruby version *2.0.0p451* installed, otherwise you need at least Ruby *2.0.0*. You can check your Ruby version by running `$ ruby -v`.

If you do not have the correct version of Ruby installed and you are on an Apple computer, do the following (you may need to `sudo` these steps):

1. Uninstall Bundler and Compass if you have it installed globally (`which bundle` or `which compass` to check to see if they're installed, `gem uninstall bundler` or `gem uninstall compass` if they are)
2. Install [Homebrew](http://brew.sh/)
3. `brew update`
4. `brew install rbenv ruby-build`
5. Add `eval "$(rbenv init -)"`  and `export GEM_HOME=$(brew --prefix)` to your profile (`~/.bashrc` or `~/.zshrc`. If you have not installed `ZSH` or are unsure if you have, use the former) and restart your terminal.
6. `rbenv install 2.0.0-p451`
7. `rbenv rehash`
8. `bash` or `zsh` (if you are running `ZSH`)
9. `rbenv shell 2.0.0-p451`
10. `gem install bundler`
11. `bash` or `zsh` (if you are running `ZSH`)

If you are on a Windows computer, it is highly recommended that you use [Console 2](http://sourceforge.net/projects/console/files/) with PowerShell (`Edit->Settings`, set shell to `C:\WINDOWS\system32\WindowsPowerShell\v1.0\powershell.exe`). If you're on a Windows computer, the easiest way to get set up with Ruby is [Ruby Installer](http://rubyinstaller.org/), and it is likely you will need to install [Git](http://git-scm.com/downloads) as well. Ensure that you add Node, Ruby, and Git to your PATH during installation of each respectively. Windows users should also install Bundler after everything else is installed (`gem install bundler`).

## Creating a Style Prototype

Run the following:

```bash
$ yo style-prototype
```

### Creating New Patterns

The two things needed for a new pattern are the HTML in the section you'd like and the Sass to style it. Style Prototypes can help you scaffold out a [North partial structure](http://pointnorth.io/#partial-structure) for each pattern, import it into your Sass file, and generates an empty HTML file for you. While everything this generator does isn't needed, it gives you a quick, easy, and standard way of architecting your Sass.

```bash
$ yo style-prototype:pattern
```

### Creating New Sections

While you can create a new section by hand, there's a handy dandy subgenerator to make scaffolding out a section easier.

```bash
$ yo style-prototype:section
```

## Running Style Prototypes

To run the development server, run the following:

```bash
$ gulp
```

If you do not want to rebuild the development server on launch, you can run the following:

```bash
$ gulp serve
```

If you would like to generate a production-ready version of your Style Prototype into an `export` folder, run the following:

```bash
$ gulp export
```

If you would like to publish a production-ready version of your Style Prototype to a Git branch (via [Gulp Subtree](https://github.com/Snugug/gulp-subtree)), run the following:

```bash
$ gulp deploy
```

## Keeping Up To Date

Keeping up to date with the latest and greatest releases of Style Prototypes is pretty easy.

* For updating your Gulp tasks, which come from [`gulp-style-prototype`](https://github.com/north/gulp-style-prototype/), run `npm update gulp-style-prototype --save`.
* For updating the in-browser framework, which comes from [`style-prototypes`](https://github.com/north/style-prototypes/), run `bower update style-prototypes --save-dev`.
* For updating this generator, run `npm update -g generator-style-prototype`.

The Gulp tasks and in-browser framework updates will take effect immediately. Yeoman generator updates will take effect on newly created style prototypes. Most truly new features will be added through subgenerators, so you should only need to run the relevant subgenerator to get any new features, or make simple changes to existing files. Alternatively, you can run `yo style-prototype --init` to re-run the generator in your current directory (make sure you're in the root of your current Style Prototype directory). You will go through the creation prompt again and any files that differ from what exists you will be prompted to deal with.

## Using Your Style Prototype

### via Bower

After your Style Prototype is built, you can access it from your projects via Bower. As long as you have access to the Git repo you your Style Prototype lives in (even if it's a private repo), Bower is able to [use it as a dependency](http://bower.io/#install-packages). Simply run the following from your project and you'll get your prototype as a Bower dependency:

```bash
$ bower install {{git@git-url}} --save
```

From there, for Sass, point your import path to your Sass and your task runners to move your images/JavaScript/etc… around, and you're good to go.

### via Archive

Alternatively, if you are using `gulp-style-prototype` **v1.1.0** or greater, you can create a ZIP file of the relevant files that can be distributed. To do so, either pass ``--zip` into your `refresh`, `dist`, `export`, `deploy`, or base `gulp` command to build a Zip file, or add `zip: true` to `config/deploy.yml`. You can also run `gulp zip` to generate a one-off zip file.

# License
©2013-2014 Sam Richard

Original code licensed under [MIT](http://opensource.org/licenses/MIT)
Open Source projects used within this project retain their original licenses.
