// pages/hotel-reserve/hotel-reserve.js
var util = require('../../utils/util.js');  
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    imgUrl:'/image/4.jpg',
    title:'埃及风情#2010',
    price:'188',
    save_price:'178',
    price:'188',
    online_price:'178'
  },
  calendar: function (e) {
    wx.navigateTo({
      url: '/pages/calendar/calendar',
      success: function (res) { },
    })
  },
  toShopCart:function(e){
    wx.navigateTo({
      url: '/pages/shopCart/shopCart',
      success: function(res) {},
    })
  },
  switch_onOff: function (e) {
    console.log(that.data)
  },
  hotel_details: function (e) {
    wx.navigateTo({
      url: '/pages/hotel-details/hotel-details',
      success: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var date = util.formatDate(new Date());
    var dateF = util.formatDateF(new Date());
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    that.setData({
      time: time,
      date: date,
      dateF: dateF
    }); 
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