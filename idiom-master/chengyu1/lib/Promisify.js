/**
 * 将异步API Promise 化（回调函数 改为 链式调用）。具体优化效果看最下边
 * @param {* 微信原生异步API} wxFn 
 */
function Promisify(wxFn, options = {}) {
  return function middleware(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = options.success ? options.success(resolve) : (res => { resolve(res) })
      obj.fail = options.fail ? options.fail(reject) : (err => { reject(err) })
      wxFn(obj)
    })
  }
}

/**
 * wx.request Promise 化 -- 需要特殊处理
 * @param {* 自定义传参} obj 
 */
function requestPromisify(obj = {}) {
  return new Promise((resolve, reject) => {
    obj.success = res => { resolve(res.data) }
    obj.fail = err => { reject(err) }
    if (obj.method && obj.method.toUpperCase() === 'POST') {
      obj.header = obj.header || {}
      obj.header['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    wx.request(obj)
  })
}

/**
 * wx.getStorage Promise 化 -- 需要特殊处理
 * @param {* 自定义回调函数} obj 
 */
function getStoragePromisify(obj = {}) {
  return new Promise((resolve, reject) => {
    obj.success = (res) => {resolve(res)}
    obj.fail = (err) => {resolve({data: err})}
    wx.getStorage(obj)
  })
}

// 将下列 API Promise 化
module.exports = {
  loginPromisify: Promisify(wx.login),
  requestPromisify: requestPromisify,
  getUserInfoPromisify: Promisify(wx.getUserInfo),
  setClipboardDataPromisify: Promisify(wx.setClipboardData),
  getStoragePromisify: getStoragePromisify,
  getSettingPromisify: Promisify(wx.getSetting),
  requestPaymentPromisify: Promisify(wx.requestPayment)
}
