var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    orderType:[
      { label: '待接单' ,icon: '/img/icon/d1.png'},
      { label: '待收货', icon: '/img/icon/d2.png'},
      { label: '已完成', icon: '/img/icon/d3.png'}
    ]
  },
  navToDefaultPublish(e){
    wx.navigateTo({
      url: '/pages/defaultPublish/defaultPublish',
    })
  },
  navToOrder(e){
    wx.navigateTo({
      url: '/pages/order/order?typeFlag='+e.currentTarget.dataset.index,
    })
  },
  navToGetPay(e){
    wx.navigateTo({
      url: '/pages/getPay/getPay',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      userInfo:app.globalData.userInfo
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