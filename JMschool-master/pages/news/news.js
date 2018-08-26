// pages/news/news.js
//news.js
//获取应用实例
var app = getApp();
Page({
  data: {
    page: 0,
    list: [
      // { id: 0, 'type': 'school', name: '头条', storage: [], url: 'news/school_news.php' },
      { id: 0, 'type': 'school', name: '头条', storage: [], url: 'news.php' },
      //{ id: 1, 'type': 'jw', name: '教务公告', storage: [], url: 'news/school_jw.php' },
      { id: 1, 'type': 'jw', name: '教务公告', storage: [], url: 'jw.php' },
    ],
    'active': {
      id: 0,
      'type': 'school',
      data: [],
      showMore: true,
      remind: '上滑加载更多'
    },
    loading: false,
    //user_type: 'guest',
    disabledRemind: false,

    // 综合新闻
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    isTabSelector: false,
    channelId: null,
    page: 1,
    isPullDown: false,
    favorData: [{
      channelId: "5572a108b3cdc86cf39001cd",
      name: "国内",
      selected: true,
    }],
    newsData: [],
    scrollData: [],
    attrationData: [],
    newestData: [],
    animationData: {}

  },
  onLoad: function () {
    // if (app._user.is_bind) {
    //   this.setData({
    //     user_type: !app._user.teacher ? 'student' : 'teacher'
    //   });
    // } else {
    //   this.setData({
    //     user_type: 'guest',
    //     'active.id': 5,
    //     'active.type': 'new'
    //   });
    // }
    this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多',
      'page': 0
    });
    this.getNewsList();
  },
  //下拉更新
  onPullDownRefresh: function () {
    var _this = this;
    _this.setData({
      'loading': true,
      'active.data': [],
      'active.showMore': true,
      'active.remind': '上滑加载更多',
      'page': 0
    });
    _this.getNewsList();
  },
  //上滑加载更多
  onReachBottom: function () {
    var _this = this;
    if (_this.data.active.showMore) {
      _this.getNewsList();
    }
  },
  //获取新闻列表
  getNewsList: function (typeId) {
    var _this = this;
    if (app.g_status) {
      _this.setData({
        'active.showMore': false,
        'active.remind': app.g_status,
        loading: false
      });
      wx.stopPullDownRefresh();
      return;
    }
    typeId = typeId || _this.data.active.id;
    if (_this.data.page >= 5) {
      _this.setData({
        'active.showMore': false,
        'active.remind': '没有更多啦'
      });
      return false;
    }
    if (!_this.data.page) {
      _this.setData({
        'active.data': _this.data.list[typeId].storage
      });
    }
    _this.setData({
      'active.remind': '正在加载中'
    });
    wx.showNavigationBarLoading();
    if (typeId == 4) {
      wx.request({
        url: 'https://route.showapi.com/109-35',
        data: {
          channelId: '5572a108b3cdc86cf39001cd',
          channelName: "",
          maxResult: "15",
          needAllList: "",
          needContent: "1",
          needHtml: "",
          page: "1",
          showapi_appid: "30851",
          title: "",
          showapi_sign: "f729add89f4c4851b8da64f6936ff6f6",
          showapi_timestamp: "",
        },
        success: function (res) {
          _this.data.scrollData = [];
          var list = res.data.showapi_res_body.pagebean.contentlist;
          var n = 0;
          for (var i = 0; n < 3 && i < list.length; i++) {
            if (list[i].imageurls.length > 0) {
              _this.data.scrollData.push(list[i]);
              list.splice(i, 1);
              n++;
            }
          }
          _this.data.newsData = list;
          _this.setData({
            newsData: _this.data.newsData,
            scrollData: _this.data.scrollData,
            channelId: '5572a108b3cdc86cf39001cd'
          })
        },
        fail: function (res) {
          app.showErrorModal(res.errMsg);
          _this.setData({
            'active.remind': '网络错误'
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
    } else {
      wx.request({
        // url: app._server + '/api/' + _this.data.list[typeId].url,
        url: app._server + '/school/api/' + _this.data.list[typeId].url,
        data: {
          page: _this.data.page + 1,
        },
        success: function (res) {
          if (res.data && res.data.code === 200) {
            if (_this.data.active.id != typeId) {
              return false;
            }
            if (res.data.data) {
              if (!_this.data.page) {
                //if(!_this.data.list[typeId].storage.length || app.util.md5(JSON.stringify(res.data.data)) != app.util.md5(JSON.stringify(_this.data.list[typeId].storage))){
                if (!_this.data.list[typeId].storage.length) {
                  var data = {
                    'page': _this.data.page + 1,
                    'active.data': res.data.data,
                    'active.showMore': true,
                    'active.remind': '上滑加载更多',
                  };
                  data['list[' + typeId + '].storage'] = res.data.data;
                  _this.setData(data);
                } else {
                  _this.setData({
                    'page': _this.data.page + 1,
                    'active.showMore': true,
                    'active.remind': '上滑加载更多'
                  });
                }
              } else {
                _this.setData({
                  'page': _this.data.page + 1,
                  'active.data': _this.data.active.data.concat(res.data.data),
                  'active.showMore': true,
                  'active.remind': '上滑加载更多',
                });
              }
            } else {
              _this.setData({
                'active.showMore': false,
                'active.remind': '没有更多啦'
              });
            }
          } else {
            app.showErrorModal(res.data.message);
            _this.setData({
              'active.remind': '加载失败'
            });
          }
        },
        fail: function (res) {
          app.showErrorModal(res.errMsg);
          _this.setData({
            'active.remind': '网络错误'
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
    }
  },
  //获取焦点
  changeFilter: function (e) {
    this.setData({
      'active': {
        'id': e.target.dataset.id,
        'type': e.target.id,
        data: [],
        showMore: true,
        remind: '上滑加载更多'
      },
      'page': 0
    });
    this.getNewsList(e.target.dataset.id);
  },
  //无权限查询
  // changeFilterDisabled: function () {
  //   var _this = this;
  //   if (!_this.data.disabledRemind) {
  //     _this.setData({
  //       disabledRemind: true
  //     });
  //     setTimeout(function () {
  //       _this.setData({
  //         disabledRemind: false
  //       });
  //     }, 2000);
  //   }
  // }
});
