//app.js
App({
  onLaunch: function (ops) {
    if(ops.scene == 1044){
      console.log(ops.shareTicket);
      wx.getShareInfo({
        shareTicket:ops.shareTicket,
        success: function(res){
          console.log(res)
        }
      })
    }
    // console.log(111111111)
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
        var tt = wx.getStorageSync('localShow')
   console.log(tt.length)
    // 登录
    wx.login({
      success: function(res){

        // console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
  onLoad:function(){
      
  },

  // onShow: function(option){
  //   console.log(option);
  //   wx.getShareInfo({
  //     // shareTicket:res.shareTicket
  //   })
  // },
  globalData: {
    userInfo: null
  }
})