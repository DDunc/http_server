'use strict';

var gulp = require('gulp');
var gulpMocha = require('gulp-mocha');


gulp.task('test', function() {
  return gulp.src('test/**/*test.js')
    .pipe(gulpMocha());
});

gulp.task('default', ['test']);