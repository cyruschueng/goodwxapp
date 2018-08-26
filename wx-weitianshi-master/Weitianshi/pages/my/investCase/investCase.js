var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as ShareModel from '../../../utils/model/shareModel';
let RG = require('../../../utils/model/register.js');
let register = new RG.register(); 
Page({
  data: {
    disabled: false,
    buttonOne: {
      text: "添加案例"
    },
    buttonOneText: '添加案例',
    nonet: true
  },
  onLoad: function () {
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    this.setData({
      user_id: user_id
    });
    // 初始化案例编辑时的领域和地区
    wx.removeStorageSync('addcase_belongArea');
    app.checkUserInfo(this,response => {
      app.httpPost({
        url: url_common + '/api/user/getUserAllInfo',
        data: {
          share_id: 0,
          user_id: user_id,
          view_id: user_id
        },
      }, that).then(res => {
        let invest_case = res.data.invest_case;
        wx.setStorageSync('invest_case', invest_case);
        that.setData({
          invest_case: invest_case,
        });
      })
    })
  },
  //编辑案例
  detail: function (e) {
    var index = e.currentTarget.dataset.index;
    let case_id = e.currentTarget.dataset.id;
    app.href('../investCaseEdit/investCaseEdit?index=' + index + '&&case_id=' + case_id);
  },

  // 按钮一号
  buttonOne: function () {
    app.href('/pages/my/investCaseEdit/investCaseEdit');
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