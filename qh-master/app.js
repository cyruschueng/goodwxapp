//app.js
App({
  onLaunch: function (re) {
    // 展示本地存储能力
    console.log("re=", re)
    var logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('logs', re)
    console.log("id=", re.query.id)
    this.globalData.id = re.query.id;
      // this.globalData.id = 1111;
    console.log("this.globalData.id=", this.globalData.id)
    // var scene = 1007;
    var scene = re.scene;
    console.log("scene=",scene)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;
        if (code) {
          console.log('获取用户登录凭证：' + code);
          this.globalData.code = code
        
         
        } else {
          console.log('获取用户登录态失败：' + res.errMsg);
        }
      }
    })
    var urls ='pages/index/index'
    if (scene == 1044 || scene == 1007) {
      urls ='pages/share/share'
    } else {
      urls ='pages/index/index'
    }
console.log(urls)
    wx.redirectTo({
      url: urls
    })
    
         
  }, 
  // onShow: function (options) {
  //   console.log('options=', options)
  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       var code = res.code;
  //       if (code) {
  //         console.log('获取用户登录凭证1：' + code);
  //         this.globalData.code = code


  //       } else {
  //         console.log('获取用户登录态失败：' + res.errMsg);
  //       }
  //     }
  //   })
  // },
  globalData: { 
    id: 0,
    code: ''  
  }
})