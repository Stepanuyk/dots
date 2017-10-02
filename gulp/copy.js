const gulp = require('gulp');

const gulpCopy = require('gulp-copy');
const sourceFiles = ['/*', 'css/normalize.css'];
const destination = '/dist/';


gulp.task('copy-normalize-css', function() {
    return gulp.src('app/css/normalize.css')
    .pipe(gulp.dest('dist/css'));
  });

gulp.task('copy-html', function() {
    return gulp.src('app/*.html')
    .pipe(gulp.dest('dist/'));
  });

  gulp.task('copy-fonts', function () {
    return gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));
  });

gulp.task('copy', ['copy-normalize-css', 'copy-fonts'], function() {

  });