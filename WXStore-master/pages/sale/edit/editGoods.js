// pages/sale/edit/editGoods.js
const serverHost = getApp().globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: 0,
    goodsPicUrls: [],
    goodsInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goodsId: options.id
    })
    this.getSaleGoodsInfo();
  },
  getSaleGoodsInfo: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'sale/getSaleGoodsInfo.php',
      data: {
        id: _this.data.goodsId
      },
      dataType: 'json',
      success: function (res) {
        console.log(res)
        _this.setData({
          goodsInfo: res.data
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  selectPic: function () {
    let _this = this;
    wx.chooseImage({
      success: function (res) {
        console.log(res);
        _this.setData({
          goodsPicUrls: res.tempFilePaths
        })
      },
    })
  },
  onPullDownRefresh: function () {
    this.getSaleGoodsInfo();
  },
  formSubmit: function (e) {
    console.log(e);
    let dataInfo = e.detail.value;
    console.log(dataInfo);
    // wx.request({
    //   url: '',
    //   data: dataInfo
    // })
  },
  formReset: function () {
  }
})