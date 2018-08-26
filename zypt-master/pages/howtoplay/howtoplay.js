// pages/howtoplay/howtoplay.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    this.setData({ baseUrl: app.globalData.apiBase })//设置全局的页面路径
    let that = this;
    /*wx.request({
      url: "",
      success: function (res) {
        console.log(res.data)
        that.setData({ url: res.data.imgGroup})
      }
    })*/
  },
})