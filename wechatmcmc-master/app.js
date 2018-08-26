//app.js
var userinfotemp;
 var logo;
 var name;
App({

  onLaunch: function () {
    //调用API从本地缓存中获取数据

  },
  getUserInfo: function (cb) {
    var that = this
    // this.globalData.userInfo
    
    var wxopenid = wx.getStorageSync('wxopenid')
    var creattime = parseInt(wx.getStorageSync('creattime'));
    var timestamp = parseInt(new Date().getTime() / 1000);
    var userinfot = wx.getStorageSync('userinfo');
    // console.log("过期时间为：" + (timestamp - creattime))
    if (wxopenid && timestamp - creattime <= 3600) {
      this.globalData.userInfo = userinfot;
      typeof cb == "function" && cb(this.globalData.userInfo)
      // console.log("不执行下面")
    } else {
      //调用登录接口
      wx.login({

        success: function (resa) {
          // 获取登录状态

          wx.getUserInfo({
            success: function (res) {

              that.globalData.userInfo = res.userInfo
              userinfotemp = res.userInfo;
              logo = res.userInfo.avatarUrl;
              name = res.userInfo.nickName;
              wx.setStorageSync('userinfo', res.userInfo)
              wx.setStorageSync('logo', res.userInfo.avatarUrl)
              wx.setStorageSync('wxname', res.userInfo.nickName)

              typeof cb == "function" && cb(that.globalData.userInfo)

            },
            complete: function (res) {
              if (resa.code) {
                wx.showToast({
                  title: '正在登录…',
                  icon: 'loading',
                  duration: 10000
                });
                // 获取数据


                wx.request({
                  url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=loginAction', //真实的接口地址
                  // method: 'get',
                  data: {
                    code: resa.code,
                    logo: logo,
                    name: name
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {

                    wx.setStorageSync('wxopenid', res.data.openid)
                    wx.setStorageSync('session_id', res.data.session_id)
                    wx.setStorageSync('creattime', res.data.creattime)
                    wx.setStorageSync('session_key', res.data.session_key)


                    // 隐藏提示
                    wx.hideToast()
                  },
                  // 接口调用失败
                  fail: function () {

                  },
                  complete: function () {
                  }
                })
              } else {
                // 获取登录状态失败
                // console.log("登录失败")
              }
            }

          })


        }

     
})
     
    }
  },
  globalData: {
    userInfo: {},
  },
  
})
