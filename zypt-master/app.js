//app.js
App({
  onLaunch: function (options) {
    var that = this;
    //开发阶段一直false 之后启用判断 wx.getStorageSync('flag') == 3 && wx.getStorageSync('ptuserinfo')
    if (wx.getStorageSync('flag') == 3 && wx.getStorageSync('ptuserinfo') ){
      //判断session是否有效
      wx.checkSession({
        success:function(){
          that.globalData.uid = wx.getStorageSync('ptuserinfo').userid;
          that.globalData.trd_session = wx.getStorageSync('ptuserinfo').trd_session;
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
                that.globalData.trd_session = res.data.trd_session;
                if (res.data.code == 3) {
                  wx.setStorageSync('ptuserinfo', res.data.ptuserinfo);
                  that.globalData.uid = res.data.ptuserinfo.userid;
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
        if (res.authSetting['scope.userInfo']) {
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
        }else{
          //弹窗获取授权
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              //合并加入trd
              var combine = Object.assign(res.userInfo,{trd_session: that.globalData.trd_session});
              //用户第一次授权，将info信息返回服务器
              wx.request({
                url: that.globalData.apiBase + "index.php/weixin/setInfo.html",
                header: {
                  'content-type': 'application/json'
                },
                type: 'GET',
                data: combine,
                success: function (res) {
                      console.log(res);
                }
              })

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                console.log(this.userInfoReadyCallback(res));
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    apiBase: "https://www.zhongyoupingtai.com/",
    trd_session:"",
   // userInfo: null,
    uid: "2", 
    userid: null,
   //username: null
  }
})