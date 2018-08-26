var app = getApp()
Page({
  data: {
    currentNumber: 0,//当前排号
    estimatedTime: 0,//预计时间
    id: 0,//我的id
    myNumber: 0,//我的号码
    waitingCount: 0,//等待计数
    memberId: 0,
    shopId: '',
    bizId: '',
    thirdSession: '',
    address: '',
    linkphone: '',
    startTime: '',
    endTime: ''
  },

  //获取取号id
  onShow: function () {
    var that = this;

    that.setData({
      address: app.globalData.address,
      linkphone: app.globalData.linkphone,
      startTime: app.globalData.startTime,
      endTime: app.globalData.endTime
    })


    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res.data)
        if (typeof (res.data) != 'undefined') {
          var subdata = {};
          subdata.id = res.data;

          app.commonAjax('cat/waitinfo/getQueueInfo', ['shopId', 'memberId'], subdata, function (res) {

            that.setData({
              currentNumber: res.data.data.currentNumber,
              estimatedTime: res.data.data.estimatedTime,
              id: res.data.data.id,
              myNumber: res.data.data.myNumber,
              waitingCount: res.data.data.waitingCount
            })

          }, app)

        }
      }
    })



  },

  phone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.linkphone
    })
  },

  //取消排号
  cancel: function (e) {

    if (this.data.id > 0) {
      var subdata = {};
      subdata.id = this.data.id

      app.commonAjax('cat/waitinfo/cancel', [], subdata, function (res) {
        wx.removeStorage({
          key: 'userId'
        })
        wx.navigateBack({
          delta: 2
        })

      }, app)
    }

  }

});
