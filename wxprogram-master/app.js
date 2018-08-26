//app.js
App({
  onLaunch: function () {
    var self = this
    this.userlogin()
    var apiurl = this.globalData.apiURL
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        wx.request({
          url: apiurl + '/city/geocoder?lat=' + res.latitude + '&lon=' + res.longitude,
          success: function (res) {
            self.globalData.cityid = res.data.result.cityId
          }
        })
      },
      fail: function (res) {
        wx.request({
          url: apiurl + '/city/geocoder',
          success: function (res) {
            self.globalData.cityid = res.data.result.cityId
          }
        })
      },
    })
  },
  userlogin: function () {
    var self = this
    wx.login({
      success: res1 => {
        if (res1.code) {
          // 获取用户信息
          wx.getUserInfo({
            success: res2 => {
              this.globalData.userInfo = res2.userInfo
              //post res1.code, res2., res2.iv to server, retrieve memberid and token.
              wx.request({
                url: this.globalData.apiURL + '/member/login',
                data: {
                  code: res1.code,
                  iv: res2.iv,
                  encryptedData: res2.encryptedData,
                },
                method: 'POST',
                success: function (res) {
                  //console.log(res.data.result.result)
                  wx.setStorageSync('memberid', res.data.result.result.memberId)
                  wx.setStorageSync('token', res.data.result.result.token)
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回, 加入 callback 以防止
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res2)
              }
            },
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    geter: {},
    cityid: '826000001',
    apiURL: 'https://eugo.chinaotttv.com/api'
    //apiURL: 'https://eulingcodgo.chinaotttv.com/api'
  }
})
