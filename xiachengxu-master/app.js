  var aldstat = require("./utils/ald-stat.js");
// var base = new Base();
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (ops) {
    // if (ops.scene == 1044) {
      
    // }
  },
  _getUserInfo: function (cb) {
    var that = this;
    var storeNo = wx.getStorageSync('storeNo');
    var wxSid = wx.getStorageSync('wxSid');
    wx.checkSession({
      success: function () {
        // 登录状态未过期，不需要重新登录
        that._updateUserInfo(res => {
          if (wxSid) {
            that.saveUserInfo(res, cb);
          } else {
            // 调用登录接口
            that._loginUser(res, cb);
          }
        });
      },
      fail: function () {
        // 登录状态过期
        that._updateUserInfo(res => {
          that._loginUser(res, cb);
        });

      }
    })
  },
  /**
   * 获取用户授权提示
   */
  _updateUserInfo(cb) {
    var that = this;
    wx.getUserInfo({
      success: res => {
        cb && cb(res);
      },
      fail: err => {
        that.showTips(cb);
      }
    })
  },

  // 登录接口
  _loginUser(res, cb) {
    var that = this;
    wx.login({
      success: function (d) {
        // 因为登录接口需要很多校验，回调慢，门户页点击商品等待很久才提示
        // 获取授权请求，体验不友好
        var param = {
          data: {
            storeNo: wx.getStorageSync('storeNo'),
            wxCode: d.code
          }
        }
        wx.request({
          url: Config.restUrl + '/wxserver/wxmp/login',
          method: 'POST',
          data: param,
          success: result => {
            var data = result.data;
            wx.setStorageSync('wxSid', data.status ? data.data.wxSid : '');
            wx.setStorageSync('wxUid', data.status ? data.data.wxUid : '');
            that.saveUserInfo(res, cb);
          }
        })
      },
    })
  },

  // 保存用户信息
  saveUserInfo(res, cb) {
    var that = this;
    var wxSid = wx.getStorageSync('wxSid');
    var wxUid = wx.getStorageSync('wxUid');
    var storeNo = wx.getStorageSync('storeNo');
    if (res.rawData) {
      wx.request({
        url: Config.restUrl + '/wxserver/wxmp/saveUserInfo',
        method: 'POST',
        data: {
          data: {
            wxUid: wxUid,
            wxSid: wxSid,
            encryptedData: res.encryptedData,
            signature: res.signature,
            iv: res.iv,
            rawData: res.rawData
          }
        },
        success: data => {
          wx.request({
            url: Config.restUrl + '/wxserver/wxmp/getUserRole',
            method: 'POST',
            data: {
              data: {
                wxUid,
                wxSid,
                storeNo
              }
            },
            success: d => {
              that.globalData.userInfo = { roleId: d.data.status ? d.data.data.roleId : 0, wxUid, ...res.userInfo };
              cb && cb({ userInfo: that.globalData.userInfo });
            },
            fail: err => {
              that.globalData.userInfo = { roleId: 0, wxUid, ...res.userInfo };
              cb && cb(that.globalData.userInfo);
            }
          })
        }
      })
    } else {
      that.globalData.userInfo = { roleId: 0, wxUid, ...res.userInfo };
      cb && cb({ userInfo: that.globalData.userInfo });
    }
  },

  // 获取用户权限设置
  getUserSetting(callback) {
    var that = this;
    /* 判断用户是否登录，未登录提示需要授权 */
    wx.getSetting({
      success: data => {
        var isAuth = data.authSetting['scope.userInfo'];
        if (isAuth != null && !isAuth) {
          // 如果没有通过授权微信账户则提示打开小程序设置页面进行授权
          that.showTips(callback);
        } else {
          // 用户删除后重新打开小程序或者是第一次进入小程序
          // isAuth = undefined
          that._getUserInfo(callback);
        }
      }
    })
  },

  /*
     * 提示窗口
     * params:
     * title - {string}标题
     * content - {string}内容
     * flag - {bool}是否跳转到 "我的页面"
     */
  showTips: function (cb) {
    var that = this;
    let userInfo;
    wx.showModal({
      title: '授权提示',
      content: '小程序需要您的授权才能正常使用',
      confirmText: '去授权',
      confirmColor: '#1196ee',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: data => {
              let getUserAuth = data.authSetting['scope.userInfo'];
              // 重新获取用户授权
              if (!getUserAuth) {
                userInfo = { userInfo: { nickName: '叮当小店', avatarUrl: '/images/icon/user@default.png' } };
                // 给默认昵称和头像
                cb && typeof cb == 'function' && cb(userInfo);
              } else {
                that._getUserInfo(cb);
              }
            }
          })
        } else {
          userInfo = { userInfo: { nickName: '叮当小店', avatarUrl: '/images/icon/user@default.png' } };
          cb && typeof cb == 'function' && cb(userInfo);
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    header: '',
    images: [],
    product: {},
    goodsName: '',
    goodsPrice: 0,
    gloabalFomIds: [], // 发送模板消息需要用到的 formId 数组
  }
})
