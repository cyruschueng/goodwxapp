//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()

Page({
  data: {
    hid: "",
    items: [],
    items1: [],
    sendMoney: '',
    sendCount: '',
    receivedMoney: '',
    receivedCount: '',
    showView: false,
    showView1: true,
    addClass: true,
    addClass1: false,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  globalData: {
    hid: "",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //点击跳转到语音收红包
  gotorecerveDetails: function (e) {
    var create = e.currentTarget.dataset.create
    //格式转换
    var create = Date.parse(create);
    create = create / 1000;
    console.log("发红包时间戳：" + create);
    console.log(e.currentTarget.dataset.create)
    var time = util.formatTime(new Date());
    var time = Date.parse(new Date());
    time = time / 1000;
    console.log("当前时间戳为：" + time);
    console.log(time)
    if ((time - create) > 86400) {
      wx.request({
        url: 'https://www.mqtp8.cn/applet/pay/back',
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        data: {//这里写你要请求的参数
          hid: e.target.id
        },
      })
    }
    var that = this;
    var hid = e.target.id
    // getApp().globalData.id = e.target.id,
    //   console.log(getApp().globalData.id);
    wx.navigateTo({
      url: '../receiveDetails/receiveDetails?hid=' + hid + '&openid=' + getApp().globalData.openId
    })
  },
  receiveDetails: function (e) {
    var that = this;
    var hid = e.currentTarget.dataset.hid
    getApp().globalData.hid = e.currentTarget.dataset.hid,
      wx.navigateTo({
      url: '../receiveDetails/receiveDetails?hid=' + hid + '&openid=' + getApp().globalData.openId
      })
  },
  onLoad: function () {
    var that = this;
    this.setData({
      name: app.globalData.nickName,
      imgUrl: app.globalData.avatarUrl,
    });

    //请求我的记录发出的接口数据
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/pay/pay', //发出去的接口
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openId: getApp().globalData.openId,
      },
      success: function (res) {
        // var money= res.data[0].money;
        // var num= res.data[0].num;
        that.setData({
          sendMoney: res.data.my.money,
          sendCount: res.data.my.num,
          items: res.data.da,
        })
        console.log(res.data);
      },
    })
    //请求我的记录收到的接口数据
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/pay/record', //收到的接口
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openId: getApp().globalData.openId,
      },
      success: function (res) {
        var res = res;
        // var money = res.data[0].money;
        // var num = res.data[0].num;
        that.setData({
          receivedMoney: res.data.my.money,
          receivedCount: res.data.my.num,
          items1: res.data.da,
        })
        console.log(res.data);
      },
    })

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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //点击切换类
  header_left: function () {
    var that = this;
    that.setData({
      addClass: true,
      addClass1: false,
      showView: false,
      showView1: true,
    })
  },
  header_right: function () {
    var that = this;
    that.setData({
      addClass1: true,
      addClass: false,
      showView: true,
      showView1: false,
    })
  },
onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  }
})


