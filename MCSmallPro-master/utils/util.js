var config = require('../config.js');

module.exports = {
  post: function (url, data, success, fail, complete) {
    var absoulteUrl = config.host + url, customerId = wx.getStorageSync(config.customerIdKey);
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: absoulteUrl,
      method: "POST",
      data: data,
      header: { "customerid": customerId, "appId": config.appId },
      success: function (res) {
        if (res.data.code == 200) {
          success && success(res.data.data);
        } else {
          wx.hideLoading();
          wx.showModal({
            title: '请求错误',
            content: res.data.msg || "请求错误，请稍后再试",
            showCancel: false
          });
          fail && fail(res);
        }
      },
      fail: function () {
        wx.hideLoading();
        fail && fail(res);
      },
      complete: function () {
        complete && complete();
        //wx.hideLoading();
      }
    });
  },
  get: function (url, data, success, fail, complete) {
    var absoulteUrl = config.host + url, customerId = wx.getStorageSync(config.customerIdKey);
    wx.request({
      url: absoulteUrl,
      method: "GET",
      data: data,
      header: { "customerid": customerId, "appId": config.appId },
      success: function (res) {
        if (res.data.code == 200) {
          success && success(res.data.data);
        } else {
          wx.showModal({
            title: '请求错误',
            content: res.data.msg || "请求错误，请稍后再试",
            showCancel: false
          });
          fail && fail(res)
        }
      },
      fail: fail && fail,
      complete: complete && complete
    });
  },
  uploadFile: function (filePath, success, fail, complete) {
    var customerId = wx.getStorageSync(config.customerIdKey);
    wx.uploadFile({
      url: config.host + '/ApiResource/UploadImage',
      filePath: filePath,
      name: 'file',
      header: { "customerid": customerId, "appId": config.appId },
      success: function (res) {
        var data = JSON.parse(res.data);
        if (data.code == 200) {
          success && success(data.data);
        } else {
          wx.showModal({
            title: '请求错误',
            content: data.msg || "请求错误，请稍后再试",
            showCancel: false
          });
          fail && fail(res)
        }
      },
      fail: fail && fail,
      complete: complete && complete
    })
  },
  toast: function (msg) {
    wx.showToast({
      title: msg,
      icon: 'none'
    });
  },
  success: function (msg) {
    wx.showToast({
      title: msg
    });
  },
  toastFail: function (msg) {
    wx.showToast({
      title: msg,
      image: '/images/hud-error.png'
    })
  },
  error: function (msg) {
    wx.showModal({
      title: '错误',
      content: msg
    });
  },
  loading: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  },
  hideLoading: function () {
    wx.hideLoading();
  },
  getUrlParams: function (url) {
    var obj = {};
    if (this.isEmpty(url)) {
      return obj;
    }
    var index = url.indexOf('?');
    if (index != -1) {
      var str = url.substring(index + 1);
      var arry = str.split('&');
      arry.forEach(function (item) {
        var a = item.split('=');
        if (a.length == 2) {
          obj[a[0]] = a[1];
        }
      });
    }
    return obj;
  }
}
