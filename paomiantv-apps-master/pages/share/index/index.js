//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    packet: {},
    status: 0,
    packetId: null,
    packetType: null,
    videoctx: null,
  },
  onLoad: function (option) {

    var packetId = option.packetId;
    var type = option.type;
    if (option.scene) {
      packetId = decodeURIComponent(option.scene);
      type = 1;
    }
    this.setData({
      packetId: packetId,
      packetType: type,
    });

    wx.showLoading({
      title: '初始化中...',
      mask: true
    })
    var reqCounter = 0;
    var interval = setInterval(func => {
      reqCounter++;
      if (app.globalData.jsessionid) {
        this.getPacketDetail(packetId, type);
        this.isGrab(packetId);
        wx.hideLoading()
        clearInterval(interval);
      } else {
        if (reqCounter > 100) {
          clearInterval(interval);
          wx.navigateBack({
            delta: 0
          });
        }
      }
    }, 300);
    this.setData({
      intervalId: interval
    })
  },

  onReady: function () {
    const videoctx = wx.createVideoContext('myVideo', this);
    this.setData({
      videoctx: videoctx
    })
  },

  onShow: function () {
    if (this.data.videoctx) {
      this.data.videoctx.play();
    }
  },
  onHide: function () {
    clearInterval(this.data.intervalId);
    this.data.videoctx.pause();
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

  isGrab: function (packetId) {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket/is_grab?jsessionid=' + sessionid,
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        redpacket_id: packetId,
      },
      success: result => {
        console.log(JSON.stringify(result.data));
        if (!result.data) {
          return;
        }
        if (result.data.status == 0) {
          this.setData({
            status: 2
          })
        }
        if (result.data.status == 80002) {
          this.setData({
            status: 1
          })
        } else if (result.data.status == 80003) {
          this.setData({
            status: 2
          })
        } else if (result.data.status == 80004) {
          this.setData({
            status: 4
          })
        } else if (result.data.status == 80005) {
          this.setData({
            status: 3,
            amount: result.data.data.redpacket_amount
          })
        }
      }
    })
  },

  grabbing: function () {
    var sessionid = app.globalData.jsessionid;
    var packetId = this.data.packetId;
    var packetType = this.data.packetType;
    var path = '/p1/redpacket_video/grabbing';
    // if (packetType == 2) {
    //   path = '/p1/redpacket_praise/grabbing';
    // }
    wx.request({
      url: app.globalData.baseUrl + path + '?jsessionid=' + sessionid,
      method: 'POST',
      header: {
        //'content-type': 'application/json' // 默认值
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        redpacket_id: packetId,
      },
      success: result => {
        console.log(JSON.stringify(result.data));
        if (!result.data) {
          return;
        }

        if (result.data.status == 0) {
          app.showMsg("恭喜领取成功");
          this.setData({
            status: 3,
            amount: result.data.data.money
          })
        } else {
          app.showMsg(result.data.error);
          if (result.data.status == 80005) {
            this.setData({
              status: 3,
              amount: result.data.data.redpacket_amount
            })
          } else if (result.data.status == 80002) {
            this.setData({
              status: 1
            })
          } else if (result.data.status == 0) {
            this.setData({
              status: 2
            })
          }
        }
        this.getPacketDetail(packetId, packetType);
      }
    });


  },

  toShare: function () {
    wx.navigateTo({
      url: '/pages/index/share/share?packetId=' + this.data.packetId + "&type=" + this.data.packetType,
    })
  },
  toMoney: function () {
    wx.navigateTo({
      url: '/pages/money/money',
    })
  },
  toIndex: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})
