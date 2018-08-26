var gutil = require('gulp-util')
var through = require('through2')
var path = require('path')
var acorn = require('acorn');
var basePath = path.resolve(__dirname, '../src')
function alias (options) {
  if (isEmpty(options)) return
  var keys = Object.keys(options)
  keys.forEach((key) => {
    options[key] = path.resolve(basePath, options[key])
  })

  return through.obj(function (file, enc, cb) {
    if (file.isNull() || isEmpty(options)) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new gutil.PluginError('gulp-js', 'Streaming not supported'))
    }

    try {
      var contents = file.contents.toString()
      var res = acorn.parse(contents, {
        ecmaVersion: 8,
        sourceType: 'module',
        preserveParens: false
      })

      var modules = res.body.filter((node) => {
        return node.type === 'ImportDeclaration'
      })

      var pos = []
      modules.forEach((node) => {
        var source = node.source
        var value = source.value
        // 过滤掉./和/开头的
        if (value[0] !== '.' && value[0] !== '/') {
          keys.forEach((key) => {
            if (value.indexOf(key) === 0) {
              var modulePath = path.relative(path.dirname(file.path), value.replace(key, options[key]))
              modulePath = modulePath[0] === '.' ? modulePath : './' + modulePath
              pos.push({
                start: source.start,
                end: source.end,
                value: "'" + modulePath + "'"
              })
            }
          })
        }
      })

      if (pos.length) {
        pos.sort((a, b) => a.start - b.start)

        var cnt = ''

        for (var i = 0; i < pos.length; i++) {
          var cur = pos[i]
          var next = pos[i + 1]
          if (i === 0) {
            cnt += contents.substring(0, cur.start) + cur.value
          } else {
            cnt += cur.value
          }
          if (next) {
            cnt += contents.substring(cur.end, next.start)
          } else {
            cnt += contents.substring(cur.end)
          }
        }
        file.contents = new Buffer(cnt)
      }
    } catch (e) {
      console.error('[gulp:alias]', e)
    }

    cb(null, file)
  })
}

function isEmpty (obj) {
  if (obj == null) {
    return true
  }
  return Object.keys(obj).length === 0
}

module.exports = alias
