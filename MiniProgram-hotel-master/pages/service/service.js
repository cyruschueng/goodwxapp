// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'洛可可主题酒店',
    telephone:'020-134354312',
    phone:'1374546464',
    weChat:'sad2254',
    QQ:'212121356',
    address:'广州天河路13号'
  },
  phone:function(){
    wx.makePhoneCall({
      phoneNumber: '137707070',
      success: function(res) {},
    })
  },
  Landline: function () {
    wx.makePhoneCall({
      phoneNumber: '020-110110110',
      success: function (res) { },
    })
  },
  location:function(){
    wx.openLocation({
      latitude: 23.129163,
      longitude: 113.264435,
      scale: '30',
      name: '洛可可酒店',
      address: '天湖路15号',
      success: function(res) {},
    })
  },
  toForm:function(){
    wx.navigateTo({
      url: '/pages/messageForm/messageForm',
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