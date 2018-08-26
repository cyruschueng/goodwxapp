// pages/lab/lab.js
var app = getApp();
Page({
  // onReady: function () {
  // this.animation = wx.createAnimation()
  // this.rotate();
  // },

  // onShow: function () {
  //   var _this = this;
  //   this.animation = wx.createAnimation({
  //     duration: 1000000,
  //     timingFunction: 'linear',
  //     delay: 0,
  //     transformOrigin: '50% 50% 0',
  //   })
  //   this.interval = setInterval
  //   _this.rotate(1000);
  // },

  // //旋转动画
  // rotate: function (n) {
  //   this.animation.rotate(180 * (n)).step()
  //   this.setData({
  //     animation: this.animation.export()
  //   })
  // },

  bindLab: function () {
    var _this = this;
    app.showErrorModal("该功能正在开发中,请同学们耐心等待", "开发中")
  },
})