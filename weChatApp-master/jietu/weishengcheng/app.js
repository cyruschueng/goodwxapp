//app.js

App({
  onLaunch: function () {
      this.globalData.system_info = wx.getSystemInfoSync()
      var user = wx.getStorageSync('user');
      if(user&&user.unionid){
        this.globalData.user = user;
      }else if(user){
        wx.removeStorageSync('user');
      }
    setTimeout(function(){wx.showTabBarRedDot({index:1});},500)
  },
  onHide:function () {
    var alpclipboard = wx.getStorageSync('alpclipboard');
    if (wx.setClipboardData && alpclipboard) {
      wx.setClipboardData({
        data: alpclipboard,
        success: function(re) {
        }
      })
    }
  },
    globalData:{
        user:null,
        previews:{},
        system_info:null
    }
})