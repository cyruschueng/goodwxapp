var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    imgUrls: app.globalData.picUrl.project_success,
    nonet: true
  },
  onLoad: function (options) {
    let projectId = options.projectId;
    this.setData({
      type: options.type,
      projectId: projectId
    });
    let that = this;
    app.netWorkChange(that);
  },
  btnYes: function () {
    let type = this.data.type;
    if (type == 8) {
      wx.navigateBack({
        delta: 2
      });
    } else {
      app.href('/pages/matchInvestor/matchInvestor');
    }
  },
  continueEdit() {
    let projectId = this.data.projectId;
    app.href('/pages/myProject/publishedProject/publishedProject?pro_id=' + projectId + '&&fromPublish=' + 3);
  },
  // 重新加载
  refresh() {
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
});