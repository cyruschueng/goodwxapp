var app = getApp()
Page({
  data: {
    inputName: '',
    inputPhone: '',
    inputNum: '2某桌型',
    array: ['2某桌型', '3某桌型', '4某桌型', '5某桌型'],
    index: 0,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    memberId: 0,
    shopId: '',
    bizId: '',
    desk: {},
    deskindex: '0',
    thirdSession: '',
    address: '',
    linkphone: '',
    startTime:'',
    endTime: ''
  },
  onShow: function () {
    var that = this;
    
    that.getDeskType()
    that.setData({
      address: app.globalData.address,
      linkphone: app.globalData.linkphone,
      startTime: app.globalData.startTime,
      endTime: app.globalData.endTime
    })

  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '取号'
    })
  },
  binddeskChange: function (e) {
    this.setData({
      deskindex: e.detail.value
    })
  },
  inputName: function (e) {
    this.setData({
      inputName: e.detail.value
    })
  },
  inputPhone: function (e) {
    this.setData({
      inputPhone: e.detail.value
    })
  },
  phone: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.linkphone
    })
  },
  getdata: function (e) {



    if (this.data.inputName) {

      if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.inputPhone))) {

        var subdata = {};
        subdata.name = this.data.inputName;
        subdata.phone = this.data.inputPhone;
        subdata.deskTypeId = this.data.desk[this.data.deskindex].deskTypeId;

        app.commonAjax('cat/waitinfo/submitQueue', ['shopId', 'memberId'], subdata, function (res) {

          if (res.data.data > 0) {
            wx.setStorage({
              key: "userId",
              data: res.data.data
            })
            wx.redirectTo({
              url: './lineUp2/index'
            })
          } else {
            wx.showToast({
              title: '取号失败！',
              icon: 'loading',
              image: '/image/i/x.png',
              duration: 500
            })
          }

        }, app)

      } else {
        wx.showToast({
          title: '请输入正确的手机号！',
          icon: 'loading',
          image: '/image/i/x.png',
          duration: 1000
        })
      }

    } else {
      wx.showToast({
        title: '请输入姓名！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    }
  },

  //获取可预约桌型
  getDeskType: function () {
    var that = this;


    app.commonAjax('cat/reserve/getDeskType', ['shopId'], {}, function (res) {

      var newdesk = res.data.data;
      for (var i in newdesk) {
        newdesk[i].text = newdesk[i].deskTypeName + '，还剩' + newdesk[i].countDesk + '桌空余'
      }
      that.setData({
        desk: newdesk
      })

      wx.hideLoading()
    }, app)

  }

})


