//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navActiveFirst: true, // 默认显示第一个nav
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sendNum: 0, // 发出的红包数
    sendMoney: 0.00, // 发出的金额
    sendList: [],
    receiveNum: 0, // 收到的红包数
    receiveMoney: 0.00, // 收到的金额
    receiveList: []
  },
  changeTab: function () { // 切换nav
    var _self = this;
    _self.setData({
      navActiveFirst: !_self.data.navActiveFirst,
    })
  },
  onLoad: function () {
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
    this.querySendList();
    this.queryGetList();

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  querySendList: function () {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket/my_send?jsessionid=' + sessionid,
      success: res => {
        if (res.data.status != 0) {
          return;
        }
        var data = res.data.data;
        if (data.redpacket_list.length == 0) {
          return;
        }
        this.setData({
          sendNum: data.redpacket_total,
          sendMoney: data.amount_total,
          sendList: data.redpacket_list
        });
      }
    })
  },

  queryGetList: function () {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket/my_get?jsessionid=' + sessionid,
      success: res => {
        if (res.data.status != 0) {
          return;
        }
        var data = res.data.data;
        if (data.redpacket_list.length == 0) {
          return;
        }
        this.setData({
          receiveNum: data.redpacket_total,
          receiveMoney: data.amount_total,
          receiveList: data.redpacket_list
        });
      }
    })
  },
  packetDetail: function (e) {
    console.log(JSON.stringify(e));
    var packetId = e.currentTarget.dataset.key;
    var type = e.currentTarget.dataset.type;
    var url = '../share/index/index?packetId=' + packetId + "&type=" + type;
    if (type == 3) {
      url = '../share/praise/praise?packetId=' + packetId + "&type=" + type;
    }

    wx.navigateTo({
      url: url
    })
  },
})
