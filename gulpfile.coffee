gulp = require 'gulp'
coffee = require 'gulp-coffee'
insert = require 'gulp-insert'

spawn = require('child_process').spawn

gulp.task 'build', ->
  gulp.src(['src/**/*.coffee', '!./src/cli.coffee'])
    .pipe(coffee(bare: true))
    .pipe gulp.dest('dist')

  gulp.src('src/cli.coffee')
    .pipe(coffee(bare: true))
    .pipe(insert.prepend('#!/usr/bin/env node\n'))
    .pipe gulp.dest('dist')

gulp.task 'default', ['build']
