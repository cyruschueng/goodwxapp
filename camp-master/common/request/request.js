/**
 * wx.request封装
 */

const api = require('../config').api
const util = require('../utils/utils')

function get(param) {
  param = param || {};
  var {data, url, onSuccess, onError, withKey, hideLoading} = param
  if (withKey == undefined) withKey = true
  if (hideLoading == undefined) hideLoading = true

  submit('GET', data, url, onSuccess, onError, withKey, 'GET', false, '', '', hideLoading);
}

function post(data, url, onSuccess, onError, withKey, hideLoading) {
  if (withKey == undefined) withKey = true
  if (hideLoading == undefined) hideLoading = true

  submit('POST', data, url, onSuccess, onError, withKey, 'POST', false, '', '', hideLoading);
}

function update(data, url, onSuccess, onError, withKey, hideLoading) {
  if (withKey == undefined) withKey = true
  if (hideLoading == undefined) hideLoading = true

  submit('POST', data, url, onSuccess, onError, withKey, 'update', false, '', '', hideLoading);
}

function create(data, url, onSuccess, onError, withKey, hideLoading) {
  if (withKey == undefined) withKey = true
  if (hideLoading == undefined) hideLoading = true

  submit('POST', data, url, onSuccess, onError, withKey, 'create', false, '', '', hideLoading);
}

function remove(data, url, onSuccess, onError, withKey, hideLoading) {
  if (withKey == undefined) withKey = true
  if (hideLoading == undefined) hideLoading = true

  submit('POST', data, url, onSuccess, onError, withKey, 'delete', false, '', '', hideLoading);
}

function uploadFile(data, url, onSuccess, onError, filePath, fileName, withKey, hideLoading) {
  if (withKey == undefined) withKey = true
  if (hideLoading == undefined) hideLoading = true

  submit('POST', data, url, onSuccess, onError, withKey, 'POST', true, filePath, fileName, hideLoading);
}

function getRequestData(data, url, callback, withKey, customerMethod) {
  var app = getApp()
  var url = url.split('/');

  var by = 'http';

  if (data == undefined) data = {}

  if (data != '') {
    data['request'] = url[0];
    data['operation'] = url[1] == undefined ? '' : url[1];
    data['client'] = 2;
    data['by'] = by;
    data['method'] = customerMethod;
    data['ver'] = app.data.version;
  } else {
    data = {
      request: url[0],
      operation: url[1] == undefined ? '' : url[1],
      client: 2,
      by: by,
      method: customerMethod,
      ver: app.data.version
    }
  }

  if (withKey) {
    app.getToken(function (err, key) {
      var sessionKey = '';

      if (!err) {
        sessionKey = key
      }
      else {
        // TODO
      }

      data['key'] = sessionKey;

      callback(data);
    })
  } else {
    data['key'] = '';
    callback(data);
  }
}

function submit(
  method, data, url, onSuccess, onError, withKey, customerMethod, uploadFile, filePath, fileName, hideLoading) {

  if (filePath == undefined) filePath = ''
  if (fileName == undefined) fileName = ''

  wx.getNetworkType({
    success: function (res) {
      var networkType = res.networkType
      if (networkType != 'none') {
        var preRequestData = data

        if (util.showLoadingUrl(url)) {
          if (wx.showLoading) {
            wx.showLoading({
              title: '正在加载',
            })
          }
        }

        getRequestData(data, url, function (requestData) {
          if (uploadFile) {
            wx.uploadFile({
              url: api,
              filePath: filePath,
              name: fileName == '' ? 'file' : fileName,
              formData: data,
              success: function (result) {
                result.data = JSON.parse(result.data)
                submitSuccessHandler(result, method, preRequestData, url, onSuccess, onError, withKey, customerMethod, uploadFile, filePath, fileName, hideLoading)
              },
              fail: function (result) {
                result.data = JSON.parse(result.data)
                submitFailHandler(result, onError)
              },
              complete: function (res) {
                if (hideLoading && wx.hideLoading) wx.hideLoading()
              }
            })
          } else {
            wx.request({
              url: api,
              method: method,
              data: requestData,
              success: function (result) {
                submitSuccessHandler(result, method, preRequestData, url, onSuccess, onError, withKey, customerMethod, uploadFile, filePath, fileName, hideLoading)
              },
              fail: function (result) {
                submitFailHandler(result, onError)
              },
              complete: function () {
                if (hideLoading && wx.hideLoading) wx.hideLoading()
              }
            })
          }
        }, withKey, customerMethod)
      }
    },
  })
}

/**
 * submit成功处理
 */
function submitSuccessHandler(result, method, preRequestData, url, onSuccess, onError, withKey, customerMethod, uploadFile, filePath, fileName, hideLoading) {

  if (filePath == undefined) filePath = ''
  if (fileName == undefined) fileName = ''

  var response = result.data;
  if (response.ret == 99) {
    console.error('session expired', preRequestData)

    var app = getApp()
    app.getToken(function (err, key) {
      if (!err) {
        delete preRequestData.by
        delete preRequestData.client
        delete preRequestData.key
        delete preRequestData.method
        delete preRequestData.operation
        delete preRequestData.request

        /**
         * 返回值是99的时候, 重新login, 然后重新请求
         */
        setTimeout(function () {
          submit(method, preRequestData, url, onSuccess, onError, withKey, customerMethod, uploadFile, filePath, fileName, hideLoading)
        }, 1000)
      }
    }, true)

  } else if (response.ret >= 1 && response.ret < 99) {
    onSuccess(response);
  } else if (response.ret == -1) {
    // 系统异常
    util.showModal('系统异常: 非常抱歉, 给您带来不便!')
  } else {
    if (onError == undefined) {
      wx.navigateTo({
        url: '/page/error/error',
      })
    } else {
      onError(response);
    }
  }
}

/**
 * submit fail处理
 */
function submitFailHandler(result, onError) {
  if (onError == undefined) {
    wx.navigateTo({
      url: '/page/error/error',
    })
  } else {
    onError(result);
  }
}

module.exports = {
  get: get,
  post: post,
  update: update,
  create: create,
  remove: remove,
  uploadFile: uploadFile
}
