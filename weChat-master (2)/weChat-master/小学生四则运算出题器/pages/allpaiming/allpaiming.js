// pages/allpaiming/allpaiming.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],//用户信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取全部用户的信息
    wx.request({
      url: getApp().globalData.host + "GetAllPaiMing",
      method: 'POST',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      success: function (e) {
        that.setData({users:e.data});
      }
    });//end of 获取全部用户信息
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})