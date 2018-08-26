//app.js
App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success(res){
        wx.getUserInfo({
          success(res){
            that.globalData.userInfo = res.userInfo;
            console.log(that.globalData.userInfo)
          }
        })
      }
    })
  },
  MAP_URL:'https://apis.map.qq.com/',
  MAP_KEY:'TPIBZ-UFVRS-ELLOK-6XR6T-QBAO5-I6FFD',
  globalData: {
    userInfo: null
  }
})