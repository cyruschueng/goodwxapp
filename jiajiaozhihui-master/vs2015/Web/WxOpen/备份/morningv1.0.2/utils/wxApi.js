var Promise = require('./es6-promise.min.js')

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return wxPromisify(wx.login)
};
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
};
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  return wxPromisify(wx.getSystemInfo)
};
/**
 * 获取分享内容 
 */
function wxGetShareInfo(shareTicket) {
  var wxGetShareInfo= wxPromisify(wx.getShareInfo);
  return wxGetShareInfo({
    shareTicket: shareTicket
  });
};
/**
 * 保留当前页面，跳转到应用内的某个页面
 * url:'../index/index'
 * params:{key:value1}
 */
function wxNavigateTo(url, params) {
  var wxNavigateTo = wxPromisify(wx.navigateTo)
  const serializedParams = paramSerializer(params)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return wxNavigateTo({
    url: url
  })
}
/**
 * 关闭当前页面，跳转到应用内的某个页面
 * url:'../index/index'
 * params:{key:value1}
 */
function wxRedirectTo(url, params) {
  var wxRedirectTo = wxPromisify(wx.redirectTo)
  const serializedParams = paramSerializer(params)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return wxRedirectTo({
    url: url
  })
};

/**
 * wxSwitchTab，跳转到应用内的某个页面
 * url:'../index/index'
 * params:{key:value1}
 */
function wxSwitchTab(url, params) {
  var wxSwitchTab = wxPromisify(wx.switchTab)
  const serializedParams = paramSerializer(params)
  if (serializedParams.length > 0) {
    url += ((url.indexOf('?') == -1) ? '?' : '&') + serializedParams
  }
  return wxSwitchTab({
    url: url
  })
};

function paramSerializer(query) {
  var search = '';
  var hasProp = false;
  if (typeof query === "object" && !(query instanceof Array)) {
    for (var prop in query) {
      hasProp = true;
      break;
    }
  }
  if(hasProp==true){
    for (var i in query) {
      search += '&' + i + '=' + query[i];
    }
    return search.substr(1);
  }else{
    return ''
  }
}
module.exports = {
  wxPromisify: wxPromisify,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo,
  wxGetShareInfo: wxGetShareInfo,
  wxNavigateTo: wxNavigateTo,
  wxRedirectTo: wxRedirectTo,
  wxSwitchTab: wxSwitchTab
}