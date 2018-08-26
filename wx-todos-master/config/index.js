/**
 * @author Sky
 * @email lihaizh_cn@foxmail.com
 * @create date 2018-01-08 03:17:23
 * @modify date 2018-01-08 03:17:23
 * @desc 配置文件组合
*/

const { routes, $window, $tabBar, $networkTimeout, $debug } = require('./config')

// 主包页面集合（主包不能大于2MB）
let $pages = []

// 分包加载，减少主包的体积
// - 整个小程序所有分包总体积不能超过4MB
// - 单个分包/主包大小不能超过2MB
let $subPackages = []

// 所有页面集合
let allPages = []

// 分包页面集合
let packages = []

const routesLength = routes.length
// 生成主包
for (let i = 0; i < routesLength; i++) {
  if (i !== 0) {
    packages[i - 1] = []
  }

  let route = routes[i]

  for (let page of Object.values(route)) {
    i === 0 ? $pages.push(page) : packages[i - 1].push(page)
    allPages.push(page)
  }
}

const packageLength = packages.length
// 生成分包
for (let i = 0; i < packageLength; i++) {
  $subPackages.push({
    root: 'package' + (i + 1),
    pages: packages[i]
  })
}

function setup (param, key) {
  let obj = {}

  switch (Object.prototype.toString.call(param).slice(8, -1).toLowerCase()) {
    case 'array':
      if (param.length) {
        obj[key] = param
      }
      break
    case 'object':
      /* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^ignore" }] */
      for (let ignore in param) {
        obj[key] = param
        break
      }
      break
    case 'boolean':
      if (param) {
        obj[key] = true
      }
      break
    case 'string':
      if (param !== '') {
        obj[key] = param
      }
      break
    default:
      obj[key] = param
  }

  return obj
}

function removeDefaultProp (data, prop, defaultValue) {
  let value = data[prop]
  if ((value instanceof Array && value.length === 0) || value === undefined || value === defaultValue) {
    delete data[prop]
  }
}

// window
removeDefaultProp($window, 'navigationBarBackgroundColor', '#000000')
removeDefaultProp($window, 'navigationBarBackgroundColor', '#000')
removeDefaultProp($window, 'navigationBarTextStyle', 'white')
removeDefaultProp($window, 'navigationBarTitleText', '')
removeDefaultProp($window, 'navigationBarTitleText', null)
removeDefaultProp($window, 'backgroundColor', '#ffffff')
removeDefaultProp($window, 'backgroundColor', '#fff')
removeDefaultProp($window, 'backgroundTextStyle', 'dark')
removeDefaultProp($window, 'enablePullDownRefresh', false)
removeDefaultProp($window, 'onReachBottomDistance', 50)

// tarBar
removeDefaultProp($tabBar, 'color', '')
removeDefaultProp($tabBar, 'selectedColor', '')
removeDefaultProp($tabBar, 'backgroundColor', '')
removeDefaultProp($tabBar, 'borderStyle', 'black')
removeDefaultProp($tabBar, 'list', null)
removeDefaultProp($tabBar, 'list')
removeDefaultProp($tabBar, 'position', 'bottom')

// networkTimeout
removeDefaultProp($networkTimeout, 'request', 60000)
removeDefaultProp($networkTimeout, 'connectSocket', 60000)
removeDefaultProp($networkTimeout, 'uploadFile', 60000)
removeDefaultProp($networkTimeout, 'downloadFile', 60000)

module.exports = {
  pages: allPages,
  config: Object.assign(
    setup($pages, 'pages'),
    setup($window, 'window'),
    setup($tabBar, 'tabBar'),
    setup($networkTimeout, 'networkTimeout'),
    setup($subPackages, 'subPackages'),
    setup($debug, 'debug')
  )
}
