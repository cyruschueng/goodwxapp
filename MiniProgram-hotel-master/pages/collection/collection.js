// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      { url: '/image/5.jpg', title: '时尚浪漫酒店', price: '122' },
      { url: '/image/5.jpg', title: '时尚浪漫酒店', price: '122' },
      { url: '/image/5.jpg', title: '时尚浪漫酒店', price: '122' },
    ]
  },

  hotel_details:function(e){
    var idx = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hotel-details/hotel-details?id=' + idx,
      success: function(res) {},
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