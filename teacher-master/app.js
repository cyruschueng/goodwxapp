
//app.js
var that;
var util = require("utils/util.js")
const config = require('./config')

App({
  globalData: {
    scene: "",
    cid: "",
    gid: "",
    role: "",
    familyRole: "",
    childName: '',
    ShareTicket: null,
    memberReload: 0,
    notifyReload: 0,
    failCount: 0,
    enddate: '',
    currentSubject: '',     //编辑课程表中需要用到的
    currentSubjectPublish: '',    //选择要发布的祖业
    currentAlbumPublish: '',
    isExpOpenid: false,
    winWidth: '',
    winHeight: '',
    albumRefresh: false,
    photoRefresh: false,
    music_album_mode: '',
    music_album_background: '',
    isMock: false,

  },
  configData: null,
  onLaunch: function (options) {
    that = this;
    wx.removeStorageSync('imprint');
    wx.removeStorageSync('configData');
    that.WidthHeightInit();
    that.initData();
    if (options) {
      if (options.shareTicket) {
        that.globalData.ShareTicket = options.shareTicket;
      } else {
        that.globalData.ShareTicket = '';
      }
      if (options.scene) {
        that.globalData.scene = options.scene;
      }
    }
  },
  onShow: function (options) {
    if (options) {
      if (options.shareTicket) {
        that.globalData.ShareTicket = options.shareTicket;
      } else {
        that.globalData.ShareTicket = '';
      }
      if (options.scene) {
        that.globalData.scene = options.scene;
      }
    }
  },
  onHide: function () {
    //wx.setStorageSync('globalData', this.globalData);
  },



  WidthHeightInit: function () {
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.winWidth = res.windowWidth
        that.globalData.winHeight = res.windowHeight
      }
    });
  },

  /**
       * 获取imprint
       */
  getImprint: function (cb) {
    var that = this;
    var imprint = wx.getStorageSync('imprint');
    if (typeof imprint == 'undefined' || imprint == '') {
      return that.Imprint(cb);
    } else {
      return cb(imprint);
    }
  },

  removeImprint: function () {
    wx.removeStorageSync('imprint');
  },


  /**
     * 获取体验账户的openid
     */
  getExpImprint: function (cb) {
    var that = this;
    that.initData(function (configData) {
      if (configData && configData.exp_openid) {
        wx.removeStorageSync('imprint');
        wx.setStorageSync('imprint', configData.exp_openid);
        that.globalData.isExpOpenid = true;
        return cb(configData.exp_openid);
      }
    });
  },


  /**
   * 退出体验账户,删除imprint
   */
  delExpImprint: function (cb) {
    wx.removeStorageSync('imprint');
    that.globalData.isExpOpenid = false;
    return cb("");
  },


  /**
       * 获取群数据
       */
  getGid: function (imprint, shareTickets, cb) {
    that.getLoginCode(function (logincode) {
      wx.getShareInfo({
        shareTicket: shareTickets,
        success: function (res) {
          console.log(res)
          var formdata = { "code": logincode, "iv": res.iv, encryptedData: res.encryptedData }
          util.AJAX1(config.groupInitUrl, formdata, "post", { imprint: imprint }, function (res) {
            var resData = res.data;
            cb(resData, '');
          });
        },
        fail: function (res) { cb('', res); },
        complete: function (res) { cb('', res); }
      })
    });
  },


  getImprintEx: function (cb) {
    var that = this;
    wx.removeStorageSync('cclist');
    wx.removeStorageSync('tclist');
    wx.removeStorageSync('imprint');
    var cclist = wx.getStorageSync('cclist');
    var imprint = wx.getStorageSync('imprint');
    var tclist = wx.getStorageSync('tclist');
    if ((typeof imprint == 'undefined' || imprint == '') || (typeof cclist == 'undefined' || cclist == '') || (typeof tclist == 'undefined' || tclist == '')) {
      return that.Imprint(cb);
    } else {
      return cb(imprint, cclist, tclist);
    }
  },


  getLoginCode: function (cb) {
    wx.login({
      success: function (resLogin) {
        if (resLogin.code) {
          wx.getUserInfo({
            success: function (resInfo) {
              cb(resLogin.code);
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '获取用户信息失败,操作异常',
            success: function (res) {

            }
          })
        }
      }
    });
  },



  /**
       * 获取初始数据
       */




  /**
   * 获取初始数据
   */
  initData: function (fn) {
    try {
      var appInstance = getApp();
      if (fn != undefined) {
        if (appInstance.configData) {
          return fn(appInstance.configData);
        }
      }
      var update_ts = wx.getStorageSync('update_ts')
      var configData = wx.getStorageSync('configData');
      util.AJAX1(config.updateTsUrl, {}, "get", {}, function (res) {
        console.log(res)
        if (res.data.status == "ok") {
          var newUpdate_ts = res.data.value;
          if (update_ts == newUpdate_ts && configData) {
            that.configData = configData;
            if (fn != undefined) {
              return fn(configData);
            }
          } else {
            try {
              wx.setStorageSync('update_ts', newUpdate_ts);
              that.getConfig(function (configData) {
                wx.setStorageSync('configData', configData);
                that.configData = configData;
                if (fn != undefined) {
                  return fn(configData);
                }
              });

            } catch (e) {
              that.configFailTip();
            }
          }
        } else {
          that.configFailTip();
        }
      });

    } catch (e) {
      // Do something when catch error
    }
  },




  /**
   * 获取初始数据
   */
  getConfig: function (fn) {
    util.AJAX1(config.configUrl, {}, "get", {}, function (res) {
      if (res.data.status == "ok") {
        var configData = res.data.config;
        return fn(configData);
      } else {
        that.configFailTip();
      }
    });
  },


  configFailTip: function () {
    var failCount = that.globalData.failCount;
    if (failCount < 2) {
      that.globalData.failCount++;
      that.initData();

    } else {
      wx.showModal({
        title: '提示',
        content: '出现未知错误,点击右下方的客服按钮咨询',
      })
    }
  },




  /**
   * 获取初始数据
   */
  getLocation: function (cb) {
    var that = this;
    var lacation = wx.getStorageSync('lacation');
    var ts = Date.parse(new Date());
    if (typeof lacation == 'undefined' || lacation == '') {
      return that.Lacation(cb);
    } else if ((ts - Number(lacation.split("|")[2])) < 300 * 1000) {
      console.log("本地有lacation");
      var res = new Object();
      res.longitude = Number(lacation.split("|")[0]);
      res.latitude = Number(lacation.split("|")[1]);
      return cb(res);
    } else {
      return that.Lacation(cb);
    }
  },

  Lacation: function (cb) {
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var long = res.longitude
        var lat = res.latitude;
        var ts = Date.parse(new Date());
        var lacation = long + "|" + lat + "|" + ts;
        wx.setStorageSync('lacation', lacation);
        cb(res);
      },
      fail: function (res) {
        var res = new Object();
        res.longitude = 0;
        res.latitude = 0;
        cb(res);
      },
    });
  },

  /**
   * 初始化数据
   */
  Imprint: function (cb) {
    wx.login({
      success: function (resLogin) {
        if (resLogin.code) {
          wx.getSystemInfo({
            success: function (sysres) {
             var ext_info=JSON.stringify(sysres);
              wx.getUserInfo({
                success: function (resInfo) {
                  var encryptedData = resInfo.encryptedData
                  var code = resLogin.code
                  var iv = resInfo.iv
                  wx.request({
                    url: config.wxloginUrl,
                    data: { code: code, encryptedData: encryptedData, iv: iv, ext_info: ext_info },
                    method: "post",
                    success: function (res) {
                      console.log("===" + res)
                      console.log(res.data.is_admin)
                      var imprint = res.data.imprint;
                      var is_admin = res.data.is_admin;
                      if (!imprint) {
                        return;
                      }
                      that.initData(function (configData) {
                        var mock_openid = configData.mock_openid;
                        var admin_openid = configData.admin_openid;
                        if (mock_openid != "no" && is_admin) {
                          imprint = mock_openid;
                          that.globalData.isMock = true;
                        }
                        wx.setStorageSync('imprint', imprint);
                        wx.setStorageSync('tclist', res.data.tclist);
                        wx.setStorageSync('cclist', res.data.cclist);
                        if (cb.length > 1) {
                          cb(imprint, res.data.cclist, res.data.tclist);
                        } else {
                          cb(imprint);
                        }
                        return res.data.imprint;
                      });
                    }
                  })
                },
                fail: function (res) {
                  cb("error")
                }
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '获取用户信息失败,操作异常',
            success: function (res) {

            }
          })
        }
      }
    });
  },
})
