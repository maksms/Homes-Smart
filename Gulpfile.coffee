tinylr      = require 'tiny-lr'
refresh     = require 'gulp-livereload'
gulp        = require 'gulp'
notifier    = require 'node-notifier'
sass        = require 'gulp-sass'
rename      = require 'gulp-rename'
debug       = require 'gulp-debug'
gutil       = require 'gulp-util'
coffee      = require 'gulp-coffee'
livereload  = require 'gulp-livereload'
sourcemaps  = require 'gulp-sourcemaps'
minifycss   = require 'gulp-minify-css'
minifyHtml  = require 'gulp-minify-html'
concat      = require 'gulp-concat'
copy        = require 'gulp-copy'
uglify      = require 'gulp-uglify'
jshint      = require 'gulp-jshint'
coffeelint  = require 'gulp-coffeelint'
bower       = require 'gulp-bower'
filter      = require 'gulp-filter'
addsrc      = require 'gulp-add-src'
webserver   = require 'gulp-webserver'

server      = tinylr()

gulp.task 'build:coffee', ->
  gulp.src('./assets/javascripts/**/*.coffee').
    pipe(coffeelint()).
    pipe(coffeelint.reporter()).
    pipe(coffee(bare: true).on('error', gutil.log)).
    pipe(gulp.dest('./assets/javascripts/')).
    pipe(refresh(server))
  return

gulp.task 'lr-server', ->
  server.listen 35729, (err) ->
    if err
      console.log(err)



gulp.task 'webserver', ->
  gulp.src('.')
    .pipe(webserver(
      livereload: true
      directoryListing: false
      open: true
      port: 9292
      # path: '/'
    ))

gulp.task 'watch', ->
  gulp.watch 'assets/javascripts/**/*.coffee', [ 'build:coffee' ]
  gulp.watch 'assets/stylesheets/*.sass', [ 'sass' ]

gulp.task 'default', [ 'webserver', 'build:coffee', 'watch' ]
