//app.js


//let path = "http://localhost/di";

//let path ="https://app.liguangxu.top/di";

let path = "https://api.didicharging.com/di";

App({
  onLaunch: function () {
    let that = this;

    wx.getSystemInfo({
      success: function (res) {
        var kScreenW = res.windowWidth / 375
        var kScreenH = res.windowHeight / 603
        wx.setStorageSync('kScreenW', kScreenW)
        wx.setStorageSync('kScreenH', kScreenH)
        wx.setStorageSync('windowWidth', res.windowWidth)
        wx.setStorageSync('windowHeight', res.windowHeight)        

      }
    });
     
  }, 

  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo != null) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {

      //调用登录接口
      wx.login({
        success: function (res1) {
          if (res1.code) {
            wx.getUserInfo({
              success: function (res) {
                console.log(res);
                app.globalData.userInfo = res.userInfo
            
                wx.request({
                  url: path + '/gateway/onMiniProgramLogin',
                  method: 'post',
                  data: {
                    code: res1.code, 
                    userInfo: res.userInfo,
                    rawData: res.rawData,
                    signature: res.signature
                  },
                  //post success
                  success: function (res2) {

                    console.log(res2);

                    app.globalData.accessToken = res2.data.result.accessToken;
                    
                    app.globalData.userId = res2.data.result.data.id;

                  }
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }
  },
 
  globalData: {
    PATH: path, 
    IMG_PATH: "http://didicharging-v2.oss-cn-beijing.aliyuncs.com/code",
    VIDEO_PATH: "http://didicharging-v2.oss-cn-beijing.aliyuncs.com/video",
    userInfo: null,  
    account: null
  }
  
})
