// pages/comimg5/comimg5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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