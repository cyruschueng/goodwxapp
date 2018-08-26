const app = getApp()
var config = require('../../config.js')
var util = require('../../utils/util.js')
import req from '../../utils/request'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxUser: null,
    mineMobile: '1595222222'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' })
    this.setData({ wxUser: app.globalData.wxUser});
  },

  bindMobileInput: function (e) {
    let mobile = this.data.mobile;
    mobile = e.detail.value;    
  },

/**
 * 收集用户手机号
 * 1. 用户允许，直接获取
 * 2. 用户拒绝，弹窗收集
 */
  bindMobile: function (e) {
    let _this = this;
    let _detail = e.detail;
    console.log(e.detail);
    if (e.detail.errMsg.indexOf('fail') > 0) {      
      _detail.needDecoder = 0;
      // 弹窗收集手机号
      _detail.mobile = _this.data.mineMobile;      
    } else {
      _detail.needDecoder = 1;
    }
    _this.bindMobilePost(_detail);
  },
  bindMobilePost: function (detail) {
    let _this = this;
    wx.request({
      url: config.api.userBindMobile,
      method: 'POST',
      data: detail,
      header: { token: app.getSessionId() },
      success: function (res) {
        // 系统更新完手机号后，微信侧需更新user全局变量
        console.log('success' + res);
        console.log('success' + res.mobile);
      },
      fail: function (res){
        console.log('error' + res);
      }
    });
  },

  /**
   * 扫描商品上的二维码
   */
  doScan: function () {
    let that = this;
    wx.scanCode({
      success: (response) => {
        // 获取绑定商品信息
        let url = response.result.split('?')[0] + '?action=view';
        let commodityId = util.getUrlParam(response.result, 'commodityId');
        let serialNo = util.getUrlParam(response.result, 'serialNo');
        let param = {
          commodityId: commodityId,
          serialNo: serialNo
        };
        req.get(url, param).then(res => res.data).then(result => {
          if (result.success) {
            var shipRecordDetails = JSON.stringify(result.data);
            wx.navigateTo({ url: './check/index?shipRecordDetails=' + shipRecordDetails });
          } else {
            wx.navigateTo({ url: '../message/fail?msg=' + data.errorMessage });
          }
        });
      }
    });
  }
})