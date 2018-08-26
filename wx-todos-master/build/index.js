/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-17 02:21:29
 * @modify date 2018-01-17 02:21:29
 * @desc 子任务，任务细分
*/

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const del = require('del')

const { SCSS_PATH, WXML_PATH, JSON_PATH, JS_PATH, IMAGE_PATH } = require('./parser')()
const extractPlugins = require('./gulp-plugins/gulp-extract-plugins')
const jsonMinify = require('./gulp-plugins/gulp-json-minify')

// const SCSS_PATH = ['src/**/*.scss']
// const WXML_PATH = ['src/**/*.wxml']
// const JSON_PATH = ['src/**/*.json']
// const JS_PATH = ['src/**/*.js']
// const IMAGE_PATH = [
//   'src/**/*.svg',
//   'src/**/*.jpg',
//   'src/**/*.jpeg',
//   'src/**/*.png',
//   'src/**/*.gif'
// ]

const base = 'src/'
const dist = 'dist/'

function taskTips (taskName) {
  console.log((`#### 开始执行任务：${ taskName } task ####`).green)
}

// 由于clean是同步的，它并不会被调用多次，而是它完成之后执行后续的异步操作
gulp.task('clean', done => {
  taskTips('clean')
  del(['dist/**/*', '!dist/app.json', '!dist/project.config.json'])
    .then(() => {
      done()
    })
})

// 解析并压缩sass文件，生成wxss文件
gulp.task('scss', ['clean'], () => {
  taskTips('scss')
  return gulp.src(SCSS_PATH, { base })
    .pipe($.sass({ outputStyle: 'compressed' }).on('error', $.sass.logError))
    .pipe($.rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest(dist))
})

// 解析JS文件
gulp.task('js', ['clean'], () => {
  taskTips('js')
  return gulp.src(JS_PATH, { base })
    .pipe(extractPlugins())
    .pipe($.babel())
    .pipe(gulp.dest(dist))
})

// 解析WXML文件
gulp.task('wxml', ['clean'], () => {
  taskTips('wxml')
  return gulp.src(WXML_PATH, { base })
    .pipe(gulp.dest(dist))
})

// 压缩IMAGE文件
gulp.task('image', ['clean'], () => {
  taskTips('image')
  return gulp.src(IMAGE_PATH, { base })
    .pipe($.imagemin())
    .pipe(gulp.dest(dist))
})

// 压缩JSON文件
gulp.task('json', ['clean'], () => {
  taskTips('json')
  return gulp.src(JSON_PATH, { base })
    .pipe(jsonMinify())
    .pipe(gulp.dest(dist))
})

exports.tasks = ['scss', 'js', 'wxml', 'image', 'json']
