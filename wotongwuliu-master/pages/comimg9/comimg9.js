// pages/comimg5/comimg5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '沃通物流',
      desc: '小程序',
      path: '/pages/index/index'
    }
  }
})