var app = getApp();
Page({
  onTapJump2: function (event) {
    wx.navigateTo({
      //新用户注册
      url: '/pages/register/register',
    });
  },
  onTapJump3: function (event) {
    wx.navigateTo({//老用户登录
      url: "/pages/logs/logs",
    });
  },
  onLoad() {
   /* this.setData({ baseUrl: app.globalData.apiBase })
    var state = wx.getStorageSync('flag')
    if (state == 3) {
      wx.reLaunch({//switchTab
        url: "/pages/welcome/welcome"
      })
    }*/
  }
})