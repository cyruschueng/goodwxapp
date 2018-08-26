// pages/core/second/second.js
var app = getApp();
Page({
  data: {
    remind: '',
    // remind: '加载中',
    list: [],
    first: 1,
    term: '2017.1',
    user: '',
    is_bind: false,
  },
  slideDetail: function (e) {
    var id = e.currentTarget.dataset.id,
      list = this.data.list;
    // 每次点击都将当前open换为相反的状态并更新到视图，视图根据open的值来切换css
    for (var i = 0, len = list.length; i < len; ++i) {
      if (i == id) {
        list[i][9] = !list[i][9];
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  },
  onLoad: function () {
    var _this = this;
    this.setData({
      user: app._user.we,
      is_bind: app._user.is_bind
    });
    //判断并读取缓存
    if (app.cache.second) {
      if (app.cache.second == "false") {
        _this.setData({
          remind: '当前学期暂无补考安排'
        });
      } else {
        _this.setData({
          list: app.cache.second,
          remind: ''
        });
      }
    } else {
      _this.bindSearch();
    }
  },
  onShow: function () { },
  //下拉更新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.bindSearch();
  },
  bindSearch: function () {
    var _this = this;
    if (_this.data.is_bind) {
      app.showLoadToast('查询中');
      wx.request({
        url: app._server + "/school/api/second.php",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: {
          studentid: _this.data.user.student_no,
          term: parseFloat(_this.data.term),
        },
        success: function (res) {
          if (res.data.code == 200) {
            if (res.data.data[0][0] == "对不起!当前学期未查到相关的考试安排项。") {
              _this.setData({
                remind: '当前学期暂无补考安排'
              });
              app.saveCache('second', "false");
            } else {
              _this.setData({
                list: res.data.data,
                remind: ''
              });
              app.saveCache('second', res.data.data);
            }
          }
          else {
            app.showErrorModal(res.data.message, "提示")
          }
        },
        fail: function (res) {
          app.showErrorModal("网络错误", "提示", "#E65454")
        },
        complete: function () {
          wx.hideNavigationBarLoading();
          wx.stopPullDownRefresh();
          wx.hideToast();
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: "您还未绑定学号，是否前去绑定",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../pages/bind/bind'
            })
          }
        }
      })
    }
  },
});
