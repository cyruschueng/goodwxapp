/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-26 02:49:36
 * @modify date 2018-01-26 02:49:36
 * @desc 将复制node_modules中的文件到dist/npm，并修改require/import的引入文件为相对路径
*/

const fs = require('fs')
const path = require('path')
const through = require('through2')
const gutil = require('gulp-util')
const PluginError = gutil.PluginError

const { RegNodeModulesFile } = require('../fileRegExp')
const __root = path.resolve(__dirname, '../..')

/**
 * 判断是否是一个文件
 * @param {String} p 文件的路径
 * @param {Boolean} isFile 是否是一个文件
 */
function isFile(p) {
  if (fs.existsSync(p)) {
    let stats = fs.statSync(p)
    return stats.isFile()
  } else {
    return false
  }
}

/**
 * 解析package.json
 * @param {String} p package.json的父级目录
 * @return {String} main 返回package.json中指定的文件主路径
 */
function parsePkg(p) {
  let pkgPath = path.resolve(p, 'package.json')
  try {
    let stats = fs.statSync(pkgPath)
    if (stats.isFile()) {
      let pkg = fs.readFileSync(pkgPath, 'utf8')
      pkg = JSON.parse(pkg)
      let main = ''
      if (typeof pkg.browser === 'string' && pkg.browser !== '') {
        main = pkg.browser
      } else if (typeof pkg.main === 'string' && pkg.main !== '') {
        main = pkg.main
      }
      return main
    }
  } catch (ex) {
    throw ex
  }
}

/**
 * 创建一个文件
 * @param {String} oldPath 当前文件所在的路径
 * @param {String} newPath 新建文件的路径
 */
function createFile(oldPath, newPath) {
  let base = path.resolve(__root, 'dist')
  let rfp = path.relative(base, newPath)
  let split = rfp.split('/')
  let len = split.length
  let p = base
  for (let i = 0; i < len - 1; i++) {
    p = path.resolve(p, split[i])
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p)
    }
  }

  p = path.resolve(p, split[len - 1])
  if (!fs.existsSync(p)) {
    let readStream = fs.createReadStream(oldPath)
    let writeStream = fs.createWriteStream(newPath)
    readStream.pipe(writeStream)
  }
}

/**
 * 解析node_modules
 * @param {String} p 路径
 * @param {String} fileDir 当前文件的父级目录
 * @return {String} path 将node_modules文件复制到dist
 */
function getNodeModulesFile(p, fileDir) {
  let nodeModulesPath = path.resolve(__root, 'node_modules', p)

  try {
    let stats = fs.statSync(nodeModulesPath)
    let distPartPath = 'dist/npm'
    let srcPartPath = 'src/npm'
    if (stats.isFile()) {
      let destPath = path.resolve(__root, distPartPath, p)
      createFile(nodeModulesPath, destPath)
      let npmPath = path.resolve(__root, srcPartPath, p)
      return path.relative(fileDir, npmPath)
    } else if (stats.isDirectory()) {
      // 解析
      let rfp = parsePkg(nodeModulesPath)
      let fp = path.resolve(nodeModulesPath, rfp)
      if (isFile(fp)) {
        let npmPath = ''
        let indexfp = fp.lastIndexOf('.')
        let startfp = fp.substring(0, indexfp)
        let endfp = fp.substring(indexfp)
        let minfp = `${startfp}.min${endfp}`

        if (isFile(minfp)) {
          // 有压缩版的文件
          let indexrfp = rfp.lastIndexOf('.')
          let startrfp = rfp.substring(0, indexrfp)
          let endrfp = rfp.substring(indexrfp)
          let minrfp = `${startrfp}.min${endrfp}`
          let destPath = path.resolve(__root, distPartPath, p, minrfp)
          createFile(minfp, destPath)
          npmPath = path.resolve(__root, srcPartPath, p, minrfp)
        } else {
          // 没有压缩版的文件
          let destPath = path.resolve(__root, distPartPath, p, rfp)
          createFile(fp, destPath)
          npmPath = path.resolve(__root, srcPartPath, p, rfp)
        }

        return path.relative(fileDir, npmPath)
      } else {
        throw new Error(`${fp}文件未找到!`)
      }
    }
  } catch (ex) {
    throw ex
  }
}

module.exports = () => {
  return through.obj((file, enc, cb) => {
    if (file.isBuffer()) {
      let content = file.contents.toString()
      let fileDir = path.dirname(file.path)
      if (content) {
        try {
          content = content.replace(RegNodeModulesFile, ($0, $1, $2) => {
            let nodeModulesPath = $1 || $2
            let npmPath = getNodeModulesFile(nodeModulesPath, fileDir)
            return $0.replace(nodeModulesPath, npmPath)
          })
          file.contents = Buffer.from(content, 'utf8')
        } catch (ex) {
          throw ex
        }
      }
    }

    if (file.isStream()) {
      this.emit('error', new PluginError('JSON transform', 'Stream not supported!'))
    }

    cb(null, file)
  })
}
