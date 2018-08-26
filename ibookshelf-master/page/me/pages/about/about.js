var app = getApp()

Page({
  data: {
    version: ''
  },
  onLoad: function () {
    var that = this
    that.setData({
      version: app.globalData.version
    })
  }
})

