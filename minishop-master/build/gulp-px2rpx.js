var gutil = require('gulp-util')
var through = require('through2')

// 会将px转为rpx, mm转为px
// px -> rpx
// mm -> px
function px2rpx () {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-wxss', 'Streaming not supported'))
    }

    file.contents = new Buffer(file.contents.toString().replace(/(\d+)px/gm, '$1rpx').replace(/(\d+)mm/gm, '$1px'))

    cb(null, file)
  })
}

module.exports = px2rpx
