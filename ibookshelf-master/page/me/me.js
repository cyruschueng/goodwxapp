var app = getApp()
const config = require('../../config')
Page({
  data: {
    autoAddFlag: null
  },
  onShow: function () {
    var that = this
    var btn_autoAddFlag = false
    wx.getStorage({
      key: 'autoAdd',
      success: function (res) {
        that.setData({
          autoAddFlag: res.data
        })
      }
    })
  },
  autoAdd2Change: function (e) {
    wx.request({
      url: config.userConfUrl + app.globalData.openid,
      method: 'PUT',
      data: {
        autoAdd: e.detail.value
      },
      success: function (res) {
        console.log(res.data)
        wx.setStorage({
          key: "autoAdd",
          data: e.detail.value
        })
      }
    })
  }
})