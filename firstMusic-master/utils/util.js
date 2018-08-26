var app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function jump() {
  wx.navigateToMiniProgram({
    appId: 'wx22c7c27ae08bb935',
    path: 'pages/index/index?scene=92c8a0964d1c6e8f0a33daf3a42798a5',
    envVersion: 'release',
    success(res) {
      // 打开成功
      console.log(res);
    },
    fail(res) {
      console.log(res);
    }
  })
}
// 保存formid
function formSubmit(e) {
  let that = this;
  let form_id = e.detail.formId;
  wx.request({
    url: "https://w.kuaiduodian.com/api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
    data: {
      form_id: form_id
    },
    header: {
      'content-type': 'application/json'
    },
    method: "GET",
    success: function (res) {

    }
  })
}
function auth(cb) {
  var sign = wx.getStorageSync('sign');
  var that = this;
  const apiurl = 'https://w.kuaiduodian.com/';

  wx.getUserInfo({
    success: function (res) {
      console.log("保存信息");
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
        url: apiurl + 'api/save-user-info?sign=' + sign + '&operator_id=654321',
        method: 'POST',
        data: {
          info: userData
        },
        success: function (res) {
          console.log("保存信息", res);
          wx.setStorageSync('userInfo', userData);
          // that.data.authSuccess = true;
          typeof cb == "function" && cb();
        }
      })
    },
    fail: function () {
      console.log("用户拒绝授权");
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法正常使用体验。请10分钟后再次点击授权，或者删除小程序重新进入。',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            wx.openSetting({
              success: (res) => {
                console.log(res);
                wx.getUserInfo({
                  success: function (res) {
                    console.log("保存信息");
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
                      url: apiurl + 'api/save-user-info?sign=' + sign + '&operator_id=123456',
                      method: 'POST',
                      data: {
                        info: userData
                      },
                      success: function (res) {
                        console.log("保存信息", res);
                        // that.data.authSuccess = true;
                        typeof cb == "function" && cb();
                      }
                    })
                  },
                })
              }
            })
          }
        }
      })

    },
  })

}
module.exports = {
  formatTime,
  jump,
  formSubmit,
  auth
}
