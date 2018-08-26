//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    test:"this is test",
    token:null
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
    var that=this
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({
          token:res.data
        })
      }
    })
  }
})
