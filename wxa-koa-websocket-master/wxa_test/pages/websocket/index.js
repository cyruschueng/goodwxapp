//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function() {
    let me = this;
    let app = getApp();

    if (!app.socketOpen) {
      me.connectSocket(me);
    }
    // 监听socket 错误
    wx.onSocketError(function(res) {
      app.socket = false;
      console.log("WebSocket连接打开失败，请检查！");
      setTimeout(() => {
        me.connectSocket(me);
      }, 500);
    });
    // 监听socket 关闭
    wx.onSocketClose(() => {
      app.socket = false;
      console.log("websoketl链接关闭 重新链接");
      setTimeout(() => {
        me.connectSocket(me);
      }, 500);
    });
    me.SocketMessage(me);
  },
  openSocket(me) {
    // 2、打开socket
    wx.onSocketOpen(function(res) {
      console.log("链接成功");
      app.socketOpen = true;
      me.SocketMessage(me);
    });
  },
  connectSocket(me) {
    me = me || this;
    // 1、链接 socket
    let token = wx.getStorageSync("token");
    let userId = wx.getStorageSync("userId");
    wx.connectSocket({
      url: app.wsUrl,
      header: {
        "content-type": "application/json"
      },
      method: "GET",
      success: e => {
        if (e.errMsg == "connectSocket:ok") {
          me.openSocket(me);
        }
      }
    });
  },
  SocketMessage(me) {
    wx.onSocketMessage(function(res) {
      let xhr = res.data;
      console.log("xhr", xhr);
      xhr = JSON.parse(xhr);
      let type = xhr.type;
      let user_id = xhr.user_id;
      let arr = xhr.data;
      let userId = wx.getStorageSync("userId");

      if (user_id != userId) {
        return;
      }
      if (type == "newServe") {
        // 添加服务
        me.formatData(arr, me);
      }
      wx.vibrateLong(); // 添加振动
    });
  },
  sendmsg() {
    wx.sendSocketMessage({
      data: JSON.stringify({
        id: 12
      }),
      success(res) {
        console.log("res", res);
        console.log("消息读取");
      }
    });
  }
});
