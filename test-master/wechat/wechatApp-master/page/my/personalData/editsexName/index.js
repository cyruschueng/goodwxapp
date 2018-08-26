var app = getApp()
Page({
  data: {
    array: ['男', '女'],
    miniIndex: {},
    id:1,
    index:0
  },
  onLoad: function (option) {
    if (option.sexName == '男'){
      this.setData({
        id: option.id,
        index: 0
      })
    } else{
      this.setData({
        id: option.id,
        index: 1
      })
    }

    this.setData({
      id: app.globalData.memberId
    })
    
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },

  //修改资料
  save: function () {
    var that = this;
    var subdata = {};
    subdata.sex = parseInt(this.data.index)+1;
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