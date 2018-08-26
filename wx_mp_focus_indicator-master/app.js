//app.js
var RequestUtil = require("./utils/RequestUtil.js");
var base64 = require("./utils/base64.js");
App({
  /**
   * 生命周期函数--监听小程序初始化
   */
  onLaunch: function(options) {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    console.log('app onLaunch:', options)
    var self = this //指代本作用域的对象
    // 获取转发信息
    wx.getShareInfo({
      shareTicket: options.shareTicket,
      success: function (res) {
        console.log('getShareInfo success:', res)
        // 更新globalData数据
        self.globalData.shareInfoEncryptedData = res.encryptedData;
        self.globalData.shareInfoIv = res.iv;
      },
      fail: function (fail) {
        console.log('getShareInfo fail', fail)
      }
    });
    // 获取新的用户登录态
    // wx.login({
    //   success: function(res) {
    //     console.log(res)
    //     if (res.code) {
    //       // 更新globalData的用户code
    //       self.globalData.userCode = res.code;
    //       // 获取系统信息
    //       self.getSystemInfo()
    //       // 获取用户信息，完成后调用getLoginInfo()服务端登录接口，以提交信息和获取分配的websocket访问路径、openid等信息
    //       self.getWxUserInfo()
    //       console.log('获取用户登录态成功！ code: ' + res.code)
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // });

    // 检测当前用户登录态是否有效
    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function(){
        //登录态过期
        console.log('登录态过期')
        //重新登录
        wx.login({
          success: function(res) {
            console.log(res)
            if (res.code) {
              console.log('获取用户登录态成功！ code: ' + res.code)
              self.globalData.userCode = res.code;
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        });
      }
    })
  },

  /**
   * APP的初始数据
   */
  globalData: {
    userInfo: null, //用户信息
    systemInfo: null, //用户设备的系统信息
    globaldata: 'global',
    scene: null, //场景值
    session_key: '', //本次登录的 会话密钥
    openid: '', //用户的唯一标识
    userCode: '', //用户登录凭证，用于换取用户登录态信息
    encryptedData: '', //用户信息包括敏感数据在内的完整用户信息的加密数据
    iv: '', //用户信息  加密算法的初始向量
    shareInfoEncryptedData: '', //转发详细信息包括敏感数据在内的完整转发信息的加密数据
    shareInfoIv: '', //转发详细信息加密算法的初始向量
    webSocketOpen: false, //websocket是否连接的标志
    hostname: 'star.ibiliang.com',
    // hostname: 'wxapp.ibiliang.com',
    version: '0.17.0930', //websockt服务服务端匹配的版本
    wsUrl: false, //用于保存服务端分配的websocket访问路径
    keywordVal: '', // 查询的关键词
    keywordRuleVal: '', // 用于保存服务端返回keyword_rule的值
    getStream: true, //用于请求服务端是否需要进度
    searchTitle: '', //用于保存搜索关键词全文的app全局变量
    NavigationBarTitle: '', //定义导航条标题的app全局变量
    appId: 'wxab348a6c8bc28bac', // 公众号的appID
    cardId: 'pScawwNi3OUJi0FX5OVSdb0hsuhY', // 卡券ID
    signatureUrl: 'https://wxapp.ibiliang.com/util/wx/api/v1/public/jssdk/signature', // 获取js-sdk签名的接口地址
    decryptCodeUrl: 'https://wxapp.ibiliang.com/util/wx/api/v1/public/card/decrypt_code', // 获取解码code的接口地址
    saveUrl: 'https://wxapp.ibiliang.com/util/wx/api/v1/public/card/save',   // 领取后保存会员卡信息的接口地址
    memberUrl: 'https://wxapp.ibiliang.com/util/wx/api/v1/public/card/member', // 修改会员积分的接口地址
    memberCode: '', // 会员卡号
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var self = this
    let ws_url = this.globalData.wsUrl
    // 存入场景值
    this.globalData.scene = options.scene
    // 连接打开websocket
    // if (ws_url) {
    //   this.webSocketClientConnect(ws_url);
    // }
    // 获取新的用户登录态
    wx.login({
      success: function(res) {
        console.log(res)
        if (res.code) {
          // 更新globalData的用户code
          self.globalData.userCode = res.code;
          // 获取系统信息
          self.getSystemInfo()
          // 获取用户信息，完成后调用getLoginInfo()服务端登录接口，以提交信息和获取分配的websocket访问路径、openid等信息
          self.getWxUserInfo()
          console.log('获取用户登录态成功！ code: ' + res.code)
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // 
    console.log('打开小程序的路径:', options.path);
    console.log('打开小程序的query:', options.query);
    console.log('打开小程序的场景值:', options.scene);
    console.log('shareTicket:', options.shareTicket);
    console.log('当场景为由另一个小程序打开时:', options.referrerInfo);
    // 判断场景值，更新keywordRuleVal
    if (options.scene == 1007 || options.scene == 1008 || options.scene == 1044) {
      if (options.query.keywordRuleVal) {
        this.globalData.keywordRuleVal = JSON.parse(decodeURIComponent(options.query.keywordRuleVal));
        console.log(this.globalData.keywordRuleVal)
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 关闭 WebSocket 连接
    wx.closeSocket()
  },

  /**
   * 获取用户信息, 调用该方法返回用户信息
   */
  getUserInfo: function(cb) {
    var self = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          console.log('getUserInfo 获取用户信息:', res)
          self.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(self.globalData.userInfo)
        }
      })
    }
  },

  /**
   * 获取用户信息
   */
  getWxUserInfo: function(cb) {
    var self = this
    //调用登录接口
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        console.log('getUserInfo 获取用户信息:', res)
        self.globalData.userInfo = res.userInfo
        self.globalData.encryptedData = res.encryptedData
        self.globalData.iv = res.iv
        // 
        self.getLoginInfo()
      }
    })
  },

  /**
   * 获取系统信息
   */
  getSystemInfo: function() {
    var self = this
    //调用系统信息接口
    wx.getSystemInfo({
      success: function(res) {
        console.log('getSystemInfo 获取系统信息:', res)
        self.globalData.systemInfo = res;
        // console.log('获取系统信息成功:', res)
        // console.log('手机型号:', res.model)
        // console.log('设备像素比:', res.pixelRatio)
        // console.log('屏幕宽度:', res.windowWidth)
        // console.log('屏幕高度:', res.windowHeight)
        // console.log('微信设置的语言:', res.language)
        // console.log('微信版本号:', res.version)
        // console.log('操作系统版本:', res.system)
        // console.log('客户端平台:', res.platform)
      }
    })
  },

  /**
   *  初始化登录接口,提交相关信息,获取分配的websocket访问路径、openid等信息
   */
  getLoginInfo: function() {
    var self = this
    let userCode = this.globalData.userCode
    let hostname = this.globalData.hostname
    let version = this.globalData.version
    let userInfo = this.globalData.userInfo
    let systemInfo = this.globalData.systemInfo
    let scene = this.globalData.scene
    let iv = this.globalData.iv
    let url = 'https://' + hostname + '/api/v1/login'
    let encrypted_data = {
      userInfo: userInfo,
      systemInfo: systemInfo,
      scene, scene
    }
    // 对数据进行base64转换加密处理
    encrypted_data = base64.encode(JSON.stringify(encrypted_data))
    let data = {
      app: 'focus-indicator',
      version: version,
      js_code: userCode,
      encrypted_data: encrypted_data,
      iv, iv
    }
    // 发起网络请求，获取分配的websocket访问路径、openid等信息
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function(res) {
        console.log('app login request url:', url)
        console.log('app login request data:', data)
        console.log('js_code网络请求成功 res:', JSON.stringify(res))
        console.log('js_code网络请求成功 res:', res)
        console.log('js_code网络请求成功 encrypted_data:', base64.decode(encrypted_data))

        // 获取分配websocket的URL路径
        self.globalData.wsUrl = res.data.ws_url;
        // 获取openid
        self.globalData.openid = res.data.data.openid
        // 获取session_key
        self.globalData.session_key = res.data.data.session_key
        // unionid解码接口调用
        self.getUnionid()
        // OpenGId解码接口调用
        self.getOpenGId()
        if (res.data.ws_url) {
          // 启动websocket客户端连接
          self.webSocketClientConnect(res.data.ws_url);
        }
      }
    })
  },

  /**
   * unionid解码
   */
  getUnionid: function() {
    var self = this
    let hostname = this.globalData.hostname
    let session_key = this.globalData.session_key
    let encryptedData = this.globalData.encryptedData
    let iv = this.globalData.iv
    // let url = 'https://' + hostname + '/api/v1/login?app=focus-indicator&version=' + version + '&js_code=' + res.code
    let url = 'https://' + hostname + '/api/v1/decrypt'
    let data = {
      app: 'focus-indicator',
      session_key: session_key,
      encrypted_data: encryptedData,
      iv: iv
    }
    // 发起网络请求，上传session_key、encryptedData等信息
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function(res) {
        console.log('getUnionid request url:',url)
        console.log('getUnionid request data:',data)
        console.log('unionid解码网络请求成功', res)
      }
    })
  },

  /**
   * OpenGId解码
   */
  getOpenGId: function() {
    var self = this
    let hostname = this.globalData.hostname
    let session_key = this.globalData.session_key
    let shareInfoEncryptedData = this.globalData.shareInfoEncryptedData
    let shareInfoIv = this.globalData.shareInfoIv
    let url = 'https://' + hostname + '/api/v1/decrypt'
    let data = {
      app: 'focus-indicator',
      session_key: session_key,
      encrypted_data: shareInfoEncryptedData,
      iv: shareInfoIv
    }
    // 发起网络请求，上传session_key、shareInfoEncryptedData等信息
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function(res) {
        console.log('getOpenGId request url:',url)
        console.log('getOpenGId request data:',data)
        console.log('getOpenGId解码网络请求成功', res)
      }
    })
  },

  /**
   * WebSocket 连接，并监听连接情况
   */
  webSocketClientConnect: function (ws_url) {
    console.log('webSocketClientConnect')
    var self = this
    let hostname = this.globalData.hostname
    // let url = 'wss://star.ibiliang.com' + ws_url
    let url = 'wss://' + hostname + ws_url
    RequestUtil.connect(url,
      function() {
        //onSocketOpen，连接成功
        console.log('connect success, onSocketOpen.');
        console.log('websocket url:', url);
        // self.globalData.webSocketOpen = true;
        let onlineTitle = self.globalData.NavigationBarTitle
        //动态设置当前页面导航条的标题
        wx.setNavigationBarTitle({
          title: onlineTitle,
          success: function (res) {
          console.log('success app navTitle:', res)
          console.log('online app navTitle:', onlineTitle)
          },
          fail: function(err) {
            console.log('fail app navTitle:', err)
          }
        })
      },
      function(res) {
        //onSocketError，连接错误
        console.log('connect fail, onSocketError.', res);
        // self.globalData.webSocketOpen = false;
      },
      function(res) {
        //onSocketClose，连接关闭
        console.log('connect close, onSocketClose.', res);
        // self.globalData.webSocketOpen = false;
        let outlineTitle = self.globalData.NavigationBarTitle + '（离线）'
        //动态设置当前页面导航条的标题
        wx.setNavigationBarTitle({
          title: outlineTitle,
          success: function (res) {
          console.log('success app navTitle:', res)
          console.log('outline app navTitle:', outlineTitle)
          },
          fail: function(err) {
            console.log('fail app navTitle:', err)
          }
        })
      },
      function(data) {
        //broadcast
        console.log('broadcast', data);
      }
    )
  }

})