var app = getApp()
var util = require('../../util/util.js')
var WxSearch = require('../../wxSearch/wxSearch.js')

const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow_cancelImg: false,
    bookListSize: 0,
    bookList: [],
    isShow_bookshelf: false,
    isShow_nothing: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('search')

    var that = this
    // 初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['人工智能', '诗', 'nodejs', '未来简史', '小程序', 'Google', 'HTML5', '极简宇宙史']);
    // 支持搜索建议
    // WxSearch.initMindKeys(['人工智能', 'weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
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

  },

  /**
   * 根据关键字查询藏书（书名）
   */
  doSearch: function (e) {
    var that = this
    
    that.setData({
      isShow_cancelImg: true
    })

    WxSearch.wxSearchHiddenPancel(that);
    wx.request({
      url: config.searchUrl,
      data: {
        searchInfo: that.data.wxSearchData.value,
        openid: app.globalData.openid
      },
      method: 'POST',
      success: function (res) {
        var bookListSize = 0
        for(var index in res.data) {
          bookListSize++
        }

        if (bookListSize > 0) {
          that.setData({
            bookListSize: bookListSize,
            bookList: res.data,
            isShow_bookshelf: true
          })
        } else {
          that.setData({
            isShow_nothing: true
          })
        }
      }
    })
  },

  // the functions of wxSearch
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);

    if (that.data.wxSearchData.value != '') {
      that.doSearch(e)
    }
  },
  wxSearchInput: function (e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
    if (that.data.wxSearchData.value != '') {
      that.doSearch(e)
    } else {
      that.setData({
        isShow_cancelImg: false,
        isShow_bookshelf: false,
        isShow_nothing: false
      })
    }
  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
    that.doSearch(e)
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  wxSearchClearInput: function (e) {
    var that = this
    WxSearch.wxSearchClearInput(that)
    that.setData({
      isShow_cancelImg: false,
      isShow_bookshelf: false,
      isShow_nothing: false
    })
  }
})