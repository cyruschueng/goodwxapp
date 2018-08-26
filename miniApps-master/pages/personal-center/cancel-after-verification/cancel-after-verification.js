Page({
  data: {
    qrCodeUrl: ''
  },
  onLoad: function (options) {
    this.setData({
      qrCodeUrl: 'https://www.hbxq001.cn/m/hx?qrCode=' + options.qrCode + '&userId=' + options.userId
    });
  },
  bindGetMsg: function (e) {
    console.log(e,e.detail)
    console.log("接收消息成功")
    wx.switchTab({
      url: 'pages/index/index'
    })
  },
})