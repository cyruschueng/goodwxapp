// pages/goodstuff/increase.js
var app = getApp();
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
    wx.showLoading({
      title: '加载中',
    })
    var uid = wx.getStorageSync("ptuserinfo").userid;
    var that=this
    wx.request({
      
      url: app.globalData.apiBase+"index.php/app/moneyrecord.html",
      data: { uid },
      dataType: "jsonp",
      method: "GET",
      success: function (res) {
        wx.hideLoading();
        let d = JSON.parse(res.data.replace(/^\(|\)$/g, ''));
        if (!d.result){
          that.setData({ list:"" })
          return;
        } 
        that.setData({list:d.result})
      },
      
    })
  },

})