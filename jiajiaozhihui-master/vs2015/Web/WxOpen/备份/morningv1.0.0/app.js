//app.js

var wxRequest = require("./utils/wxRequest.js");
var wxApi = require("./utils/wxApi.js");

App({
  onLaunch: function (options) {
    //this.getUserInfo();
    /*
    console.log("options="+JSON.stringify(options) );
    this.globalData.scene = options.scene;
    this.globalData.shareTicket = options.shareTicket;
    */
    if (options.shareTicket){
      this.group(options.shareTicket);
      var that=this;
      //this.checkSessionId();
      
    }
    if (options.scene == 1044){
      /*
      wx.redirectTo({
        url: 'pages/join/join?path=' + options.path + '&query=' + JSON.stringify(options.query)
      })
      */
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
      //wx.setStorageSync('sessionId', res.data.sessionId);
      console.log(res);
      /*获取用户信息 */
      var wxGetUserInfo=  wxApi.wxGetUserInfo();
      return wxGetUserInfo();
    }).then(res=>{
      console.log("userInfo");
      /*u成功获取到UserInfo*/
      /* 全局保存UserInfo 以备后期使用*/
      console.log(res );
      that.globalData.userInfo = res.userInfo;
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
    })
    /*
    wx.login({
      success: function (res) {
        wx.request({
          url: host+"/api/login",
          method: 'POST',
          data:JSON.stringify({code: res.code}),
          success: function(res) {
            var result = res.data;
            if(result.success){
              wx.setStorageSync('sessionId', result.sessionId);
              console.log("...sessionid.....");
              wx.getUserInfo({
                success:function(userInfoRes){
                  console.log('get userinfo',userInfoRes);
                  that.globalData.userInfo = userInfoRes.userInfo;
                  wx.setStorageSync('userInfo', userInfoRes.userInfo);
                  console.log("....................");
                  console.log(that.globalData.userInfo);
                  //校验
                  wx.request({
                    url: host+'/api/login/check',
                    method: 'POST',
                    data:JSON.stringify({
                      sessionId: wx.getStorageSync('sessionId'),
                      rawData:userInfoRes.rawData,
                      signature:userInfoRes.signature
                    }),
                    success:function(json){
                      console.log(json.data);
                      //解密数据（建议放到校验success回调函数中，此处仅为演示）
                      wx.request({
                        url: host+'/api/login/decode/userinof',
                        method: 'POST',
                        data: JSON.stringify({
                          sessionId: wx.getStorageSync('sessionId'),
                          encryptedData:userInfoRes.encryptedData,
                          iv:userInfoRes.iv
                        }),
                        success:function(json){
                          console.log(json.data);
                          typeof f == "function" && f();
                        },fail:function(){

                        }
                      });
                    }
                  });
                }
              });
            }
          }
        })
      }
    });
  */



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