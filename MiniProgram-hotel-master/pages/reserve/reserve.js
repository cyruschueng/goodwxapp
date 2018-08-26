// pages/classify/classify.js
var util = require('../../utils/util.js');  
var that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    lists:[
      { url: '/image/4.jpg', title: '埃及风情1 2010#', price: 188, save_price: 0, online_price: 178,onOff:false },
      { url: '/image/4.jpg', title: '埃及风情2 2010#', price: 188, save_price: 0, online_price: 178, onOff: true },
      { url: '/image/4.jpg', title: '埃及风情3 2010#', price: 188, save_price: 0, online_price: 178, onOff: true },
    ]
  },
  //日历
  calendar: function (e) {
    wx.navigateTo({
      url: '/pages/calendar/calendar'
    })
  },
  //酒店详情
  hotel_details: function (e) {
    let idx = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/hotel-details/hotel-details?id=' + idx
    })
  },
  //价格展开关闭
  switch_onOff:function(e){
    let index = e.currentTarget.dataset.index;
    let lists = this.data.lists
    let onOff = lists[index].onOff;
    onOff = !onOff;
    lists[index].onOff = onOff;
    this.setData({
      lists: lists
    })
  },
  //预定，跳转购物车
  toShopCart: function (e) {
    //点击后，跳出提示：加入购物车成功，在跳转到购物车页面
    wx.navigateTo({
      url: '/pages/shopCart/shopCart'
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