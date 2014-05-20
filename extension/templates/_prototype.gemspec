require './lib/<%= slugName %>'

Gem::Specification.new do |s|
  # Release Specific Information
  s.version = <%= camelName %>::VERSION
  s.date = <%= camelName %>::DATE

  # Gem Details
  s.name = "<%= slugName %>"
  s.rubyforge_project = "<%= slugName %>"
  s.description = %q{Style Prototype for <%= humanName %>}
  s.summary = %q{Style Prototype for <%= humanName %>}
  s.authors = ["<%= authorName %>"]
  s.email = ["<%= authorEmail %>"]
  s.homepage = "<%= homepage %>"
  s.licenses = ["<%= license %>"]

  # Gem Files
  <%= specFiles %>

  # Gem Bookkeeping
  s.required_rubygems_version = ">= 1.3.6"
  s.rubygems_version = %q{1.3.6}

  # Dependencies
  <%= dependencyGems %>
end