// pages/goods/goodsInfo.js
let app = getApp();
let serverHost = app.globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    imgsUrl: ['../images/head.png', '../images/head.png', '../images/head.png'],
    goodsInfo: null
  },
  naviToCart: function () {
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  imBuy: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  addToCart: function (e) {
    wx.showToast({
      title: e.currentTarget.dataset.id + '加入成功',
    })
    // wx.switchTab({
    //   url: '../cart/cart',
    // })
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id: options.id
    })
    this.getGoodsInfo();
    //let goodsId = options.id;
  },
  onPullDownRefresh: function () {
    this.getGoodsInfo();
  },
  getGoodsInfo: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'goods/goodsInfo/' + _this.data.id,
      // data: {
      //   goodsId: _this.data.id
      // },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) {
          wx.showModal({
            title: '加载错误',
            content: '数据加载错误',
            complete: function () {
              wx.navigateBack()
            }
          })
        }
        if (res.data) {
          let imgUrls = res.data.imgUrls || new Array()
          _this.setData({
            goodsInfo: res.data,
            imgsUrl: imgUrls.split(','),
          })
        } else {
          wx.showModal({
            title: '加载错误',
            content: '数据加载错误',
            complete: function () {
              wx.navigateBack()
            }
          })
        }
        wx.stopPullDownRefresh();
      }
    })
  }
})