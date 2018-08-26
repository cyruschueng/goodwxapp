//app.js
App({
  onLaunch: function (options) {
    var that = this;
    //开发阶段一直false 之后启用判断 wx.getStorageSync('flag') == 3 && wx.getStorageSync('ptuserinfo')
    if (false ){
      //判断session是否有效
      wx.checkSession({
        success:function(){
          that.globalData.uid = wx.getStorageSync('ptuserinfo').userid;
        },
        fail:function(){
          wxlogin();
        }
        
      })
    }else{
      //无效
      wxlogin();
    }


    function wxlogin(){
      // 登录
      wx.login({
        success: function (res) {
          if (res.code) {
            var code = res.code;
      
            wx.request({
              url: that.globalData.apiBase+"index.php/weixin/weixinapi.html",
              header: {
                'content-type': 'application/json'
              },
              type: 'GET',
              data: { code: res.code },
              success: function (res) {
                // console.log(that);
                //获取openid
                wx.setStorageSync('flag', res.data.code)
                wx.setStorageSync('trd_session', res.data.trd_session);

                if (res.data.code == 3) {
                  wx.setStorageSync('ptuserinfo', res.data.ptuserinfo);
                  that.globalData.uid = res.data.ptuserinfo.userid;
                  that.globalData.trd_session = res.data.trd_session
                  //console.log('有效1');
                  // wx.switchTab({
                  //   url: 'pages/index/index',
                  // })
                }

              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        //如果获取过授权
        if ("undefined" != typeof res.authSetting['scope.userInfo']){
          //如果之前用户拒绝授权，不再弹窗获取授权
          if (res.authSetting['scope.userInfo']) {
           // console.log('2');
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }else{
          //console.log('3');
          //弹窗获取授权
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    apiBase: "http://www.zyylpt.com/",
    trd_session:"",
    userInfo: null,
    uid: "",
    userid: null,
    username: null
  }
})