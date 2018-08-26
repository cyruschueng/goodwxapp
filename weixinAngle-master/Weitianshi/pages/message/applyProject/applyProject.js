var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    winWidth: 0,//选项卡
    winHeight: 0,//选项卡
    currentTab: 0,//选项卡
    type: 1, //我申請查看的項目,
    hasRedPoint: true,
    nonet: true
  },
  onLoad: function (options) {
    let type = options.type;
    let that = this;
    that.setData({
      type: type,
    });
    app.netWorkChange(that);
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    // 申请查看我的项目
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/message/applyProjectToMe',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        let contentList = res.data.data;
        let count1 = res.data.count;
        that.setData({
          count1: count1,
          contentList: contentList
        });
      }
    });

    // 我申请查看的项目
    wx.request({
      url: url_common + '/api/message/applyProjectList',
      data: {
        user_id: user_id
      },
      method: 'POST',
      success: function (res) {
        let count = res.data.count;
        let applyList = res.data.data;
        that.setData({
          count: count,
          applyList: applyList
        });
      }
    });
  },
  onShow: function () {
    let that = this;
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let type = this.data.type;
    that.setData({
      requestCheck: true,
      requestCheckBoolean: true,
      currentPage: 1,
      otherCurrentPage: 1,
      page_end: false,
      page_endBoolean: false,
      push_page: 1,
      cancel: false
    });
    //向后台发送信息取消红点
    wx.request({
      url: url_common + '/api/message/setMessageToRead',
      data: {
        user_id: user_id,
        type_id: type
      },
      method: "POST",
      success: function (res) {
      }
    });
  },
  /*滑动切换tab*/
  bindChange: function (e) {
    var that = this;
    var current = e.detail.current;
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    let applyList = this.data.applyList;
    let contentList = this.data.contentList;
    let type = this.data.type;
    if (current == 1) {
      //向后台发送信息取消红点
      wx.request({
        url: url_common + '/api/message/setFeedbackToRead',
        data: {
          user_id: user_id,
          type: "apply"
        },
        method: "POST",
        success: function (res) {
          applyList.forEach((x) => {
            x.message_status = 1;
          });
          that.setData({
            hasRedPoint: false
          });
        }
      });
    } else if (current == 0) {
      if (this.data.hasRedPoint === false) {
        that.setData({
          applyList: applyList
        });
      }
      wx.request({
        url: url_common + '/api/message/setMessageToRead',
        data: {
          user_id: user_id,
          type_id: type
        },
        method: "POST",
        success: function (res) {
          contentList.forEach((x) => {
            x.message_status = 1;
          });
          that.setData({
            contentList: contentList
          });
        }
      });
    }
    that.setData({ currentTab: e.detail.current });
  },
  /*点击tab切换*/
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  //我申请的项目加载更多
  loadMore: function () {
    //请求上拉加载接口所需要的参数
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    // var currentPage = this.data.currentPage;
    var request = {
      url: url_common + '/api/message/applyProjectList',
      data: {
        user_id: user_id,
        page: this.data.currentPage
      }
    };
    //调用通用加载函数
    app.loadMore(that, request, "applyList");
  },
  // 申请我的项目加载更多
  moreForApply: function () {
    //请求上拉加载接口所需要的参数
    var user_id = wx.getStorageSync("user_id");
    let that = this;
    let contentList = this.data.contentList;

    if (that.data.requestCheckBoolean) {
      if (user_id != '') {
        if (that.data.page_endBoolean == false) {
          wx.showToast({
            title: 'loading...',
            icon: 'loading'
          });
          that.data.push_page++;
          that.setData({
            otherCurrentPage: this.data.push_page,
            requestCheckBoolean: false
          });
          //请求加载数据
          wx.request({
            url: url_common + '/api/message/applyProjectToMe',
            data: {
              user_id: user_id,
              page: this.data.otherCurrentPage
            },
            method: 'POST',
            success: function (res) {
              var newPage = res.data.data;
              var page_end = res.data.page_end;
              for (var i = 0; i < newPage.length; i++) {
                contentList.push(newPage[i]);
              }
              that.setData({
                contentList: contentList,
                page_endBoolean: page_end,
                requestCheckBoolean: true
              });
            }
          });
        } else {
          app.errorHide(that, "没有更多了", that, 3000);
          that.setData({
            requestCheckBoolean: true
          });
        }
      }
    }
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
  //点击跳转到用户详情
  personDetail: function (e) {
    var id = e.currentTarget.dataset.project;
    app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id);
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
        if (status == 1) {
          contentList.forEach((x) => {
            if (x.record_id == record_id) {
              x.handle_status = 1;
            }
          });
          wx.showToast({
            title: '已同意',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            contentList: contentList
          });
        } else if (status == 2) {
          contentList.forEach((x) => {
            if (x.record_id == record_id) {
              x.handle_status = 2;
            }
          });
          wx.showToast({
            title: '拒绝',
            duration: 2000,
            image: "/img/icon-chacha@2x.png"
          });
          that.setData({
            contentList: contentList
          });
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