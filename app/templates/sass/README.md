ABOUT SASS AND COMPASS
----------------------

Sass is a language that is just normal CSS plus some extra features, like
variables, nested rules, math, mixins, etc. If your stylesheets are written in
Sass, helper applications can convert them to standard CSS so that you can
include the CSS in the normal ways with your theme.

[Learn more about Sass](http://sass-lang.com)

Compass is a helper library for Sass. It includes libraries of shared mixins, a
package manager to add additional extension libraries, and an executable that
can easily convert Sass files into CSS.

[Learn more about Compass](http://compass-style.org)

HANDLING DEPENDENCIES
---------------------

Dependencies in Ruby are best handled by [Bundler](http://gembundler.com/). Bundler works by having you define a `Gemfile` of dependent gems and their version numbers, allowing you to ensure that the correct version of all of your gems are used. New Aurora subthemes come with a `Gemfile`, but if you do not have one already, you can create one yourself. Here is the contents of the `Gemfile` supplied by the current version of Aurora.

`# Pull gems from RubyGems
source 'https://rubygems.org'
# ~> Refers to all versions of the given gem on the current full version number, so it will be able to use any version of Compass Aurora until Compass Aurora 4.x.x. For a specific version of a gem, remove the ~>
gem 'compass-aurora', '~>3.0.0'
gem 'toolkit', '~>1.0.0'
gem 'singularitygs', '~>1.0.7'
gem 'breakpoint', '~>2.0.2'
gem 'sassy-buttons', '~>0.1.4'
gem 'compass-normalize', '~>1.4.3'`

These are the version numbers of these gems needed for Aurora 3.x. If you are using older versions of these gems, or require older versions of these gems, please change them to the versions you need. To see what versions of the gems you have installed, enter either `gem list` in the command line to see a list of all gems and their versions, or `gem list {name}` to see the list of versions for the named gem.

Once you have your `Gemfile` written, you need to install the gems so you can use them. To do so, in the command line, type the following: 

`bundle install`

This will create a `Gemfile.lock` file with all relevant dependencies which should be committed into your version control.


DEVELOPING WITH SASS AND COMPASS
--------------------------------

To automatically generate the CSS versions of the scss while you are doing theme
development, you'll need to tell Compass to "watch" the sass directory so that
any time a .scss file is changed it will automatically place a generated CSS
file into your sub-theme's css directory:

  `bundle exec compass watch <path to your sub-theme's directory>`

If you are already in the root of your sub-theme's directory, you can simply
  type:  `bundle exec compass watch`

While using generated CSS with your browser's inspectors, the line numbers it reports will be
wrong since it will be showing the generated CSS file's line numbers and not the
line numbers of the source Sass files. By default, Compass will output a comment with what line and what partial the CSS is comming from above the selector. This is useful if you're looking at your CSS file itself, but not as useful if you're trying to debug straight from your inspector. If you'd like to debug straight from your inspector, there are two options, one for Google Chrome and one for Firefox.

If you are using Firefox, you can install the [FireSass](https://addons.mozilla.org/en-US/firefox/addon/firesass-for-firebug/) plug-in into Firefox. Then, edit your sub-theme's config.rb file so Firesass is true (`firesass = true`) and make sure that `sass_options = :debug_info => true` is enabled (in the example config.rb file, there's a check for whether you're on the development environment). If you are using Google Chrome, make sure the Debug Info is enabled as well, go to `about://flags`, Enable Developer Tools experiments, restart Chrome, open your inspector, click settings (the gear on the bottom right), open experiments, and check Support for Sass.