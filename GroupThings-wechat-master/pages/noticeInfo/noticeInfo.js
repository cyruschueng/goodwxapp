const app=getApp();
const utils = require('../../utils/util');
const basePath = app.globalData.basePath;
const imgPath = app.globalData.imgPath;
Page({
  data: {
    isShare:'',
    infoId:'',
    infoData:{},
    viewers:''
  },
  onLoad: function (options) {
    const _id=options.id;
    const page=this;
    const info_URL = basePath +'look/notice';
    console.log(options)
    this.setData({
      infoId:options.id
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    app.checkInfo(function () {
      try {
        var wxBizKey = wx.getStorageSync('wxBizKey');
        utils.getInfo(page, info_URL, _id, wxBizKey)
        if (wx.getStorageSync('isShare')) {
          let shareTicket = wx.getStorageSync('shareTicket')
          app.getShareInfo(wxBizKey, shareTicket)
        }
      }
      catch (e) {
      }
    })
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '群通知',
    })
  },
  openLocation(){
    let page=this;
    let address = page.data.infoData.address
    wx.openLocation({
      name: address.name,
      latitude: address.latitude,
      longitude: address.longitude,
      scale: 28
    })
  },
  toPublicHandle: function (e) {
    utils.toAddHandle(e)
  },
  onShareAppMessage: function () {
    let _id = this.data.infoId;
    return {
      title: '群里有事',
      path: '/page/user?id=' + _id + '',
      success: function (res) {
        var shareTickets = res.shareTickets;
        console.log(res)
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
        console.log(res)
      }
    }
  }
})
