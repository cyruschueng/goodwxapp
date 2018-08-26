// pages/personal/personal.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  goMytopic:function(){
    var userInfo = publicUrl.globalData.userInfo
    wx.navigateTo({
      url: '/pages/personal/mytopic/mytopic?userid=' + userInfo.id,
    })
  },
  goWinegroup:function(event){
    // var userInfo = wx.getStorageSync('userInfo');
    var userInfo = publicUrl.globalData.userInfo
    wx.navigateTo({
      url: '/pages/personal/winegroup/winegroup?userid=' + userInfo.id,
    })
  },
  goChuandi:function(){
    var userInfo = publicUrl.globalData.userInfo
    wx.navigateTo({
      url: '/pages/personal/myChuandi/myChuandi?userid=' + userInfo.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = publicUrl.globalData.userInfo;
    var tagslists = [];
    var that = this;
    wx.setNavigationBarTitle({
      title: userInfo.xqname
    })
    this.setData({
      name : userInfo.name,
      avatar: userInfo.avatar,
      gender: userInfo.gender
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