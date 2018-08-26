// pages/market/currencydetail.js
var tools = require('../../utils/tools.js')
var network = require('../../utils/network.js')
var settings = require('../../secret/settings.js')
var fav = require('../../utils/favorite.js')
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    market: 'cmc',
    trendPeriod: '(24h)',
    price: '--',
    trends: 0,
    rank: '--',
    marketCap: '--',
    volume24h: '--',
    availableSupply: '--',
    links: {'website': '--', 'explorer': '--'},
    markets: [{ 'name': '--', 'website': '--' }, { 'name': '--', 'website': '--' }]
  },

  copyUrl: function (res) {
    let web = res.currentTarget.dataset.web
    let copyValue = res.currentTarget.dataset.url
    wx.showModal({
      title: copyValue,
      content: '小程序内禁止打开网页，请拷贝到剪贴板后前往浏览器打开',
      confirmText: '拷贝',
      confirmColor: '#2196F3',
      cancelColor: '#888',
      success: function (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: copyValue,
            success: function (res) {
              // wx.showToast({
              //   title: '已复制到您的黏贴板',
              //   duration: 1500
              // })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  seeAll: function() {
    app.globalData.tmpParams = 'cmc_top'
    wx.switchTab({
      url: 'marketcap'
    })
  },

  goHome: function () {
    wx.switchTab({
      url: 'marketcap'
    })
  },

  favorite: function () {
    let that = this
    if (this.data.isFavorite) { // 取消关注
      fav.removeFavorite(this.data.currency_id, this.data.market_id, () => {
        that.setData({
          isFavorite: !that.data.isFavorite
        })
      })
    }
    else { // 添加关注
      fav.addFavorite(this.data.currency_id, this.data.market_id, () => {
        that.setData({
          isFavorite: !that.data.isFavorite
        })
      })
    }
  },

  loadCurrency: function(currency_id, market_id) {
    let that = this
    let fiat = wx.getStorageSync('defaultFiatIndex')
    let riseColor = wx.getStorageSync('riseColor')
    let trendIncreaseCss = 'item-trend-green'
    let trendDecreaseCss = 'item-trend-red'
    let trendPeriod = '(24h)'

    if (riseColor && riseColor == 'red') {
      trendIncreaseCss = 'item-trend-red'
      trendDecreaseCss = 'item-trend-green'
    }
    let url = settings.currencyDetailUrl + '?currency_id=' + currency_id
    if (market_id != -1) {
      url += '&market_id=' + market_id
    }

    network.GET({
      url: url,
      success: function (res) {
        let currency = res.data.data.name && res.data.data.symbol ? res.data.data.name + " (" + res.data.data.symbol + ")" : '--'
        let showname = res.data.data.alias ? res.data.data.alias + ', ' + currency : currency
        let marketShowName = res.data.data.market_alias ? res.data.data.market_alias : res.data.data.market_name
        if (marketShowName != 'cmc' && marketShowName != '综合' && marketShowName != '') {
          showname = marketShowName + ', ' + showname
          trendPeriod = '(今日)'
        }
        let markets = res.data.data.market_list ? res.data.data.market_list : []
        let trends = res.data.data.percent_change_display ? res.data.data.percent_change_display : 0
        let langUrls = {
          CHN: '/images/flags/flag_china.png',
          JPN: '/images/flags/flag_jpan.png',
          KOR: '/images/flags/flag_korea.png',
          ENG: '/images/flags/flag_usa.png',
        }

        for (let i in markets) {
          markets[i].language = markets[i].language ? markets[i].language : 'ENG'
          markets[i].langUrl = langUrls[markets[i].language]
          markets[i].volume = markets[i].volume_24h ? '$' + tools.friendlyNumber(markets[i].volume_24h) : '暂无数据'
          markets[i].showname = markets[i].alias ? markets[i].alias + ', ' + markets[i].name : markets[i].name
        }

        that.setData({
          currency_id: currency_id,
          market_id: market_id,
          market_name: res.data.data.market_name ? res.data.data.market_name : '',
          symbol: res.data.data.symbol,
          name: res.data.data.name,
          alias: res.data.data.alias,
          showname: showname,
          marketShowName: marketShowName,
          currency: currency,
          priceShow: res.data.data.price_display,
          trends: trends,
          rank: res.data.data.rank ? res.data.data.rank : '--',
          marketCap: res.data.data.market_cap_usd ? res.data.data.market_cap_usd : '--',
          volume24h: res.data.data.volume_usd_24h ? res.data.data.volume_usd_24h : '--',
          availableSupply: res.data.data.available_supply ? tools.friendlyNumber(res.data.data.available_supply) : '--',
          links: {
            'website': res.data.data.website ? res.data.data.website : '暂无',
            'explorer': res.data.data.explorer ? res.data.data.explorer : '暂无',
          },
          markets: markets,
          trendIncreaseCss: trendIncreaseCss,
          trendDecreaseCss: trendDecreaseCss,
          isFavorite: res.data.data.is_favorite ? res.data.data.is_favorite : false,
          trendPeriod: trendPeriod,
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '获取数据失败，请稍候再试...',
          duration: 1500,
          image: '/images/icons/exclamationmark.png'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('options: ', options)
    let that = this
    if (!options.currency_id) { this.seeAll(); return }
    this.loadCurrency(options.currency_id, options.market_id)

    wx.setNavigationBarTitle({
      title: options.market ? options.market + ', ' + options.symbol : options.symbol
    })

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
    this.loadCurrency(this.data.currency_id, this.data.market_id)
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.getPrefix(this.data.market) + this.data.name,
      path: '/pages/market/currencydetail?currency_id=' + this.data.currency_id + '&market_id=' + this.data.market_id + '&market=' + this.data.marketShowName,
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