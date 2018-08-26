
var util = require('../../../util/util.js');
Page({
  data: {
    ishistory: false,
    empty: {
      isshow: false,
      title: '还没有视频观看历史哦!'
    },
    watchRecordData: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      watchRecordData: util.sortObj(wx.getStorageSync('watchRecordData')) || {}
    })
    if (JSON.stringify(this.data.watchRecordData) == "{}") {
      this.setData({
        ishistory: true
      })
    }
  },
  cleanHistory: function () {
    wx.removeStorageSync('watchRecordData');
    this.setData({
      watchRecordData: {},
      ishistory: true
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})