const app = getApp();
const util = require('../utils/util.js');
const bus = require('../utils/bus.js');
const client = require('./client.js');
const authorizeSetting = function (success) {
    
  if (bus.settinged){
    util.showToast('授权失败');
  } else {
    bus.settinged = true;
    wx.openSetting({
      success: function (res) {

        authorizeLogin(res.code, success);
      },
      fail: function () {

        util.showToast('授权失败');
      }
    });
  }
};
const authorizeUserInfo = function(code, success){
  
  wx.getUserInfo({
    withCredentials: true,
    success: function(res){

      client.login({
        code: code || '',
        encryptedData: res.encryptedData || '',
        iv: res.iv || '',
        fromClientId: bus.launchClientId || 0,
        scene: bus.launchScene || 0,
        shareTicketData: bus.launchShareTicketData || '',
        shareTicketIV: bus.launchShareTicketIV || ''
      }, function (data) {

        wx.setStorage({
          key: 'sessionCode',
          data: data.sessionCode
        });
        bus.client = data || {};
        success && success(data);
      });
    },
    fail: function(res){

      authorizeSetting(success);
    }
  });
};
const authorizeTicket = function(res, success){
  
  client.ticket({
    'sessionCode': res.data,
    'fromClientId': bus.launchClientId || 0,
    'scene': bus.launchScene || 0,
    'shareTicketData': bus.launchShareTicketData || '',
    'shareTicketIV': bus.launchShareTicketIV || ''
  }, function (data) {
    
    bus.client = data || {};
    success && success.bind(this)(data);
  }, function(data){

    authorizeLogin(success);
  });
};
const authorizeLogin = function(success){

  wx.login({
    success: function(res){
      authorizeUserInfo(res.code, success);
    },
    fail: function(res){
      authorizeSetting(success);
    }
  });
};
const shareSuccess = function (res, success){
  
  client.share({
    'sessionCode': bus.client.sessionCode || '',
    'shareTicketData': (res || {}).encryptedData || '',
    'shareTicketIV': (res || {}).iv || ''
  }, function (data) {
    success && success(data);
  });
};
const wechat = {
  authorize: function (success) {

    wx.checkSession({ //  检查 session 是否已过期
      success: function (res) {

        wx.getStorage({ //  检查本地缓存是否有会话标识
          key: 'sessionCode',
          success: function(res){

            authorizeTicket(res, success);  //  获取验证票
          },
          fail: function(){

            authorizeLogin(success);  //  重新登录
          }
        });
      },
      fail: function () {

        authorizeLogin(success);  //  重新登录
      }
    });
  },
  share: function(scene, res, success, data){

    data = data || {};

    var scenes = {
      guess: {
        title: '我正在玩儿【猜电视】，闯关【' + data.title + '】，你敢来试试吗！',
        image: 'https://shenxu.name/tvguess/statics/images/wechatapp_share.png'
      },
      rank: {
        title: '我正在玩儿【猜电视】，闯关【' + data.title + '】，你敢来试试吗！',
        image: 'https://shenxu.name/tvguess/statics/images/wechatapp_share.png'
      }
    };
    var shareInfo = scenes[scene] || {
      title: '听不出这些电视，你怎么敢说自己老了',
      image: 'https://shenxu.name/tvguess/statics/images/wechatapp_share.png'
    };

    return {
      title: shareInfo.title,
      imageUrl: shareInfo.image,
      path: '/pages/index/index?fromClientId=' + (bus.client || {}).id || 0,
      success: function(_res){
        
        if (_res.shareTickets && _res.shareTickets.length) {
          wx.getShareInfo({
            shareTicket: _res.shareTickets[0],
            success: function(__res){

              shareSuccess(__res, success);
            }
          });
        } else {
          shareSuccess({ }, success);
        }
      },
      fail: function (res) {

        util.showToast('分享失败');
      }
    }
  }
}
module.exports = wechat;