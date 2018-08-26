//app.js
const app = getApp();
const util = require('utils/util.js');
const common = require('js/common.js');
//const decode = require('js/WXBizDataCrypt.js');
const appid = 'wx3d00770652053edd';
var that;
App({
  onLaunch: function () {
    that = this;
    // 获取分享内容
    wx.getShareInfo({
      shareTicket: 'shareTicket',
      success: function (res) {
        console.log("获取分享info成功：");
        console.log(res);
      },
      fail: function (res) {
        console.log("获取分享info失败：");
        console.log(res);
      }
    })

    // 登录
    wx.login({
      success: res => {
        that.globalData.code = res.code;    
        wx.setStorageSync("code", res.code);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials:true,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              //console.log(res);
            }
          })
        }
      }
    })
  },
  onShow: function(){
    this.globalData.phoneInfo = common.phoneInfo();
  },
  globalData: {
    userInfo: null,
    phoneInfo:'',
    //code:'',
    imgDir:"https://xcxs1.xizai.com/pintu/images/",
    //imgDir:"http://xcx.s1.welcomest.com/pintu/images/"
    // sessionKey:'',
    // openId:'',
    // unionId:''
  },
  onSuccess: function (methodName,res){
    console.log(methodName);
    console.log(res);
    if (res.statusCode == 200){
      let ret = res.data;
      if(ret.code == 200){
        let data = ret.data;
        switch (methodName){
          case '':
            
            break;
        }

      }else{
        common.showErrorTip(ret.msg);
      }      
    }else{
      console.log("接口有问题：" + methodName);
    }
  },
  onFail: function (methodName){
    console.log("接口调用失败："+methodName);
  },
  onComplete: function (methodName){}
})