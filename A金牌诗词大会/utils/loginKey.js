import { checkUpdateSystem } from './validateVersion.js';
import c from './config';
const domain = c.SERVER_HOST;

let loginKey = undefined;

let resolver = undefined;

let userInfo = undefined;

let fetchUserInfoResolver = undefined;

function getResolver() {
  if (!resolver) {
    resolver = fetchUserInfo().then(function (data) {
      return new Promise(function (resolve, reject) {
        // console.log('wxLogin', new Date().valueOf())
        wx.request({
          method: 'POST',
          url: c.SERVER_HOST_ROOT + c.PATHS.LOGIN,
          data,
          header: { 'accept': 'application/json', 'Content-Type': 'application/json' },
          success(res) {
            // console.log('wxLogin', new Date().valueOf())
            loginKey = res.data.data.loginKey;
            resolve(loginKey);
          }
        });
      });
    });
  }
  return resolver;
}

function fetchUserJsCode() {
  // console.log('fetchUserJsCode', new Date().valueOf())
  return new Promise(function (resolve, reject) {
    wx.login({
      success(res) {
        // console.log('fetchUserJsCode', new Date().valueOf())
        resolve(res.code);
      },
      fail(e) {
        console.log(e);
        reject();
      }
    });
  });
}

function confirmPrivicy() {
  return new Promise(function (resolve, reject) {
    if (!checkUpdateSystem()) {
      wx.authorize({
        scope: 'scope.userInfo',
        success: resolve,
        fail(e) {
          wx.showModal({
            title: '提示',
            content: '您未授权【金牌诗词大会】使用您的信息，请点击“确定”后允许使用，才能正常访问哦。',
            showCancel: false,
            success() {
              wx.openSetting({
                success: resolve
              });
            }
          });
        }
      });
    }
  });
}
function fetchUserInfo() {
  if (userInfo) {
    return Promise.resolve(userInfo);
  } else if (fetchUserInfoResolver) {
    return fetchUserInfoResolver;
  } else {
    fetchUserInfoResolver = confirmPrivicy().then(function () {
      return fetchUserJsCode();
    }).then(function (jsCode) {
      // console.log('wx.getUserInfo', new Date().valueOf())
      return new Promise(function (resolve, reject) {
        wx.getUserInfo({
          withCredentials: true,
          success({ userInfo }) {
            // console.log('wx.getUserInfo', new Date().valueOf())
            userInfo.jsCode = jsCode;
            userInfo.appId = "wx8c09dfa47c0df141";
            resolve(userInfo);
          },
          fail: reject
        });
      });
    });
    return fetchUserInfoResolver;
  }
}

function queryLoginKey() {
  // console.log('queryLoginKey', new Date().valueOf());
  if (!loginKey) {
    return resolver || getResolver();
  } else {
    return Promise.resolve(loginKey);
  }
}
function requestLog(type, typeName, extra) {
  const url = c.SERVER_HOST_ROOT + c.PATHS.REPORT_LOG;
  const shareObj = getApp().globalData.shareObj;
  queryLoginKey().then(function(loginKey) {
    wx.request({
      url: `${url}?type=${type}&type_name=${typeName}&login_key=${loginKey}&pg=wxbb9deec3105d043a` +
      (extra ? ('&' + Object.keys(extra).map(function(k) {
        return `${k}=${extra[k]}`;
      }).join('&')) : '') +
      ('&' + Object.keys(shareObj).map(function (k) {
        return `${k}=${shareObj[k]}`;
        }).join('&'))
    });
  });
}
function getGroupOpenGid(shareTicket) {
  return queryLoginKey().then(function () {
    return new Promise(function(resolve, reject) {
      wx.getShareInfo({
        shareTicket,
        success(d) {
          const { encryptedData, iv } = d;
          resolve(d);
        }
      });
    });
  }).then(function (data) {
    return new Promise(function (resolve, reject) {
      wx.request({
        method: 'POST',
        url: c.SERVER_HOST_ROOT + '/miniprogram/login/decodeGroupOpenId.ajax',
        data,
        header: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'cookie': 'robot_center_mini_program_login_cookie=' + loginKey
        },
        success(res) {
          resolve(res.data.data);
        },
        fail: reject
      });
    });
  });
}
module.exports = {
  getGroupOpenGid,
  requestLog,
  queryLoginKey,
  fetchUserInfo,
  domain
};
