// pages/start/start.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joiner:'2', 
    img:'/pages/source/images/detail2.png',
    userheader:'/pages/source/images/detail1.png',
    title:'儿童摄影套系',
    jointime:'2017/10/19 19:27:32'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  test:function(){
    console.log(getApp().globalData)
    wx.navigateTo({
      url: '/pages/share/share?share=2&group_head_id=47',
    })
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