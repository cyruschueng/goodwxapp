//index.js
//获取应用实例
const app = getApp()
const serverHost = app.globalData.serverHost
Page({
  data: {
    goodsList: []
  },
  onLoad: function () {
    //this.getSaleGoods();
  },
  //获取售卖的商品
  getSaleGoods: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'goods/sale',
      success: function (res) {
        console.log(res);
        _this.setData({
          goodsList: res.data
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    //this.getSaleGoods();
  },
  //事件处理函数
  goodsInfo: function (e) {
    let goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'edit/editGoods?id=' + goodsId,
    })
  },
  //下架商品
  deleteGoods: function (e) {
    console.log(e);
    // wx.navigateTo({
    //   url: '../goods/goodsInfo',
    // })
  }
})
