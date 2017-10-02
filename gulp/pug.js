var gulp = require('gulp');
var pug = require('gulp-pug');
var watch = require('gulp-watch');
var pug = require('gulp-pug');
var gulp_watch_pug = require('gulp-watch-pug');

gulp.task('pug', function buildHTML() {
  return gulp.src('app/pug/*.pug')
    .pipe(pug({
      // Your options in here. 
      pretty: true
    }))
    .pipe(gulp.dest('app/'));

});

gulp.task('pug:watch', function () {
  gulp.src('app/pug/*.pug')
    .pipe(watch('app/pug/*.pug'))
    .pipe(gulp_watch_pug('app/pug/*.pug', {
      delay: 100
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app/'));
});