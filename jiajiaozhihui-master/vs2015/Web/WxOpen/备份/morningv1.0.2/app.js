//app.js

var wxRequest = require("./utils/wxRequest.js");
var wxApi = require("./utils/wxApi.js");
App({
  onLaunch: function (options) {
    this.clearSession();

    var that=this;
    /*
    wx.checkSession({
      success:function(){
        if (wx.getStorageSync('sessionId')){
          
        }else{
          console.log("内容清楚完成！");

          that.login();
        }
      },fail:function(){
        that.login();
      }
    })
    */
    
    this.login();

    /*
    if (options.scene && options.scene!=1044) {
      if(this.globalData.groupId==0){
        wx.redirectTo({
          url: '/pages/group/group',
        })
      }
    }else if (options.shareTicket){
      //分享处理
      this.globalData.shareTicket = options.shareTicket;
    }
    */
  },
  clearSession:function(){
    wx.clearStorageSync();
    if (this.globalData.userInfo){

    }else{
      this.globalData.userInfo=null;
    }
  },
  login: function (callback){
    var that=this
    var host=this.globalData.host;
    var wxLogin = wxApi.wxLogin();
    wxLogin().then(res=>{
      var url = host + '/api/login';
      var data = JSON.stringify({
        code: res.code
      });
      /*获取sessionId */
      return wxRequest.postRequest(url, data);
    }).then(res=>{
        /* 成功获取到sessionId*/
        /* 保存sessionId 以备后期使用*/
      console.log("save sessionId");
      console.log(res);
      wx.setStorageSync('sessionId', res.data.sessionId);
      
      typeof callback == "function" && callback();
    })
  },
  getUserInfo: function (callback){
    var that = this
    if (this.globalData.userInfo) {
      typeof callback == "function" && callback(this.globalData.userInfo)
    }else{
      /*获取用户信息 */
      var wxGetUserInfo = wxApi.wxGetUserInfo();
      wxGetUserInfo().then(res => {
        console.log("userInfo");
        /*u成功获取到UserInfo*/
        /* 全局保存UserInfo 以备后期使用*/
        console.log(res);
        that.globalData.userInfo = res.userInfo;
        that.globalData.encryptedData = res.encryptedData;
        that.globalData.iv = res.iv;

      }).then(()=>{
        that.saveUserInfo();
      }).finally(() => {
        typeof callback == "function" && callback(that.globalData.userInfo);
      })
    }
  },
  saveUserInfo:function(){
    var that = this
    var host = this.globalData.host;
    /*保存注册的用户信息 */
    var url = host + '/api/login/decode/userinof';
    var data = JSON.stringify({
      encryptedData: this.globalData.encryptedData,
      iv: this.globalData.iv,
      sessionId: wx.getStorageSync('sessionId')
    });
    wxRequest.postRequest(url, data);
  },
  /*
  check:function(){
    var sessionId = wx.getStorageSync('sessionId');
    console.log("check="+ sessionId);

    if (sessionId == '' || sessionId == null) {
      return false;
    }else{
      return true;
    }
  },
  */
  ready:function (fn) {
    var interval = setInterval(function () {
      var sessionId = wx.getStorageSync("sessionId")
      console.log("ready sessionId=" + sessionId);
      if (sessionId) {
        clearInterval(interval);
        typeof fn == "function" && fn();
      }
    }, 500)
  },
  checkSessionId: function (success, fail) {
    var sessionId = wx.getStorageSync('sessionId');
    if (sessionId == '' || sessionId == null) {
      typeof fail == "function" && fail();
    } else {
      typeof success == "function" && success();
    };
    return sessionId;
  },
/*
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
  */
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
    encryptedData:'',
    iv:'',
    host2:"http://161s5g6007.51mypc.cn",
    host1:"http://localhost:29564",
    host:'https://weixin.jiajiaozhihui.cn',
    scene:'',
    shareTicket:'',
    groupId:0
  }
})