const app = getApp()

Page({
  data: {
    subjectinfo: {},
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '专题',
    })
    const self = this
    var cid = app.globalData.cityid
    wx.request({
      url: app.globalData.apiURL + '/subject/info?subjectId=' + option.subjectid + '&lat=' + wx.getStorageSync('latitude') + '&lon=' + wx.getStorageSync('longitude'),
      success: function (res) {
        //console.log(res)
        self.setData({
          subjectinfo: res.data.result
        });
      }
    })
  },
  enterdetail: function(event) {
    wx.navigateTo({
      url: '../detail/viewDetail?id=' + event.currentTarget.id
    })
  },
})
