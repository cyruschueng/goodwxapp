const loginUrl = require('./common/config').loginUrl
var request = require('./common/request/request');
var util = require('./common/utils/utils');

App({
  data: {
    title: 'Forward活动管理',
    key: null,
    userinfo: null,
    /**
     * 上次获取的时间
     */
    created_at: null,
    /**
     * 用户初次进入时候的url
     */
    entryUrl: '/page/index/index',
    /**
     * 用户进入时候的Options
     */
    entryOptions: null,
    /**
     * 是否以上报stats
     */
    statsReported: false,
    /**
     * 用户信息已上报
     */
    userinfoReported: false,
    /**
     * userid
     */
    userid: '',
    /**
     * 版本号
     */
    version: 'v.0001'
  },
  onLaunch: function (options) {
    if (options == undefined) {
      util.tooLowVersion()
      return
    }
    console.log('onLaunch: ', options)

    var self = this;
    var query = ''

    for (var q in options.query) {
      var qv = options.query[q]
      var subQuery = `${q}=${qv}`

      if (q == 'scene') {
        qv = decodeURIComponent(qv)
        var scene = util.parseScene(qv)
        options.query.id = scene.id
        options.query.x = scene.x

        subQuery = `id=${scene.id}&x=${scene.x}`
      }

      if (query == '') {
        query = subQuery
      } else {
        query = `${query}&${subQuery}`
      }
    }

    self.data.entryUrl = `/${options.path}${query}`

    delete options.query.scene
    self.data.entryOptions = options

    if ('shareTicket' in options) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          console.info(res)

          self.data.entryOptions['iv'] = res.iv
          self.data.entryOptions['encryptedData'] = res.encryptedData
        },
        fail: function (res) {
          console.error(res)
        }
      })
    }

    /**
     * 结果通知页面不获取授权
     */
    if (options.path == 'page/error/error' || options.path == 'page/success/success') { }
    else {
      self.authorize();
    }

    /**
     * 启动后10秒上报用户信息
     */
    setTimeout(function () {
      // self.reportUserInfo();
    }, 10 * 1000);

    /**
     * 启动后20秒上报stats
     */
    setTimeout(function () {
      // self.reportStats();
    }, 20 * 1000);
  },
  /**
   * 上报用户信息
   */
  reportUserInfo: function (callback) {
    if (callback == undefined) callback = null
    var self = this

    self.hasScopeUserInfo(function () {
      self.userinfo(false, callback)
    })
  },
  /**
   * 用户信息是否已授权
   */
  hasScopeUserInfo: function (hasCallback) {
    if (wx.getSetting) {
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
          } else {
            hasCallback()
          }
        }
      })
    } else {
      util.tooLowVersion()
      return
    }
  },
  /**
   * 用户授权
   */
  authorize: function (callback) {
    if (callback == undefined) callback = null
    var self = this

    wx.authorize({
      scope: 'scope.userInfo',
      success() {
        if (callback != null) callback();
      },
      fail: function (err) {
        util.showModal('您拒绝授权给Forward活动管理, 部分功能将无法使用, 是否重新授权?', '', true, function () {
          wx.openSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                self.reportUserInfo(callback)
              }
            }
          })
        })
      }
    })
  },
  /**
   * 更新用户信息
   */
  userinfo: function (noUpdate, callback) {
    if (noUpdate == undefined) noUpdate = false
    if (callback == undefined) callback = null

    var self = this

    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        self.data.userinfo = res.userInfo

        if (noUpdate) {
          callback()
        } else {
          if (util.updateUserInfo() && !self.data.userinfoReported) {
            delete res.errMsg
            delete res.rawData
            delete res.signature

            request.update(res, 'front/userinfo', function (data) {
              console.info(data)

              util.setAllStorage(data.data, function () {
                self.data.created_at = data.data.created_at
              }, 'created_at')

              self.data.userinfoReported = true

              if (callback != null) callback()

            }, function (data) {
              // util.showModal(data.msg + ': ' + data.data)
              util.removeAllStorage(function () {
                console.error(data)
              })

              if (callback != null) callback()
            })
          } else {
            if (callback != null) callback()
          }
        }
      }
    })
  },
  /**
  * 上报stats
  */
  reportStats: function () {
    var self = this
    if (!self.data.statsReported) {
      request.post(self.data.entryOptions, 'front/stats', function (data) {
        console.info(data)
        self.data.statsReported = true
      }, function (data) {
        console.error(data)
      })
    }
  },
  login: function (callback) {
    var self = this;

    var loginParam = {}

    try {
      loginParam = wx.getSystemInfoSync()
    } catch (e) {
      console.error(e)
    }

    wx.login({
      success: function (data) {
        loginParam.code = data.code

        request.post(loginParam,
          loginUrl,
          function (data) {
            util.removeAllStorage(function () {
              util.setAllStorage(data.data, function () {
                self.data.key = data.data.session_id
                self.data.created_at = data.data.created_at
                self.data.userid = data.data.userid

                callback(null, data.data)
              })
            })
          },
          function (data) {
            callback(data)
          },
          false
        )
      },
      fail: function (err) {
        callback(err)
      }
    })
  },
  getToken: function (callback, refreshToken) {
    if (refreshToken == undefined) refreshToken = false

    var self = this

    util.getAllStorage(function (storage) {
      self.data.key = storage.key
      self.data.created_at = storage.created_at
      self.data.userid = storage.userid

      if (self.data.key && !refreshToken) {
        wx.checkSession({
          success: function () {
            callback(null, self.data.key)
          },
          fail: function () {
            self.login(function (err, data) {
              if (!err) {
                callback(null, self.data.key)
              } else {
                console.error(err)
              }
            })
          }
        })
      } else {
        self.login(function (err, data) {
          if (!err) {
            callback(null, self.data.key)
          } else {
            console.error(err)
          }
        })
      }
    })
  }
})
