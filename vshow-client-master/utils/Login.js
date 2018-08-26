const { loginUrl, regUrl, getUserBySessionUrl, hostUrl, getSpecialListUrl, staticHostUrl, imgDirUrl, socketHostUrl } = require('../config.js');
const { NetRequest } = require('../utils/util.js');
const EventEmitter = require('../libs/events');
const appConText = getApp();
let Login = {
  init(fn) {
    let self = this;
    self.resFn = [];
    if (fn) {
      wx.showLoading({
        title: '重新登录中...',
      });
      typeof fn === 'function' && (self.resFn = [fn]);
    } else {
      wx.showLoading({
        title: '登录中...'
      });
    }
    let sessionId = wx.getStorageSync('sessionId');
    //console.log(sessionId);
    if (sessionId) {   //是否有sessionid
      NetRequest({
        url: getUserBySessionUrl,
        method: 'POST',
        success(res) {
          //console.log(res);
          let { data, statusCode } = res;
          if (statusCode == 200) { //是否session有效
            wx.hideLoading();
            wx.showToast({
              title: '登录成功'
            });
            !/http/.test(data.avatarUrl) && (data.avatarUrl = staticHostUrl + data.avatarUrl); //如果没有http证明是存储的本地头像
            //data.avatarUrl = hostUrl + data.avatarUrl;
            appConText.globalData.userInfo = data;
            self.doResFn(appConText.globalData.userInfo);
          } else {
            self.start();
          }
        },
        fail(res) {
          self.start();
        }
      });
    } else {   //没有sessionId
      self.start();
      //console.log('没有session');
    }

  },

  start() {
    let self = this;
    console.log('开始登陆');
    self.login((err, res = {}) => {
      //console.log(err, res);
      let { data, statusCode } = res;
      //console.log(res);
      if (-statusCode === -200) {  //登录成功
        //console.log(data);
        !/http/.test(data.avatarUrl) && (data.avatarUrl = staticHostUrl + data.avatarUrl); //如果没有http证明是存储的本地头像
        //data.avatarUrl = hostUrl + data.avatarUrl;
        appConText.globalData.userInfo = data;
        self.doResFn(appConText.globalData.userInfo);
        wx.hideLoading();
        wx.showToast({
          title: '登录成功'
        });
      } else {
        console.log('开始注册');
        self.reg((err, res) => {
          wx.hideLoading();
          if (err || !res || res.statusCode != 200) {  //注册失败

            wx.showModal({
              title: '注册失败',
              content: '是否跳转到我的页面,重新注册',
              success(res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '/pages/mine/index',
                  })
                }
              }
            });
            return self.doResFn(null);
          } else {
            let { statusCode, data } = res;
            wx.showToast({
              title: '注册成功'
            });
            //data.avatarUrl = hostUrl + data.avatarUrl;
            !/http/.test(data.avatarUrl) && (data.avatarUrl = staticHostUrl + data.avatarUrl); //如果没有http证明是存储的本地头像
            appConText.globalData.userInfo = data;
            self.doResFn(appConText.globalData.userInfo);
          }


        });
      }
    });
  },

  insertResFn(fn) {
    let self = this;
    wx.hideLoading();
    if (self.resFn) {   //默认是个空数组，当拿到数据，遍历完时，则为null，如果为null，就是已经获取到了
      console.log(self.resFn);
      typeof fn === 'function' && self.resFn.push(fn);
    } else {    //已经遍历完了，从globalData.userInfo中获取数据
      console.log(appConText.globalData.userInfo);
      typeof fn === 'function' && fn(appConText.globalData.userInfo);
    }
  },

  doResFn(userInfo) {
    let self = this;
    if (self.resFn && self.resFn.length) {
      self.resFn.forEach((v, i) => {
        typeof v === 'function' && v(userInfo);
        self.resFn.splice(i, 1);
        if (!self.resFn.length) {
          self.resFn = null;
        }
      });
    } else {
      self.resFn = null;
    }

  },

  login(fn) {
    wx.login({
      success(res) {
        //console.log(res);
        NetRequest({
          url: loginUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success(res) {
            console.log(res);
            typeof fn === 'function' && fn(null, res);
          },
          fail(err) {
            console.log(err);
            typeof fn === 'function' && fn(err);
          }
        });
      },
      fail(err) {
        console.log(err);
        typeof fn === 'function' && fn(err);
      }
    })
  },

  reg(fn) {
    let self = this;
    wx.getUserInfo({
      success(res) {
        let { encryptedData, iv } = res;
        NetRequest({
          url: regUrl,
          method: 'POST',
          data: {
            encryptedData, iv
          },
          success(res) {
            typeof fn === 'function' && fn(null, res);
          },
          fail(err) {
            typeof fn === 'function' && fn(err);
          }
        });
      },
      fail(err) {  //获取用户信息失败
        typeof fn === 'function' && fn(err);
      }
    })

  }
};
Object.assign({}, EventEmitter.prototype, Login);
module.export = Login;
