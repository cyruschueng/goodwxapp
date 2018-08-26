var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var shop_id = app.globalData.shop_id;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新品推荐数组
    newProductsInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewProducts(baseUrl + '/api/product/recommend?shop_id=' + shop_id + '&recommend_id=1')
  },
  // 获取新品推荐数据
  getNewProducts(url) {
    var that = this
    wx.request({
      url: url,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          var data = res.data.result;
          for (var i = 0; i < data.length; i++) {
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              newProductsInfo: data
            })
          }
          console.log(that.data.newProductsInfo)
        }
      }
    })
  },
  // 进入商品详情
  goProductDetail(e) {
    console.log(e);
    var product_id = e.currentTarget.dataset.product_id;
    wx.navigateTo({
      url: '../productDetails/productDetails?product_id=' + product_id,
    })
  },
  // 立即购买
  buyNow(e) {
    wx.navigateTo({
      url: '../submitOrder/submitOrder',
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
