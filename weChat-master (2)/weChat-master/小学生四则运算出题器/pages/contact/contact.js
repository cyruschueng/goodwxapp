// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url=getApp().globalData.host+'GetHeadImage?username=ad1';
    this.setData({imgUrl: url});
  },
  scan: function(e) {
    console.log(e);
    wx.scanCode({
      success: function(e) {
        console.log(e);
      }
    })
  },
  copy: function(e) {
    wx.setClipboardData({
      data: 'zhou',
      success: function(e) {
        wx.showToast({
          title: '复制成功，请用微信搜索联系人',
        });
      },
      fail: function(e) {
        wx.showToast({
          title: '复制失败',
        });
      }
    })
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