// pages/home/introduce/introduce.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  left:function(){
    wx.navigateTo({
      url: '/pages/home/introduce/left/left',
    })
  },
  help:function(){
    wx.navigateTo({
      url: '/pages/home/introduce/help/help',
    })
  },
  event:function(){
    wx.navigateTo({
      url: '/pages/home/introduce/event/event',
    })
  },
  group:function(){
    wx.navigateTo({
      url: '/pages/home/introduce/group/group',
    })
  },
  book:function(){
    wx.navigateTo({
      url: '/pages/home/introduce/book/book',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})