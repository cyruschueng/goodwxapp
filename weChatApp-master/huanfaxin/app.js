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
  },
    globalData:{
        user:null,
        previews:{},
        system_info:null
    }
})