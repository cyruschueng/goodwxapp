//index.js
//获取应用实例
const app = getApp()
const recorderManager = wx.getRecorderManager()

var that;
var start = new Date().getTime();

recorderManager.onStart(() => {
  console.log('recorder start')
  app.showMsg("正在录音中");
  start = new Date().getTime();
  that.setData({
    btnActived: true
  })

})
recorderManager.onResume(() => {
  console.log('recorder resume')
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onStop((res) => {
  recorderManager.stop();
  var end = new Date().getTime();
  that.setData({
    btnActived: false
  })


  if (end - start < 2000) {
    app.showMsg("录音太短了");
    return;
  }
  app.showMsg("正在上传语音");
  var sessionid = app.globalData.jsessionid;
  var pages = getCurrentPages();
  var curPage = pages[pages.length - 1];
  wx.uploadFile({
    url: app.globalData.baseUrl + '/p1/redpacket_praise/grabbing?jsessionid=' + sessionid,
    method: 'POST',
    filePath: res.tempFilePath,
    name: 'file',
    header: {
      Accept: 'application/json'
    },
    formData: {
      "redpacket_id": curPage.data.packetId,
    },
    success: result => {
      console.log(JSON.stringify(result));
      var res = JSON.parse(result.data);

      if (res.status == 0) {
        app.showMsg("恭喜领取成功");
        that.setData({
          status: 3,
          amount: res.data.money
        });
      } else {
        app.showMsg(res.error);
      }
      curPage.getPacketDetail(curPage.data.packetId, 3);
    }
  })
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})


const options = {
  duration: 20000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3',
  frameSize: 50
}


Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    packet: {},
    status: 0,
    packetId: null,
    packetType: null,
    btnActived: false
  },
  onLoad: function (option) {
    that = this;
    var packetId = option.packetId;
    var type = option.type;
    if (option.scene) {
      packetId = decodeURIComponent(option.scene);
      type = 3;
    }

    this.setData({
      packetId: packetId,
      packetType: type,
    });



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

  onHide: function () {
    clearInterval(this.data.intervalId);
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
        } else {
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
      }
    })
  },
  toShare: function () {
    wx.navigateTo({
      url: '/pages/praise/share/share?packetId=' + this.data.packetId + "&type=" + this.data.packetType,
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
  },
  startSay: function () {
    recorderManager.start(options);
  },
  stopSay: function () {
    recorderManager.stop();
  },
})
