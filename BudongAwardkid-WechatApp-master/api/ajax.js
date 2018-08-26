//  client.js

const store = require('../utils/store.js');

/*
  说明：操作结果代码常量
*/
const CODE_TYPE = {
  SESSION_NULL: 101,
  SESSION_EXPIRE: 102,
  LOGIN_FAIL:111
}

/*
  说明：操作结果
*/
const result = function (code, message) {

  return {
    code: code,
    message: message
  }
}

/*
  说明：请求失败方法
*/
const error = function (callback, data) {

  wx.hideLoading();
  if (callback) {
    callback(data);
  } else {
    wx.showToast({
      title: data.message || '请求失败'
    })
  }
}

/*
  说明：POST 请求方法
*/
const post = function (url, data, callback, fail) {
  
  wx.showLoading();
  wx.request({
    url: 'https://shenxu.name/wechat_app/api' + url,
    data: Object.assign({ appId: 1, session3rd: store.session3rd }, data),
    method: 'POST',
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    success: function (data) {

      wx.hideLoading();
      data.data.url = url;
      callback && callback(data.data || {})
    },
    fail: function (res) {

      error(fail, { message: '请求失败' })
    }
  });
}

/*
  说明：UPLOAD 请求方法
*/
const upload = function (url, data, fileName, tempFilePath, callback, fail) {

  wx.showLoading();
  wx.uploadFile({
    url: 'http://localhost:53474/api' + url,
    filePath: tempFilePath,
    name: fileName,
    formData: Object.assign({ appId: 1, session3rd: store.session3rd }, data),
    success: function (res) {

      wx.hideLoading();
      callback && callback(data.data || {})
    },
    fail: function (res) {

      error(fail, { message: '上传失败' })
    }
  })
}

/*
  说明：临时 POST 请求方法
*/
// const _post = function(url, data, callback, fail, result){
//   console.log(3444)
//   callback(result || {});
// }

module.exports = {
  CODE_TYPE: CODE_TYPE,
  result: result,
  post: post,
  upload: upload
}
