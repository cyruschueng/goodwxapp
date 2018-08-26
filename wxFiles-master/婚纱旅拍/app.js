//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var that=this;
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
                success: function (res1) {
                   wx.getUserInfo({
                    success: function (res) {
                      that.globalData.userInfo = res.userInfo
                      typeof cb == "function" && cb(that.globalData.userInfo);
                      wx.request({
                        url: that.globalData.IP+'wx/login.do',
                        data: {code:res1.code,head:that.globalData.userInfo.avatarUrl},
                        method: 'GET', 
                        success: function(res){
                          if(res.data==40163||res.data==40029)
                          {
                          that.globalData.UID=wx.getStorageSync('UID');     
                          }else
                          {
                            that.globalData.openid=res.data.openid
                            that.globalData.UID=res.data.id
                            wx.setStorageSync('UID', that.globalData.UID)
                          }
                        },
                      })
                    }
       })
                }
              }); 
    }
  },
  globalData:{
    userInfo:null,
    IP:"https://www.medusachina.com/hslp/",
    openid:null,
    UID:0,
    slider:[],
    kplb:[],
    pt:0
  }
})