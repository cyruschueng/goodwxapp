//app.js
App({
  onLaunch: function (options) {
    console.log(options);
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //获取openid
        wx.request({
          url: that.globalData.host + "GetOpenId",
          data: res,
          method: 'POST',
          header: { 'content-type': "application/x-www-form-urlencoded" },
          success: function (e) {
            console.log(e.data);
            that.globalData.secret = e.data;
            // 获取用户信息，并上传服务器
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo
                //将用户信息openID,nickName,avatarUrl,上传服务器
                let cs = {};
                console.log("以下是globalData的数据：");
                console.log(that.globalData);
                cs.nickName = that.globalData.userInfo.nickName;
                cs.openID = that.globalData.secret.openid;
                cs.avatarUrl = that.globalData.userInfo.avatarUrl;
                wx.request({
                  url: that.globalData.host + "InsertUserInfoszys",
                  data: cs,
                  method: 'POST',
                  header: { 'content-type': "application/x-www-form-urlencoded" },
                  success: function (e) {
                    console.log(e);
                  }
                });
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
                //获取群id，前提是通过群排名进入小程序的用户，否则下面的步骤都不会执行
                wx.getShareInfo({
                  shareTicket: options.shareTicket,
                  success: function (e) {
                    console.log(e);
                    let cs = e;
                    cs['session_key'] = that.globalData.secret.session_key;
                    wx.request({
                      url: that.globalData.host + "JieMi",
                      data: cs,
                      method: 'POST',
                      header: { 'content-type': "application/x-www-form-urlencoded" },
                      success: function (e) {
                        console.log(e);
                        that.globalData.openGId = e.data.openGId;//群id

                      }
                    });
                  }
                });//end of wx.getShareInfo
              }
            });//end of wx.getUserInfo
          }
        });
      }
    });//end of wx.login
    //验证授权
    wx.request({
      url: this.globalData.host + "GetDiscription",
      data: { page: 'authority' },
      method: 'POST',
      header: { 'content-type': "application/x-www-form-urlencoded" },
      success: function (e) {
        that.globalData.authority = e.data;
      }
    });
  },
  onShow: function (options) {

  },
  globalData: {
    userInfo: null,
    //host: "http://localhost:8080/shenfei/"
    host: "https://miracle.duapp.com/",
    authority: '是'
  }
})