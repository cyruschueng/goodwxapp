//  wechat.js

const store = require('../utils/store.js');
const ajax = require('./ajax.js')
const client = require('./client.js');

/*
  说明：设置允许分享到群
*/
const setShareMenu = function (withShareTicket) {

  if (withShareTicket) {
    wx.showShareMenu({
      withShareTicket: withShareTicket
    })
  }
}

/*
  说明：获取用户资料
*/
const getUserInfo = function (withCredentials) {

  return new Promise(function(resolve, reject){

    wx.getUserInfo({
      withCredentials: withCredentials,
      success: resolve,
      fail: reject
    })
  })
}

/*
  说明：获取群信息
*/
const getShareInfo = function (shareTicket) {

  return new Promise(function (resolve, reject) {

    if (shareTicket) {
      wx.getShareInfo({
        shareTicket: shareTicket,
        success: resolve,
        fail: resolve
      })
    } else {
      resolve({})
    }
  });
}

/*
  说明：获取分享结构
*/
const getShareMessage = function(title, path, callback){

  var shareTicket;

  return {
    title: title,
    path: path,
    success: function(res){

      shareTicket = {}

      if (res.shareTickets && res.shareTickets.length){
        shareTicket = res.shareTickets[0]
      }

      if (store.session3rd) {
        getShareInfo(shareTicket)
          .then(function(res){
            
            client.share(res.encryptedData || '', res.iv || '', callback)
          });
      }
    },
    fail: function (res) {

      wx.showToast({
        title: '放弃分享'
      })
    }
  }
}

/*
  说明：检查登录态有效性
*/
const checkSession = function (scene) {

  //  获取本地缓存三方标识
  store.session3rd = wx.getStorageSync('session3rd') || ''

  //  登录方法
  var relogin = function (resolve, reject) {

    wx.login({
      success: function (res) {

        console.log(res)
        client.login(res.code, resolve)
      },
      fail: function () {

        reject(ajax.result(ajax.CODE_TYPE.LOGIN_FAIL, '登录失败'))
      }
    })
  }

  //  检查会话登陆态
  return new Promise(function (resolve, reject) {

    if (store.session3rd) {
      
      wx.checkSession({
        success: function (res) {

          client.token(scene, resolve)
        },
        fail: function () {
          console.log(store.session3rd)
          relogin(resolve, reject)
        }
      })
    } else {
      relogin(resolve, reject)
    }
  })
}

/*
  说明：检查访问来源
*/
const checkSource = function (fromClientId, shareTicket){
  
  return new Promise(function(resolve, reject){

    if (store.session3rd && !checkSource.loading) {
      checkSource.loading = true;
      getShareInfo(shareTicket)
        .then(function (res) {

          checkSource.loading = false;
          if (fromClientId || (res.encryptedData && res.iv)) {
            client.relate(fromClientId || 0, res.encryptedData || '', res.iv || '', resolve);
          }
        })
    }
  })
}

module.exports = {
  setShareMenu: setShareMenu,
  getUserInfo: getUserInfo,
  getShareMessage: getShareMessage,
  getShareInfo: getShareInfo,
  checkSession: checkSession,
  checkSource: checkSource
}
