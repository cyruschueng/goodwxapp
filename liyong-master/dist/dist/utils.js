const promisify = require('./lib/promisify')
const regeneratorRuntime = require('./lib/regenerator-runtime')
// const { log } = require('./api')
const showModal = promisify(wx.showModal)

exports.isEnterFinished = store => {
  return store.getState().global.entryType
}

exports.navigateErrorPage = err => {
  const msg = err.errMsg || err.msg || err || '服务器错误'
  wx.navigateTo({ url: `/pages/500/500?msg=${msg}` })
}
exports.alertError = err => {
  console.log(err)
  let msg = err.errMsg || err.msg || err || '服务器错误'
  // format
  if (/timeout/.test(msg)) msg = '请求超时，请重试'
  promisify(wx.showModal)({
    title: '提示',
    content: `${msg}`,
    showCancel: false
  })
}

exports.alert = msg => promisify(wx.showModal)({
  title: '提示',
  content: msg,
  showCancel: false
})

exports.confirm = msg => new Promise(r => {
  wx.showModal({
    title: '提示',
    content: msg,
    success (res) {
      if (res.confirm) {
        r(true)
      } else if (res.cancel) {
        r(false)
      }
    }
  })
})

exports.showSuccess = (message = '成功') => wx.showToast({
  icon: 'success',
  title: message,
  mask: true,
  duration: 500
})

exports.defaultShareAppMessage = () => {
  return {
    title: '有好福利、每天签到抽奖玩不停',
    path: '/pages/index/index?from=shareApp',
    imageUrl: 'https://imgcdn.youhaodongxi.com/weapp/share-poster-09b16f9d53.jpg',
    success ({ shareTickets }) {
      // console.log(shareTickets)
    },
    fail (err) {}
  }
}

exports.handlerAuthFail = async () => {
  wx.setStorageSync('authFail', true)
  const modal = await showModal({
    title: '授权失败',
    content: '请允许使用用户信息',
    confirmText: '去授权',
    showCancel: false
  })
  if (modal.confirm) {
    wx.openSetting()
  }
}

exports.pushLog = ({ method, msg, level = 'LOG' }) => {
//   log(`[${level}] ${method}: ${msg}`)
}

exports.isTelphone = telphone => {
  return /^1\d{10}$/.test(telphone)
}

exports.serialize = obj => {
  const str = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    }
  }
  return str.join('&')
}

exports.arrayRemoveItem = (array, item) => {
  const index = array.indexOf(item)
  if (index > -1) array.splice(index, 1)
  return array
}

exports.debounce = (fn, wait) => {
  let timeout
  return function (...args) {
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(context, args), wait)
  }
}

exports.emptyObject = obj => {
  return Object.keys(obj).length === 0
}
