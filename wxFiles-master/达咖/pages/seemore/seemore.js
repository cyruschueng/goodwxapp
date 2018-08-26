var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blockTools:[],
    loading:false,
    open: false,
    bIndex:0
  },
  goToShopBuy: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/shop/shop?shopid=' + e.currentTarget.dataset.shopid + '&shop=' + JSON.stringify(e.currentTarget.dataset.shop),
    })
  },
  takeOpen:function(){
    console.log(11)
    var that = this;
    that.setData({
      open:!that.data.open
    })
  },
  changeTab: function (e) {
    this.setData({
      open:false,
      bIndex:e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({ loading:true})
    app.wxRequest('plate/wx/find.do', {
      type: 2, userid: wx.getStorageSync("openid")
    }, function (res) {
      wx.stopPullDownRefresh();
      that.setData({
        blockTools: res,
        bIndex:options.index,
        url:app.ip,
        loading:false
      })
      wx.setNavigationBarTitle({
        title: res[options.index].name,
      })
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