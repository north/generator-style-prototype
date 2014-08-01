'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
require('gulp-style-prototype')(gulp);

gulp.task('dev', function () {
  return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('.www/bower_components'))
    .pipe(reload({stream: true}));
});

gulp.task('dev-watch', function () {
  gulp.watch('bower_components/**/*', ['dev']);
});
