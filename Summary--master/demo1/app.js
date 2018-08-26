let sim = require('./static/js/sim.js/index')
let session = require('./static/js/sim.js/lib/session')

App({
  onLaunch(options) {
    console.log("options.scene", options.scene)
    if (options.scene == 1044) {
      console.log("shareTicket",options.shareTicket)
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        complete(res) {
          console.log(res)
          console.log(res.encryptedData)
          console.log(res.iv)

        }
      })
    }

    this.testWss()
    sim.setLoginUrl(`${sim.server}/weapp/login`)
    sim.login({
        success:(user)=>{
            // session.get().my = session.get().userInfo;
            console.log("my",session.get().my);
        }
    })
  },
  testWss(){
    wx.connectSocket({
      url: 'wss://www.rixingyike.com:8000/'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketOpen(function (res) {
      wx.sendSocketMessage({
        data: "weapp message"
      })
    })
    wx.onSocketMessage(function (res) {
      console.log('小程序收到服务器消息：' + res.data)
    })
  }
})