/**
 * Created by DELL on 4/4/2016.
 */

var sass = require('gulp-sass');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

gulp.task('lint',function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
})

gulp.task('scss',function () {
    gulp.src('./src/assets/scss/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./public/assets/stylesheets/'));
});
gulp.task('scripts',function () {
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

gulp.task('copy',function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('build',['lint','scss','scripts','copy'],function() {
    console.log('Hurray!! Build complete');
});

gulp.task('browser-sync',['build'],function () {
    browserSync.init({
        server:{
            baseDir:"./public",
            routes:{
                '/bower_components':'bower_components'
            }
        },
        browser:'chrome'
    });
});

gulp.task('default',['browser-sync'],function () {
    gulp.watch('./src/<strong>/<em>.</em>',['build']);
    gulp.watch('./public/<strong>/<em>.</em>').on('change',browserSync.reload);

})