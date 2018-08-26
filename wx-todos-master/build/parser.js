/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-18 05:48:58
 * @modify date 2018-01-18 05:48:58
 * @desc 获取打包资源文件
 * WXML ------>-------------->-------------->
 *  |         |              |              |
 * IMAGE     JS------>      CSS------>     JSON
 *            |      |       |       |
 *           JS    IMAGE    CSS    IMAGE
*/

const fs = require('fs')
const path = require('path')

const { pages } = require('../config')
const { RegJSFile, RegSCSSFile, RegSRCFile } = require('./fileRegExp')

const __root = path.resolve(__dirname, '../src')

// 文件存储器
const JS_PATH = []
const SCSS_PATH = []
const WXML_PATH = []
const IMAGE_PATH = []
const JSON_PATH = []

const parser = {
  factory (p) {
    try {
      let stats = fs.statSync(p)
      if (stats.isFile()) {
        if (/\.js$/.test(p)) {
          this.JS(p)
          console.log(`JS资源文件：${ p }`)
        } else if (/\.wxml$/.test(p)) {
          this.WXML(p)
          console.log(`WXML资源文件：${ p }`)
        } else if (/\.scss$/.test(p)) {
          this.SCSS(p)
          console.log(`SCSS资源文件：${ p }`)
        } else if (/\.(svg|gif|png|jpe?g)$/.test(p)) {
          this.IMAGE(p)
          console.log(`IMAGE资源文件：${ p }`)
        } else if (/\.json$/.test(p)) {
          this.JSON(p)
          console.log(`JSON资源文件：${ p }`)
        }
      }
    } catch (ex) {
      console.log(ex)
    }
  },
  JS (p) {
    if (JS_PATH.includes(p)) {
      return
    }
    JS_PATH.push(p)
    try {
      let data = fs.readFileSync(p, 'utf8')
      // 匹配require和import关键字引入的文件，找到相对路径的文件
      data.replace(RegJSFile, ($0, $1, $2) => {
        let rp = $1 || $2

        // 补全.js后缀
        if (!/\.(es6|js)/.test(rp)) {
          rp += '.js'
        }

        // 相对路径解析
        let dirname = path.dirname(p)
        let tmpPath = path.resolve(dirname, rp)
        parser.factory(tmpPath)
        return $0
      })
    } catch (ex) {
      throw ex
    }
  },
  WXML (p) {
    if (WXML_PATH.includes(p)) {
      return
    }
    WXML_PATH.push(p)

    try {
      let data = fs.readFileSync(p, 'utf8')
      data.replace(RegSRCFile, ($0, $1) => {
        this.factory($1)
        return $0
      })
    } catch (ex) {
      throw ex
    }
  },
  SCSS (p) {
    if (SCSS_PATH.includes(p)) {
      return
    }
    SCSS_PATH.push(p)

    try {
      let data = fs.readFileSync(p, 'utf8')
      // 如果不想把scss文件内容引入当前文件，可以设置在@import时设置后缀名为`.wxss`
      data.replace(RegSCSSFile, ($0, $1) => {
        let rp = $1.replace(/\.wxss^/, '.scss')
        let dirname = path.dirname(p)
        let tmpPath = path.resolve(dirname, rp)
        parser.factory(tmpPath)
        return $0
      })
    } catch (ex) {
      throw ex
    }
  },
  IMAGE (p) {
    if (!IMAGE_PATH.includes(p)) {
      IMAGE_PATH.push(p)
    }
  },
  JSON (p) {
    if (!JSON_PATH.includes(p)) {
      JSON_PATH.push(p)
      try {
        let data = fs.readFileSync(p, 'utf8')
        let obj = JSON.parse(data)

        // 查找当前页面引入的所有组件
        let components = obj.usingComponents

        if (components) {
          for (let component of Object.values(components)) {
            let dirname = path.dirname(p)
            let componentPath = path.resolve(dirname, component)

            parser.factory(`${ componentPath }.js`)
            parser.factory(`${ componentPath }.scss`)
            parser.factory(`${ componentPath }.json`)
            parser.factory(`${ componentPath }.wxml`)
          }
        }
      } catch (ex) {
        throw ex
      }
    }
  }
}

const PAGE_PATH = [
  path.resolve(__root, 'app.js'),
  path.resolve(__root, 'app.scss')
]

const pagesLength = pages.length
// 获取所有在使用的页面
for (let i = 0; i < pagesLength; i++) {
  let page = pages[i]
  PAGE_PATH.push(
    `${ path.resolve(__root, page) }.js`,
    `${ path.resolve(__root, page) }.scss`,
    `${ path.resolve(__root, page) }.json`,
    `${ path.resolve(__root, page) }.wxml`
  )
}

const srcLength = PAGE_PATH.length
for (let i = 0; i < srcLength; i++) {
  parser.factory(PAGE_PATH[i])
}

module.exports = () => {
  return {
    JS_PATH,
    SCSS_PATH,
    WXML_PATH,
    IMAGE_PATH,
    JSON_PATH
  }
}
