const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload();

gulp.task('watch',['pug','pug:watch','sass','sass:watch'], function () {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/css/*.css").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});