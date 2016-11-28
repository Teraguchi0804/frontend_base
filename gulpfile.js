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
var pngquant = require('imagemin-pngquant');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
var webpack = require('gulp-webpack');
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
var jshint = require('gulp-jshint');
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
// imgファイルを圧縮して書き出し
//------------------------------------------------------------------------------------------
gulp.task('image',function(){
  gulp.src(['src/img/*.+(jpg|jpeg|png|gif|svg)'])
      .pipe(imageMin({
        progressive: true,
        use: [pngquant({quality: '65-80', speed: 1})]
      }))
      .pipe(gulp.dest('dist/img/'));
});


//------------------------------------------------------------------------------------------
// JSファイルをindex.jsへ結合してビルド
//------------------------------------------------------------------------------------------
// js lint
gulp.task('jshint', function () {
  return gulp.src(['stc/js/**/*.js'])
      .pipe( jshint() )
      .pipe( jshint.reporter('jshint-stylish') );
      // .pipe( $.if(!browserSync.active, jshint.reporter('fail')) );
});

// gulp.task('js.browserify',function(){
//     return browserify({
//         entries:
//             ['./src/js/libs/jquery-3.1.0.min.js',
//              './src/js/main.js']
//     })
//         .bundle()
//         .pipe(source('index.js'))
//         .pipe(gulp.dest('./dist/js'))
// });


gulp.task('js.uglify',  function() {
    return gulp.src(['dist/js/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('/dist/js/'));
});

// gulp.task('webpack',function(){
//   gulp.src(['src/js/app.js'])
//       // .pipe(webpack({
//       //   output: {
//       //     filename: 'index.js',
//       //   }
//       // })).pipe(gulp.dest('./dist/js'));
//
//     .pipe(webpack( require('./webpack.config.js') ))
//     .pipe(gulp.dest('./dist/js/'));
// });


gulp.task('webpack', webpackFunc);

function webpackFunc() {
  gulp.src(['src/js/app.js'])
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest('./dist/js'));
}

// gulp.task('webpack', function() {
//   gulp.src(['src/js/app.js'])
//       .pipe(webpack( require('./webpack.config.js') ))
//       .pipe(gulp.dest('dist/'));
// });

// gulp.task('webpack', function () {
//   gulp.src('./src/app.js')
//       .pipe(webpack('./webpack.config.js'))
//       .pipe(gulp.dest('./dist/js'));
// });

// gulp.task('js', ['jshint', 'js.browserify', 'js.uglify']);
// gulp.task('js', ['jshint', 'js.browserify', 'js.uglify']);



//------------------------------------------------------------------------------------------
// デフォルトタスク(ブラウザシンクとsrcフォルダ内のファイルを監視)
//------------------------------------------------------------------------------------------
gulp.task('default',function(){
    browserSync.init({
        server: "./dist/"
    });
    gulp.watch('src/js/**/*.js',['webpack']).on('change', reload);
    gulp.watch('src/css/**/*.scss',['sass']).on('change', reload);
    gulp.watch('src/**/*.html',['html']).on('change', reload);
    gulp.watch('src/img/**/*',['image']).on('change', reload);
});
