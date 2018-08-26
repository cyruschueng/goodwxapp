const app = getApp();
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
Page({
  data: {
    data_list: [],
    crash_type:0,
    index:0
  },
  onLoad: function (options) {
    var that = this
    that.getDataList()
  },
  onPullDownRefresh: function () {
    var that = this
    that.getDataList()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  formSubmit: function (e) {
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  
    var tcmoney = e.detail.value.money;
    if (tcmoney == undefined || tcmoney == null || tcmoney == '')
    {
      wx.showModal({ content: '请输入提现金额！', showCancel: false });
      return;
    }
    if (parseFloat(tcmoney) <1) {
      wx.showModal({ content: '提现金额必须大于等于1！', showCancel: false });
      return;
    }
    if (parseFloat(tcmoney) > parseFloat(that.data.data_list.usergold))
    {
      wx.showModal({ content: '账户余额不足！', showCancel: false });
      return;
    }
    var tel = e.detail.value.telephone;
    if (tel == undefined || tel == null || tel == '') {
      wx.showModal({ content: '请输入手机号！', showCancel: false });
      return;
    }
    if (tel.search(/^([0-9]{11})?$/) == -1) {
      wx.showModal({ content: '请输入正确的手机号！', showCancel: false });
      return;
    }
    if (e.detail.value.cash_type == 1){
      if (e.detail.value.bank_no == undefined || e.detail.value.bank_no == null || e.detail.value.bank_no == '') {
        wx.showModal({ content: '请输入银行卡号！', showCancel: false });
        return;
      }
      if (e.detail.value.bank_no.search(/^\d{16}|\d{19}$/) == -1) {
        wx.showModal({ content: '请输入正确的银行卡号！', showCancel: false });
        return;
      }
      if (e.detail.value.true_name == undefined || e.detail.value.true_name == null || e.detail.value.true_name == '') {
        wx.showModal({ content: '请输入开户行姓名！', showCancel: false });
        return;
      }
    }
    
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/FenxiaoApi/postcashapply', 
      { money: e.detail.value.money, telephone: e.detail.value.telephone, bank_no: e.detail.value.bank_no, true_name: e.detail.value.true_name, bank_code: that.data.data_list.bank_code[that.data.index].code, bank_name: that.data.data_list.bank_code[that.data.index].name, crash_type: e.detail.value.cash_type }, (info) => {
      console.log(info)
      wx.redirectTo({
        url: '../wrecord/wrecord'
      })
    });
  },
  radioChange:function(e){
    this.setData({
      crash_type: e.detail.value
    })
  },
  bindPickerChange:function(e){
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },
  //获取数据
  getDataList: function () {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/FenxiaoApi/getcashapply', {}, (info) => {
      console.log(info)
      that.setData({ data_list: info })
    }, this, { isShowLoading: true });
  }
})