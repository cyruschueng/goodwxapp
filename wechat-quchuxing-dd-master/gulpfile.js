var gulp         = require('gulp')
var uglify       = require('gulp-uglify')
var clean        = require('gulp-clean')
var concat       = require('gulp-concat')
var minifyCss    = require('gulp-clean-css')
var htmlmin      = require('gulp-htmlmin')
var notify       = require('gulp-notify')
var autoprefixer = require('gulp-autoprefixer')
var gulpSequence = require('gulp-sequence')
var imagemin     = require('gulp-imagemin')
var pngquant     = require('imagemin-pngquant')
var sass         = require('gulp-sass')
var ejs          = require('gulp-ejs')
var connect      = require('gulp-connect')
var plumber      = require('gulp-plumber')
var minimist     = require('minimist')
var rename = require("gulp-rename");
var changed = require('gulp-changed');

var knownOptions = {
  string  : 'env',
  default : { env: process.env.NODE_ENV || 'development' }
};
var options = minimist(process.argv.slice(2), knownOptions);


const BASE   = 'src'
const PRO_BASE = 'dist'
const DEV_BASE = 'build'
const BUILD_BASE = options.env == 'development' ? DEV_BASE : PRO_BASE

gulp.task('default', function() {
  console.log('编译命令: gulp build, 开发编译命令: gulp dev')
})

gulp.task('build', function () {
  gulpSequence('clean', ['copy', 'scss'], function () {
    console.log('编译完成')
  })
})

gulp.task('clean', function() {
  return gulp.src([`${PRO_BASE}/*`], {read: false})
    .pipe(clean())
    .pipe(notify({ message: '清除完成' }))
})

gulp.task('copy', function () {
  return gulp.src(['src/**', '!src/**/**.scss'])
    .pipe(changed(PRO_BASE))
    .pipe(gulp.dest(`${PRO_BASE}`))
})

gulp.task('dev', ['watch'])

gulp.task('watch', function () {
  gulp.watch([`${BASE}/**/**.scss`], ['scss'])
  gulp.watch([`${BASE}/**/**.*`, `!${BASE}/**/**.scss`], ['copy'])
})

gulp.task('scss', function () {
  return gulp.src([`${BASE}/**/**.scss`, `!${BASE}/style/**/**.scss`])
  .pipe(changed(PRO_BASE), {
    extension: '.wxss'
  })
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(plumber())
  .pipe(rename(function (path) {
    path.extname = ".wxss"
  }))
  .pipe(gulp.dest(`${PRO_BASE}`))
})
