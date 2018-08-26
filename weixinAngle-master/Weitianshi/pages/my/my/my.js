var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
let RG = require('../../../utils/model/register.js');
let register = new RG.register(); 
let RP = require('../../../utils/model/redPackets.js');
let rp = new RP.redPackets();
Page({ 
  data: {
    modalBox: 0,
    modal: 0,
    nonet: true,
    sendHB: app.globalData.picUrl.sendHB,
  },
  onLoad: function (options) {
    let that = this;
    app.netWorkChange(that);
    rp.makeSureHB.call(this)
  },

  onShow: function () {
    var that = this;
    app.loginPage(function (user_id) {
      that.setData({
        user_id: user_id,
      });
      if (user_id != 0) {
        wx.showLoading({
          title: 'loading',
          mask: true,
        });
        // 载入我的个人信息
        wx.request({
          url: url_common + '/api/user/myInfo',
          data: {
            share_id: 0,
            user_id: user_id,
            view_id: user_id,
          },
          method: 'POST',
          success: function (res) {
            app.log(that, 'myInfo', res);
            wx.hideLoading();
            var user = res.data.data.user;
            var count = res.data.data.count;
            // var invest = res.data.data.invest_info;
            // var resource = res.data.data.resource_info;
            // var project_info = res.data.data.project_info;
            var user_name = res.data.data.user.user_real_name;
            let user_company_name = res.data.data.user.user_company_name;

            that.setData({
              user: user,
              // invest: invest,
              // resource: resource,
              // project_info: project_info,
              count: count,
              user_company_name: user_company_name
            });
          },
          fail: function (res) {
          },
        });
        // 获得我的身份状态
        wx.request({
          url: url_common + '/api/user/getUserGroupByStatus',
          data: {
            user_id: user_id
          },
          method: 'POST',
          success: function (res) {

            // 0:未认证1:待审核 2 审核通过 3审核未通过
            let status = res.data.status;
            if (status != 0) {
              let group_id = res.data.group.group_id;
              that.setData({
                group_id: group_id
              });
            }
            that.setData({
              status: status
            });
          }
        });
      }
    });
  }, 
  //登录
  entry() {
    app.checkUserInfo(this, res => {})
  },
  //进入我的名片
  toMyCard: function () {
    app.checkUserInfo(this, res => { 
      app.href('/pages/my/myCard/myCard');
    })
  },
  //人气
  popularity: function () {
    app.href('/pages/message/browseMe/browseMe');
  },
  //头像编辑
  avatarEdit() {
    app.href('/pages/my/cardEdit/cardEdit');
  },
  //加我为人脉
  attention: function () {
    app.href('/pages/message/beAddedContacts/beAddedContacts');
  },
  //潜在项目
  pushTo: function () {
    app.href('/pages/message/potentialProject/potentialProject');
  },
  //身份验证
  identity: function (e) {
    let status = this.data.status;
    var user_id = wx.getStorageSync('user_id');
    // 0未认证 1待审核 2 认证成功 3 拒绝
    app.checkUserInfo(this, res => {
      var complete = res.data.is_complete;
      // if (complete == 1) {
      //   //如果信息完整就可以显示去认证
      if (status == 0) {
        app.href('/pages/my/identity/indentity/indentity');
      } else if (status == 1) {
        app.href('/pages/my/identity/identityResult/identityResult?type=' + 1);
      } else if (status == 2) {
        app.href('/pages/my/identity/identityResult/identityResult?type=' + 2);
      } else if (status == 3) {
        app.href('/pages/my/identity/identityResult/identityResult?type=' + 3);
      }
     })  
  },
  //项目店铺
  projectShop: function () {
    app.checkUserInfo(this, res => {
      app.href('/pages/my/projectShop/projectShop/projectShop')
    })
  },
  //约谈的项目
  contactProject: function () {
    app.checkUserInfo(this, res => {
      app.href('/pages/message/contactProject/userList/userList')
    })
  },
  //收藏的项目
  collectProject: function () {
    // app.href('/pages/message/collectProject/collectProject')
    let that = this;
    app.errorHide(that, "收藏项目近期开放", 3000);
  },
  //分享页面
  onShareAppMessage: function () {
    let that = this;
    return ShareModel.myCardShare(that);
  },
  // 查税号
  searchIdentification: function (e) {
    var that = this;
    var user_id = this.data.user_id;
    var modal = this.data.modal;
    var com_name = this.data.user_company_name;
    var status_code = this.data.status_code;
    wx.request({
      url: url_common + '/api/dataTeam/taxNumber',
      data: {
        user_id: user_id,
        com_name: com_name
      },
      method: 'POST',
      success: function (res) {
        app.log(that, "taxNum", res);
        let data = res.data;
        if (data.status_code == 460004) {
          that.setData({
            modalStyle: 1,
            modalBox: 1
          });
        } else if (data.status_code == 2000000) {
          that.setData({
            modalStyle: 0,
            modalBox: 1
          });
          let data = res.data.data;
          let com_name = data.com_name;
          var tax_member = data.tax_mumber;
          that.setData({
            data: data,
            com_name: com_name,
            tax_member: tax_member,
            modalStyle: 0
          });
        }
      }
    });
  },
  //完善公司信息
  writeInformation: function () {
    app.href('/pages/my/cardEdit/cardEdit');
    this.setData({
      modalBox: 0
    });
  },
  //确定或稍后再试
  laterOn: function () {
    app.href('/pages/my/my/my');
    this.setData({
      modalBox: 0
    });
  },
  //复制税号
  copyNum: function () {
    let num = this.data.tax_member;
    wx.setClipboardData({
      data: num,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        });
        wx.getClipboardData({
          success: function (res) {
          }
        });
      }
    });
  },
  //点击modal后消失
  hideModal() {
    let modal = this.data.modal;
    this.setData({
      modal: 0
    });
  },
  // 二维码分享按钮
  shareSth: function (e) {
    app.checkUserInfo(this, res => {
      var QR_id = e.currentTarget.dataset.clickid;
      wx.setStorageSync('QR_id', QR_id);
      app.href('/pages/my/qrCode/qrCode');
    })
  },
  myFri: function () {
    app.checkUserInfo(this, res => {
      app.href('/pages/discover/myFriend/myFriend');
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
    wx.hideLoading();
  },
  //发送红包
  sendBag() {
    app.checkUserInfo(this, res => {
      app.href('/redPackets/pages/publishHB/publishHB')
    })
  },
  //已发红包
  sendedBag(e) {
    app.checkUserInfo(this, res => {
      app.href('/redPackets/pages/myHB/myHB')
    
    })
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
  closeRegisterModal(){
    register.closeRegisterModal.call(this);
  }
});