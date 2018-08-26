// pages/core/mail/mail.js
//获取应用实例
var app = getApp();
Page({
  data: {
    page: 0,
    data: [],
    showMore: true,
    remind: '上滑加载更多',
    loading: false,
    disabledRemind: false,
    storage: '',
  },
  onLoad: function () {
    this.setData({
      'loading': true,
      'data': [],
      'showMore': true,
      'remind': '上滑加载更多',
      'page': 0
    });
    this.getNewsList();
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;
    _this.setData({
      'loading': true,
      'data': [],
      'showMore': true,
      'remind': '上滑加载更多',
      'page': 0
    });
    _this.getNewsList();
  },
  //上滑加载更多
  onReachBottom: function () {
    var _this = this;
    if (_this.data.showMore) {
      _this.getNewsList();
    }
  },
  //获取新闻列表
  getNewsList: function () {
    var _this = this;
    if (app.g_status) {
      _this.setData({
        showMore: false,
        remind: app.g_status,
        loading: false
      });
      wx.stopPullDownRefresh();
      return;
    }
    if (_this.data.page >= 10) {
      _this.setData({
        showMore: false,
        remind: '没有更多啦'
      });
      return false;
    }
    if (!_this.data.page) {
      _this.setData({
        data: _this.data.storage
      });
    }
    _this.setData({
      remind: '正在加载中'
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: app._server + '/school/api/mail.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        page: _this.data.page + 1,
      },
      success: function (res) {
        if (res.data && res.data.code === 200) {
          if (res.data.data) {
            if (!_this.data.page) {
              if (!_this.data.storage.length) {
                var data = {
                  page: _this.data.page + 1,
                  data: res.data.data,
                  showMore: true,
                  remind: '上滑加载更多',
                };
                data.storage = res.data.data;
                _this.setData(data);
              } else {
                _this.setData({
                  page: _this.data.page + 1,
                  showMore: true,
                  remind: '上滑加载更多'
                });
              }
            } else {
              _this.setData({
                page: _this.data.page + 1,
                data: _this.data.data.concat(res.data.data),
                showMore: true,
                remind: '上滑加载更多',
              });
            }
          } else {
            _this.setData({
              showMore: false,
              remind: '没有更多啦'
            });
          }
        } else {
          app.showErrorModal(res.data.message);
          _this.setData({
            remind: '加载失败'
          });
        }
      },
      fail: function (res) {
        app.showErrorModal(res.errMsg);
        _this.setData({
          remind: '网络错误'
        });
      },
      complete: function () {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
        _this.setData({
          loading: false
        });
      }
    });
  },
  //获取焦点
  // changeFilter: function (e) {
  //   this.setData({
  //     data: [],
  //     showMore: true,
  //     remind: '上滑加载更多',
  //     page: 0
  //   });
  //   this.getNewsList(e.target.dataset.id);
  // },
});
