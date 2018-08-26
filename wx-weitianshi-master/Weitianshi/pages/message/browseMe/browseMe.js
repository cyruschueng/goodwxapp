var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    count: 0,
    jiandi: false,
    nonet: true
  },
  onLoad: function (options) {
    let that = this;
    var user_id = wx.getStorageSync('user_id');
    app.initPage(that);
    app.netWorkChange(that);
    this.browseMe(user_id);
  },
  // 项目推送
  projectPush(e) {
    let that = this;
    let pushTo_user_id = e.currentTarget.dataset.id;
    app.operationModel('projectPush', that, pushTo_user_id);
  },
  // 加人脉成功后处理(辅助函数)
  contactsAddSuccessFunc(res, added_user_id, num) {
    let that = this;
    var contacts = this.data.contacts;
    app.log("contacts",contacts);
    if (res.data.status_code == 2000000) {
      //更改投资人和FA列表中该人的加人脉按钮的字段
      if (contacts) {
        contacts.forEach(x => {
          if (x.user_id == added_user_id) {
            x.follow_status = num;
          }
        });
        that.setData({
          contacts: contacts
        });
      }
    } else {
      app.errorHide(that, res.data.error_Msg, 3000);
    }
  },
  // 申请加人脉
  contactsAdd(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAdd', this,added_user_id, function (res) {
      app.log('申请添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 2);
    });
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAddDirect',this, added_user_id, function (res) {
      app.log('直接添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 1);
    });
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
  // 一键拨号
  telephone: function (e) {
    let telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
    });
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
    var request = {
      url: url_common + '/api/message/viewCardMessage',
      data: {
        user_id: user_id,
        page: currentPage,
        type_id: 3
      }
    };
    //调用通用加载函数
    app.loadMore(that, request, "contacts");
    app.log("page_end",this.data.page_end);
    if (this.data.page_end == true) {
      that.setData({
        jiandi: true
      });
    }
  },
  //列表加载
  browseMe: function (user_id) {
    let that = this;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/message/viewCardMessage',
      data: {
        user_id: user_id,
        page: 1,
        type_id: 3
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        var contacts = res.data.data;
        var count = res.data.count;
        var page_end = res.data.page_end;
        that.setData({
          contacts: contacts,
          page_end: page_end,
          count: count
        });
      }
    });
    //向后台发送信息取消红点
    wx.request({
      url: url_common + '/api/message/setMessageToRead',
      data: {
        user_id: user_id,
        type_id: 3
      },
      method: "POST",
      success: function (res) {
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