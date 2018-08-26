//app.js
const util = require('utils/util.js')
const common = require('utils/common.js')

App({
  onLaunch: function (options) {
    wx.showLoading({
      title: '',
      mask: true
    })
    console.log('onLaunch options', options)
    wx.setStorageSync('lanuch_op', options)
  },

  globalData: {
    login_done: false,
    init_data_done: false,
  }
})