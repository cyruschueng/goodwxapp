var app = getApp();
Page({
  data: {
    nonet: true
  },
  onLoad: function (options) {
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {

  },
  route: function () {
    wx.navigateBack({
      delta: 2  // 回退前 delta(默认为1) 页面
    });
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
});