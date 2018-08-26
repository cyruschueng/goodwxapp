var watch = require('gulp-watch');
var through = require('through2')
var isDevelopment = process.argv.indexOf('development') > -1
module.exports = function (path) {
  if (isDevelopment) {
    return watch(path)
  }
  return through.obj(function (file, enc, cb) {
    cb(null, file)
  })
}
