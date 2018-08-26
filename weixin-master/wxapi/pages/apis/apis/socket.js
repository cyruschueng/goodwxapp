/**
 * API -- WebSocket
 * 
 * 1. wx.connnectSocket(object)
 */

// wx.connectSocket(object)
function connect(opts) {
  var _opts = {
    url: 'String, required, 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名',
    data: 'Object, 请求的数据',
    header: 'Object',
    method: 'String',
    protocols: 'StringArray, 子协议数组， 1.4.0',
    success: 'Function',
    fail: 'Function',
    complete: 'Function'
  }

  var socketTask = wx.connectSocket(/* options */)

  return socketTask
}

// wx.sendSocketMessage(object)
function send(opts) {
  var _opts = {
    data: '[String, ArrayBuffer], required, 需要发送的内容',
    success: 'Function',
    fail: 'Function',
    complete: 'Function'
  }

  wx.sendSocketMessage(/* options */)
}

// wx.closeSocket(object)
function close(opts) {
  var _opts = {
    code: 'Number, 默认：1000(表示正常连接关闭)',
    reason: 'String, 内容为小于等于123字节的UTF-8的文本',
    success: 'Function',
    fail: 'Function',
    complete: 'Function'
  }
}

// websocket 相关事件
var on = {
  open: function (opts) {
    wx.onSocketOpen(res => {
      console.log('/socket/on/open/', res)
    })
  },

  error: function (opts) {
    wx.onSocketError(res => {
      console.log('/socket/on/error', res)
    })
  },

  message: function (opts) {
    wx.onSocketMessage(res => {
      console.log('/socket/on/message', res.data)
    })
  },

  close: function (opts) {
    wx.onSocketClose(res => {
      console.log('/socket/on/close', res)
    })
  }
}

// SocketTask 对象，由 wx.connectSocket() 返回
var task = {
  /**
   * SocketTask.send({
   *  data: '[String, ArrayBuffer], required',
   *  success: 'Function',
   *  fail: 'Function',
   *  complete: 'Function'
   * })
   */
  send: 'Function, 通过WebSocket连接发送数据',
  /**
   * SocketTask.close({
   *  code: 'Number, 默认值：1000',
   *  reason: 'String, <= 123btyes的utf8文本',
   *  success: 'Function',
   *  fail: 'Function',
   *  complete: 'Function'
   * })
   */
  close: 'Function, 关闭WebSocket连接',

  on: {
    open: function (opts) {
      SocketTask.onOpen(res => {
        console.log('/socket/task/on/open', res)
      })
    },

    close: function (opts) {
      SocketTask.onClose(res => {
        console.log('/socket/task/on/close', res)
      })
    },

    error: function (opts) {
      SocketTask.onError(res => {
        console.log('/socket/task/on/error', res)
      })
    },

    message: function (opts) {
      SocketTask.onMessage(res => {
        console.log('/socket/task/on/message', res)
      })
    }
  }
}


module.exports = {
  connect,
  send,
  on
}