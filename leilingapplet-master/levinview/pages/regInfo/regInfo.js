var app = getApp()
Page({
  data: {
    city: "上海浦东新区",
    i: 0,
    j: 0,
    arrayPro: ["河南省", "河北省", 3, 4, 5],
    arrayCity: ["驻马店", "上海", '5'],
    show: true,
    photoURL: '../../img/photo.jpg',
    // 性别
    arraySex:["男","女"],
    iSex:0,
    number:50,
    showLogin:false
  },
  // 换头像
  updatePhoto: function () {
    this.setData({
      showLogin: true
    })
  },
  close2: function () {
    this.setData({
      showLogin: false
    })
  },
  switchCity: function () {
    this.setData({
      show: (!this.data.show)
    })
  },
  bindProChange: function (e) {
    this.setData({
      i: e.detail.value
    })
  },
  bindCityChange: function (e) {
    this.setData({
      j: e.detail.value
    })
  },
  bindSexChange: function (e) {
    this.setData({
      iSex: e.detail.value
    })
  },
  // 上一步
  pre:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // 预约
  yuyue: function () {
    wx.navigateTo({
      url: '../bookSuccess/bookSuccess'
    })
  }
})


