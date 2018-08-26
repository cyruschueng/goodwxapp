//app.js

var wxRequest = require("./utils/wxRequest.js");
var wxApi = require("./utils/wxApi.js");

App({
  onLaunch: function (options) {
    if (options.shareTicket && options.scene && options.scene==1044) {
      wx.setStorageSync("group", {
        shareTicket: options.shareTicket,
        scene: options.scene
      })
    }else{
      wx.removeStorageSync("group");
    }
  },

  getUserInfo:function(cb){
    var that=this;
    wx.checkSession({
      success:function(){
        if(that.globalData.userInfo==null || wx.getStorageSync('sessionId')==''){
          that.login();
        }else{
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      },fail:function(){
        that.login();
      }
    })
  },
  clearSession:function(){
    wx.clearStorageSync()
  },
  login:function(f){
    var that=this
    var host=this.globalData.host;
    var wxLogin = wxApi.wxLogin();
    wxLogin().then(res=>{
      console.log(res);
      var url = host + '/api/login';
      var data = JSON.stringify({
        code: res.code
      });
      /*获取sessionId */
      return wxRequest.postRequest(url, data);
    }).then(res=>{
      /* 成功获取到sessionId*/
      /* 保存sessionId 以备后期使用*/
      wx.setStorageSync('sessionId', res.data.sessionId);
      console.log(res);
      /*获取用户信息 */
      var wxGetUserInfo=  wxApi.wxGetUserInfo();
      return wxGetUserInfo();
    }).then(res=>{
      console.log("userInfo");
      /*u成功获取到UserInfo*/
      /* 全局保存UserInfo 以备后期使用*/
      console.log(res );
      wx.setStorageSync("userInfo", res.userInfo);
      /*保存注册的用户信息 */
      var url = host + '/api/login/decode/userinof';
      var data=JSON.stringify({
        encryptedData: res.encryptedData,
        iv: res.iv,
        sessionId: wx.getStorageSync('sessionId')
      });
      return wxRequest.postRequest(url, data);
    }).then(res=>{
      console.log("用户信息注册成功");
      console.log(res);
      var sessionId = wx.getStorageSync('sessionId');
      var userInfo = wx.getStorageSync('userInfo');
      console.log("check");
      console.log(sessionId);
      console.log(userInfo);
      typeof f == "function" && f();
    })
  },
  check:function(){
    var sessionId = wx.getStorageSync('sessionId');
    var userInfo = wx.getStorageSync('userInfo');
    console.log("check");
    console.log(sessionId);
    console.log(userInfo);
    if (sessionId == '' || userInfo == '' || userInfo == null || sessionId == null) {
      return false;
    }else{
      return true;
    }
  },
  checkSessionId:function(f){
    var that=this;
    var host = this.globalData.host;
    var sessionId= wx.getStorageSync('sessionId');
    var userInfo = wx.getStorageSync('userInfo');
    console.log("sessionIdsessionIdsessionIdsessionId")
    console.log(sessionId)
    console.log(userInfo)
    if(sessionId=='' || userInfo=='' || userInfo==null || sessionId==null){
      this.login(f)

    }else{
      console.log("")
      wx.request({
        url: host + '/api/habit/checksessionid/' + sessionId,
        method: "GET",
        success: function (res) {
          console.log("checksessionid");
          console.log(res);
          if(res.data.success==true){
            typeof f == "function" && f();
          }else{
            that.login(f)
          }
        },
        fail:function(){
          that.login(f)
        }
      })
    }
  },
  group: function (shareTicket, sessionId) {
    if (shareTicket) {
      wxApi.wxGetShareInfo(shareTicket).then(res=>{
        console.log("res");
        console.log(res);
        var url ="http://161s5g6007.51mypc.cn/api/habit/group/groupid";
        var data=JSON.stringify({
          encryptedData: res.encryptedData,
          iv: res.iv,
          sessionid: sessionId
        });
        wxRequest.postRequest(url,data).then(res=>{
          console.log("groupID");
          console.log(res);
        })
      })
    }
  },
  globalData:{
    userInfo:null,
    host:"http://161s5g6007.51mypc.cn",
    host1:"http://localhost:29564",
    scene:'',
    shareTicket:''
  }
})