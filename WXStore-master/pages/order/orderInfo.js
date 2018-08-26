// pages/order/orderInfo.js
let app = getApp();
let serverHost = app.globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: "",
    orderInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.orderId;
    console.log(options);
    this.setData({
      orderId: orderId
    })
    this.getOrderInfo();
  },
  getOrderInfo: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'order/orderInfo/' + _this.data.orderId,
      method: "GET",
      success: function (res) {
        console.log("orderInfo========")
        console.log(res)
        _this.setData({
          orderInfo: res.data
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  goodsInfo: function (e) {
    let goodsId = e.currentTarget.dataset.id;
    console.log(e);
    wx.navigateTo({
      url: '../goods/goodsInfo?id=' + goodsId,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getOrderInfo();
  },
})