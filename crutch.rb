require 'sinatra'
require 'sinatra/reloader'


class Crutch < Sinatra::Base
#   set :views, settings.root + '/../views'
#
    get '/hi' do
      "Hello World!"
    end
#
#
#   get "/js/*.js" do
#     filename = params[:splat].first
#     coffee "../public/coffee/#{filename}".to_sym
#   end
end
