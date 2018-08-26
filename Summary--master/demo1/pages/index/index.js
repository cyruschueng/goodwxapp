let sim = require('../../static/js/sim.js/index')

Page({
    data:{},
    onShareAppMessage() {
      return {
        title: '小程序demo集合',
        path: '/pages/index/index',
        success(res) {
          console.log("shareTicket",res.shareTickets[0])
        }
      }
    },
    onLoad() {
      wx.showShareMenu({
        withShareTicket: true //要求小程序返回分享目标信息
      })

      console.log(sim.version)
      sim.get(`/hi`,r => {
        console.log(r.data)
      })

    }
})
