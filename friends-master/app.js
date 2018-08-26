//app.js
App({
  data: {
    loginData: null,
    sign: "",
    mobile: "",
    wx_name: "",
    mid: "",
    sharecode: "",
    authStatic: false,
    loginStatic: false,
    authSuccess: false,
    kid: ''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    let extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    that.data.kid = extConfig.kid;
    that.data.kid = 123;
    wx.setStorageSync('kid', that.data.kid); //that.data.kid
      // 登录
      wx.login({
        success: function (res) {
          console.log(res);
          console.log(res.code);
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          //发起网络请求
          if (res.code) {
            wx.request({
              url: 'https://friend-guess.playonwechat.com/api/auth-by-three?code=' + res.code + '&operator_id=' + that.data.kid,
              method: 'GET',
              success: function (res) {
               // console.log(res);
                try {
                  wx.setStorageSync('mid', res.data.data.mid);
                  wx.setStorageSync('sign', res.data.data.sign);
                  var sign = res.data.data.sign;
                  that.data.mid = res.data.data.mid;
                  wx.getUserInfo({
                    success: function (res) {
                      var userInfo = res.userInfo
                      wx.setStorageSync('userInfo', userInfo);
                      console.log('userInfo', userInfo);
                      // 保存用户信息
                      wx.request({
                        url: 'https://friend-guess.playonwechat.com/api/save-user-info?sign=' + sign + '&operator_id=' + that.data.kid,
                        method: 'POST',
                        success: function (res) {
                         console.log(res);
                          
                          setTimeout(function () {
                            wx.hideLoading()
                          }, 500)
                        }
                      })
                    },
                    fail: function () {
                      console.log("用户拒绝授权");
                      wx.showModal({
                        title: '警告',
                        content: '您点击了拒绝授权，将无法正常使用体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
                        success: function (res) {
                          if (res.confirm) {
                            console.log('用户点击确定');
                          }
                        }
                      })
                      wx.openSetting({
                        success: (res) => {
                          console.log(res);
                        }
                      })
                    },
                  })
                } catch (e) {
                  console.log("回话异常：" + e);
                }
              },
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg);
          }
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
  },
  globalData: {
    userInfo: null
  }
})