// pages/comment/comment.js
var that;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,

    fullStar: 'http://res.o2o.com.cn:8082/img/f78ca1d7e7eb4815aa34aa1b0e03e77a',
    noStar: 'http://res.o2o.com.cn:8082/img/89d7c5f0dfe3401088b57fd72112bd7f',
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    var productId = options.id;
    that.loadData(productId);
  },



  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var productId = that.data.productId;
    that.loadData(productId);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    that.setData({
      pageIndex: 1,
    });
    var productId = that.data.productId;

    that.loadData(productId, function () {
      wx.stopPullDownRefresh();
    });
  },

  loadData: function (productId, callback) {
    wx.showNavigationBarLoading();
    var pageIndex = that.data.pageIndex;
    app.util.get("/ApiShop/GetCommentList", { productId: productId, pageIndex: pageIndex, pageSize: 10 }, function (res) {

      wx.hideNavigationBarLoading();
      callback && callback();

      if (res.length == 0) {
        return;
      }
      that.setData({
        pageIndex: pageIndex + 1
      });

      that.setData({
        commentList: res,
      });

    });
  },

  //预览图片
  previewImage: function (e) {
    var current = e.currentTarget.dataset.image;
    var imagelist = e.currentTarget.dataset.imagelist;
    wx.previewImage({
      current: current, //当前显示图片的http链接  
      urls: imagelist// 需要预览的图片http链接列表  
    })
  },


})