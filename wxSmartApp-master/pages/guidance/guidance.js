Page({
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    color: "#ffd843"
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  gologe: function () {
    wx.setStorage({
      key: "welcome",
      data: true
    })
    wx.redirectTo({
      url: '../login/login',
    })

  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  onLoad: function () {
    let that = this;

    wx.getSetting({
      success(auth) {
        console.log("授权")
        if (!auth.authSetting['scope.userInfo'] || !auth.authSetting['scope.userLocation']) {
          console.log("aaa");
        } else {
          wx.redirectTo({
            url: '../login/login'
          })
        }
      }
    })
    wx.getStorage({
      key: 'welcome',
      success: function (res) {
        console.log(res.data);
        if (res.data == true) {
          wx.redirectTo({
            url: '../login/login'
          })

        }
      }
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})