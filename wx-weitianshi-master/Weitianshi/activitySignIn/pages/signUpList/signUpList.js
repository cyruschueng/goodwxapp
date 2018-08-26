var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    jiandi: false,
    firstTime: true,
    idCardList: '',
    hidden: true,
    nonet: true
  },
  onLoad(options) {
    let that = this;
    app.initPage(that);
    let user_id = wx.getStorageSync("user_id");
    let activity_id = options.activity_id;
    app.netWorkChange(that);
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    that.setData({
      activity_id: activity_id
    })
  },
  onShow() {
    let that = this;
    //请求精选项目数据
    app.loginPage(function (user_id) {
      that.setData({
        user_id: user_id
      });
      that.idCardList(user_id);
    });
    that.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false
    });
  },

  //列表信息
  idCardList(user_id) {
    let that = this;
    let activity_id = this.data.activity_id;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    app.httpPost({
      url: url_common + '/api/activity/applyUserList',
      data: {
        "user_id": user_id,
        "activity_id": activity_id,
        "page": 1
      },
    }).then(res => {
      let idCardList = res.data.data.list;
      that.setData({
        idCardList: idCardList
      })
      wx.hideLoading();
    })
  },
  // 用户详情
  userDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    var user_id = wx.getStorageSync("user_id");//用戶id
    if (id){
      if (id == user_id) {
        app.href('/pages/my/my/my')
      } else {
        app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id);
      }
    }
  },
  // 上拉加载
  loadMore() {
    var that = this;
    let idCardList = this.data.idCardList;
    if (that.data.requestCheck) {
      if (that.data.page_end == false) {
        wx.showToast({
          title: 'loading...',
          icon: 'loading'
        });
        that.data.currentPage++;
        that.setData({
          currentPage: this.data.currentPage,
          requestCheck: false
        });
        //请求加载数据
        wx.request({
          url: url_common + '/api/activity/applyUserList',
          data: {
            user_id: wx.getStorageSync("user_id"),
            page: this.data.currentPage,
            "activity_id": this.data.activity_id,
          },
          method: 'POST',
          success: function (res) {
            let newPage = res.data.data.list;
            let page_end = res.data.data.page_end;
            for (let i = 0; i < newPage.length; i++) {
              idCardList.push(newPage[i]);
            }
            that.setData({
              idCardList: idCardList,
              page_end: page_end,
              requestCheck: true
            });
          }
        });
      } else {
        that.setData({
          requestCheck: true,
          jiandi: true
        });
      }
    }
  },

  // 分享当前页面
  onShareAppMessage: function () {
    return ShareModel.discoverInvestShare();
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
  // 加人脉成功后处理(辅助函数)
  contactsAddSuccessFunc(res, added_user_id, num) {
    let that = this;
    let idCardList = this.data.idCardList;
    if (res.data.status_code == 2000000) {
      //更改投资人和FA列表中该人的加人脉按钮的字段
      if (idCardList) {
        idCardList.forEach(x => {
          if (x.user_id == added_user_id) {
            x.follow_status = num;
          }
        });
        that.setData({
          idCardList: idCardList
        });
      }
    } else {
      app.errorHide(that, res.data.error_Msg, 3000);
    }
  },
  //---------------------------我的人脉--------------------------------------------------------------
  // 一键拨号
  telephone: function (e) {
    let telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
    });
  },
  // -----------------------------------立即认证
  // 立即认证
  toAccreditation: function () {
    let status = this.data.status;
    let user_id = wx.getStorageSync('user_id');
    app.checkUserInfo(this, res => {
      var complete = res.data.is_complete;
      //如果信息完整就可以显示去认证
      if (status == 0) {
        app.href('/pages/my/identity/indentity/indentity');
      } else if (status == 3) {
        wx.showModal({
          title: '友情提示',
          content: '您的身份未通过审核,只有投资人和买方FA才可申请查看项目',
          confirmColor: "#333333;",
          confirmText: "重新认证",
          showCancel: false,
          success: function (res) {
            wx.request({
              url: url_common + '/api/user/getUserGroupByStatus',
              data: {
                user_id: user_id
              },
              method: 'POST',
              success: function (res) {
                let group_id = res.data.group.group_id;
                app.href('/pages/my/identity/indentity/indentity?group_id=' + group_id);
              }
            });
          }
        });
      }
    })
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
  },
  // 微信授权绑定
  getPhoneNumber(e) {
    register.getPhoneNumber.call(this, e);
  },
  // 手机号码绑定
  telephoneRegister() {
    register.telephoneRegister.call(this);
  },
  // 关闭绑定方式选择弹框
  closeRegisterModal() {
    register.closeRegisterModal.call(this);
  }
});