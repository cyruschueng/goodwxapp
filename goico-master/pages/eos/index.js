// pages/eos/index.js
var tools = require('../../utils/tools.js')
var wxCharts = require('../../utils/wxCharts.js')
var network = require('../../utils/network.js')
var settings = require('../../secret/settings.js')
var app = getApp()
var lineChart = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    showed: false,
    eosPrice: "--",
    eosPriceCNY: "--",
    gatheredETH: "--",
    totalEOS: "--",
    marketCap: "--",
    eosRank: "--",
    gasPrice: "--",
    gasLimit: "--",
    historyPrice: "--",
    historyPriceCNY: "--",
    historyEOS: "--",
    historyETH: "--",
    periodEndTime: "--月--日--:00",
    trendData: {
      categories: [1, 2, 3, 4, 5, 6, 7],
      values: [0, 0, 0, 0, 0, 0, 0]
    }
  },

  getEOSData: function () {
    let that = this
    network.GET({
      url: settings.requestEOSUrl,
      success: function (res) {
        that.setData({
          eosPrice: (res.data.data.eos_price && res.data.data.eos_price >= 0.00001) ? tools.friendlyNumber(res.data.data.eos_price.toFixed(5)) : '< 0.00001',
          eosPriceCNY: res.data.data.eos_price_cny ? tools.friendlyNumber(res.data.data.eos_price_cny.toFixed(2)) : '-',
          gatheredETH: res.data.data.eth_amount ? tools.friendlyNumber(res.data.data.eth_amount.toFixed(2)) : '--',
          totalEOS: res.data.data.eos_amount ? tools.friendlyNumber(res.data.data.eos_amount.toFixed(0)) : '--',
          gasPrice: res.data.data.gas_price ? tools.friendlyNumber(res.data.data.gas_price.toFixed(0)) : '--',
          gasLimit: res.data.data.gas_limit ? tools.friendlyNumber(res.data.data.gas_limit.toFixed(0)) : '--',
          historyPrice: (res.data.data.eos_price_total && res.data.data.eos_price_total >= 0.00001) ? tools.friendlyNumber(res.data.data.eos_price_total.toFixed(5)) : '< 0.00001',
          historyPriceCNY: res.data.data.eos_price_total_cny ? tools.friendlyNumber(res.data.data.eos_price_total_cny.toFixed(2)) : '--',
          historyEOS: res.data.data.eos_amount_total ? tools.friendlyNumber(res.data.data.eos_amount_total) : '--',
          historyETH: res.data.data.eth_amount_total ? tools.friendlyNumber(res.data.data.eth_amount_total.toFixed(2)) : '--',
          periodEndTime: res.data.data.period_end_time ? res.data.data.period_end_time : '--月--日--:00'
        })
      }
    })
  },

  getMarketCap: function () {
    let that = this
    network.GET({
      url: settings.requestMarketCapUrl,
      success: function (res) {
        if (res.data.data.asset == 'EOS') {
          that.setData({
            marketCap: res.data.data.market_cap ? tools.friendlyNumber(res.data.data.market_cap) : '--',
            eosRank: res.data.data.rank ? res.data.data.rank : '--'
          })
        }
        else {
          wx.showToast({
            title: res.data.message ? res.data.message : '获取市值信息失败，请稍候再试',
            duration: 2000,
            image: '/images/icons/exclamationmark.png',
          })
        }
      }
    })
},

  getTrendData: function () {
    var that = this
    network.GET({
      url: settings.requestTrendUrl,
      success: function (res) {
        if (res.data.data.asset == 'EOS') {
          that.setData({
            trendData: (res.data.data.categories && res.data.data.values) ? {
              categories: res.data.data.categories,
              values: res.data.data.values,
            } : {
                categories: [1, 2, 3, 4, 5, 6, 7],
                values: [0, 0, 0, 0, 0, 0, 0]
              }
          })
          that.drawTrends()
        }
        else {
          wx.showToast({
            title: res.data.message ? res.data.message : '获取EOS价格趋势数据失败，请稍候再试',
            duration: 2000,
            image: '/images/icons/exclamationmark.png',
          })
        }
      }
    })
  },

  updateData: function () {
    this.getEOSData()
    this.getMarketCap()
    this.getTrendData()
  },

  goMarketCap: function () {
    wx.switchTab({
      url: '/pages/market/marketcap'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.showed = true
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.showed = false
  },

  onPullDownRefresh: function () {
    this.updateData()
    wx.stopPullDownRefresh()
  },

  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'EOS知道',
      path: '/pages/eos/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  // createSimulationData: function () {
  //   var categories = [];
  //   var data = [];
  //   for (var i = 0; i < 7; i++) {
  //     categories.push('2016-' + (i + 1));
  //     data.push(Math.random() * (20 - 10) + 10);
  //   }
  //   // data[4] = null;
  //   return {
  //     categories: categories,
  //     data: data
  //   }
  // },

  drawTrends: function () {
    var that = this
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    // var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: that.data.trendData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'price',
        data: that.data.trendData.values,
        color: '#2585E8',
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  }
})