const app = getApp()

Page({
  data: {
    active: false,
    orderinfo: {},
    ticketData: [],
  },
  // downloadTicket: function (e) {
  //   wx.downloadFile({
  //     url: e.currentTarget.id,
  //     success: function (res) {
  //       wx.saveFile({
  //         tempFilePath: res.tempFilePath,
  //         success: function (res) {
  //           wx.showToast({
  //             title: '保存成功',
  //           })
  //         },
  //       })
  //     }
  //   })
  // },
  backtohome: function () {
    wx.switchTab({
      url: '../experience/experience',
    })
  },
  ScreenImg: function (e) {
    var imgUrl = e.currentTarget.dataset.imgurl;
    var imgs = [];
    imgs.push(imgUrl);
    wx.previewImage({
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  openFile: function (e) {
    wx.downloadFile({
      url: e.currentTarget.id,
      success: function (res) {
        var filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('open doc success')
          }
        })
      }
    })
  },
  orderpage: function () {
    wx.navigateTo({
      url: '../myself/myOrder',
    })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '乐游欧洲Go',
    })
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/order/tickets',
      header: { memberId: wx.getStorageSync('memberid'), token: wx.getStorageSync('token') },
      data: { orderId: options.orderId },
      success: function (res) {
        //console.log(res.data.result)
        self.setData({
          ticketData: res.data.result,
        })
      }
    })
    wx.request({
      url: app.globalData.apiURL + '/order/info',
      header: { memberId: wx.getStorageSync('memberid'), token: wx.getStorageSync('token') },
      data: { orderId: options.orderId },
      success: function (res) {
        //console.log(res.data.result)
        self.setData({
          orderinfo: res.data.result
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
  }
})
