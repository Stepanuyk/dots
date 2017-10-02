const gulp = require('gulp');
const runSequence = require('run-sequence');


gulp.task('build', function () {
  runSequence('clean', 'pug', 'sass', ['minify', 'images', 'copy']);
});