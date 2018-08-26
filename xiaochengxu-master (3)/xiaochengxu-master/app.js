//app.js
App({
  globalData: {
    i:1
  },
  //获取头像
  onLaunch: function () {
    console.log('lanch')
    //调用API从本地缓存中获取数据  
    // var logs = wx.getStorageSync('logs') || []  
    // logs.unshift(Date.now())  
    // wx.setStorageSync('logs', logs)
    //首次授权同意后跳转获取头像
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          console.log('auth')
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log('buth')
              // 用户已经同意小程序使用用户信息，后续调用 wx.userinfo接口不会弹窗询问
               wx.redirectTo({
                 url: '/pages/notice/notice',
              })
            }
          })
        }
      }
    })

      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          this.globalData.userInfo = res.userInfo
          console.log('已经搜全') 

        
        }
      })

  },  
 

  
  onShow: function (ops) {
    /* 在获取群聊 ID 之前，切记要先调用 wx.login
     * 取得 code 之后，再向微信获取 session_key
     * 才能正常解密相应数据
     * 否则要么接口会调用失败，要么无法正常解密数据
     * 参见：https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html
     */
    var thiz = this;
    console.log('app')
    wx.login({
      withCredentials : true,
      success: function (res) {
        if (res.code) {
          //console.log(res.code) // 使用这个 code 向微信换取 session_key
          thiz.globalData.code = res.code
          console.log('code')
       
        }
      },
      //失败跳转到提示首页
      fail: function () {
        wx.redirectTo({
          url: '/pages/notice/notice',
        })
      }
     
    })
    if (ops.scene == 1044) { // 当用户通过带 shareTicket 的分享卡片进入小程序时，小程序才开始读取群聊信息
      // console.log(ops.shareTicket)  你可以取消这段代码的注释，将 shareTicket 输出至控制台
      console.log('1044')
           wx.getShareInfo({
            shareTicket: ops.shareTicket,
            success(res) {
              //console.log(res) // 输出加密后的当前群聊的 openGId
              console.log('iv')
              thiz.globalData.iv = res.iv;
              thiz.globalData.encryptedData = res.encryptedData;
              setTimeout(function(){
                wx.redirectTo({
                  url: '/pages/home/home',
                })
              },300)
              console.log('Red')
            },
            //失败跳转到提示首页
            fail:function(){
              wx.redirectTo({
                url: '/pages/notice/notice',
              })
            }
          })
 

      /* 特别注意：
       * 如果希望在开发者工具中，调试用户通过 1044 场景值进入小程序的情况
       * 请在开发者工具中选择「自定义编译」，场景选择 1044
       */
    }else{
      //不是在群里打开的,需要跳转到首页
      
      setTimeout(function () {   
        wx.redirectTo({
          url: '/pages/notice/notice',
        })
      }, 300)
      console.log('跳notice')
    }
  
  },
})