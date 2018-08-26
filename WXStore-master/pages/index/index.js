//index.js
//获取应用实例
const app = getApp()
const serverHost = app.globalData.serverHost
Page({
  data: {
    goodsList: []
  },
  onLoad: function () {
    this.getIndexGoods();
  },
  getIndexGoods: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'goods/index',
      header: { "content-type": "appliction/json" },
      success: function (res) {
        console.log(res);
        _this.setData({
          goodsList: res.data
        })
        wx.stopPullDownRefresh();
      }
    })
  },
  onPullDownRefresh: function () {
    this.getIndexGoods();
  },
  //事件处理函数
  goodsInfo: function (e) {
    console.log('跳转到商品详情')
    let goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/goodsInfo?id=' + goodsId,
    })
  },
  addCart: function (e) {
    console.log(e);
    let goodsId = e.currentTarget.dataset.id;
    try {
      let userid = app.globalData.userid;//wx.getStorageSync("userid");
      if (userid) {
        wx.request({
          url: serverHost + 'cart/add',
          data: {
            goodsId: goodsId,
            userId: userid
          },
          success: function (res) {
            if (res) {
              wx.showToast({
                title: goodsId + '加入成功',
              })
            } else {
              wx.showModal({
                title: '您未登录',
                content: '请先登录',
              })
            }
          }
        })

      } else {
        wx.showModal({
          title: '您未登录',
          content: '请先登录',
        })
      }
    } catch (e) {
      wx.showModal({
        title: '发生错误',
        content: e,
      })
    }
  }

})
