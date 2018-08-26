// pages/market/search.js
var network = require('../../utils/network.js')
var settings = require('../../secret/settings.js')
var tools = require('../../utils/tools.js')
var fav = require('../../utils/favorite.js')
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    searchPanelShow: true,
    noResult: false,
    trendIncreaseCss: 'item-trend-green',
    trendDecreaseCss: 'item-trend-red',
  },

  onBindFocus: function() {
    this.setData({
      searchPanelShow: true,
      focus: true,
    })
  },

  onBindInput: function (e) {
    this.setData({
      keyword: e.detail.value
    })
  },

  onCancelImgTap: function() {
    this.setData({
      keyword: '',
      searchPanelShow: false,
      focus: false,
    })
  },

  redirectToDetail: function (res) {
    let currency_id = res.currentTarget.dataset.currencyid
    let market_id = res.currentTarget.dataset.marketid
    let symbol = res.currentTarget.dataset.symbol
    let market = res.currentTarget.dataset.market
    if (market == '综合') {
      market = ''
    }

    wx.navigateTo({
      url: 'currencydetail?currency_id=' + currency_id + '&market_id=' + market_id + '&symbol=' + symbol + '&market=' + market
    })
  },

  favorite: function (res) {
    let that = this
    let currencyData = this.data.currencyData
    let currency = currencyData[res.currentTarget.dataset.seq]

    if (currency.isFavorite) { // 取消关注
      fav.removeFavorite(currency.currencyId, currency.marketId, () => {
        currencyData[res.currentTarget.dataset.seq].isFavorite = !currencyData[res.currentTarget.dataset.seq].isFavorite
        that.setData({
          currencyData: currencyData
        })
      })
    }
    else { // 添加关注
      fav.addFavorite(currency.currencyId, currency.marketId, () => {
        currencyData[res.currentTarget.dataset.seq].isFavorite = !currencyData[res.currentTarget.dataset.seq].isFavorite
        that.setData({
          currencyData: currencyData
        })
      })
    }
  },

  search: function () {
    if (this.data.keyword.trim()) {
      let that = this
      let url = settings.filterUrl + '?keyword=' + this.data.keyword + '&page=1&size=1000'
      if (this.data.dataType == 'favorite') {
        url = url + '&need_favorite=1'
      }
      network.GET({
        url: url,
        success: function (res) {
          let currencyData = []
          let originData = res.data.data.list

          for (let i in originData) {
            if (!(originData[i].symbol.toUpperCase().indexOf('BTC') >= 0)) {
              let percentChange = 0
              if (originData[i].percent_change_display) {
                percentChange = parseFloat(originData[i].percent_change_display)
              }

              let marketShowName = originData[i].market_name ? originData[i].market_name : '--'
              if (originData[i].market_alias) {
                marketShowName = originData[i].market_alias
              }
              if (marketShowName == 'cmc') {
                marketShowName = '综合'
              }

              let currencyShowName = originData[i].alias ? originData[i].alias : originData[i].name
              if (marketShowName) {
                currencyShowName = marketShowName + ', ' + currencyShowName
              }

              let showVolume_prefix = '交易量(24h): '
              let showVolume = originData[i].volume_24h ? tools.friendlyNumberCn(originData[i].volume_24h) : '暂无数据'
              showVolume = showVolume_prefix + showVolume
              if (marketShowName == '综合') {
                let cap = originData[i].market_cap_usd ? tools.friendlyNumber(originData[i].market_cap_usd) : null
                if (cap) {
                  showVolume = '市值: $' + tools.friendlyNumberCn(cap)
                } else {
                  showVolume = '市值: 暂无数据'
                }
              }

              currencyData.push({
                index: i,
                currencyId: originData[i].currency_id,
                name: originData[i].name,
                symbol: originData[i].symbol,
                alias: originData[i].alias,
                showName: currencyShowName,
                showVolume: showVolume,
                rank: originData[i].rank ? originData[i].rank : '--',
                priceShow: originData[i].price_display,
                marketCap: originData[i].market_cap_usd ? tools.friendlyNumber(originData[i].market_cap_usd) : '--',
                volume_24h: originData[i].volume_usd_24h ? tools.friendlyNumberCn(originData[i].volume_usd_24h) : '暂无数据',
                percentChange: percentChange,
                marketId: originData[i].market_id ? originData[i].market_id : -1,
                marketShowName: marketShowName,
                isFavorite: originData[i].is_favorite ? originData[i].is_favorite : false,
                trendIncreaseCss: that.data.trendIncreaseCss,
                trendDecreaseCss: that.data.trendDecreaseCss,
              })
            }
          }

          that.setData({
            currencyData: currencyData,
            noResult: currencyData.length == 0
          })
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataType = 'list'
    let placeholderText = '输入币名搜索'

    if (options.type && options.type == 'favorite') {
      dataType = 'favorite'
      placeholderText = '输入币名添加自选'
    }

    wx.setNavigationBarTitle({
      title: dataType == 'favorite' ? '自选搜索' : '币行情搜索'
    })

    setTimeout(()=>{
      this.setData({
        dataType: dataType,
        placeholderText: placeholderText,
        searchPanelShow: true,
        focus: true,
      })
    },
    800)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

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
  
  }
})