const util = require('./util.js')
const noof = () => {}
var config = require('../config')
const Session = require('./session.js')

var request = (config) => {
  var def = {
    url: '',
    data: {},
    method: 'GET',
    success: noof,
    fail: noof,
    showLoading: true
  };

  var conf = util.mergeJsonObject(def, config);
  if (conf.showLoading) {
    util.showBusy('正在加载...')
  }
  var that = this
  wx.request({
    url: conf.url,
    data: conf.data,
    header: {
      'x-wx-skey': Session.get()
    },
    method: conf.method,
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      console.log('返回数据' ,res)
      util.hideModel()
      if(res.data.code == -1) {
        if (conf.fail) conf.fail(res.data.data.msg)
        return
      } else if (res.data.code == -2) {
        Session.clear()
        console.log('尝试重新登录')
        if (conf.fail) conf.fail('登录过期，请重新进入')
        getSession()
        return
      } else if (res.data.code == -3) {
        util.showModel('提示', res.data.data.msg)
        return
      }
      conf.success(res.data)
    },
    fail: function (res) {
      util.hideModel()
      if (conf.fail) conf.fail(JSON.stringify(res))
    },
    complete: function (res) {
      // util.hideModel()
    }
  })
}

var getSession = (loginSuccessCallback) => {
  wx.login({
    success: function (res) {
      console.log('登录信息' ,res)
      request({
        url: config.service.loginUrl,
        data: {
          code: res.code
        },
        success: function (r_res) {
          Session.set(r_res.data)
          if (loginSuccessCallback) loginSuccessCallback()
        }, 
        fail: function (err) {
          util.showError(err)
        }
      })
    },
    fail: function (res) { },
    complete: function (res) { },
  })
}

var login = (loginSuccessCallback) => {
  wx.checkSession({
    success: function () {
      if(!Session.get()) {
        getSession(loginSuccessCallback)
        return;
      }
      if (loginSuccessCallback) loginSuccessCallback()
    },
    fail: function () {
      Session.clear()
      getSession(loginSuccessCallback)
    }
  })
}

module.exports = {
  request,
  login
}