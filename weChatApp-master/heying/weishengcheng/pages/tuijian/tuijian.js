var app = getApp();
var api = require('../../api.js')
var config = require('../../utils/config.js')
var util = require('../../utils/util.js')

Page({
  data: {
  },
    swipeUrl:function (e) {
        if(e.target.dataset.appid){
          wx.navigateToMiniProgram({
            appId: e.target.dataset.appid,
            path:e.target.dataset.url
          })
        }else {
          wx.navigateTo({
            url: e.target.dataset.url
          })
        }
    },
  tiaozhuan:function (e) {
    if(wx.navigateToMiniProgram){
      wx.navigateToMiniProgram({
        appId: e.currentTarget.dataset.appid
      })
    }else{
      util.previewSingalPic(e.currentTarget.dataset.preview)
    }
  },
    initPage:function () {
        var that = this
        wx.showNavigationBarLoading();

        wx.showToast({
          title: 'Loading……',
          duration:2000,
          icon: 'loading'
        })

        api.init(function(res) {
          that.setData({
            tuijian:res
          })
          wx.hideToast()
          wx.hideNavigationBarLoading();
        },function(re){
          wx.hideToast()
          wx.hideNavigationBarLoading();
        });
    },
  onShow:function () {
  },
  onLoad: function (options) {
      this.initPage();
  }
})
