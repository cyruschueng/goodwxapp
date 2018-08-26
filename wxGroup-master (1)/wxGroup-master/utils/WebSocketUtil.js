var User = require('UserManager.js');
var isConnected = false;
var url;
var heartCheck = {
  timeout: 20000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    this.start();
  },
  start: function () {
    var self = this;
    this.timeoutObj = setTimeout(function () {
      var sendData = {
        time: new Date().getTime(),
        isHeartBeat: true,
        uid: User.Singleton.getInstance().getUid(),
        message: null
      };
      wx.sendSocketMessage({
        data: JSON.stringify(sendData),
      })
      self.serverTimeoutObj = setTimeout(function () {
        wx.closeSocket()
      }
        , self.timeout)
    }
      , self.timeout)
  }
}
var reconnecting = false;
var openConnect = function (params) {
  url = params.url;
  wx.connectSocket({
    url: url,
  })
  wx.onSocketOpen(function () {
    reconnecting = false;
    isConnected = true;
    heartCheck.start()
    if (params && params.onSocketOpen && typeof params.onSocketOpen == 'function') {
      params.onSocketOpen()
    }
  })
  wx.onSocketMessage(function (res) {
    heartCheck.reset()
    var data = res.data;
    data = JSON.parse(data);
    console.log(data)
    if (data && !data.isHeartBeat) {
      if (params && params.onMessage && typeof params.onMessage == 'function') {
        params.onMessage(data.data)
      }
    }
  })
  wx.onSocketClose(function () {
    console.log('close')
    if (params && params.onSocketClose && typeof params.onSocketClose == 'function') {
      params.onSocketClose()
    }
    setTimeout(reconnect, heartCheck.timeout)
  })
  wx.onSocketError(function (error) {
    console.log(error)
    if (params && params.onSocketError && typeof params.onSocketError == 'function') {
      params.onSocketError()
    }
    setTimeout(reconnect, heartCheck.timeout)
    //reconnect(params.url)
  })
}

var sendMsg = function (msg) {
  if (isConnected) {
    var sendData = {
      time: new Date().getTime(),
      isHeartBeat: false,
      uid: User.Singleton.getInstance().getUid(),
      message: msg
    };
    wx.sendSocketMessage({ data: JSON.stringify(sendData) })
  }
}
var reconnect = function () {
  if (!reconnecting) {
    reconnecting = true;
    wx.connectSocket({
      url: url,
      complete: function () {
        reconnecting = false;
      }
    })
  }
}

module.exports = {
  openConnect: openConnect,
  sendMsg: sendMsg
}