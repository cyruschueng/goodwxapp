var app = getApp()
Page({
  data: {
    miniIndex: {},
    alias:0,
    id:1
  },
  onLoad: function (option) {
    this.setData({
      alias: option.alias,
      id: option.id
    })

    this.setData({
      id: app.globalData.memberId
    })
  },

  inputalias: function (e) {
    this.setData({
      alias: e.detail.value
    })
  },

  //修改资料
  save: function () {
    var that = this;
    var subdata = { };
    subdata.alias = this.data.alias;
    subdata.id = this.data.id;

    app.commonAjax('cat/messagecenter/modifymemberinfo', [], subdata, function (res) {

      if (res.data.code >= 0) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: '修改失败',
          image: '/image/i/x.png',
          duration: 2000
        })
      }

    }, app)

  },
})