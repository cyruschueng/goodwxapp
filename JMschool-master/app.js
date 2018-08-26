//app.js
//Bmob设置
var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
BmobSocketIo.initialize("d192259ce18f9fa36934e3131d5b2aaf");
var Bmob = require('utils/bmob.js');
Bmob.initialize("d192259ce18f9fa36934e3131d5b2aaf", "28cbc3591f67f707f74516ba1d23d76f");
App({
  version: 'v0.0.6', //版本号
  onLaunch: function () {
    var _this = this;
    //读取缓存
    try {
      var data = wx.getStorageInfoSync();
      if (data && data.keys.length) {
        data.keys.forEach(function (key) {
          var value = wx.getStorageSync(key);
          if (value) {
            _this.cache[key] = value;
          }
        });
        //版本小于v0.0.5 清除缓存
        if (_this.cache.version == 'v0.0.1' || _this.cache.version == 'v0.0.2' || _this.cache.version == 'v0.0.3' || _this.cache.version == 'v0.0.4' || _this.cache.version == 'v0.0.5') {
          _this.cache = {};
          try {
            wx.clearStorageSync()
          } catch (e) {
            console.warn('清除缓存失败');
          }
        } else {
          _this._user.wx = _this.cache.userinfo.userInfo || {};
          _this.processData(_this.cache.userdata);
        }
      }
    } catch (e) { console.warn('获取缓存失败'); }
    _this.getTime();
    _this.bmobChat();
  },
  //保存缓存
  saveCache: function (key, value) {
    if (!key || !value) { return; }
    var _this = this;
    _this.cache[key] = value;
    wx.setStorage({
      key: key,
      data: value
    });
  },
  //清除缓存
  removeCache: function (key) {
    if (!key) { return; }
    var _this = this;
    _this.cache[key] = '';
    wx.removeStorage({
      key: key
    });
  },
  //后台切换至前台时
  onShow: function () {

  },
  //判断是否有登录信息，让分享时自动登录
  loginLoad: function (onLoad) {
    var _this = this;
    if (!_this._t) {  //无登录信息
      _this.getUser(function (e) {
        typeof onLoad == "function" && onLoad(e);
      });
    } else {  //有登录信息
      typeof onLoad == "function" && onLoad();
    }
  },
  //getUser函数，在index中调用
  getUser: function (response) {
    var _this = this;
    wx.showNavigationBarLoading();
    wx.login({
      success: function (res) {
        if (res.code) {
          //调用函数获取微信用户信息
          _this.getUserInfo(function (info) {
            _this.saveCache('userinfo', info);
            _this._user.wx = info.userInfo;
            if (!info.encryptedData || !info.iv) {
              _this.g_status = '无关联AppID';
              typeof response == "function" && response(_this.g_status);
              return;
            }
            //获取openid,loginCode换取openid
            wx.request({
              url: _this._server + '/school/api/openid_get.php',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                code: res.code,
              },
              method: 'POST',
              success: function (res) {
                if (res.data.data && (res.data.code === 200 || res.data.code === 405)) {
                  _this._user.openid = res.data.data
                  _this.saveCache('openid', res.data.data);
                  //发送openid，获取学生数据
                  wx.request({
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    url: _this._server + '/school/api/userinfo_get.php',
                    data: {
                      openid: res.data.data
                    },
                    success: function (res) {
                      if (res.data && res.data.code == 200) {
                        var status = false, data = res.data.data[0];
                        //判断缓存是否有更新
                        if (_this.cache.version !== _this.version || _this.cache.userdata !== data) {
                          _this.saveCache('version', _this.version);
                          _this.saveCache('userdata', data);
                          _this.processData(data);
                          _this.updateWechatinfo(data);
                          status = true;
                        }
                        if (!_this._user.is_bind) {
                          wx.navigateTo({
                            url: '/pages/bind/bind'
                          });
                        }
                        //如果缓存有更新，则执行回调函数
                        if (status) {
                          typeof response == "function" && response();
                        }
                      } else {
                        //清除缓存
                        if (_this.cache) {
                          _this.cache = {};
                          wx.clearStorage();
                        }
                        typeof response == "function" && response(res.data.message || '加载失败');
                      }
                    },
                    fail: function (res) {
                      var status = '';
                      // 判断是否有缓存
                      if (_this.cache.version === _this.version) {
                        status = '离线缓存模式';
                      } else {
                        status = '网络错误';
                      }
                      _this.g_status = status;
                      typeof response == "function" && response(status);
                      console.warn(status);
                    },
                    complete: function () {
                      wx.hideNavigationBarLoading();
                    }
                  });
                }
                else {
                  _this.showErrorModal(JSON.stringify(res.data.message), "提示");
                }
              },
              fail: function (res) {
                var status = '网络错误';
                _this.g_status = status;
                typeof response == "function" && response(status);
                console.warn(status);
              },
              complete: function () {
                wx.hideNavigationBarLoading();
              }
            });
          });
        }
      }
    });
  },


  processData: function (key) {
    var _this = this;
    if (key.info) {
      var info = key.info.split('{td}');
      //将解析后的数据全局使用
      _this._user.openid = key.openid;
      _this._user.we.student_no = info[0];  //学号
      _this._user.we.student_bianhao = info[1];  //在班编号
      _this._user.we.student_name = info[2];  //学生姓名
      _this._user.we.gender = info[3];  //学生性别
      _this._user.we.student_banji = info[5];  //学生班级
      _this._user.we.student_xueji = info[9];  //学籍状态
      //更改绑定状态
      _this._user.is_bind = true;
    }
    return key;
  },
  getUserInfo: function (cb) {
    var _this = this;
    //获取微信用户信息
    wx.getUserInfo({
      success: function (res) {
        typeof cb == "function" && cb(res);
      },
      fail: function (res) {
        _this.showErrorModal('拒绝授权将导致无法关联学校帐号并影响使用，请重新打开掌上交理再点击允许授权！', '授权失败');
        _this.g_status = '未授权';
      }
    });
  },

  //更新用户信息
  updateWechatinfo: function (data) {
    var _this = this;
    try {
      var value = wx.getStorageSync('userinfo').userInfo
      if (value.avatarUrl == data.avatarUrl && value.gender == data.gender && value.nickName == data.nickname) {
        console.log("不需要更新微信用户信息")
      } else {
        console.log("更新微信用户信息")
        wx.request({
          url: 'https://www.jmideas.cn/school/api/wechatinfo_update.php',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            openid: _this._user.openid,
            avatarUrl: value.avatarUrl,
            nickname: value.nickName,
            gender: value.gender,
          },
          method: 'POST',
          success: function (res) {
            if (res.data.code === 200) {
              console.log("微信信息更新成功")
            } else {
              console.log("微信信息更新失败")
            }
          }
        })
      }
    } catch (e) {
      console.warn('获取缓存更新失败');
    }
  },

  //当前时间周数获取
  getTime: function (arr) {
    var _this = this;
    var week = Math.ceil(((new Date()).getTime() - (new Date("2017/09/04")).getTime()) / 1000 / 3600 / 24 / 7),
      // var week = Math.ceil(((new Date()).getTime() - (new Date("2017.9.4")).getTime()) / 1000 / 3600 / 24 / 7),
      today = new Date().getDay(),
      year = new Date().getFullYear() + 1;
    var days = ['日', '一', '二', '三', '四', '五', '六'];
    var day = days[today];
    var arr = new Array(year, week, day);
    _this._time = arr;
  },


  //Bmob聊天室功能
  bmobChat: function () {
    var user = new Bmob.User();//开始注册用户
    var newOpenid = wx.getStorageSync('openid')
    if (!newOpenid) {
      wx.login({
        success: function (res) {
          user.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);
            if (user.get("nickName")) {
              // 第二次访问
              wx.setStorageSync('openid', openid)
            } else {
              //保存用户其他信息
              wx.getUserInfo({
                success: function (result) {
                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;
                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {
                      // 自动绑定之前的账号
                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.save();
                    }
                  });

                }
              });
            }
          }, function (err) {
            console.log(err, 'errr');
          });

        }
      });
    }
  },

  //完善信息
  // appendInfo: function (data) {
  //   var _this = this;
  //   _this.cache = {};
  //   wx.clearStorage();
  //   _this._user.we.build = data.build || '';
  //   _this._user.we.room = data.room || '';
  // },
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  showLoadToast: function (title, duration) {
    wx.showToast({
      title: title || '加载中',
      icon: 'loading',
      mask: true,
      duration: duration || 10000
    });
  },
  util: require('./utils/util'),
  key: function (data) { return this.util.key(data) },
  cache: {},
  _server: 'https://www.jmideas.cn',
  _user: {
    //微信数据
    wx: {},
    //学生\老师数据
    we: {}
  },
  _time: {},//当前学期周数

  //bmob
  globalData: {
    userInfo: null
  }
});