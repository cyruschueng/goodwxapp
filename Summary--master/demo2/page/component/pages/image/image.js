let app = getApp()
Page(Object.assign({
  data: {},
  onLoad() {
    this.setData({
      "mode": "aspectFit"
    })
  }
}, app.page))
