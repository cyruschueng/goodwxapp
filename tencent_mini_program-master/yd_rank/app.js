//app.js
var util = require("/utils/util");
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.wxInfo && this.globalData.ydInfo && this.globalData.userId ){
      typeof cb == "function" && cb(this.globalData)
    }else{
      //调用登录接口
      wx.login({
      success: function(res) {
        if (res.code) {
          console.log("================拿到code================\n",res );
          util.requestApi("/wx_app/wxapp_login", { "withCredentials": 'true',"code": res.code ,"login_source": "group_rank" }, function (res) {
            console.log("================拿到openId================\n",res);            
            var openId = res.openid;
            // ===============use code to reques================
            wx.getUserInfo({
              "withCredentials" : true,
              success: function (res) {
                console.log("================拿到微信数据================\n",res);
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country

                that.globalData.wxInfo = res.userInfo
                // ================微信于悦动关联================
                var encryptedData = res.encryptedData;
                var iv = res.iv;
                util.requestApi("/wx_app/wxapp_register", 
                  { "openid": openId, "encrypted": encryptedData, "iv": iv }, 
                  function (res) {
                    console.log("================拿到悦动数据================\n",res);
                    var userId = res.user_id;
                    // that.setData({
                    //   userId: userId
                    // })
                    that.globalData.userId = userId;
                    util.requestApi("/ydwxapp_rank/get_user_group_rank",
                      {"user_id":userId},
                      function (res){
                        console.log("================拿到地区排名================\n",res);
                        // that.setData({
                        //   ydInfo : res
                        // });
                        that.globalData.ydInfo = res
                      }
                    );
                  }
                );
                // ================微信于悦动关联结束================
              }
            });
          });
        } 
        // no res.code
        else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }

        // success: function () {
        //   wx.getUserInfo({
        //     success: function (res) {
        //       that.globalData.userInfo = res.userInfo
        //       typeof cb == "function" && cb(that.globalData.userInfo)
        //     }
        //   })
         
      });
    }
      typeof cb == "function" && cb(that.globalData)
    
  },
  globalData:{
    userInfo:null,
    wxInfo: {},
    ydInfo: {},
    userId: null
  },
  
})
