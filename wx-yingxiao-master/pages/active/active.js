// pages/active/active.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeClass:['千人团购','地域抢订','我在现场'],
    status:['已结束','进行中'],
    active:[   
    ]
  },
  onLoad: function (options) {
    var that = this;
    if (getApp().globalData.userphone != null) {
      that.setData({
        tobindphone: '0'
      })
    }
  },
  onShow: function () {
    var that = this;
    if (getApp().globalData.userphone != null) {
      that.setData({
        tobindphone: '0'
      })
    }  
  },
  bindphone: function () {
    wx.navigateTo({
      url: '/pages/setting/setting?code=1',
    })
  }
})