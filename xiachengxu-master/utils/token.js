import { Config } from 'config.js';

class Token {
  constructor() {
    this.tokenUrl = Config.restUrl + '/token/user'; // 获取sessionID
    this.verifyUrl = Config.restUrl + '/token/verify'; // 校验sessionID
  }

  /**
   * 校验sessionID，从缓存中取sessionID，有就拿去验证
   * 没有则从服务器获取sessionID
   */
  verify() {
    var token = wx.getStorageSync('token');
    if (token) {
      this._verifyFromServer(token);
    } else {
      this.getTokenFromServer();
    }
  }

  // 校验当前存储的session是否失效
  _verifyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: res => {
        var isValid = res.data.valid;
        if (!isValid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  // 获取新的sessionID
  getTokenFromServer(cb) {
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: data => {
            if (data.status) {
              wx.setStorageSync('token', data.data.token);
              cb && cb();
            } else {
              wx.setStorageSync('token', '');
            }
          }
        })
      }
    })
  }

}

export { Token }