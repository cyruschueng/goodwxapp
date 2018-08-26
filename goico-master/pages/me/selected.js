// pages/me/selected.js
var tools = require('../../utils/tools.js')
var network = require('../../utils/network.js')
var settings = require('../../secret/settings.js')
var fav = require('../../utils/favorite.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    changed: false,
  },

  loadData: function () { // 重新加在本地数据
    let that = this
    network.GET({
      url: settings.favoriteListUrl,
      success: function(res) {
        let favlist = []
        for (let i in res.data.data.list) {
          let fav = res.data.data.list[i]

          if (fav.symbol.toUpperCase().indexOf('BTC') < 0) {
            let marketShowName = ''
            if (fav.market_name != 'cmc') {
              marketShowName = fav.market_alias ? fav.market_alias : fav.market_name 
            }
            else {
              marketShowName = '综合'
            }
            
            let showName = fav.alias ? fav.alias : fav.name
            if (marketShowName) {
              showName = marketShowName + ', ' + showName
            }

            let currency = {
              currencyId: fav.currency_id,
              currencyName: fav.currency_name,
              currencyAlias: fav.currency_alias,
              marketId: fav.market_id,
              marketName: fav.market_name,
              marketAlias: fav.market_alias,
              symbol: fav.symbol,
              seq: i,
              showName: showName,
              isFavorite: true,
            }

            favlist.push(currency)
          }
        }

        that.setData({
          favlist: favlist,
        })
      },
    })
  },

  goSearch: function() {
    wx.navigateTo({
      url: '/pages/market/search?type=favorite',
    })
  },

  favorite: function (e) {
    let that = this
    let favlist = this.data.favlist
    let favItem = favlist[e.currentTarget.dataset.seq]

    let currencyId = e.currentTarget.dataset.currencyid
    let marketId = e.currentTarget.dataset.marketid

    if (favItem.isFavorite) { // 取消关注
      fav.removeFavorite(currencyId, marketId, function() {
        favItem.isFavorite = !favItem.isFavorite
        favlist[e.currentTarget.dataset.seq] = favItem
        that.setData({
          favlist: favlist
        })
      })
    }
    else {  // 添加关注
      fav.addFavorite(currencyId, marketId, function () {
        favItem.isFavorite = !favItem.isFavorite
        favlist[e.currentTarget.dataset.seq] = favItem
        that.setData({
          favlist: favlist
        })
      })
    }
  },

  redirectToDetail: function (res) {
    let symbol = res.currentTarget.dataset.symbol
    wx.navigateTo({
      url: '/pages/market/currencydetail?symbol=' + symbol
    })
  },

  upSymbol: function (res) {
    let seq = parseInt(res.currentTarget.dataset.seq)
    let that = this

    this.setData({
      favlist: tools.swapItems(that.data.favlist, seq, seq - 1),
      changed: true,
    })
  },

  downSymbol: function (res) {
    let seq = parseInt(res.currentTarget.dataset.seq)
    let that = this

    this.setData({
      favlist: tools.swapItems(that.data.favlist, seq, seq + 1),
      changed: true,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.changed) {
      let origin_favlist = this.data.favlist
      let favlist = []
      for (let i in origin_favlist) {
        let item = {
          currency_id: origin_favlist[i].currencyId,
          market_id: origin_favlist[i].marketId,
        }

        favlist.push(item)
      }

      fav.syncFavoriteList({ favorite_list: JSON.stringify(favlist) }, function (res) {
        this.setData({
          changed: false
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.changed) {
      let that = this
      let origin_favlist = this.data.favlist
      let favlist = []
      for (let i in origin_favlist) {
        let item = {
          currency_id: origin_favlist[i].currencyId,
          market_id: origin_favlist[i].marketId,
        }

        favlist.push(item)
      }

      fav.syncFavoriteList({ favorite_list: JSON.stringify(favlist)}, function (res) {
         that.setData({
           changed: false
         })
      })
    }
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