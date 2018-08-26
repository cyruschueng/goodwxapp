// test.js
var util = require('../../utils/util.js')

Page({
  data: {

  },

  bindKeyInput: function (e) {
    this.setData({
      text: e.detail.value
    })
  },

  tap2Extras: function (e) {
    wx.navigateTo({
      url: 'extras/extras',
    })
  },

  tap2Picker: function (e) {
    wx.navigateTo({
      url: 'picker/picker',
    })
  },

  tap2Media: function (e) {
    wx.navigateTo({
      url: 'media/media',
    })
  },

  tap2Map: function (e) {
    wx.navigateTo({
      url: 'map/map',
    })
  },

  tap2Canvas: function (e) {
    wx.navigateTo({
      url: 'canvas/canvas',
    })
  },

  tap2NetWork: function(e){
    wx.navigateTo({
      url: 'NetWork/network',
    })
  }
})