//app.js
var WeToast=require('/pages/wetoast/wetoast.js')  
App({
  WeToast,
  onLaunch: function() {
    
  },

  doLogin:function(){
    var that=this
    wx.login({
      success: function (res) {
        console.log('js_code:'+res.code)
        if (res.code) {
          wx.request({
            url: that.globalData.serverUrl + 'onLogin.als',
            data: { code: res.code },
            success: function (res2) {
              if (res2.data.status == 0) {
                try{
                  wx.setStorageSync('token',res2.data.token)
                  that.getUserInfo(function(userInfo){
                      that.updateUserInfo(userInfo)
                  })
                }catch (e) {}
              }
            }
          })
        }
      }
    })
  },

  updateUserInfo:function(userInfo){
    var that=this
    wx.request({
      url: that.globalData.serverUrl+'updateNick.als',
      data:{token:wx.getStorageSync('token'),nickName:userInfo.nickName},
      success:function(res){
        if(res.data.status==-1){
          // wx.showToast({
          //   title: '出错了',
          // })
        }
      }
    })
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  //获得两个经纬度之间的距离
  getDistance:function(lat1, lng1, lat2, lng2){
    var radLat1 = lat1 * Math.PI / 180.0
    var radLat2 = lat2 * Math.PI / 180.0
    var a = radLat1 - radLat2
    var  b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
    s = s * 6378.137 ;// EARTH_RADIUS
    s = Math.round(s * 10000) / 10000
    return s
  },

  globalData: {
    userInfo: null,
    serverUrl:"https://www.rankyoo.com/srimplApp/",
    isupdate:0,
    useStatus:0
  }
})
