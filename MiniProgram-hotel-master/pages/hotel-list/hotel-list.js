// pages/hotel-list/hotel-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      { url: '/image/4.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/3.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/4.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/3.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
      { url: '/image/4.jpg', title: '街头涂鸦 2103#', price: 222, num: 5 },
    ]
  },

  toReserve: function () {
    wx.navigateTo({
      url: '/pages/hotel-reserve/hotel-reserve',
      success: function (res) { },
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