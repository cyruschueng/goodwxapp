//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    num: 0,
    count: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      }),
      count: (wx.getStorageSync('count') || []).map(count => {
        return num++
      })
    })
  },
  // onShareAppMessage: function () {
  //   return: {
  //     // title: 'defined title',
  //     // path: '/page/user?id=123'
  //   }
  // }
})
