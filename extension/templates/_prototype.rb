if (defined? Compass)
  <%= requireGems %>
  Compass::Frameworks.register(
    "<%= slugName %>",
    :stylesheets_dir => "#{File.dirname(__FILE__)}/../sass",
    :path => "#{File.dirname(__FILE__)}/.."
  )
else
  # Compass not defined, register on the Sass path via the environment.
  if ENV.has_key?("SASS_PATH")
    ENV["SASS_PATH"] = ENV["SASS_PATH"] + File::PATH_SEPARATOR + "#{File.dirname(__FILE__)}/../sass"
  else
    ENV["SASS_PATH"] = "#{File.dirname(__FILE__)}/../sass"
  end
end

module <%= camelName %>
  VERSION = "<%= version %>"
  DATE = "<%= date %>"
end