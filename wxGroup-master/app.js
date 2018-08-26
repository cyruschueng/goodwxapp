//app.js
App({
  onLaunch: function () {
    var token = wx.getStorageSync('token')
    var that = this
    wx.checkSession({
      success: function () {
        if (!token){
          that.login()
        } else {
          that.globalData.token = token
        }
      },
      fail: function () {
        console.log('failed')
        that.login()
      }
    })
  },
  globalData: {
    userInfo: null,
    token: null
  },
  login: function() {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://group.mrourou.com/wx/user/_login?code=' + res.code,
            method: 'POST',
            success: response => {
              console.log(response)
              wx.setStorageSync('token', response.data.data)
              that.globalData.token = response.data.data
              if (that.loginCallback){
                that.loginCallback(res)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function(){
        console.log(1)
      }
    });
  }
})