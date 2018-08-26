//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    questionList: []
  },
  onLoad: function (option) {
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/faq/list',
      success: function (res) {
        self.setData({
          questionList: res.data.result,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '常见问题'
    })
  }
})
