/**
* @Author 陈建维
* 微信小程序WebSocket Json RPC请求封装
*/

var socketOpen = false;
var socketMsgQueue = [];
var jsonStreamQueue = [];
var id = 0;//请求id，用于识别每一次请求的callback
var wsCallbacks = {};//请求callbacks
var jsonStreamCallbacks = {};//json stream callbacks
var blackList = {};

var CLOSE_SOCKET_BY_CONTROL = 110; //onSocketClose方法中，此标记表示人工正常关闭Socket

/**
 * 连接WebSocket
 * @url WebSocket地址
 * @onSocketOpen WebSocket成功连接上回调
 * @onSocketError WebSocket连接失败回调
 * @onSocketClose WebSocket关闭回调
 * @broadcastDispatcher 服务器主动下发的通知消息回调
 */
function connect(url, onSocketOpen, onSocketError, onSocketClose, broadcastDispatcher) {
  wx.connectSocket({
    url: url,
    method: "GET"
  })

  /**
   * 网络状态改变的时候发起重新连接
   */
  wx.onNetworkStatusChange(function (res) {
    console.log('onNetworkStatusChange', res.isConnected)
    console.log('onNetworkStatusChange', res.networkType)
    if (res.isConnected){
      wx.connectSocket({
        url: url,
        method: "GET"
      })
    }
  });

  wx.onSocketClose(function (res) {
    console.log('WebSocket 已关闭！', res)
    socketOpen = false
    onSocketClose && onSocketClose(res);
    if (!res.reason || res.reason.indexOf('call') === -1) {
      console.log('异常关闭');
      //TODO: 重新连接
    } else {
      console.log('正常关闭');
    }
  })

  wx.onSocketError(function (res) {
    console.log('WebSocket连接打开失败，请检查！', res);
    socketOpen = false
    onSocketError && onSocketError(res);
  })

  //Socket打开的时候，发送缓存在队列中的消息
  wx.onSocketOpen(function (res) {
    console.log('WebSocket连接已打开！');
    socketOpen = true;
    //离线队列
    for (var i = 0; i < socketMsgQueue.length; i++) {
      // call(socketMsgQueue[i])
      let cacheData = socketMsgQueue[i];
      wx.sendSocketMessage({
        data: cacheData.data,
        success: function () {
          console.log('request', cacheData.data);
        },
        fail: function (err) {
          console.log('request -> fail' + ',' + cacheData.data, err);
          wsCallbacks[cacheData.id].errorCb && wsCallbacks[cacheData.id].errorCb(err);
        }
      })
    }
    socketMsgQueue = []
    onSocketOpen && onSocketOpen(res);
  })

  //收到消息后，根据请求id取出对应的callback进行回调
  wx.onSocketMessage(function (res) {
    // console.log('收到服务器内容：', res.data);
    let data = JSON.parse(res.data);
    if (!data)
      return;
    let receivedId = data.id;
    let jsonrpc = data.jsonrpc;
    let jsonstream = data.jsonstream;
    if (receivedId && jsonrpc && jsonrpc === '2.0') {
      if (data.result) {
        wsCallbacks[receivedId]
          && wsCallbacks[receivedId].successCb
          && wsCallbacks[receivedId].successCb(data.result);
      } else {
        wsCallbacks[receivedId]
          && wsCallbacks[receivedId].errorCb
          && wsCallbacks[receivedId].errorCb(data.error);
      }

      wsCallbacks[receivedId] = undefined; //回调完成后清空该字段，避免wsCallbacks越来越大

    } else if (jsonstream && jsonstream === '1.0') {
      jsonStreamHandler(data);
    } else {
      broadcastDispatcher && broadcastDispatcher(data);
    }
  })

}

function jsonStreamHandler(data) {
  let method = data.method;
  let id = data.id;

  if (!jsonStreamCallbacks[id]) {
    if (!blackList[id])
      jsonStreamQueue.push(data);
    return
  }

  let jsonstreamData = Object.assign({}, data.params, { document_id: data.document_id });

  if (method === 'begin') {
    jsonStreamCallbacks[id] && jsonStreamCallbacks[id].onBegin && jsonStreamCallbacks[id].onBegin(jsonstreamData);
  } else if (method === 'end') {
    jsonStreamCallbacks[id] && jsonStreamCallbacks[id].onEnd && jsonStreamCallbacks[id].onEnd(jsonstreamData);
  } else if (method === 'result') {
    jsonStreamCallbacks[id] && jsonStreamCallbacks[id].onResult && jsonStreamCallbacks[id].onResult(jsonstreamData);
  } else if (method === 'added') {
    jsonStreamCallbacks[id] && jsonStreamCallbacks[id].onAdd && jsonStreamCallbacks[id].onAdd(jsonstreamData);
  }


}

/**
 * 发起RPC调用
 * @method 方法名
 * @params 参数
 * @successCb 请求成功回调
 * @errorCb 请求失败回调
 * @jsonStreamCallback Json Stream回调接口对象，包含onBegin、onAdd、onEnd
 */
function call(method, params, successCb, errorCb) {
  id += 1;
  let request = {
    jsonrpc: "2.0",
    method: method,
    id: id,
    params: params
  }
  //根据id设置当前请求callback
  wsCallbacks[id] = { successCb: successCb, errorCb: errorCb };

  let requestJson = JSON.stringify(request);

  if (socketOpen) {
    wx.sendSocketMessage({
      data: requestJson,
      success: function () {
        console.log('request', requestJson);
      },
      fail: function (err) {
        console.log('request -> fail' + ',' + requestJson, err);
        errorCb && errorCb(err);
      }
    })
  } else {
    let cacheData = {
      data: requestJson,
      id: id,
    }
    socketMsgQueue.push(cacheData);
  }
}

/**
 * 订阅JsonStream监听
 * @streamId streamId
 * @onBegin onBegin
 * @onAdd onAdd
 * @onEnd onEnd
 */
function subscribeJsonStream(streamId, onBegin, onAdd, onEnd, onResult) {
  jsonStreamCallbacks[streamId] = { onBegin, onAdd, onEnd, onResult };
  for (var i = 0; i < jsonStreamQueue.length; i++) {
    let data = jsonStreamQueue[i];
    jsonStreamHandler(data);
  }
  jsonStreamQueue = [];
}

/**
 * 取消订阅JsonStream
 */
function unSubscribeJsonStream(streamId) {
  if (jsonStreamCallbacks[streamId])
    jsonStreamCallbacks[streamId] = undefined;
  blackList[streamId] = { black: true };
}

/**
 * 过滤Json特殊字符
 */
function jsonFilter(result) {
  for (let key in result) {
    if (result[key].abstract) {
      result[key].abstract = result[key].abstract.replace('\u2028', '')
      result[key].abstract = result[key].abstract.replace('\u2029', '')
    }
  }
  return result;
}

function isSocketOpen() {
  return socketOpen === true;
}

function closeSocket() {
  wx.closeSocket({
    code: 1000,
    reason: 'call',
  })
}

module.exports = {
  connect: connect,
  call: call,
  jsonFilter: jsonFilter,
  subscribeJsonStream: subscribeJsonStream,
  unSubscribeJsonStream: unSubscribeJsonStream,
  isSocketOpen: isSocketOpen,
  closeSocket: closeSocket,
}

