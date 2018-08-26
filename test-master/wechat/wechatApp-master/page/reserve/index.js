var app = getApp()
Page({
  data: {
    inputName: '',
    inputPhone: '',
    array: ['早餐', '中餐', '晚餐'],
    index: '0',
    time: '09:00',
    date: '',
    desk: {},
    deskindex: '0',
    memberId: 0,
    shopId: '',
    bizId: '',
    thirdSession: '',
    date2: '',
    address: '',
    linkphone: '',
    startTime: '',
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


    var myDate = new Date();
    var str = myDate.getFullYear().toString() + '-' + (myDate.getMonth() + 1).toString() + '-' + myDate.getDate().toString();
    console.log(str)
    this.setData({
      date: str
    })
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '预约'
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    });

    var myDate = new Date();
    var str = myDate.getFullYear().toString() + '-' + (myDate.getMonth() + 1).toString() + '-' + myDate.getDate().toString();
    
    this.setData({
      date2: str
    })



  },
  bindDateChange: function (e) {

    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {

    this.setData({
      time: e.detail.value
    })
  },
  binddeskChange: function (e) {

    this.setData({
      deskindex: e.detail.value
    })
  },

  bindPickerChange: function (e) {

    this.setData({
      index: e.detail.value
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
    var that = this;

    wx.makePhoneCall({
      phoneNumber: this.data.linkphone,
      success: () => {
      }
    })



    
  },
  //预约
  getdata: function (e) {

    if (this.data.inputName) {

      if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.inputPhone))) {

        var subdata = {};

        subdata.name = this.data.inputName;
        subdata.phone = this.data.inputPhone;
        subdata.mealTime = parseInt(this.data.index);
        subdata.bookQueueTime = this.data.time;
        subdata.bookQueueDate = this.data.date;
        subdata.deskType = this.data.desk[this.data.deskindex].deskType;


        app.commonAjax('cat/reserve/submit', ['shopId', 'memberId'], subdata, function (res) {
          if (res.data.code >= 0) {
            wx.showToast({
              title: '预约成功！',
              icon: 'success',
              duration: 500
            })

            wx.redirectTo({
              url: '/page/reserveList/index'
            })

          } else {
            wx.showToast({
              title: '预约失败！',
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
    var subdata = {};

    app.commonAjax('cat/reserve/getDeskType', ['shopId'], subdata, function (res) {
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


