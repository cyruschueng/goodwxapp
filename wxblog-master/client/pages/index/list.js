const app = getApp();

Page({
  data: {  
  },
  onLoad: function () {
   
  },
  onShow: function () {
    wx.removeTabBarBadge({
      index: 1
    })
  }
})
