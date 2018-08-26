//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    energyTodayT: '',
    energyTotalT: '',
    profitT: '',
    TotprofitT: '',
    shareWidth: '',
    queryNorPower:'',
    accountInfo:{},
    yearPowerUnit:'',
    energyTodayTUnit:'',
    monthPowerUnit: '',
    energyTotalTUnit: '',
    co2:'',
    so2:'',
    coal:'',
  },
  toIndex:function(){
    wx.redirectTo({
      url: '/pages/index/index?fromIndex=true',
    })
  },

  // 右滑删除 end
  // 跳转到地图


  // 跳转dataPage
  dataPage: function (e) {

  },
  // 搜索电站
  searchSta: function (e) {


  },

  onLoad: function (options) {
    var that = this;
    var id = JSON.parse(options.id)
    
    that.setData({
      energyTodayT: id.energyTodayT,
      energyTotalT: id.energyTotalT,
      profitT: id.profitT,
      TotprofitT: id.TotprofitT,
      queryNorPower: id.queryNorPower,
      shareWidth: id.shareWidth,
      accountInfo: id.accountInfo,
      monthPower: id.monthPower,
      yearPower: id.yearPower,
      yearPowerUnit: id.yearPowerUnit,
      energyTodayTUnit: id.energyTodayTUnit,
      monthPowerUnit: id.monthPowerUnit,
      energyTotalTUnit: id.energyTotalTUnit,
      co2: id.co2,
      so2: id.so2,
      coal: id.coal,
    })
  },

})
