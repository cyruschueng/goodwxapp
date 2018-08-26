var app = getApp();
Page({
  data: {
    imgUrl: ''
  },
  onLoad: function (options) {
    this.setData({
      imgUrl: app.globalData.userInfo.actInfoImg
    });
  }
})