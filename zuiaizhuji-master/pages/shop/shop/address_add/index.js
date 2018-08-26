var _function = require('../../../../utils/functionData.js');
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
import { SA } from '../../../../utils/selectarea/selectarea';
var app = getApp()
Page({
  data: {
    info: [],
    this_aid: 0,
    submitIsLoading: false,
    buttonIsDisabled: false
  },
  onLoad: function (options) {
    var that = this
    var aid = options.aid
    SA.load(this, {
      showDistrict: true // 省市区三级（true，默认值）／省市两级（false）
    }); // 初始化区域框
    if (aid > 0) {
      that.setData({
        this_aid: aid
      })
      //获取收货地址信息
      // _function.getAddressInfo(wx.getStorageSync("utoken"),aid,that.initAddressInfoData,this)
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getAddressInfo.html',
        { aid: aid },
        (data) => {
          that.initAddressInfoData(data)
        }, this, { isShowLoading: false });
    }
  },
  initAddressInfoData: function (data) {
    console.log(data)
    var that = this
    that.setData({
      info: data,
      address: data.province + ' ' + data.city + ' ' + data.district,
      selectedCode: data.district_code
    })
  },
  choosearea() { // 页面弹框触发事件
    SA.choosearea(this);
  },
  tapProvince(e) { // 点击省份
    SA.tapProvince(e, this);
  },
  tapCity(e) { // 点击城市
    SA.tapCity(e, this);
  },
  tapDistrict(e) { // 点击区域
    SA.tapDistrict(e, this);
  },
  cancel() { // 取消选择
    SA.cancel(this);
  },
  confirm(e) { // 确认选择区域
    SA.confirm(e, this);
  },
  //添加修改地址
  formSubmit: function (e) {
    var that = this
    var address_info = e.detail.value
    that.setData({
      submitIsLoading: true,
      buttonIsDisabled: true
    })
    // _function.addAddress(wx.getStorageSync("utoken"), address_info, that.initaddAddressData, this)
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/addAddress.html',
      { ainfo: address_info },
      (data) => {
        that.initaddAddressData(data)
      }, this, { isShowLoading: false });
  },
  initaddAddressData: function (data) {
    var that = this
    wx.showModal({
      title: '提示',
      content: data,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
    that.setData({
      submitIsLoading: false,
      buttonIsDisabled: false
    })
  },
  deleteAddress: function () {
    var that = this
    // _function.delAddress(wx.getStorageSync("utoken"), that.data.this_aid, that.initdelAddressData, this)
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/delAddress.html',
      { aid: that.data.this_aid },
      (data) => {
        that.initdelAddressData(data)
      }, this, { isShowLoading: false });
  },
  initdelAddressData: function (data) {
    var that = this
    wx.showModal({
      title: '提示',
      content: data,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../address_list/index'
          })
        }
      }
    })
  }
})