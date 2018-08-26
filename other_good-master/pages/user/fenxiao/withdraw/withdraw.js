const app = getApp();
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
Page({
  data: {
    data_list: [],
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
    requestUtil.post(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/FenxiaoApi/postcashapply', { money: e.detail.value.money, telephone:e.detail.value.telephone }, (info) => {
      console.log(info)
      wx.redirectTo({
        url: '../wrecord/wrecord'
      })
    });
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