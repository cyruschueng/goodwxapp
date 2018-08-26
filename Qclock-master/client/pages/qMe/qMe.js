var skin = require('skin')
var tools = require('../../utils/tools.js')

Page({
  data: {
    userInfo: null,
    list: [
      {
        name: '我发出的',
        image: 'send',
        id: '1'
      },
      {
        name: '我收到的',
        image: 'receive',
        id: '2'
      },
      {
        name: '意见反馈',
        image: 'back',
        id: '3'
      },
      {
        name: '关于我们',
        image: 'about',
        id: '4'
      }
    ],
    skin: skin.skin
  },
  onLoad: function (cb) {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userInfo: res.data
        })
      },
    })
  },
  onShow: function () {

  },
  selectNav: function (e) {
    if (e.currentTarget.dataset.num == '1') {
      wx.navigateTo({
        url: '../clockList/clockList?enterType=0',
      })
    } else if (e.currentTarget.dataset.num == '2') {
      wx.navigateTo({
        url: '../clockList/clockList?enterType=1',
      })
    } else if (e.currentTarget.dataset.num == '3') {
      wx.navigateTo({
        url: '../feedback/feedback',
      })
    } else if (e.currentTarget.dataset.num == '4') {
      wx.navigateTo({
        url: '../about/about',
      })
    }
  },
  viewGridDetail: function (e) {
    var data = e.currentTarget.dataset

  }
})