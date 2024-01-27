# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

# Set the ActiveSupport cache format version.
Rails.application.configure do
  config.active_support.cache_format_version = 7.1
end