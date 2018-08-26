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
  getUserInfo: function (callback,options){
    var that = this;
    if (this.globalData.userInfo != null && this.globalData.userInfo.nickName && wx.getStorageSync('sessionId')!='' ) {
      typeof callback == "function" && callback(this.globalData.userInfo);
    }else{
      console.info("getUserInfo");
      wx.login({
        success:function(res){
          console.info("getUserInfoA");
          if (res.code) {
            var url = that.globalData.host + '/api/login';
            var data = JSON.stringify({
              code: res.code
            });
            /*获取sessionId */
            wxRequest.postRequest(url, data).then(res=>{
              console.info("getUserInfoB");
              wx.setStorageSync('sessionId', res.data.sessionId);
              if ( options && options.scene==1044){
                that.getGroupDataFrom1044(options.shareTicket);
              }else{
                that.getGroupDataFromOther();
              }
              var wxGetUserInfo = wxApi.wxGetUserInfo();
              wxGetUserInfo().then(res => {
                that.globalData.userInfo = res.userInfo;
                //解密数据
                var url = that.globalData.host + '/api/login/decode/userinof';
                var data = JSON.stringify({
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  sessionId: wx.getStorageSync('sessionId')
                });
                wxRequest.postRequest(url, data)
              }).then(()=>{
                typeof callback == "function" && callback(this.globalData.userInfo);
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
  getGroupId:function(){
    wxApi.wxGetShareInfo(this.globalData.shareTicket).then(res => {
      var url = this.globalData.host + '/api/habit/group/groupid/state';
      var data = JSON.stringify({
        encryptedData: res.encryptedData,
        iv: res.iv,
        sessionid: wx.getStorageSync('sessionId')
      });
      return wxRequest.postRequest(url, data)
    }).then(res => {
      that.setData({ 'group.state': res.data.result, 'group.group_id': res.data.group_id })
      app.globalData.groupId = res.data.group_id;

      console.log("group state:");
      console.log(res);
    })
  },

  getGroupDataFrom1044: function (shareTicket){
    var that=this;
    wxApi.wxGetShareInfo(shareTicket).then(res => {
      var url = this.globalData.host + '/api/habit/group/enter/scene/1044';
      var data = JSON.stringify({
        encryptedData: res.encryptedData,
        iv: res.iv,
        sessionid: wx.getStorageSync('sessionId')
      });
      return wxRequest.postRequest(url, data)
    }).then(res=>{
      console.info("getGroupDataFrom1044");
      console.info(res);
      that.globalData.group.id = res.data.group.id;
      that.globalData.group.name=res.data.group.name;
    })
  },
  getGroupDataFromOther:function(){
    var that=this;
    var url = this.globalData.host + '/api/habit/group/enter/scene/other';
    var data = JSON.stringify({
      sessionid: wx.getStorageSync('sessionId')
    });
    wxRequest.postRequest(url, data).then(res=>{   
      that.globalData.group.id = res.data.group.id;
      that.globalData.group.name = res.data.group.name;
    });
  },
  checkGroupData:function(){
    wx.showModal({
      title: '提示',
      content: '请先加入群',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/hb/hb',
          })
        }
      }
    })
  },
  globalData:{
    userInfo:null,
    encryptedData:'',
    iv:'',
    host:"http://161s5g6007.51mypc.cn",
    host2:"http://localhost:29564",
    host2:'https://weixin.jiajiaozhihui.cn',
    scene:'',
    shareTicket:'',
    groupId:0,
    isAuthorize:false,
    group:{
      id:0,
      name:''
    }
  }
})