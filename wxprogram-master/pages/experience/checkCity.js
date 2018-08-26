const app = getApp()
Page({
  data: {
    checkView: [],
    cityName: '',
    cityid: '',
    ischecked: true
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    wx.setNavigationBarTitle({
      title: '乐游欧洲Go'
    })
    const self = this
    wx.request({
      url: app.globalData.apiURL+'/city/list',
      success: function (res) {
        self.setData({
          checkView: res.data.result,
          cityName: option.cityName,
          cityid: app.globalData.cityid
        })
      }
    })
  },
  choosecity: function (event) {
    // console.log(event)
    app.globalData.cityid = event.currentTarget.id
    wx.switchTab({
      url: 'experience',
      success: function(e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  }
})
