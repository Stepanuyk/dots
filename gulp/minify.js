var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

var babel = require("gulp-babel");

gulp.task('minify', function(){
  return gulp.src('app/index.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', babel()))
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});