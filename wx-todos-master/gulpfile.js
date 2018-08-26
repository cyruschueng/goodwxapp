/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-18 05:37:52
 * @modify date 2018-01-18 05:37:52
 * @desc gulp配置文件
*/

const gulp = require('gulp')
require('colors')

const { tasks } = require('./build')
const setProjectConfig = require('./build/setProjectConfig')
const createAppJson = require('./build/createAppJson')

// 开发环境 -- 注：如果修改了build/config/config.js下的内容，需要重新执行这个任务，否者不会生效
gulp.task('dev', tasks, () => {
  const watchFiles = ['src/**/*.js', 'src/**/*.scss', 'src/**/*.wxml', 'src/**/*.json']
  setProjectConfig(false)
  createAppJson()

  gulp.watch(watchFiles, tasks)
    .on('change', event => {
      console.log((`File ${ event.path } was ${ event.type }, running tasks...`).yellow)
    })
})

// 生产环境
gulp.task('build', tasks, () => {
  setProjectConfig(true)
  createAppJson()
})

gulp.task('default', ['build'])
