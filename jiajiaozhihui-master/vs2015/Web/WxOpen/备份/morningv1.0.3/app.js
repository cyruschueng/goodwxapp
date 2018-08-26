//app.js

var wxRequest = require("./utils/wxRequest.js");
var wxApi = require("./utils/wxApi.js");
App({
  onLaunch: function (options) {
    this.getUserInfo(null,options);
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
  getUserInfo: function (callback,options){
    var that = this;
    var host = this.globalData.host;
    var options = options;

    if (this.globalData.userInfo != null && this.globalData.userInfo.nickName) {
      
      typeof callback == "function" && callback(this.globalData.userInfo);
      console.log("我的值");
      console.log(this.globalData.userInfo);
      if(this.globalData.groupId==0){
        that.groupBusiness(options);
      }
    }else{
      wx.login({
        success:function(res){
          if (res.code) {
            that.groupBusiness(options);
            var url = host + '/api/login';
            var data = JSON.stringify({
              code: res.code
            });
            /*获取sessionId */
            wxRequest.postRequest(url, data).then(res=>{
              wx.setStorageSync('sessionId', res.data.sessionId);
              var wxGetUserInfo = wxApi.wxGetUserInfo();
              wxGetUserInfo().then(res => {
                that.globalData.userInfo = res.userInfo;
                //解密数据
                var url = host + '/api/login/decode/userinof';
                var data = JSON.stringify({
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  sessionId: wx.getStorageSync('sessionId')
                });
                wxRequest.postRequest(url, data)
              });
            })
          }
        }
      })
    }
  },
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

  groupBusiness:function(options){
    if(options){
      if (options.scene && options.scene != 1044) {
        if (this.globalData.groupId == 0) {
          wx.redirectTo({
            url: '/pages/group/group',
          })
        }
      } else if (options.shareTicket) {
        //分享处理
        this.globalData.shareTicket = options.shareTicket;
      }
    }
  },
  /*群选技 */
  selectGroupId: function () {
    wx.showModal({
      title: '提示',
      content: '请选择一个群',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/group/group'
          })
        } else if (res.cancel) {
          return;
        }
      }
    })
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
    groupId:0,
    isAuthorize:false
  }
})