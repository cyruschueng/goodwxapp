var secret = require('../secret/settings.js')

let requestHandler = {
  url: '',
  params: {},
  header: {},
  success: function (res) {
    // success
  },
  fail: function () {
    // fail
  },
  complete: function () {
    // complete
  },
}

function getRequsetParams() {
  let params = secret.getVoucher()
  let reqParams = "timestamp=" + params[0] + "&code=" + params[1]
  return reqParams
}

function generateUrl(url) {
  if (typeof (url) != "string") { return false }

  let encryptDomain = ["iknowapp.com",]
  let needEncrypt = false

  for (var i in encryptDomain) {
    if (url.indexOf(encryptDomain[i]) >= 0) {
      needEncrypt = true
      break
    }
  }

  if (needEncrypt) {
    if (url.indexOf("?") > 0) {
      return url + '&' + getRequsetParams()
    }
    else {
      return url + '?' + getRequsetParams()
    }
  }
  else {
    return url
  }
}

function loginAndRerun(method, requestHandler, retry) {
  let app = getApp()
  if (app.globalData.userInfo) {
    getCookie(method, requestHandler, app.globalData.userInfo.nickName, app.globalData.userInfo.avatarUrl, retry)
  }else {
    app.getUserInfo(
      function(res) {
        getCookie(method, requestHandler, res.nickName, res.avatarUrl, retry)
      }
    )
  }
}

function getCookie(method, requestHandler, nickName, avatarUrl, retry) {
  wx.login({
    success: function (res) {
      if (res.code) {
        let reqData = {
          type: 1,
          code: res.code,
          nick_name: nickName,
          avatar: avatarUrl,
        }

        POST({
          url: secret.userLoginUrl,
          params: reqData,
          success: function (res) {
            wx.setStorageSync('cookie', res.header['Set-Cookie'].replace(/(mytoken_sid=)(\w+)(;.+)/i, "$1$2"))
            request(method, requestHandler, retry+1)
          }
        })
      }
      else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
}

//GET请求 回调方法只需要写处理逻辑
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求 回调方法只需要写处理逻辑
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler, retry=0) {
  wx.showNavigationBarLoading()
  wx.getNetworkType({
    success: function (res) {
      // 返回网络类型, 有效值：
      // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
      if (res.networkType == 'none') {
        wx.showToast({
          title: '未检测到网络连接，请检查您的网络设置',
          duration: 1500,
          mask: true,
          image: "/images/icons/exclamationmark.png",
        })
        return false
      }
    }
  })

  console.log(generateUrl(requestHandler.url))

  if (!requestHandler.header) {
    requestHandler.header = {}
  }
  if (method=='POST') {
    requestHandler.header["Content-Type"] = "application/x-www-form-urlencoded"
  }
  let cookie = wx.getStorageSync('cookie')
  if (cookie) {
    requestHandler.header['Cookie'] = cookie
  }

  if (!requestHandler.success || !(typeof requestHandler.success == "function") ) {
    requestHandler.success = ()=>{}
  }
  if (!requestHandler.fail || !(typeof requestHandler.fail == "function")) {
    requestHandler.fail = () => { }
  }
  if (!requestHandler.complete || !(typeof requestHandler.complete == "function")) {
    requestHandler.complete = () => { }
  }

  wx.request({
    url: generateUrl(requestHandler.url),
    header: requestHandler.header,
    data: requestHandler.params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      console.log('response is: ', res)
      if (res.data.code === 0) {
        if (typeof (requestHandler.success) == "function") {
          requestHandler.success(res)
        }
      }
      else if (res.data.code === 9510013) {
        if (retry < 5) { // 重试小于5次
          loginAndRerun(method, requestHandler, retry)
        } else {
          wx.showToast({
            title: 'MT打盹中，请稍候再试...',
            duration: 1500,
            image: '/images/icons/exclamationmark.png',
          })
        }
      }
      else if (res.data.code === 9510004) {
        wx.showToast({
          title: '登陆失败，请稍候再试...',
          duration: 1500,
          image: '/images/icons/exclamationmark.png',
        })
      }
      else {
        wx.showToast({
          title: '未知请求错误，请稍候再试...',
          duration: 1500,
          image: '/images/icons/exclamationmark.png',
        })
      }
    },
    fail: function (res) {
      if (typeof (requestHandler.fail) == "function") {
        requestHandler.fail(res)
      }
    },
    complete: function (res) {
      // complete
      if (typeof (requestHandler.complete) == "function") {
        requestHandler.complete(res)
      }
      wx.hideNavigationBarLoading()
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST
}