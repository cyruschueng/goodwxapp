import { Token } from 'utils/token.js';
import { Cache } from 'utils/cache.js';
var cache = new Cache();
import api from './api/api_v1.js'
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App({
  globalData: {},
  onLaunch: function onLaunch(e) {
    var token = new Token();
    token.verify();
    // var token = wx.getStorageSync('token');
    var token = cache.get('token')
    console.log('token', token);
    if (e.scene == 1044) {
      // console.log('onLaunch', e.shareTicket)
      wx.getShareInfo({
        shareTicket: e.shareTicket,
        success: (res) => {
          // console.log('getShareInfo', res)
          api.enCryptedData({
            method: 'post',
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              token: token
            },
            success: (resault) => {
              // console.log('enCryptedData', resault);

            }
          })
        }
      })
    }
  },
  onShow: function onShow(e) {
    // 可以通过 wx.getSetting 先查询一下用户是否授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log('userInfo ok')
            }
          })
        }
      }
    })
  },
  onHide: function onHide() {},

});

