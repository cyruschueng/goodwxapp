function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*----------------------------微信api封装----------------------------*/
var app = getApp();
const API_URL = "https://xcx.d1money.com/services/hkphb/";
// const API_URL = "http://192.168.0.137/";
//微信本地存储 - 添加
function setStorage(key, data) {
  wx.setStorage({
    key,
    data
  })
}
function ajax(url, data, type, success, complete, fail) {
  wx.request({
    url: API_URL + url,
    data,
    method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }, // 设置请求的 header
    success(res) {
      // success
      if (success) success(res)
      if (res.data.code != "SUCCESS") {
        console.error(`fail: 错误码:${res.data.code},错误信息:${res.data.msg}`)
      } else if (res.data.code == "000002") {
        //"SESSION_3RD 超时"
        console.error("SESSION_3RD 超时");
        app.login();
      }
    },
    fail() {
      // fail
      // console.log('ajax失败');
      if (fail) fail()
    },
    complete() {
      // complete
      // console.log('ajax完成');
      // wx.hideToast();
      // wx.hideLoading()
      wx.hideNavigationBarLoading()
      wx.setNavigationBarTitle({
        title: '获客排行榜'
      })
      if (complete) complete()
    }
  })
}

module.exports = {
  formatTime: formatTime,
  setStorage: setStorage,
  ajax: ajax,
}
