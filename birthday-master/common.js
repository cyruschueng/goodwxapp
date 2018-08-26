//返回首页
const apiurl = 'https://friend-guess.playonwechat.com/';
function getSign(cb){
  var that = this;
  wx.login({
    success(res) {
      let kid = wx.getStorageSync("kid");
      let sign = wx.getStorageSync("sign");
      if (res.code) {
        //发起网络请求
        wx.request({
          url: apiurl + 'api/auth?code=' + res.code + '&operator_id=' + kid,
          data: {
            code: res.code
          },
          success: function (res) {
            console.log("成功");
            //console.log(res);
            //console.log("sign:", res.data.data.sign);
            sign = res.data.data.sign;
            try {
              wx.setStorageSync('sign', res.data.data.sign);
              wx.setStorageSync('mid', res.data.data.mid);
              wx.getUserInfo({
                success: function (res) {
                  console.log("微信信息");
                 // console.log(res);
                  let userData = {};
                  let userInfo = res.userInfo
                  let nickName = userInfo.nickName
                  let avatarUrl = userInfo.avatarUrl
                  let gender = userInfo.gender //性别 0：未知、1：男、2：女
                  let province = userInfo.province
                  let city = userInfo.city
                  let country = userInfo.country;
                  wx.setStorageSync('userInfo', userInfo);//缓存存用户信息
                  userData = {
                    nickName: nickName,
                    avatarUrl: avatarUrl,
                    gender: gender,
                    province: province,
                    city: city,
                    country: country
                  };
                  wx.request({
                    url: apiurl + '/api/save-user-info?sign=' + sign + '&operator_id=' + kid,
                    method: 'POST',
                    data: {
                      info: userData
                    },
                    success: function (res) {
                     // console.log("保存信息", res);
                      //that.data.authSuccess = true
                      setTimeout(function () {
                        wx.hideLoading()
                      }, 500)
                    }
                  })
                },
                fail: function () {
                  console.log("用户拒绝授权");
                  wx.openSetting({
                    success: (res) => {
                      console.log(res);
                    }
                  })
                },
              })
            } catch (e) {
              console.log("回话异常：" + e);

            }

          },
        })

      } else {
        console.log('获取用户登录态失败！' + res.errMsg);
      }
    }
  })
}
//24h时间戳
function timestamp(){
    let sign = wx.getStorageSync("sign");
    let kid = wx.getStorageSync("kid");
    wx.request({
      url: apiurl + "red/refunded?sign=" + sign + '&operator_id=' + kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("24h:", res);
        let timestamp = Date.parse(new Date());
        console.log(timestamp);
        wx.setStorageSync('timestamp', timestamp);
      }
    })  
}
//通过module.exports暴露给其他问件引用
//模块化
module.exports = {
  getSign: getSign,
  timestamp: timestamp
}
