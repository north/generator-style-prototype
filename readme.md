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

Designing in browser is a long wished for goal but always has seemed just slightly out of reach. From the technical knowledge needed to set everything up to actually do the coding to getting sign off from clients, it seems like a daunting task to begin to do it. Style Prototypes aims to make the whole process much easier and much more approachable for everyone from Designers who don't know what a Git is to full on Unicorns. Style Prototypes grew from the wonderful Style Guide built by [Mason Wendell](http://twitter.com/codingdesigner) for his kick ass [Survival Kit](http://github.com/canarymason/survival-kit) and now constitutes a whole system for building [Style Tiles](http://styletil.es/), Style Guides, Component Guides, and Color Guides straight in browser. By leveraging the power of Sass, Compass, Yeoman, Grunt, and Bower, we are able have at our fingertips the tools necessary to sit back and just design. If you're a designer new to all of this, I've written up a [Designer's QuickStart Guide](https://github.com/Team-Sass/Style-Prototypes/blob/master/Designer's%20QuickStart%20Guide.md#designers-quickstart-guide) to get you started! Read it and enjoy it!

Style Prototypes are a unique tool because, not only are they responsive by default (meaning your client will be able to sign off on styles they've been able to see natively on all browsers and devices), they encourage Style and Color Guide driven Style Tile and Component Guide generation. This means that after you've built out your Style Tile, you'll be on your way to having finished your Style Guide, which you need to for [Style Guide Driven Design](https://speakerdeck.com/jina/style-guide-driven-ui-design-with-sass) (and coincidentally takes lots of design decisions off of the shoulders of Front End Developers). You'll also never need to have someone guess at what colors they can use with a fully built out Color Guide with both hex and Sass values.

Speaking of Sass values, the whole shebang is designed to be turned into a Compass Extension to easily distribute and reuse your finished Style Guide throughout your team in a way that doesn't require an additional website and inspectors flying all over the place. Truly drop in and use functionality. Yah, it's that awesome.

Come with me on this journey.

## Installation

To install the generator, make sure you have [NodeJS](http://nodejs.org/) installed, then run the following from the command line:

```bash
$ npm install -g yo gulp bower generator-style-prototype
```

Ensure you have [Ruby](https://www.ruby-lang.org/en/) with [RubyGems](http://rubygems.org/) installed as well. If you are on an Apple computer, you need at least Ruby version *2.0.0p451* installed. You can check your Ruby version by running `$ ruby -v`. If you do not have the correct version of Ruby installed, do the following (you may need to `sudo` these steps):

1. Uninstall Bundler and Compass if you have it installed globally (`which bundle` or `which compass` to check to see if they're installed, `gem uninstall bundler` or `gem uninstall compass` if they are)
2. Install [Homebrew](http://brew.sh/)
3. `brew update`
4. `brew install rbenv ruby-build`
5. Add `eval "$(rbenv init -)"` to your profile (`~/.bashrc` or `~/.zshrc`. If you have not installed `ZSH` or are unsure if you have, use the former) and restart your terminal.
6. `rbenv install 2.0.0-p451`
7. `rbenv rehash`
8. `bash` or `zsh` (if you are running `ZSH`)
9. `rbenv shell 2.0.0-p451`
10. `gem install bundler`
11. `bash` or `zsh` (if you are running `ZSH`)

## Creating a Style Prototype

Run the following:

```bash
$ yo style-prototype
```

# License
©2013-2014 Sam Richard

Original code licensed under [MIT](http://opensource.org/licenses/MIT)
Open Source projects used within this project retain their original licenses.
