// pages/market/marketcap.js
var tools = require('../../utils/tools.js')
var network = require('../../utils/network.js')
var settings = require('../../secret/settings.js')
var currencyHandler = require('../../utils/currency.js')
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scope: "rank",
    market: "cmc",
    trendIncreaseCss: 'item-trend-green',
    trendDecreaseCss: 'item-trend-red',
    marketPicker: false,
    marketIndex: 0,
  },

  bindPickerChange: function (e) {
    let that = this
    this.setData({
      marketIndex: e.detail.value
    })
    this.bindData('markets', { market_id: this.data.markets[e.detail.value].market_id }, 1)
  },

  redirectToDetail: function (res) {
    let currency_id = res.currentTarget.dataset.currencyid
    let market_id = res.currentTarget.dataset.marketid
    let symbol = res.currentTarget.dataset.symbol
    let market = res.currentTarget.dataset.market

    wx.navigateTo({
      url: 'currencydetail?currency_id=' + currency_id + '&market_id=' + market_id + '&symbol=' + symbol + '&market=' + market
    })
  },

  getSymbolsToShow: function (keyword, symbolList) {
    var symbolsToShow = []
    for (var i in symbolList){
      if (symbolList[i].symbol.toUpperCase().indexOf(keyword.toUpperCase())>=0 || symbolList[i].name.toUpperCase().indexOf(keyword.toUpperCase())>=0) {
        symbolsToShow.push(symbolList[i])
      }
    }
    return symbolsToShow
  },

  goAddSelected: function () {
    wx.navigateTo({
      url: '/pages/me/selected',
    })
  },

  goSearch: function () {
    wx.navigateTo({
      url: '/pages/market/search?type=list',
    })
  },

  bindData: function (scope, params=null, page=1, size=20) {
    const selectedColor = "#000"
    const unselectedColor = "#999"

    let that = this
    let fiat = wx.getStorageSync('defaultFiatIndex')

    let btnStatus = {
      rank: unselectedColor,
      change: unselectedColor,
      selected: unselectedColor,
      markets: unselectedColor,
    }
    btnStatus[scope] = selectedColor

    let callbacks = {
      success: function (res) {
        let settings = that.data ? that.data : {}
        settings.scope = scope
        settings.params = params
        settings.page = page
        settings.size = size
        settings.btnStatus = btnStatus
        settings.marketPicker = (scope !== 'markets' || that.data.markets.length < 2) ? false : true

        let currencyData = []
        let originData = res.data.data.list
        if (page > 1) {
          currencyData = that.data.currencyData
        }

        for (let i in originData) {
          if (!(originData[i].symbol.toUpperCase().indexOf('BTC') >= 0)) {
            let percentChange = originData[i].percent_change_display ? parseFloat(originData[i].percent_change_display) : 0

            let marketShowName = originData[i].market_name ? originData[i].market_name : ''
            if (originData[i].market_alias) {
              marketShowName = originData[i].market_alias
            }
            if (marketShowName == '综合') {
              marketShowName = ''
            }

            let showName = originData[i].alias ? originData[i].alias : originData[i].name
            let showVolume_prefix = '交易量(24h): '
            let showVolume = originData[i].volume_24h ? tools.friendlyNumberCn(originData[i].volume_24h) : '暂无数据'
            showVolume = showVolume_prefix + showVolume

            if (! marketShowName) {
              let showNamePrefix = scope == 'selected' ? '综合' : '#' + originData[i].rank
              showName = showNamePrefix + ', ' + showName
              let cap = originData[i].market_cap_usd ? tools.friendlyNumber(originData[i].market_cap_usd) : null
              if (cap) {
                showVolume = '市值: $' + tools.friendlyNumberCn(cap)
              } else {
                showVolume = '市值: 暂无数据'
              }
            } else {
              showName = marketShowName + ', ' + showName
            }
            currencyData.push({
              currencyId: originData[i].currency_id,
              name: originData[i].name,
              symbol: originData[i].symbol,
              alias: originData[i].alias,
              showName: showName,
              showVolume: showVolume,
              rank: originData[i].rank ? originData[i].rank : '--',
              priceShow: originData[i].price_display,
              percentChange: percentChange,
              marketId: originData[i].market_id ? originData[i].market_id : -1,
              marketShowName: marketShowName,
              trendIncreaseCss: that.data.trendIncreaseCss,
              trendDecreaseCss: that.data.trendDecreaseCss,
            })
          }
        }

        settings.currencyData = currencyData
        // console.log('writing settings: ', settings)
        that.setData(
          settings
        )
      },
    }

    currencyHandler.loadCurrency(scope, params, page, size, callbacks)
  },

  sortByChange: function () {
    let direction = 'desc'
    if (this.data.params && this.data.params.direction) {
      direction = this.data.params.direction == 'desc' ? 'asc' : 'desc'
    }

    this.bindData('change', {direction: direction}, 1)
  },

  sortByRank: function () {
    if (!(this.data.scope == 'rank')) {
      this.bindData('rank', null, 1)
    }
  },

  marketsClick: function (e) {
    if (!(this.data.scope == 'markets')) {
      this.bindData('markets', { market_id: e.currentTarget.dataset.marketid}, 1)
    }
  },

  bindSelectedScope: function () {
    if (!(this.data.scope == 'selected')) {
      this.bindData('selected')
    }
  },

  getAvailableMarkets: function () {
    let that = this
    currencyHandler.getAvailableMarkets({
      success: function (res) {
        let markets = []
        for (let m in res.data.data.list) {
          markets.push({
            market_id: res.data.data.list[m].market_id,
            name: res.data.data.list[m].name,
            alias: res.data.data.list[m].alias,
            showname: res.data.data.list[m].alias ? res.data.data.list[m].alias : res.data.data.list[m].name,
            weight: res.data.data.list[m].weight,
          })
        }

        app.globalData.markets = markets
        that.setData({
          markets: markets
        })

        wx.setStorage({
          key: 'availableMarkets',
          data: markets,
        })

      },
      fail: () => {
        wx.showToast({
          title: '获取市场数据失败',
          image: '/images/icons/exclamationmark.png',
        })
      },
      complete: () => { },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let validScope = ['rank', 'change', 'selected', 'markets']
    let scope = 'selected'
    let page = 1
    let params = {}

    let markets = wx.getStorageSync('availableMarkets') ? wx.getStorageSync('availableMarkets') : [] 
    console.log('options: ', options)
    // 如果来自分享页面
    if (options.scope && (validScope.indexOf(options.scope) >= 0)) {
      scope = options.scope
    }

    if (options.param) {
      if (scope == 'change') {
        params.direction = options.param
      }
      if (scope == 'markets') {
        params.market_id = options.param
      }
    }

    this.setData({
      scope: scope,
      page: page,
      markets: markets,
      params: params,
    })

    this.getAvailableMarkets()

    this.bindData(scope, params)
  
    if (wx.showShareMenu) {
      wx.showShareMenu({
        withShareTicket: true
      })
    }
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
    let riseColor = wx.getStorageSync('riseColor') ? wx.getStorageSync('riseColor') : 'green'
    let trendIncreaseCss = 'item-trend-green'
    let trendDecreaseCss = 'item-trend-red'

    if (riseColor != 'green') {
      [trendIncreaseCss, trendDecreaseCss] = [trendDecreaseCss, trendIncreaseCss]
    }

    this.setData({
      trendIncreaseCss: trendIncreaseCss,
      trendDecreaseCss: trendDecreaseCss,
    })

    if (this.data.scope == 'selected') {
      this.bindData(this.data.scope, this.data.params)
    }
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
    this.bindData(this.data.scope, this.data.params, 1)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.scope != 'selected') {
      let page = parseInt(this.data.page) + 1
      this.bindData(this.data.scope, this.data.params, page)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let param = ''
    if (this.data.scope == 'change') {
      param = this.data.params.direction
    }
    if (this.data.scope == 'markets') {
      param = this.data.params.market_id
    }

    console.log('param', param)
    return {
      title: '币行情',
      path: '/pages/market/marketcap?scope=' + this.data.scope + '&param=' + param,
      success: function (res) {
        // 转发成功
        // wxg.shareComplete(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})