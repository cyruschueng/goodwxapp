// pages/order-list/order-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待付款', '待入住'],
    items:[
      { order_time: '2017-12-12 09:09:12', hotel_time: '2017-12-12 09:09:12', leave_time: '2017-12-12 09:09:12', order_state: '待付款', order_num: '12344546454321354321', goods_img: ['/image/2.jpg', '/image/2.jpg'], totalPrice: '120.00' },
      { order_time: '2017-12-12 09:09:12', hotel_time: '2017-12-12 09:09:12', leave_time: '2017-12-12 09:09:12', order_state: '待付款', order_num: '12344546454321354321', goods_img: ['/image/2.jpg', '/image/2.jpg'], totalPrice: '120.00' },
    ]
  },

  navbarTap:function(e){
    var currentTab = e.currentTarget.dataset.id
    this.setData({
      currentTab: currentTab
    })
  },
  order_details:function(){
    wx.navigateTo({
      url: '/pages/order-details/order-details',
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