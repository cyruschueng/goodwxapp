// pages/fenlei/fenlei.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNav: 0,
    navList: [
      { 'id': 0, 'name': '孕婴用品',},
      { 'id': 1, 'name': '服装鞋帽',},
      { 'id': 2, 'name': '婚庆用品', },
      { 'id': 3, 'name': '数码电脑', },
      { 'id': 4, 'name': '手机配件', },
      { 'id': 5, 'name': '家用电器', },
      { 'id': 6, 'name': '彩妆美容', },
      { 'id': 7, 'name': '其他', },
    ],
  },
  navToShop: function (e) {
    wx.navigateTo({
      url: '/pages/shop/shop',
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