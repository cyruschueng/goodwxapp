//app.js
App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (data) { 
            var iv = data.iv;
            var encryptedData = data.encryptedData; 
            wx.request({
              url: 'https://m.app.shangquanpai.com/common/auth',
              data: {
                code: code ,
                iv: iv,
                encryptedData: encryptedData
              },
              method:'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function (res) {
                wx.setStorageSync('session_key', res.data.data.session_key);
              }
            })
          }
        })
      }
    })
    
  },
  
  globalData:{
    userInfo:null
  }
})