var app = getApp()
Page({

  data: {
  
  },

  onLoad: function (options) {
  
    wx.setNavigationBarTitle({
      title: '小程序授权'
    })

  },

  onShow: function () {
  
  },

  authorized(){
    wx.openSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          //储存授权信息
          wx.setStorageSync('storage_authorized', true)
          wx.redirectTo({
            url: '/page/login/index',
          })
          app.UserLogin()
          
        }else{
          wx.setStorageSync('storage_authorized', false)
        }
      }
    })
  }

})