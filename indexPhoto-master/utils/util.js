var app = getApp();
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  auth: auth
}


function auth(cb){
  var sign = app.data.sign;
  var that = this;
  wx.getUserInfo({
    withCredentials: true,
    success: function (res) {
      console.log("用户info",res);
      var userData = {};
      var nickName = res.userInfo.nickName;
      var avatarUrl = res.userInfo.avatarUrl;
      var city = res.userInfo.city;
      var country = res.userInfo.country;
      var province = res.userInfo.province;
      var language = res.userInfo.language;
      var sex = res.userInfo.gender; 

      var encryptedData = res.encryptedData;
      var iv = res.iv;
      var rawData = res.rawData;
      var signature = res.signature;

      userData = {
        nickname: nickName,
        headimgurl: avatarUrl,
        city: city,
        country: country,
        province: province,
        sex: sex,
        language: language,
        encryptedData: encryptedData,
        iv: iv,
        rawData: rawData,
        signature: signature
      }

      app.data.nickName = nickName;
      app.data.avatarUrl = avatarUrl;

      wx.setStorageSync("nickName", nickName);
      wx.setStorageSync("avatarUrl", avatarUrl);

      wx.request({
        url: app.data.apiurl +'api/save-user-info?sign=' + sign + '&operator_id=' + wx.getStorageSync("operator_id"),
        method: "POST",
        data:{
          info: userData
        },
        success: function(res){
          console.log("保存用户数据",res)
          typeof cb == "function" && cb();
        }
      })

      app.globalData.userInfo = res.userInfo;
    },
    fail: function(res){
      wx.showModal({
        title: '温馨提示',
        confirmText: '前往授权',
        content: '小程序需要获取您微信的昵称和头像，才可以测试出题并且生成默契证书',
        success: function (res) {
          if (res.confirm) {
            wx.openSetting({
              success: (res) => {
                wx.getUserInfo({
                  success: function (res) {
                    console.log("用户info", res);
                    var userData = {};
                    var nickName = res.userInfo.nickName;
                    var avatarUrl = res.userInfo.avatarUrl;
                    var city = res.userInfo.city;
                    var country = res.userInfo.country;
                    var province = res.userInfo.province;
                    var language = res.userInfo.language;
                    var sex = res.userInfo.gender;

                    userData = {
                      nickname: nickName,
                      headimgurl: avatarUrl,
                      city: city,
                      country: country,
                      province: province,
                      sex: sex,
                      language: language
                    }

                    app.data.nickName = nickName;
                    app.data.avatarUrl = avatarUrl;

                    wx.setStorageSync("nickName", nickName);
                    wx.setStorageSync("avatarUrl", avatarUrl);

                    wx.request({
                      url: app.data.apiurl + 'api/save-user-info?sign=' + sign + '&operator_id=' + wx.getStorageSync("operator_id") + '&cc=cc',
                      method: "POST",
                      data: {
                        info: userData
                      },
                      success: function (res) {
                        console.log("保存用户数据", res)
                        typeof cb == "function" && cb();
                      }
                    })

                    app.globalData.userInfo = res.userInfo;
                  }
                })
              }
            })
          }else{
            wx.showToast({
              title: '授权失败',
            })
          }

        }
      })
    }
  })
 
}