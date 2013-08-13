# Replace extension with the name of your extension's .rb file
require './lib/<%= grunt.userConfig.clientSlug %>-style-guide.rb'

Gem::Specification.new do |s|
  # Release Specific Information
  #  Replace Extension with the name you used in your extension.rb
  #   in the mdodule with version and date.
  s.version = Styleguide::VERSION
  s.date = Styleguide::DATE

  # Gem Details
  # Replace "styleguide" with the name of your extension
  s.name = "<%= grunt.userConfig.clientSlug %>-style-guide"
  s.rubyforge_project = "<%= grunt.userConfig.clientSlug %>-style-guide"
  # Description of your extension
  s.description = %q{<%= grunt.userConfig.client.name %> Style Guide}
  # A summary of your Compass extension. Should be different than Description
  s.summary = %q{Full style guide and component guide for <%= grunt.userConfig.client.name %>}
  # The names of the author(s) of the extension.
  # If more than one author, comma separate inside of the brackets
  s.authors = ["<%= grunt.userConfig.author.name %>"]
  # The email address(es) of the author(s)
  # If more than one author, comma separate inside of the brackets
  s.email = ["<%= grunt.userConfig.author.email %>"]
  # URL of the extension
  s.homepage = "<%= grunt.userConfig.client.homepage %>"
  # License
  s.license = "<%= grunt.userConfig.extension.license %>"

  # Gem Files
  # These are the files to be included in your Compass extension.
  # Uncomment those that you use.

  # README file
  # s.files = ["README.md"]

  # CHANGELOG
  # s.files += ["CHANGELOG.md"]

  # Library Files
  s.files += Dir.glob("lib/<%= grunt.userConfig.clientSlug %>-style-guide.rb")
  s.files += Dir.glob("stylesheets/**/*.*")
  s.files += Dir.glob("templates/**/*.*")

  # Gem Bookkeeping
  # Versions of Ruby and Rubygems you require
  s.required_rubygems_version = ">= 1.3.6"
  s.rubygems_version = %q{1.3.6}
  s.rubyforge_project = s.name

  # Gems Dependencies
  # Gem names and versions that are required for your Compass extension.
  # These are Gem dependencies, not Compass dependencies. Including gems
  #  here will make sure the relevant gem and version are installed on the
  #  user's system when installing your gem.<% _.forEach(grunt.userConfig.compass.dependencies, function(version, extension) { %>
  s.add_dependency("<%= extension %>", ["<%= version %>"])<% }); %>
end