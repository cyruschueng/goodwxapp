// pages/tool/tool.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  
  //推荐服务家跳转
  recomment: function () {
    wx.navigateTo({
      url: '../tool/recommend/recommend',
    })
  },
  //发布话题跳转
  theme: function () {
    wx.navigateTo({
      url: '../tool/theme/theme',
    })
  },
  activity:function(){
    wx.navigateTo({
      url: '../tool/activity/activity',
    })
  },
  //微信群跳转
  wine:function(){
    wx.navigateTo({
      url: '../tool/wine/wine',
    })
  },
  transmit:function(){
    wx.navigateTo({
      url: '../tool/transmit/transmit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = publicUrl.globalData.userInfo;
    wx.setNavigationBarTitle({
      title: userInfo.xqname
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