// pages/cet/cetshow.js
var app = getApp();
Page({
  data: {},
  onLoad: function (options) {
    this.query(options.name, options.number);
  },

  query: function (name, number) {
    var _this = this;
    app.showLoadToast('查询中');
    wx.request({
      url: app._server + "/go/api/cet.php",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        name: name,
        id: number,
      },
      success: function (res) {
        if (res.data.code == 200) {
          _this.setData({
            name: res.data.data.name,
            school: res.data.data.school,
            type: res.data.data.type,
            number: res.data.data.number,
            total: res.data.data.total,
            listen: res.data.data.listen,
            read: res.data.data.read,
            writing: res.data.data.writing
          })
        } else {
          app.showErrorModal("请检查您的准考证号和姓名", "查询失败", "#E65454");
        }
      },
      fail: function (res) {
        app.showErrorModal("网络错误", "提示", "#E65454")
      },
      complete: function () {
        wx.hideToast();
      }
    });
  },
})