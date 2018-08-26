// pages/com/pages/scroll-view/scroll-view.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'demo3',
    scrollTop: 2
  },

  upper: function (e) {
    this.setData({
      toView:'demo3'
    })
  },
  lower: function (e) {
  },
  scroll: function (e) {
  },
  // scrollToTop: function (e) {
  //   this.setAction({
  //     scrollTop: 0
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'http://localhost:8004/mobile/homepage',
      success:function(res){
        console.log(res)
        console.log('ok')
      },
      fail: function(){
        console.log('error')
      }
    })
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