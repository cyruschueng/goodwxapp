//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 获取用户信息
    wx.getSetting({
      success: res => {
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
            this.login();
          },
          fail: res => {
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权，小程序将无法正常使用。请10分钟后再次点击授权，或者删除小程序重新进入。',
              success:function() {
                wx.navigateBack({
                  delta: 0
                });
              }
            })
          }
        })

      }
    })
  },
  globalData: {
    userInfo: null,
    baseUrl: 'https://xcxdev.pmvip.top/xcx_redpacket',
    jsessionid: null
  },

  login: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log("res.code=" + res.code);
          this.getjsessionid(res.code);
        }
      },
      fail: rs => {
        console.log(rs);
      }
    })
  },

  getjsessionid: function (code) {
    wx.request({
      url: this.globalData.baseUrl + '/api/auth/login',
      method: 'POST',
      data: {
        code: code
      },
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: result => {
        if (result.data && result.data.status == 0 && result.data.data.jsessionid) {
          this.saveSessionId(result.data.data.jsessionid);
          wx.getUserInfo({
            withCredentials: true,
            lang: 'zh_CN',
            success: res => {
              this.postUserInfo(res);
            }
          })
        }
      }
    })
  },

  saveSessionId: function (sessionid) {
    try {
      this.globalData.jsessionid = sessionid;
      wx.setStorageSync('jsessionid', sessionid);
    } catch (e) {
    }
  },

  clearSessionId: function () {
    wx.removeStorageSync('jsessionid');
    this.globalData.jsessionid = null
  },

  postUserInfo: function (userinfo) {
    var sessionid = this.globalData.jsessionid;
    wx.request({
      url: this.globalData.baseUrl + '/api/auth/userinfo?jsessionid=' + sessionid,
      method: 'POST', 
      data: userinfo,
      success: result => {
        console.log(result.data.status + "," + result.data.error);
      }
    })
  },
  showMsg: function (str, time) {
    var duration = 1500
    if (time) {
      duration = time
    }
    wx.showToast({
      title: str,
      icon: 'none',
      duration: duration
    })
  }
})



