var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var stylusPlugins = [autoprefixer()];
var inject = require("gulp-inject");
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var appFolder = '.';
var distFolder = './dist';
var scriptsFolder = appFolder + '/scripts';
var scriptsFiles = scriptsFolder + '/*.js';
var cssFolder = distFolder + '/styles';
var stylesFolder = appFolder + '/styles';
var index = appFolder + '/index.html';

gulp.task('compile-stylus', function () {
    gulp.src(stylesFolder + '/*.styl')
        .pipe(stylus({
            use: stylusPlugins
        }))
        .pipe(gulp.dest(cssFolder));
});

gulp.task('inject', function () {
    var target = gulp.src(index);
    var sources = gulp.src([cssFolder + '/*.css'].concat(scriptsFiles), {read: false});

    return target
        .pipe(inject(sources))
        .pipe(gulp.dest(distFolder))
        .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        files: cssFolder + '/*.css',
        server: {
            baseDir: './',
            index: distFolder + '/index.html'
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Default gulp task to run
gulp.task('default', ['compile-stylus', 'inject', 'browser-sync'], function () {
    gulp.watch([stylesFolder + '/*.styl'], ['compile-stylus']);
    gulp.watch([index].concat(scriptsFiles), ['inject']);
});

