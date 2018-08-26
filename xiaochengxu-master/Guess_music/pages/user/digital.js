var app = getApp();
const apiUrl = require('../../config').host;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var that = this
    var cache_key = 'digital_lv_' + opt.lv + '_speed_' + opt.speed;
    console.log(cache_key);
    var item = wx.getStorageSync(cache_key)
    if (item) {
      that.setData({
        item: item,
      })
    } else {
      wx.showLoading({
        title: '请稍等...',
      })
      wx.request({
        url: apiUrl + 'items/getdigital',
        data: {
          lv: opt.lv,
          speed: opt.speed,
        },
        success: function (res) {
          var arr = res.data.data
          wx.setStorageSync(cache_key, arr)
          that.setData({
            item: arr,
          })
          wx.hideLoading()
        }
      })
    }
  },
})