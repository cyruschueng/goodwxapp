//app.js
// {
// "iconPath": "pictures/topic.png",
//   "selectedIconPath": "pictures/topic_active.png",
//     "text": "话题",
//       "pagePath": "pages/topic/topic"
//       },
App({
  onLaunch: function(res) {
    var that = this


    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    
    this.userCheckLogin();
    this.getUserInfo();
    this.getSysInfo();

    var idx = setInterval(function(){
      // 存储用户信息
      var dt = that.globalData;
      console.log(dt)
      if (dt.userInfo)
      // 小程序初始化，授权后
      wx.request({
        url: dt.url + '/admin/wx/usersave',
        method: 'POST',
        data: {
          'openid': dt.openid,
          'avatarUrl': dt.userInfo.avatarUrl,
          'nickName': dt.userInfo.nickName,
          'gender': dt.userInfo.gender,
          'province': dt.userInfo.province,
          'city': dt.userInfo.city
        },
        success: function (res) { 
          clearInterval(idx)
        },
        fail: function(){
          clearInterval(idx)
        }
      })
    },3000)

  },
  
  onShow: function(res){
    // 小程序从被分享群打开
    this.getTickets(res);
  },

  /**
   * 用户登录
   * https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject
   */
  userCheckLogin: function(callback){
    var that = this;
    wx.login({
      success: function (res) {
        // console.log(res)
        // console.log("wxlogin1")
        if (res.code) {
          that.globalData.code = res.code

          //发起网络请求，使用登录凭证 code 获取 session_key 和 openid
          wx.request({
            url: that.globalData.url + '/admin/wx/getopenid',
            data: {
              code: res.code
            },
            success: function(res){
              that.globalData.openid = res.data.openid;
              console.log("that.globalData")
            
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              })
              if (typeof callback == 'function') {
                callback(res);
              }

            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function(){
        // console.log("wxlogin2")
      }
    });
  },


/**
 * 获取用户信息并设置globalData
 */
  getUserInfo: function(cb) {
    // console.log("app.userinfo")
    var that = this
    if (this.globalData.userInfo) {
      // console.log("app.userinfo2")
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      // console.log("app.userinfo3.5")
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          // console.log("app.userinfo3")
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  /**
   * getTickets
   */
  getTickets: function(res){
    if(res.shareTickets){
      console.log(res);
      wx.showModal({
        title: '',
        content: res.shareTickets[0],
      })
      // wx.getShareInfo({
      //   shareTicket: res.shareTickets[0],
      // })
    }
  },


/**
 * 添加分类数据的监听
 */
  addListener: function (callback) {
    this.callback = callback;
  },
  setChangedData: function (data) {
    this.data = data;
    if (this.callback != null) {
      this.callback(data);
    }
  },


/**
 * 获取设备信息
 */
  getSysInfo: function(){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var article_width = res.windowWidth * 0.92
        that.globalData.article_width = article_width;
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      },
    })
  },


  /**
   * 调整维护升级类消息设计
   */
  // testUpdate: function () {
  //   var that = this;
  //   var bl = true;
  //   // wx.showModal({
  //   //   title: '通知',
  //   //   showCancel: false,
  //   //   content: '因小程序升级，暂时关闭部分功能',
  //   // })
  //   wx.request({
  //     url: that.globalData.url + '/wx/update?',
  //     success: function(res){
  //       var result = res;
  //       if(result.update == true){
  //         wx.showModal({
  //           title: '通知',
  //           showCancel: false,
  //           content: '因小程序升级，暂时关闭部分功能',
  //         })
  //       }
        
  //     }
  //   })

  //   return bl;
  // },



/**
 * 全局变量
 */
  globalData: {
    userInfo: null,
    code: null,
    openid: null,
    url: "https://shtongnian.com",
    article_width: 0
  }
})
