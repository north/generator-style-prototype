# All gems that are required for this extension to work should go here.
# These are the requires you would normally put in your config.rb file
# By default, you should always included Compass. Do not include your
#  extension.<% _.forEach(grunt.userConfig.compass.dependencies, function(version, extension) { %>
require '<%= extension %>'<% }); %>

# This tells Compass what your Compass extension is called, and where to find
#  its files
# Replace 'styleguide' with the name of your style guide. Spaces allowed.
base_directory  = File.join(File.dirname(__FILE__), '..')
stylesheets_dir = File.join(base_directory, 'stylesheets')
templates_dir   = File.join(base_directory, 'templates')
Compass::Frameworks.register('<%= _.slugify(grunt.userConfig.client.name) %>-style-guide', :stylesheets_directory => stylesheets_dir, :templates_directory => templates_dir)

# Version and date of version for your Compass extension.
# Replace Styleguide with the name of your style guide
#  Letters, numbers, and underscores only
#  Version is a number. If a version contains alphas, it will be created as
#    a prerelease version
#  Date is in the form of YYYY-MM-DD
module Styleguide
  VERSION = "<%= grunt.userConfig.client.version %>"
  DATE = "<%= grunt.template.today('yyyy-mm-dd') %>"
end

# This is where any custom SassScript should be placed. The functions will be
#  available on require of your extension without the need for users to import
#  any partials. Uncomment below.

# module Sass::Script::Functions
#
# end