var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    // 6个参数
    nominalPower: '',
    designCompany: '',
    install: '',
    unitProfit: '',
    coal: '',
    co2: '',
    so2: '',
  },
  //  点击日期组件确定事件  
  buildDat: function (e) {
    this.setData({
      install: e.detail.value
    })
  },
  // 输入参数
  // 装机容量
  capacityInput: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        nominalPower: util.trim(e.detail.value),
        capacityHid: true
      })
    }
  },
  // 安装商
  InstallerInput: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        designCompany: util.trim(e.detail.value),
      })
    }
  },
  // 资金收益
  incomeInput: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        unitProfit: util.trim(e.detail.value)
      })
    } 
  },
  // 节省标准煤
  stanCoalInput: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        coal: util.trim(e.detail.value)
      })
    } 
  },
  // CO2减排
  devicCO2Input: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        co2: util.trim(e.detail.value)
      })
    } 
  },
  // SO2减排
  devisSO2Input: function (e) {
    if (util.trim(e.detail.value) != null) {
      this.setData({
        so2: util.trim(e.detail.value)
      })
    } 
  },
  // 确定按钮,完成本页面创建
  finishInstal:function () {
    var that = this;
    var nominalPower = that.data.nominalPower
    var designCompany = that.data.designCompany
    var install = that.data.install
    var unitProfit = that.data.unitProfit == '' ? '1.20' : that.data.unitProfit
    var coal = that.data.coal == '' ? '0.400' : that.data.coal
    var co2 = that.data.co2 == '' ? '0.997' : that.data.co2
    var so2 = that.data.so2 == '' ? '0.030' : that.data.so2

    if (nominalPower == '') {
      wx.showToast({
        title: '输入装机容量',
        icon: 'loading',
        duration: 1500,
      });
    } else {
      var action = '&install=' + install + '&unitProfit=' + unitProfit + '&coal=' + coal + '&co2=' + co2 + '&so2=' + so2 + '&longitude=' + that.data.longitude + '&latitude=' + that.data.latitude
      if (designCompany != ''){
        action += '&designCompany=' + designCompany
      }
      wx.navigateTo({
        url: '/pages/buildSec/buildSec?nominalPower=' + nominalPower + action,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var date = new Date().getFullYear() + '-' + util.doubDigit(new Date().getMonth() + 1) + '-' + util.doubDigit(new Date().getDate())
    that.setData({
      install: date,
      longitude: options.longitude,
      latitude: options.latitude,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})