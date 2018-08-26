var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    type_id: 2,
    count: 0,
    nonet: true,
    atBottom: false
  },
  onLoad: function () {
    let that = this;
    app.netWorkChange(that);
    app.initPage(that);
    var user_id = wx.getStorageSync('user_id');
    //获取加我为人脉的用户信息
    if (user_id) {
      wx.showLoading({
        title: 'loading',
        mask: true,
      });
      wx.request({
        url: url_common + '/api/message/cardMessage',
        data: {
          user_id: user_id,
          type_id: 2,
          page: 1
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading();
          that.setData({
            contacts: res.data.data,
            count: res.data.count
          });
        }
      });
    }
  },
  onShow: function () {
    var user_id = this.data.user_id;
    //向后台发送信息取消红点
    wx.request({
      url: url_common + '/api/message/setMessageToRead',
      data: {
        user_id: user_id,
        type_id: 2
      },
      method: "POST",
    });
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
    app.log("contacts", contacts);
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
    app.operationModel('contactsAdd', this, added_user_id, function (res) {
      app.log('申请添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 2);
    });
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAddDirect', this, added_user_id, function (res) {
      app.log('直接添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 1);
    });
  },
  //添加人脉
  addPerson: function (e) {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    var apply_user_id = e.currentTarget.dataset.followedid;
    // var follow_status = e.currentTarget.dataset.follow_status;
    var contacts = this.data.contacts;
    wx.request({
      url: url + '/api/user/handleApplyFollowUser',
      data: {
        user_id: user_id,
        apply_user_id: apply_user_id
      },
      method: 'POST',
      success: function (res) {
        //将状态改为"已互为人脉"
        contacts.forEach((x) => {
          if (x.user_id == apply_user_id) {
            x.follow_status = 1;
          }
        });
        that.setData({
          contacts: contacts
        });
      }
    });
  },
  // 用户详情
  userDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id);
  },
  //我的名片
  myCard: function () {
    var user_id = this.data.user_id;
    //获取用户信息
    wx.request({
      url: url_common + '/api/user/getUserAllInfo',
      data: {
        share_id: 0,
        user_id: user_id,
        view_id: user_id
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == 2000000) {
          wx.showModal({
            titel: "友情提示",
            content: "分享名片功能需要在个人页面点击去交换按钮实现",
            showCancel: false,
            success: function (res) {
              if (res.confirm == true) {
                app.href('/pages/my/myCard/myCard')
              }
            }
          });
        } else {
          wx.showModal({
            title: "友情提示",
            content: "交换名片之前,请先完善自己的名片",
            success: function (res) {
              if (res.confirm == true) {
                app.href('/pages/my/cardEdit/cardEdit');
              }
            }
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: "对不起没有获取到您的个人信息"
        });
      },
    });
  },
  // 一键拨号
  telephone: function (e) {
    var telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
    });
  },
  // 加载更多
  loadMore() {
    let that = this;
    let user_id = this.data.user_id;
    let currentPage = this.data.currentPage;
    let request = {
      url: url_common + '/api/message/cardMessage',
      data: {
        user_id: user_id,
        type_id: 2,
        page: currentPage
      },
    };
    app.loadMore(that, request, "contacts");
    if (this.data.page_end == true) {
      that.setData({
        atBottom: true
      });
    }
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