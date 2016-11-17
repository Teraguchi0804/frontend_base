/**
 * fileOverview:
 * Project:
 * File: gulpfile.js
 * Date: 11/01/16
 * Author: teraguchi
 */

//------------------------------------------------------------------------------------------
// var
//------------------------------------------------------------------------------------------
var gulp = require('gulp');
var transform = require('vinyl-transform');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var csslint = require('gulp-csslint');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cleanCss = require('gulp-clean-css');
// var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyHtml = require('gulp-minify-html');


//------------------------------------------------------------------------------------------
// SCSSファイルをコンパイル、圧縮、index.cssへ結合してビルド
//------------------------------------------------------------------------------------------
gulp.task('sass',function(){
    gulp.src(['src/css/**/*.scss'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(csslint())
        .pipe(concat('index.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
});


//------------------------------------------------------------------------------------------
// JSファイルをindex.jsへ結合してビルド
//------------------------------------------------------------------------------------------
gulp.task('js.browserify',function(){
    return browserify({
        entries:
            ['./src/js/libs/jquery-3.1.0.min.js',
             './src/js/main.js']
    })
        .bundle()
        .pipe(source('index.js'))
//         .pipe(jshint())
        .pipe(gulp.dest('./dist/js'))
});


gulp.task('js.uglify',  function() {
    return gulp.src('./dest/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dest/js/'));
});

gulp.task('js', ['js.browserify', 'js.uglify']);

//------------------------------------------------------------------------------------------
// index.htmlファイルを圧縮してdistデイレクトリ内へindex.htmlとしてビルド
//------------------------------------------------------------------------------------------
gulp.task('html',function(){
    gulp.src(['src/**/*.html'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'))
});

//------------------------------------------------------------------------------------------
// デフォルトタスク(ブラウザシンクとsrcフォルダ内のファイルを監視)
//------------------------------------------------------------------------------------------
gulp.task('default',function(){
    browserSync.init({
        server: "./dist/"
    });
    gulp.watch('src/js/**/*.js',['js']).on('change', reload);
    gulp.watch('src/css/**/*.scss',['sass']).on('change', reload);
    gulp.watch('src/**/*.html',['html']).on('change', reload);
    gulp.watch('images/src/**/*',['image']).on('change', reload);
});
