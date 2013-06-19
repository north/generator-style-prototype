description "<%= clientName %> Style Guide"

skip_compilation!

discover :javascripts
discover :images
discover :fonts

file 'bower.json'

file 'Gemfile.txt', :to => 'Gemfile'
file 'editorconfig.txt', :to => '.editorconfig'
file 'bowerrc.txt', :to => '.bowerrc'
file 'jshintrc.txt', :to => '.jshintrc'
file 'csslintrc.txt', :to => '.csslintrc'

help %Q{
  Please contact <%= authorName %> with questions:

    <%= authorEmail %>
}

welcome_message %Q{

 <%= clientName %> Style Guide

 Welcome to the style guide for <%= clientName %>. Contained are all of the required JavaScript and Images needed for the style guide, as well as a Bower file for required packages and Editor, JSHint, and CSSLint configuration files.

 To use the style guide, include the following at the top of your Sass file:

 @import "<%= clientSlug %>-style-guide";

}