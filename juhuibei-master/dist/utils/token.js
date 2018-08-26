import { Config } from 'config.js';
import { Cache } from 'cache.js';
var cache = new Cache();

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify';
    this.tokenUrl = Config.restUrl + 'token/user';
    this.userInfoUrl = Config.restUrl + 'token/info';
  }

  verify() {
    var that = this;
    // var token = wx.getStorageSync('token');
    var token = cache.get('token')
    // console.log(token);
    if (!token) {
      // 获取用户ID
      this.getTokenFromServer((cb)=>{
        // wx.setStorageSync('token', cb.token);
        cache.set('token', cb.token, 7000);
        // wx.setStorageSync('uid', cb.uid);
        cache.set('uid', cb.uid, 7000);
        that.saveUserInfo(cb.uid)
      });
    }
    else {
      this._veirfyFromServer(token);
    }
  }

  saveUserInfo(uid) {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            wx.request({
              url: that.userInfoUrl,
              method: 'POST',
              data: {
                user_id: uid,
                nickname: res.userInfo.nickName,
                avatar_url: res.userInfo.avatarUrl
              },
              success: function (res) {
                console.log(res);
              }
            })
          },
          fail: function () {
            that.verify()
          }
        });
      },
    })
  }

  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            callBack && callBack(res.data);
          }
        })
      }
    })
  }

  //得到用户微信信息
  getUserInfo(cb) {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            typeof cb == "function" && cb(res.userInfo);
          }
        });
      },
    })
  }
}

export { Token };