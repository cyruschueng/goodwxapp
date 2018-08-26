let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    integrity: 30,
    user: "",
    modal: 0,
    goTop: 0,
    canEdit: 1,
    blue: -1,
    count: "",
    modalBox: 0,
    IdentificationShow: 1,
    shareModal: app.globalData.picUrl.share_modal,
    nonet: true
  },
  onLoad: function (options) {

    if (options) {
      this.setData({
        modal: options.modal
      });
    }
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {
    let that = this;
    app.loginPage(function (user_id) {
      that.setData({
        user_id: user_id,
      });
      // 载入我的个人信息
      app.httpPost({
        url: url_common + '/api/user/getUserAllInfo',
        data: {
          share_id: 0,
          user_id: user_id,
          view_id: user_id,
        }
      }, that).then(res => {
        let user = res.data.user_info;
        let count = res.data.count;
        let invest = res.data.invest_info;
        let resource = res.data.resource_info;
        let project_info = res.data.project_info;
        let invest_case = res.data.invest_case;
        let status_code = res.data.status_code;
        let financingProject = that.data.financingProject;
        let user_name = res.data.user_info.user_real_name;
        //设置缓存==========
        wx.setStorageSync("resource_find", res.data.resource_info.res_find);
        wx.setStorageSync("resource_give", res.data.resource_info.res_give);
        wx.setStorage({
          key: 'resource_data',
          data: res.data.resource_info
        })
        if (invest_case) {
          if (invest_case.length > 3) {
            invest_case = invest_case.slice(0, 3);
          }
        }

        wx.setNavigationBarTitle({
          title: user_name + "的投资名片",
        })
        that.setData({
          user: user,
          invest: invest,
          resource: resource,
          project_info: project_info,
          invest_case: invest_case,
          status_code: status_code,
          financingProject: financingProject,
          count: count
        })
      })
    })
  },
  onLaunch(options) {

  },
  //编辑名片
  cardEdit: function () {
    if (!this.data.options) {
      app.href('/pages/my/cardEdit/cardEdit')
    }
  },
  // 人气
  popularity: function () {
    app.href('/pages/message/browseMe/browseMe')
  },
  // 加我为人脉
  attention: function () {
    app.href('/pages/message/beAddedContacts/beAddedContacts')
  },
  pushTo: function () {
    app.href('/pages/message/potentialProject/potentialProject')
  },
  //头像编辑
  avatarEdit() {
    app.href('/pages/my/cardEdit/cardEdit')
  },
  //寻找案源
  findProjectEdit: function () {
    app.href('/pages/match/match/investDemand/investDemand?current=' + 1)
    if (!this.data.options) {
    }
  },
  //资源对接
  resourceEnchangeEdit: function () {
    if (!this.data.options) {
      app.href('/pages/match/match/resourceDemand/resourceDemand?current=' + 1)
    }
  },
  //项目融资
  projectFinance: function () {
    if (!this.data.options) {
      app.href('/pages/my/projectShop/projectShop/projectShop')
    }
  },
  //融资项目详情
  financingDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index
    app.href('/pages/myProject/projectDetail/projectDetail?id=' + id + "&&index=" + index + "&&currentTab=" + 0)
  },
  //投资案例
  investCase: function () {
    if (!this.data.options) {
      app.href('/pages/my/investCase/investCase')
    }
  },
  //交换名片
  cardChange: function () {
    let that = this;
    let user_id = this.data.user_id;
    let modal = this.data.modal;
    let status_code = this.data.status_code;
    if (status_code == 2000000) {
      that.setData({
        modal: 1
      })
      setTimeout(function () {
        that.setData({
          modal: 0
        })
      }, 2000)
    } else {
      wx.showModal({
        title: "友情提示",
        content: "交换名片之前,请先完善自己的名片",
        success: function () {
          app.href('/pages/my/cardEdit/cardEdit')
        }
      })
    }
  },
  //点击modal后消失
  hideModal() {
    let modal = this.data.modal;
    this.setData({
      modal: 0
    })
  },
  // 二维码分享按钮
  shareSth: function (e) {
    let QR_id = e.currentTarget.dataset.clickid;
    wx.setStorageSync('QR_id', QR_id)
    app.href('/pages/my/qrCode/qrCode')
  },
  //分享页面
  onShareAppMessage: function () {
    let that = this;
    return ShareModel.myCardShare(that);
  },

  //取消分享
  cancelShare: function () {
    this.setData({
      modal: 0
    })
  },
  // 查税号
  searchIdentification: function (e) {
    let that = this;
    let user_id = this.data.user_id;
    let modal = this.data.modal;
    let com_name = this.data.user.user_company_name;
    let status_code = this.data.status_code;
    wx.request({
      url: url_common + '/api/dataTeam/taxNumber',
      data: {
        user_id: user_id,
        com_name: com_name
      },
      method: 'POST',
      success: function (res) {
        let data = res.data;
        if (data.status_code == 460004) {
          that.setData({
            modalStyle: 1,
            modalBox: 1
          })
        } else if (data.status_code == 2000000) {
          that.setData({
            modalStyle: 0,
            modalBox: 1
          })
          let data = res.data.data;
          let com_name = data.com_name;
          let tax_member = data.tax_mumber;
          that.setData({
            data: data,
            com_name: com_name,
            tax_member: tax_member,
            modalStyle: 0
          })
        }
      }
    })
  },
  //完善公司信息
  writeInformation: function () {
    app.href('/pages/my/cardEdit/cardEdit')
    this.setData({
      modalBox: 0
    })
  },
  //确定或稍后再试
  laterOn: function () {
    this.setData({
      modalBox: 0
    })
  },
  //复制税号
  copyNum: function () {
    let num = this.data.tax_member;
    wx.setClipboardData({
      data: num,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
        })
        wx.getClipboardData({
          success: function (res) {
          }
        })
      }
    })
  },
  //去认证  status =0:未认证过  status = 1 认证中 status =2 认证成功 status =3 认证失败.需要重新认证
  authentication: function (e) {
    let status = e.currentTarget.dataset.identitystatus;
    let user_id = this.data.user_id;
    app.checkUserInfo(this, res => {
      let complete = res.data.is_complete;
      //如果信息完整就可以显示去认证
      if (status == 0) {
        app.href('/pages/my/identity/indentity/indentity')
      } else if (status == 3) {
        wx.request({
          url: url_common + '/api/user/getUserGroupByStatus',
          data: {
            user_id: user_id
          },
          method: 'POST',
          success: function (res) {
            let user_id = wx.getStorageSync('user_id');
            let authenticate_id = res.data.authenticate_id;
            let group_id = res.data.group_id;
            app.href('/pages/my/identity/indentity/indentity?authenticate_id=' + authenticate_id + '&&group_id=' + group_id)
          }
        })
      }
    })
  },
  //人脉大赛
  competitor: function () {
    app.href('/pages/contactsActivty/activtyDetail/activtyDetail')
  },
  // 首页
  moreProject() {
    app.href('/pages/discoverProject/discoverProject')
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
