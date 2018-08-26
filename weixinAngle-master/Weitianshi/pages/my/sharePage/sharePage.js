let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
let RP = require('../../../utils/model/redPackets.js');
let rp = new RP.redPackets();
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
import * as ShareModel from '../../../utils/model/shareModel';
Page({
  data: {
    queding: app.globalData.picUrl.queding_1,
    tankuang: app.globalData.picUrl.tankuang,
    show: true,
    user: "",
    followed_user_id: "",
    nonet: true,
    bg_hongbao2: app.globalData.picUrl.bg_hongbao2,
    kai: true,
    open: app.globalData.picUrl.open,
    preventQuickClick: true
  },
  onLoad: function (options) {
    let that = this;
    let followed_user_id = options.user_id;
    let share_id = options.share_id;
    let is_redPackets = options.is_redPackets;
    let unique_id = options.unique_id;
    let shareTicket = options.shareTicket;

    that.setData({
      followed_user_id,
      share_id,
      is_redPackets,
      unique_id,
      shareTicket,
      user_id: wx.getStorageSync('user_id')
    });
    //登录态维护
    app.loginPage(function (user_id) {
      let view_id = user_id;
      app.log("分享者", share_id);
      app.log("数据显示的人", followed_user_id);
      app.log("查看的人", view_id);

      //如果进入的是自己的名片里
      if (user_id == followed_user_id && !is_redPackets) {
        return app.href('/pages/my/myCard/myCard');
      }
      // 载入被分享者的个人信息
      that.getShareIdInfo(share_id, followed_user_id, view_id);
      // 查看是红包还是名片
      if (is_redPackets) {
        // 发布红包的用户相关信息
        rp.pushHBPerson.call(that, unique_id, res => {
          let status = res.data.data.packet.drawed_user.drawed_status;
          if (status != 0) app.redirectTo('/redPackets/pages/openedHB/openedHB?unique_id=' + unique_id + '&&shareTicket=' + shareTicket);
        });
        // 向后台传群信息和红包信息
        app.clickLog(options);
      }
    });
    app.netWorkChange(that);
  },
  // 载入被分享者的个人信息
  getShareIdInfo(share_id, followed_user_id, view_id) {
    let that = this;
    app.httpPost({
      url: url_common + '/api/user/getUserAllInfo',
      data: {
        share_id: share_id,
        user_id: followed_user_id,
        view_id: view_id,
      }
    }, this).then(res => {
      let user = res.data.user_info;
      let count = res.data.count;
      app.log("count", count);
      let invest = res.data.invest_info;
      let resource = res.data.resource_info;
      let project_info = res.data.project_info;
      let invest_case = res.data.invest_case;
      let button_type = res.data.button_type;
      that.setData({
        user: user,
        invest: invest,
        resource: resource,
        project_info: project_info,
        invest_case: invest_case,
        button_type: button_type,
        count: count,
        view_id: view_id,
        user_id: view_id
      });
      wx.setNavigationBarTitle({
        title: res.data.user_info.user_real_name + "的投资名片",
      });
    })
  },
  // 检查注册信息是否完整
  checkRegisterComplete(user_id) {
    let that = this
    app.checkUserInfo(this, res => {
      that.setData({
        complete: res.data.is_complete
      });
    });
  },
  // 开红包
  kai() {
    let that = this;
    let unique_id = this.data.unique_id;
    let added_user_id = this.data.personInfo.user.user_id;
    let user_id = wx.getStorageSync('user_id');
    if (this.data.preventQuickClick){
      this.setData({
        preventQuickClick:false
      })
      app.checkUserInfo(this, res => {
        // 开红包动效
        that.setData({
          kai: false,
        })
        rp.openHB.call(this, unique_id)
      });
    }  
  },
  // 打开红包后,点击确定跳转
  makeSure(e) {
    let unique_id = this.data.unique_id;
    let added_user_id = this.data.personInfo.user.user_id;
    let is_card = e.currentTarget.dataset.cardid;
    rp.openedHB.call(this, added_user_id, is_card)
  },
  // 回到首页
  moreProject: function () {
    app.href('/pages/discoverProject/discoverProject');
  },
  // 一键拨号
  telephone: function (e) {
    let telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
    });
  },
  // 添加人脉
  addNetwork: function () {
    let that = this;
    let user_id = this.data.user_id;//我的id,查看者的id
    let followed_user_id = this.data.followed_user_id;//当前被查看的用户id;
    let button_type = this.data.button_type;
    app.log("button_type", button_type);
    let view_id = this.data.view_id;
    // button_type==0  0.申请加人脉按钮 1.不显示任何按钮  2.待验证   3.同意加为人脉  4.加为单方人脉
    //直接可添加好友的情况
    if (button_type == 0) {
      //走正常申请流程
      app.checkUserInfo(this, res => {
        let complete = res.data.is_complete;
        //如果信息完整就正常申请添加人脉
        wx.request({
          url: url + '/api/user/UserApplyFollowUser',
          data: {
            user_id: user_id,
            applied_user_id: followed_user_id
          },
          method: 'POST',
          success: function (res) {
            that.setData({
              button_type: 2
            });
          }
        });
      })
    } else if (button_type == 1) {
      app.log("互為好友或單方人脈");
    } else if (button_type == 2) {
      app.log("待驗證");
    } else if (button_type == 3) {
      wx.request({
        url: url + '/api/user/handleApplyFollowUser',
        data: {
          // 当前登录者的
          user_id: user_id,
          // 当前申请的用户
          apply_user_id: followed_user_id
        },
        method: 'POST',
        success: function (res) {
          that.setData({
            button_type: 1
          });
        }
      });
    } else if (button_type == 4) {
      wx.setStorageSync('followed_user_id', followed_user_id);
      wx.setStorageSync("driectAdd", 1);
      //判断用户信息是否完整
      app.checkUserInfo(this, res => {
        let complete = res.data.is_complete;
        //如果信息完整就直接添加人脉
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
            });
          }
        });
      })
    } else {
      showModal({
        title: "错误提示",
        content: "button_type为" + button_type
      });
    }
  },
  // 二维码分享按钮
  shareSth: function (e) {
    let QR_id = e.currentTarget.dataset.clickid;
    wx.setStorageSync('QR_id', QR_id);
    app.href('/pages/my/qrCode/qrCode');
  },
  // 项目融资
  projectFinance: function () {
    let followed_user_id = this.data.followed_user_id;
    app.href('/pages/my/projectShop/projectShop/projectShop?currentTab=1' + '&&followed_user_id=' + followed_user_id);
  },
  // 融资项目详情
  financingDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    app.href('/pages/projectDetail/projectDetail?id=' + id);
  },
  // 跳转到我的人脉
  toContactsMy: function () {
    a00.href('/pages/my/my/my')
  },
  // 跳转注册
  toContacts: function () {
    //走正常申请流程
    let user_id = this.data.user_id;//我的id,查看者的id
    let followed_user_id = this.data.followed_user_id;
    app.checkUserInfo(this, res => { })
  },
  // 跳转到推送项目页面
  pushProject: function () {
    // 推送给数据显示的人 push_id = followed_user_id
    //查看的人 view_id = user_id

    let share_id = this.data.share_id;
    let view_id = this.data.view_id;
    let push_id = this.data.followed_user_id;
    app.checkUserInfo(this, res => {
      app.href('/pages/myProject/pushTo/pushTo?user_id=' + view_id + '&&pushId=' + push_id);
    })
  },
  // 分享引导跳转
  shareJump(e) {
    let index = e.currentTarget.dataset.index;
    app.shareJump(index);
  },
  //个人信息编辑
  avatarEdit() {
    app.href('/pages/my/cardEdit/cardEdit');
  },
  // 分享页面部分
  onShareAppMessage: function () {
    let that = this;
    if (this.data.unique_id) {
      let unique_id = this.data.unique_id;
      let personInfo = this.data.personInfo;
      let user_id = wx.getStorageSync('user_id');
      if (user_id == personInfo.user.user_id) {
        return ShareModel.redPacketsShare(personInfo.user.user_real_name, personInfo.packet.money, unique_id)
      } else {
        wx.hideShareMenu({})
      }
    } else {
      return ShareModel.sharePageShare(that);
    }
  },
  // 非本人不能分享提示
  message() {
    app.errorHide(this, '红包非本人不可转发', 2000)
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