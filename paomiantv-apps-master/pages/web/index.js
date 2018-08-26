const app = getApp()
Page({
  data: {
    url: null,
  },
  onLoad: function (options) {
    this.setData({
      url: options.url,
    })
  }
})