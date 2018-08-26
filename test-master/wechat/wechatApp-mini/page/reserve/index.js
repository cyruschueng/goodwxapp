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
    endTime: '',
    ShopInfo:""

  },
  onShow: function () {
    this.selectShopInfo();
    var that = this;
    var myDate = new Date();
    var str = myDate.getFullYear().toString() + '-' + (myDate.getMonth() + 1).toString() + '-' + myDate.getDate().toString();
    console.log(str)
    this.setData({
      date: str,
      bizId:app.globalData.bizId
    })
    
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '预约'
    })

    var myDate = new Date();
    var str = myDate.getFullYear().toString() + '-' + (myDate.getMonth() + 1).toString() + '-' + myDate.getDate().toString();
    
    this.setData({
      date2: str
    })
  },
  
  selectShopInfo() {
    app.commonAjax('/miniapp//cat/baseInfo/selectShopHours', ['shopId'], {}, (res) => {
      this.setData({
        ShopInfo: res.data.data,
        address: res.data.data.address,
        linkphone: res.data.data.linkTel,
        startTime: res.data.data.morningStartTime,
        endTime: res.data.data.nightEndTime
      })

    }, app.globalData, 'post')
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
  phone(){
    wx.makePhoneCall({
      phoneNumber: this.data.linkphone,
      success: () => {
      }
    })    
  },
  //判定预约是否ok
  getdata: function (e) {    

    if (this.data.inputName) {
      if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.inputPhone))) {
        if (this.data.date==this.data.date2){
            //现在的小时和分钟
          var myDate = new Date()
          var str3 =myDate.getHours().toString() + myDate.getMinutes().toString();
          if (parseInt(str3) > parseInt(this.data.time.split(":").join("")) ){
              
              wx.showToast({
                title: '超出可选时间',
                icon: 'loading',
                image: '/image/i/x.png',
                duration: 1000
              })
            }else{
               this.sub_reserve(e)
            }
        }else{
          this.sub_reserve(e)
        }
       
      } else {
        wx.showToast({
          title: '手机号格式错误',
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
  //提交预约
  sub_reserve(e)  {
    var subdata = {};

    subdata.name = this.data.inputName;
    subdata.formId = e.detail.formId;
    subdata.phone = this.data.inputPhone;
    subdata.bizId = this.data.bizId;
    subdata.bookQueueTime = this.data.time;
    subdata.bookQueueDate = this.data.date;
    app.commonAjax('/miniapp/cat/reserve/submit', ['shopId', 'memberId'], subdata, function (res) {
      if (res.data.code == 0) {
        wx.showToast({
          title: '预约成功！',
          icon: 'success',
          duration: 500
        })

        wx.redirectTo({
          url: '/page/reserve/reserveListMore/index'
        })

      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'loading',
          image: '/image/i/x.png',
          duration: 500
        })
      }
    }, app.globalData, 'post')
  },
  queue_sub(e) {

    console.log(e.detail.formId)

    if (this.data.active_index === null) {
      wx.showToast({
        title: '请选则就餐人数',
        image: '/image/i/x.png',
        duration: 2000
      })
    } else {

      this.queue_sub_ok(e.detail.formId)

    }
  }

})


