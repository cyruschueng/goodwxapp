//app.js
App({
  onLaunch: function (opt) {
    var that = this;
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    //opt.scene=1044;
    console.log(opt);
    that.getUserInfo().then(function(){
      if (opt.scene == 1044) {
        wx.getShareInfo({
          shareTicket: opt.shareTicket,
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            that.getGroupInfo(encryptedData, iv);
          },
          fail: function () {
            console.log("getShareInfo获取信息失败");
          }
        })
      }
    });
  },
  onError:function(error){
    console.log(error);
  },
  login:function(fn){
    var that = this;
    wx.login({
      success: function (logindata) {
        wx.getUserInfo({
          success: function (res) {
            that.globalData.userInfo = res.userInfo
            that.globalData.session_code = logindata.code;
            console.log(res);
            wx.showLoading({
              title: '加载中',
            })
            wx.request({
              url: that.globalData.domain + '/getSessionkey?code=' + logindata.code,
              success: function (res) {
                that.globalData.userInfo.openid = res.data.openid;
                if (res.data.session_key) {
                  wx.hideLoading()
                  that.globalData.session_key = res.data.session_key;
                  typeof fn == "function" && fn()
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              }
            })
          }
        })
      }
    })
  },
  getUserInfo:  function () {
    var that = this;
    var p = new Promise(function (resolve, reject) {
      wx.checkSession({
        success: function () {
          if (that.globalData.userInfo) {
            resolve();
          } else {
            that.login(resolve);
          }
        },
        fail: function () {
          that.login(resolve);
        }
      })
    });
    return p;
  },
  getGroupInfo: function (dataStr, iv) {
    var that = this
    wx.request({
      url: that.globalData.domain + '/design?',
      data: {
        key: (that.globalData.session_key),
        data: (dataStr),
        iv: (iv)
      },
      success: function (res) {
        that.globalData.userInfo.groupid = res.data.openGId;
        console.log(that.globalData.userInfo);
      }
    })

  },
  globalData: {
    domain:"http://localhost:5757/weapp",
    //domain: "https://l9lflzgq.qcloud.la/weapp",
    //domain:"https://828602187.wx-t.club/weapp",
    userInfo: null,
    session_key: null,
    session_code: null,
    scoreRule:[
      {name:"倔强青铜",start:0,end:100},
      { name: "秩序白银", start: 100, end: 300 },
      { name: "荣耀黄金", start: 300, end: 500 },
      { name: "尊贵铂金", start: 500, end: 800 },
      { name: "永恒砖石", start: 800, end: 1000 },
      { name: "至尊星耀", start: 1000, end: 1200 },
      { name: "最强王者", start: 1200, end: 10000000 },
      ]
  }
})