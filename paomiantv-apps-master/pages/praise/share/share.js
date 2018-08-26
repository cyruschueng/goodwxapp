//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    width: 0,
    height: 0,
    qrcodeUrl: null,
    packet: {},
    circleBtnDisabled: true
  },
  onLoad: function (option) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      //获取系统信息成功，将系统窗口的宽高赋给页面的宽高
      success: res => {
        console.log("res=" + JSON.stringify(res));
        var n = 750 / res.windowWidth;
        var contentHeight = res.windowHeight - 400 / n;
        this.setData({
          width: res.windowWidth,
          height: contentHeight
        })
      }
    })

    wx.showShareMenu({
      withShareTicket: true
    })

    var packetId = option.packetId;
    var packetType = option.type;
    this.setData({
      packetId: packetId,
      packetType: packetType
    })

    this.getPacketDetail(packetId, packetType);
    this.getQR(packetId);
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    //TODO
    return {
      title: '你有个红包等待领取',
      path: '/pages/share/praise/praise?packetId=' + this.data.packetId + "&type=" + this.data.packetType,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  getUserInfo: function (e) { // 获取用户信息
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPacketDetail: function (packetId, type) {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket/detail?jsessionid=' + sessionid,
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        redpacket_id: packetId,
        redpacket_type: type
      },
      success: result => {
        console.log(JSON.stringify(result.data));
        if (result.data && result.data.status == 0) {
          this.setData({
            packet: result.data.data
          })
        }
      }
    })
  },


  getQR: function (packetId) {

    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket/qrcode?jsessionid=' + sessionid,
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        redpacket_id: packetId
      },
      success: result => {
        console.log(JSON.stringify(result.data));
        if (result.data && result.data.status == 0) {
          this.setData({
            qrcodeUrl: result.data.data.qrcode_url,
            circleBtnDisabled: false
          })

        }
      }
    })
  },

  saveScreen: function () {
    wx.navigateTo({
      url: '../circlepic/index?qrUrl=' + this.data.qrcodeUrl + "&packetTitle=" + this.data.packet.redpacket_title + "&avatarUrl=" + this.data.packet.avatar + "&nickName=" + this.data.packet.nickname
    })
  },
})
