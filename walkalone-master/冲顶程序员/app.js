//app.js
function login(opt) {
  // 登录
  wx.login({
    success: res => {
      var code = res.code
      wx.getUserInfo({
        'withCredentials': true,
        'success': function (info) {
          var wechatGroupInfo = ''
          //获取群ID
          wx.showShareMenu({
            withShareTicket: true, //要求小程序返回分享目标信息
            success: function () {
              //console.log(opt)
              if (opt.scene == 1044) {
                wx.getShareInfo({
                  shareTicket: opt.shareTicket,
                  complete(res) {
                    wechatGroupInfo = res
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    wx.request({
                      url: app.globalData.apiDomain+'/user/small_login',
                      data: {
                        'code': code,
                        'rawData': info.rawData,
                        'signature': info.signature,
                        'encryptedData': info.encryptedData,
                        'iv': info.iv,
                        'encryptedData_': wechatGroupInfo.encryptedData,
                        'iv_': wechatGroupInfo.iv
                      },
                      success: function (res) {
                        //console.log(res)
                        wx.setStorageSync('token', res.data.msg.auth)
                        app.globalData.userInfo = res.data.msg.userInfo
                      }
                    })
                  }
                })
              } else {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                wx.request({
                  url: app.globalData.apiDomain +'/user/small_login',
                  data: {
                    'code': code,
                    'rawData': info.rawData,
                    'signature': info.signature,
                    'encryptedData': info.encryptedData,
                    'iv': info.iv
                  },
                  success: function (res) {
                    //console.log(res)
                    wx.setStorageSync('token', res.data.msg.auth)
                    app.globalData.userInfo = res.data.msg.userInfo
                  }
                })
              }
            }
          })

        },
        fail: function (FAIL) {
          //console.log(fail) 取消授权
          unAuthModal(opt)
        },
        complete: function (complete) {
          //console.log('complete')
        }
      })

    }
  })
}

//不授权弹出提示 opt为传递过来的 onLaunch 场景参数
function unAuthModal(opt){
  wx.showModal({
    title: '警告',
    content: '若不授权微信登录，将无法正常使用本小程序；点击授权，则可重新使用。若还是点击不授权，之后还想使用的话，请在微信【发现】-【小程序】-删掉本小程序，重新授权登录，方可使用',
    success: function (res) {
      if (res.confirm) {
        wx.openSetting({
          success: function (res) {
            if (!res.authSetting["scope.userInfo"] || !res.authSetting["scope.userLocation"]) {
              //这里是授权成功之后 填写你重新获取数据的js
              //参考:
              login(opt)
            }
          }
        })
      } else if (res.cancel) {
        unAuthModal(opt);
      }
    }
  })
}


App({
  onLaunch: function (opt) {
    //console.log(opt)
    //console.log('onLaunch')
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    wx.checkSession({
      success: function () {
        //console.log('登录态有效')
        //session 未过期，并且在本生命周期一直有效
        //检测token是否存在
        var token = wx.getStorageSync('token')
        if (token == '' || token == null || token == undefined) {
          login(opt)
        }
      },
      fail: function () {
        //登录态过期 重新登录
        //console.log(opt)
        login(opt)
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //
  },
  globalData: {
    userInfo: null,
    apiDomain: 'https://coder.51tui.vip',     //api主域名
  },
  /*onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      //console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        //console.log(app.globalData.userInfo)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }*/
})

const app = getApp();