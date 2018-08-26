
Page({
  data: {
    city: "上海浦东新区",
    i: 0,
    j: 0,
    arrayPro: ["河南省", "河北省", 3, 4, 5],
    arrayCity: ["驻马店", "上海", '5'],
    show: true,
    photoURL: '../../img/photo.jpg',
    // 预约信息
    info:"预约信息 预约信息预约信息 预约信息预约信息 预约信息预约信息 预约信息预约信息 预约信息",
     showLogin: false
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
  // 修改
  update:function(){
    wx.navigateBack({
      delta: 2
    })
  },
  // 重新预约
  reyuyue:function(){
    wx.navigateBack({
      delta:3
    })
  },
  // 提交信息
  submitInfo:function(){
    wx.redirectTo({
      url: '../testDriveInfo/testDriveInfo',
    })
  }
})


