const app = getApp()

Page({
  data: {
    detail: {},
  },
  onLoad: function (option) {
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/shop/info?shopId=' + option.shopId,
      success: function (res) {
        self.setData({
          detail: res.data.result.detailInfo,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '乐游欧洲Go',
    })
  }
})