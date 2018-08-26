var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:null
  },
  navToShop(e) {
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ip:app.ip,
      order:JSON.parse(options.order)
    })
  },


  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    return {
      title:'订单信息',
      path:'/pages/existorder/existorder?order='+JSON.stringify(that.data.order)
    }
  }
})