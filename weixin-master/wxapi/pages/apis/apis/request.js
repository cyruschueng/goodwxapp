/**
 * API - 发起请求
 * 
 * wx.request(OBJECT)
 * 
 * Tip: 
 *  1. method 的值必须为大写
 *  2. url 中不能包含端口号
 *  3. request 默认超时和最大超时时间都是60s
 *  4. request 最大并发数为：5
 *  5. referer 不可设置，格式固定为：https://servicewechat.com/{appid}/{version}/page-frame.html
 * 
 */

function start(opts) {
  const _opts = {
    url: 'String, required, 开发者服务器接口地址',
    data: '[Object, String], 请求的参数',
    header: 'Object, 设置请求的头部信息，但不能设置Referer',
    method: 'String, 默认为GET，有效值：[OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT]',
    dataType: 'String, 默认为json, 如果设置了为json，则会尝试对响应的数据做一次JSON.parse',
    success: function (res) {
      // 'Function, 请求成功的回调， res = {data: "......"}'

      // [Object, String, ArrayBuffer]
      console.log('/request/start/success/data', res.data)
      // Number, HTTP状态码
      console.log('/request/start/success/statusCode', res.statusCode)
      // Object, HTTP Response Header
      console.log('/request/start/success/header', res.header)
    },
    fail: 'Function, 失败回调',
    complete: 'Function'
  }

  const requestTask = wx.request(opts || _opts)

  return requestTask
}

const task = {
  abort: function () {
    console.log('/request/task/abort')
  }
}

module.exports = {
  start
}