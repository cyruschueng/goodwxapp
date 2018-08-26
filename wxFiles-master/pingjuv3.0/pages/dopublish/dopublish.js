var app = getApp()
Page({
  data: {
    id: '',
    msg: {},
  },
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    wx.request({
      url: app.api + 'draft/' + options.id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        console.log("---------mmm")
        console.log(res)
        that.setData({
          msg: res.data.data
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    this.setData({
      id: options.id
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  dopublish: function () {
    var that = this;
    console.log(that.data.id);
    wx.request({
      url: app.api + 'confirm',
      data: {
        id: that.data.id,
        uid: wx.getStorageSync('userInfo').id
      },
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.code == 1) {
          wx.setStorageSync('tid', res.data.data.id);
          wx.hideToast();
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);

          wx.switchTab({
            url: '/pages/index/index',
            success: function (res) {
              console.log(res)
            },

          })
        } else {
          wx.hideToast();
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            wx.hideToast()
          }, 3000);
          wx.switchTab({ url: '/pages/index/index' });
        }
      },
      fail: function () {
        wx.hideToast();
        wx.showToast({
          title: '发布失败',
          icon: 'success',
          duration: 2000
        });
        setTimeout(function () {
          wx.hideToast()
        }, 3000);
        wx.switchTab({ url: '/pages/index/index' });
      },
      complete: function () {
        // complete
      }
    })
  }
})