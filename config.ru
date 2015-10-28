require 'rubygems'
require 'bundler'
Bundler.require(:default)
require 'sass/plugin/rack'
require './crutch'

# use scss for stylesheets
Sass::Plugin.options[:style] = :compressed
use Sass::Plugin::Rack

# use coffeescript for javascript
use Rack::Coffee, root: '.', urls: '/assets/javascripts'
# use Rack::Static, urls: {"/" => 'index.html'}
use Rack::Static, urls: ["", "esp8266"], root: '.', index: 'index.html'

run Crutch
