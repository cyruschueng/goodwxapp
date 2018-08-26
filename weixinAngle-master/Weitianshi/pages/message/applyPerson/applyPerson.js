var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    nonet: true
  },

  onLoad: function (options) {
    let project_id = options.id;
    let that = this;
    that.setData({
      project_id: project_id
    });
    app.netWorkChange(that);
  },
  onShow: function () {
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let project_id = this.data.project_id;
    let that = this;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/message/applyProjectToMe',
      data: {
        user_id: user_id,
        project_id: project_id
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        let contentList = res.data.data;
        let count = res.data.count;
        that.setData({
          count: count,
          contentList: contentList
        });
      }
    });
    //向后台发送信息取消红点
    wx.request({
      url: url_common + '/api/message/setProjectApplyToRead',
      data: {
        user_id: user_id,
        type_id: 1,
        project_id: project_id
      },
      method: "POST",
      success: function (res) {
      }
    });

    that.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false
    });
  },
  moreForApply: function () {
    //请求上拉加载接口所需要的参数
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    let project_id = this.data.project_id;
    var request = {
      url: url_common + '/api/message/applyProjectToMe',
      data: {
        user_id: user_id,
        page: this.data.currentPage,
        project_id: project_id
      }
    };
    //调用通用加载函数
    app.loadMore(that, request, "contentList");
  },
  // 点击跳转
  projectDetail: function (e) {
    // 获取我自己的项目id
    // 获取当前点击的项目id
    var id = e.currentTarget.dataset.project;
    // 判斷項目是不是自己的
    wx.request({
      url: url + '/api/project/projectIsMine',
      data: {
        project_id: id
      },
      method: 'POST',
      success: function (res) {
        var userId = res.data.user_id;
        var user = wx.getStorageSync('user_id');
        if (userId == user) {
          app.href('/pages/myProject/projectDetail/projectDetail?id=' + id + '&&index=' + 0);
        } else {
          app.href('/pages/projectDetail/projectDetail?id=' + id);
        }
      }
    });
  },
  // 点击同意或者拒绝
  btn: function (e) {
    let contentList = this.data.contentList;
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let that = this;
    let record_id = e.currentTarget.dataset.record;
    // status 1:同意  2:拒绝 0:待处理
    let status = e.currentTarget.dataset.status;
    wx.request({
      url: url_common + '/api/message/handleApplyProjectMessage',
      data: {
        user_id: user_id,
        record_id: record_id,
        status: status
      },
      method: 'POST',
      success: function (res) {
        let statusCode = res.data.status_code;
        if (statusCode == 2000000) {
          if (status == 1) {
            contentList.forEach((x) => {
              if (x.record_id == record_id) {
                x.handle_status = 1;
              }
            });
            that.setData({
              contentList: contentList
            });
          } else if (status == 2) {
            that.setData({
              record_id: record_id
            });
          }
        }
      }
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