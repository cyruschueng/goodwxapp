const App = getApp()

Page({
  data: {
  },
  onLoad(option) {
    this.setData({
      id: option.id
    })
  },
  navigateTo(e) {
    App.WxService.navigateTo('/pages/make/index/index', {
      id: e.currentTarget.dataset.id
    })
  },
  bindlinechange(e) {
    this.setData({
      id: e.detail.value
    })
  }
})