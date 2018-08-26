const app = getApp()

Page({
  data: {
    userInfo: {},
  },
  onLoad: function (option) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    wx.setNavigationBarTitle({
      title: '我的'
    })
  },
  bindViewTap: function () {
    var memberid = wx.getStorageSync('memberid')
    var token = wx.getStorageSync('token')
    console.log(memberid+"-"+token)
  },
  myOrder: function () {
    wx.navigateTo({
      url: 'myOrder'
    })
  },
  collect: function () {
    wx.navigateTo({
      url: '../collect/collect'
    })
  },
  question: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  enterPostcard: function () {
    wx.navigateTo({
      url: '../postcard/mycard'
    })
  },
  contact: function () {
    wx.navigateTo({
      url: '../experience/experience'
    })
  }
})
