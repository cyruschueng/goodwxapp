//app.js
App({
  onLaunch: function (options) {

    var shareTicket = options.shareTicket;
    this.globalData.shareTicket = shareTicket;
    console.log("shareTicket:", shareTicket);
    // wx: wx.getShareInfo({
    //   shareTicket: shareTicket,
    //   success: function (ress) {
    //     console.log("获取转发信息成功");
    //     console.log(ress);
    //   },
    //   fail: function (err) {
    //     console.log("获取转发信息失败", err);
    //   }
    // });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
        console.log('code:',res.code);

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


  //全局数据
  globalData: {
    userInfo: null,
    shareTicket: 'shareTicket'
  }
})




/*
appid:wx84b4158dec481f79
secret:b96334e5cb216ea1840ec85006538c4a

https://api.weixin.qq.com/sns/jscode2session?appid=wx84b4158dec481f79&secret=b96334e5cb216ea1840ec85006538c4a&js_code=001JMFIe2gBFqA04ZuHe2KNlIe2JMFI3&grant_type=authorization_code

{"session_key":"2jQjSgQ9AFxjROvFzuWUDg==","expires_in":7200,"openid":"oHYH60JifF1SRUPW-ETx-fFvGddc"}

encryptedData:"VZO/5Opg/VdmRuPVfum4ERtHySCJL289hVRmelhihzoBjhg7sPAH8RctirLoymQzP6MWgRIUFnTZvpuoYaZZrT2qUYmSNijMSx6p8d6Mr0xGdEBQHtNJ7MBqwLKdSx3NsLuC4XFtuWGKrpN6VHynSw=="
iv:"OqT3czOcOx/NK42ib7kmOg=="
*/