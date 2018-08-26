// mallcart.js
var _function = require('../../../utils/functionData');
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
var app = getApp()
Page({
  data: {
    this_order_id: 0,
    user_info: [],
    oinfo: [],
    glo_is_load: true,
    btn_disabled: false,
    submitIsLoading: false,
  },
  onLoad: function (options) {
    var that = this;
    var order_id = options.oid;
    that.setData({
      this_order_id: order_id,
    });
    //获取用户信息
    // _function.getShopPsUserInfo(wx.getStorageSync("utoken"),that.initgetShopPsUserInfoData,that);
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/PsUserInfo.html',
      {},
      (data) => {
        that.initgetShopPsUserInfoData(data)
      }, this, { isShowLoading: false });
  },
  initgetShopPsUserInfoData: function (data) {
    var that = this;
    that.setData({
      user_info: data.info,
    });
    wx.hideToast();
    // _function.getShopPsOrderInfo(that.data.this_order_id, that.initgetOrderInfoData, that);
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/psOrderInfo.html',
      { oid: that.data.this_order_id },
      (data) => {
        that.initgetOrderInfoData(data)
      }, this, { isShowLoading: false });
  },
  initgetOrderInfoData: function (data) {
    var that = this;
    that.setData({
      oinfo: data,
      glo_is_load: false
    })
  },
  //确认配送
  order_peisong_bind: function () {
    var that = this;
    var order_id = that.data.oinfo.id;
    wx.showModal({
      title: '提示',
      content: "确认配送吗?",
      success: function (res) {
        if (res.confirm == true) {
          wx.showToast({
            title: '操作中',
            icon: 'loading',
            duration: 10000,
            mask: true
          })
          that.setData({
            btn_disabled: true,
            submitIsLoading: true,
          });
          // _function.getShopPsConfirm(wx.getStorageSync("utoken"), order_id, that.initgetShopPsConfirmData, that);
          requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/psConfrim.html',
            { oid: order_id },
            (data) => {
              that.initgetShopPsConfirmData(data)
            }, this, { isShowLoading: false });
        }
      }
    })
  },
  initgetShopPsConfirmData: function (data) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: data,
      showCancel: false
    });
    wx.hideToast();
    that.setData({
      btn_disabled: false,
      submitIsLoading: false,
    });
  },
})