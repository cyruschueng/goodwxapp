var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    count: 0,
    nonet: true,
    jiandi:false,
  },
  onLoad: function (options) {
    let project_id = options.project_id;
    this.setData({
      project_id: project_id
    });
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    var that = this;
    // 初始化下拉加载相关参数
    app.initPage(that);
    var user_id = this.data.user_id;
    // let project_id = this.data.project_id;
    // 获取浏览我的用户信息
    if (user_id) {
      wx.request({
        url: url_common + '/api/message/viewProjectUserList',
        data: {
          user_id: user_id,
          project_id: project_id,
          type_id: 6
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading();
          var contacts = res.data.list.users;
          var count = res.data.list.count;
          that.setData({
            contacts: contacts,
            count: count,
            project_id: project_id
          });
        }
      });
    }

    //向后台发送信息取消红点
    wx.request({
      url: url_common + '/api/message/setProjectViewToRead',
      data: {
        user_id: user_id,
        project_id: project_id,
        type_id: 6
      },
      method: "POST",
    });
    wx.removeStorageSync("project_id");
    app.netWorkChange(that);
  },
  onShow: function () {
    
  },
  // 添加人脉
  addNetWork: function (e) {
    var that = this;
    var user_id = wx.getStorageSync('user_id');//获取我的user_id
    var followed_user_id = e.target.dataset.followedid;//当前用户的user_id
    var follow_status = e.currentTarget.dataset.follow_status;
    // var index = e.target.dataset.index;
    var contacts = this.data.contacts;
    if (follow_status == 0) {
      //添加人脉接口
      wx.request({
        url: url + '/api/user/UserApplyFollowUser',
        data: {
          user_id: user_id,
          applied_user_id: followed_user_id
        },
        method: 'POST',
        success: function (res) {
          if (res.data.status_code == 2000000) {
            //将状态设为"未验证"
            contacts.forEach((x) => {
              if (x.user_id == followed_user_id) {
                x.follow_status = 2;
              }
            });
            that.setData({
              contacts: contacts
            });
          }
        },
        fail: function (res) {
          wx.showModal({
            title: "错误提示",
            content: "添加人脉失败" + res
          });
        },
      });

    } else if (follow_status == 3) {
      // 同意申請接口
      wx.request({
        url: url + '/api/user/handleApplyFollowUser',
        data: {
          user_id: user_id,
          apply_user_id: followed_user_id
        },
        method: 'POST',
        success: function (res) {
          if (res.data.status_code == 2000000) {
            //将状态设为"未验证"
            contacts.forEach((x) => {
              if (x.user_id == followed_user_id) {
                x.follow_status = 1;
              }
            });
            that.setData({
              contacts: contacts
            });
          }
        }
      });
    }
  },
  // 用户详情
  userDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id);
  },
  //下拉加载
  loadMore: function () {
    var that = this;
    var user_id = this.data.user_id;
    var currentPage = this.data.currentPage;
    var project_id = this.data.project_id;
    var request = {
      url: url_common + '/api/message/viewProjectUserList',
      data: {
        user_id: user_id,
        project_id: project_id,
        page: currentPage,
        type_id: 6
      }
    };
    //调用通用加载函数
    this.more(that, request, "contacts", that.data.contacts);
     
  },
  //下拉加载模版
  more: function (that, request, str, dataSum) {
    var user_id = wx.getStorageSync("user_id");
    if (that.data.requestCheck) {
      if (user_id != '') {
        if (that.data.page_end == false) {
          wx.showToast({
            title: 'loading...',
            icon: 'loading'
          });
          request.data.page++;
          that.setData({
            currentPage: request.data.page,
            requestCheck: false
          });
          //请求加载数据
          wx.request({
            url: request.url,
            data: request.data,
            method: 'POST',
            success: function (res) {
              var newPage = res.data.list.users;
              var page_end = res.data.page_end;
              for (var i = 0; i < newPage.length; i++) {
                dataSum.push(newPage[i]);
              }
              that.setData({
                [str]: dataSum,
                page_end: page_end,
                requestCheck: true
              });
              app.log("page_end",that.data.page_end);
              if (that.data.page_end == true) {
                that.setData({
                  jiandi: true,
                  requestCheck: true
                });
              }
            }
          });
        } else {
          if (that.data.page_end == true) {
            that.setData({
              jiandi: true,
              requestCheck: true
            });
          }
        }
      }
    }
  },
  // 项目推送
  projectPush(e) {
    let that = this;
    let pushTo_user_id = e.currentTarget.dataset.id;
    app.operationModel('projectPush', that, pushTo_user_id);
  },
  // 申请加人脉
  contactsAdd(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAdd',this, added_user_id, function (res) {
      app.log('申请添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 2);
    });
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAddDirect',this, added_user_id, function (res) {
      app.log(that,'直接添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 1);
    });
  },
  // 加人脉成功后处理(辅助函数)
  contactsAddSuccessFunc(res, added_user_id, num) {
    var that = this;
    // var user_id = wx.getStorageSync('user_id');//获取我的user_id
    var contacts = this.data.contacts;
    if (res.data.status_code == 2000000) {
      contacts.forEach((x) => {
        if (x.user_id == added_user_id) {
          x.follow_status = 1;
        }
      });
      that.setData({
        contacts: contacts
      });
    } else {
      app.errorHide(that, res.data.error_Msg, 3000);
    }
  },
  // 一键拨号
  telephone: function (e) {
    let telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
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