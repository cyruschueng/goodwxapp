var app = getApp()
Page({
  data: {
    miniIndex: {}
  },
  onShow: function () {
    this.miniIndex()
  },
  //获取个人资料
  miniIndex: function () {
    var that = this;

    app.commonAjax('cat/messagecenter/miniIndex', ['memberId'], {}, function (res) {
      that.setData({
        miniIndex: res.data.data
      })
    }, app)

  },
  
})