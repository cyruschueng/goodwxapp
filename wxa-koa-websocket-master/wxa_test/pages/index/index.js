//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index?id=123',
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success:function(res){
            console.log('res',res);
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  zhiwen(){
    console.log('---')
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
        console.log(res)
        console.log('指纹解锁成功了')
      }
    })
  }
})
