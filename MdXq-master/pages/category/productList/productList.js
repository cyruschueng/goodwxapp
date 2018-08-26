// pages/category/productList/productList.js
var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
var productListBaseUrl = '/api/product/query-list?';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectListInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.project_id)
    this.getProductListInfo(baseUrl + productListBaseUrl + '_query.project_id=' + options.project_id)
  },
  getProductListInfo(url){
    var that = this;
    wx.request({
      url: url,
      success(res){
        // console.log(res)
        if(res.data.result){
          var data = res.data.result;
          for(var i = 0;i < data.rows.length;i++){
            data.rows[i].exhibition = imgUrl + data.rows[i].exhibition
            
            that.setData({
              projectListInfo:data.rows
            })
          }
          // debugger
          console.log(that.data.projectListInfo)
        }
      },
      fail(error) {

      }
    })
  },
  // 点击去商品详情
  recommendGoProductDetail(e){
    var product_id = e.currentTarget.dataset.product_id;
    wx.navigateTo({
      url: '../../productDetails/productDetails?product_id=' + product_id,
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