const through = require('through2')
const gutil = require('gulp-util')
const PluginError = gutil.PluginError

module.exports = () => {
  return through.obj((file, enc, cb) => {
    if (file.isBuffer()) {
      let content = file.contents.toString()
      if (content) {
        try {
          content = JSON.stringify(JSON.parse(content))
          file.contents = Buffer.from(content, 'utf8')
        } catch (ex) {
          this.emit('error', new PluginError('JSON transform', ex))
          return cb(null, file)
        }
      }
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('JSON transform', 'Stream not supported!'))
    }

    cb(null, file)
  })
}
