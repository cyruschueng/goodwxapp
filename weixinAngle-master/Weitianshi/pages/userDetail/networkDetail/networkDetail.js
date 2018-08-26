var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
let RG = require('../../../utils/model/register.js');
let register = new RG.register(); 
Page({
  data: {
    bindContact: false,
    integrity: 30,
    resourcesIndex: 9.9,
    user: "",
    tel: 0,
    telephone: 0,
    blue: -1,
    condition: 0,
    IdentificationShow: 0,
    playTime: 1,
    nonet: true
  },
  onLoad: function (options) {
    let that = this;
    app.netWorkChange(that)
    wx.showLoading({
      title: 'loading',
      mask: true,
    })
    var user_id = options.id;
    app.loginPage(view_id => {
      that.setData({
        user_id: user_id,
        view_id: view_id
      })
      if (user_id == view_id) {
        app.href("/pages/my/my/my")
      }
      //用戶的个人信息
      app.httpPost({
        url: url_common + '/api/user/getUserAllInfo',
        data: {
          share_id: 0,
          user_id: user_id,
          view_id: view_id,
        },
      }, this).then(res => {
        wx.hideLoading()
        var user = res.data.user_info;
        var count = res.data.count;
        var invest = res.data.invest_info;
        var resource = res.data.resource_info;
        var project_info = res.data.project_info;
        var invest_case = res.data.invest_case;
        var tel = user.user_mobile;
        var button_type = res.data.button_type;
        let user_name = user.user_real_name;
        wx.setNavigationBarTitle({
          title: user_name + "的投资名片",
        })
        app.log(that, user.active_status)
        if (tel.indexOf("*") != -1) {
          that.setData({
            blue: 1
          })
        }
        if (invest_case) {
          if (invest_case.length > 3) {
            invest_case = invest_case.slice(0, 3);
          }
        }
        that.setData({
          user: user,
          invest: invest,
          resource: resource,
          project_info: project_info,
          invest_case: invest_case,
          button_type: button_type,
          count: count
        })
      }).catch(res => {
        app.errorHide(this, res.data.error_msg)
      })
    })
  },
  //进入个人详情
  userInfo: function () {
    app.href("/pages/userDetail/networkDetail/networkDetail")
  },
  // 好友直接拨打电话
  telephone: function (e) {
    var telephone = e.currentTarget.dataset.telephone;
    var tel = telephone.indexOf("****") * 1;
    if (tel == -1) {
      wx.makePhoneCall({
        phoneNumber: telephone,
      })
    } else {
    }
    if (tel == -1) {
      wx.makePhoneCall({
        phoneNumber: telephone,
      })
    } else {
    }
  },
  //添加人脉
  addPerson: function (options) {
    var that = this;
    var followed_user_id = this.data.user_id;//当前用户的
    let view_id = wx.getStorageSync('user_id');//获取我自己的user_id/查看者的id
    let button_type = this.data.button_type;
    // button_type==0  0申请加人脉按钮，1不显示任何按钮  2待验证   3同意加为人脉  4加为单方人脉
    //判断用户信息是否完整
    app.checkUserInfo(this, res => {
      //信息完整
      if (button_type == 0) {
        wx.request({
          url: url + '/api/user/UserApplyFollowUser',
          data: {
            user_id: view_id,
            applied_user_id: followed_user_id
          },
          method: 'POST',
          success: function (res) {
            app.log(that, "正常申请添加人脉")
            that.setData({
              button_type: 2
            })
          }
        })
      } else if (button_type == 1) {
        app.log(that, "我的人脉--不显示内容")
      } else if (button_type == 2) {
        app.log(that, "待验证===显示待验证")
      } else if (button_type == 3) {
        wx.request({
          url: url + '/api/user/handleApplyFollowUser',
          data: {
            // 当前登录者的
            user_id: view_id,
            // 当前申请的用户
            apply_user_id: followed_user_id
          },
          method: 'POST',
          success: function (res) {
            app.log(that, "同意申請")
            that.setData({
              button_type: 1
            })
          }
        })
      } else if (button_type == 4) {
        // 单方人脉添加
        wx.request({
          url: url + '/api/user/followUser',
          data: {
            user_id: user_id,
            followed_user_id: followed_user_id
          },
          method: 'POST',
          success: function (res) {
            that.setData({
              button_type: 1
            })
            wx.setStorageSync('followed_user_id', followed_user_id)
          }
        })
      }
    })
  },
  // 二维码分享页面
  shareSth: function (e) {
    var QR_id = e.currentTarget.dataset.clickid;
    wx.setStorageSync('QR_id', QR_id)
    app.href('/pages/my/qrCode/qrCode')
  },
  //分享页面
  onShareAppMessage: function () {
    let that = this;
    return ShareModel.networkDetailShare(that);
  },
  //项目融资
  projectFinance: function () {
    var followed_user_id = this.data.user_id;
    app.href('/pages/my/projectShop/projectShop/projectShop?followed_user_id=' + followed_user_id)
  },
  //融资项目详情
  financingDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    app.href('/pages/projectDetail/projectDetail?id=' + id)
  },
  // 推送项目
  pushProjectTo: function () {
    let push_id = this.data.user_id;
    let that = this;
    app.operationModel('projectPush', that, push_id)
  },
  // // 人气进入
  // popularity: function () {
  //   let id = this.data.user_id;//当前用户的
  //   wx.navigateTo({
  //     url: '/pages/message/browseMe/browseMe?id=' + id
  //   })
  // },
  // 加我为人脉
  // attention: function () {
  //   wx.navigateTo({
  //     url: '/pages/message/beAddedContacts/beAddedContacts'
  //   })
  // },
  //分享引导跳转
  shareJump(e) {
    let index = e.currentTarget.dataset.index;
    app.shareJump(index);
  },
  moreProject: function () {
    app.href("/pages/discoverProject/discoverProject")
  },
  // 二维码分享按钮
  shareSth: function (e) {
    var QR_id = e.currentTarget.dataset.clickid;
    wx.setStorageSync('QR_id', QR_id)
    app.href('/pages/my/qrCode/qrCode')
  },
  contactTap: function () {
    let that = this;
    that.setData({
      bindContact: true
    })
    setTimeout(() => {
      that.setData({
        bindContact: false
      });
    }, 10000)
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
    }, 1500)
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