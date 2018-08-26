const app = getApp();
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
const WxParse = require('../../../../wxParse/wxParse.js');
Page({
  data: {
    show_apply:false,
    yzm_btn_disabled: false,
    yzm_btn_text: '获取验证码',
    yzm_all_time: 60,
    phone:'',
    glo_is_load:true
  },
  onLoad: function (options) {
    this.load()
  },
  load:function(){
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getApplyStatus.html', {}, (info) => {
      if (info.status == 200) {
        wx.redirectTo({
          url: '../index/index'
        })
      } else {
        this.setData({ status: info.status, glo_is_load: false, show_apply:false })
        WxParse.wxParse('content', 'html', info.fxrule, this);
      }
    }, {});
  },
  onShow: function () {
  
  },
  show_apply: function (e) {
    this.setData({show_apply:!this.data.show_apply})
  },
  set_phone:function(e){
    this.data.phone = e.detail.value
  },
  submit:function(e){
    var that = this
    if (e.detail.value.name == undefined || e.detail.value.name == null || e.detail.value.name == '') {
      wx.showModal({ content: '请输入姓名！', showCancel: false });
      return;
    }
    if (e.detail.value.phone == undefined || e.detail.value.phone == null || e.detail.value.phone == '') {
      wx.showModal({ content: '请输入电话！', showCancel: false });
      return;
    }
    if (e.detail.value.yzm == undefined || e.detail.value.yzm == null || e.detail.value.yzm == '') {
      wx.showModal({ content: '请输入验证码！', showCancel: false });
      return;
    }
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/applyFenxiao.html', { data: e.detail.value }, (info) => {
      if(info == 1){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          success:function(){
            
            that.load()
          }
        })
      }
    }, {});
  },
  onGetVerifyCodeTap:function(e){
    var tel = this.data.phone
    if (tel == undefined || tel == null || tel == '') {
      wx.showModal({ content: '请输入正确的手机号！', showCancel: false });
      return;
    }
    if (tel.search(/^([0-9]{11})?$/) == -1) {
      wx.showModal({ content: '请输入正确的手机号！', showCancel: false });
      return;
    }
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getVerifyCode.html', { phone: tel }, (info) => {
      var that = this
      //倒计时
      that.setData({
        yzm_btn_disabled: true
      })
      that.getShengTime()
    }, {});
  },
  getShengTime: function () {
    var that = this
    var yijing_time = that.data.yzm_all_time - 1;
    if (that.data.yzm_all_time > 0) {
      that.setData({
        yzm_all_time: yijing_time,
        yzm_btn_text: '等待' + yijing_time + '秒'
      })
      setTimeout(function () {
        that.getShengTime();
      }
        , 1000)
    } else {
      that.setData({
        yzm_btn_disabled: false,
        yzm_btn_text: '获取验证码',
        yzm_all_time: 60
      })
    }
  }
})