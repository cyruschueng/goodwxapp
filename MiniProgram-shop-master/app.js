//app.js
App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        // console.log('-----',res)
        if (res.code) {
          var user_code = res.code;
          
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              // console.log('====', res)
              var user_info = res;
              wx.setStorageSync('user_info', res.userInfo);//存储用户信息 
              var l = 'http://gdpj.5268w.com/app.php?c=User'; console.log('code', user_code)

              var fuserId = wx.getStorageSync('fuserId')
              console.log('fuserId--', fuserId)
              wx.request({
                url: l,
                data: {
                  code: user_code,
                  user_info: res.rawData,
                  fuserid: fuserId
                },
                method: 'GET',
                success: function (res) {
                  console.log('denglu', res)
                  wx.setStorageSync('user_id', res.data.user_id);//存储用户id 
                },
              });
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }, 
  globalData: {
    userInfo: null,
    web_url: 'http://gdpj.5268w.com/'
  }
})