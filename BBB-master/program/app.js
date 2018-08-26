//app.js
const APPID = 'wx54231d717faf9546';
const SECRET = 'bde1565093996f734f0389402f2a1bea';
const HOST = 'https://bit.macsen318.com/xcx';
console.log('version: 0.0.3');
App({
  onLaunch: function (ops) {
    console.log('ops'+JSON.stringify(ops));
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('ops', ops);
    logs.unshift(Date.now()) 
    wx.setStorageSync('logs', logs)
    that.getUserInfo();
    wx.checkSession({
          success: function () {
            //session 未过期，并且在本生命周期一直有效
            //that.login();
            that.getOpenGid(ops);
          },
          fail: function () {
            console.log('登陆过期');
            //登录态过期
            that.login() //重新登录
            that.getOpenGid(ops);
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          wx.setStorageSync('userInfo', res.userInfo);
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  login:function(){
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if (res.code) {
          wx.setStorageSync('code', res.code);
          //发起网络请求
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${res.code}&grant_type=authorization_code`,
            success: function (res) {
              wx.setStorageSync('openid', res.data.openid);
              wx.setStorageSync('session_key', res.data.session_key);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  getOpenGid:function(ops){
    var that = this;
    //获取openGid
    console.log('ops.scene' + ops.scene);
    if (ops.scene == 1044 || ops.scene == 1008) { // 当用户通过带 shareTicket 的分享卡片进入小程序时，小程序才开始读取群聊信息
    wx.setStorageSync('from', 1);
    //if (ops.scene == 1034) { //测试
     // console.log(ops.shareTicket)  //你可以取消这段代码的注释，将 shareTicket 输出至控制台
      /*wx.getShareInfo({
        shareTicket: ops.shareTicket,
        complete(res) {
          //console.log(`获取openGid${res}`) // 输出加密后的当前群聊的 openGId
          wx.setStorageSync('opengid', res.encryptedData);
          that.getTokenByGroup();
        }
      })*/ 
     
    }else{
      //获取token
      //that.getTokenByList();
      wx.setStorageSync('from', 2);
      //wx.navigateTo({
        //url: "/pages/bindex/bindex"
      //});
    }
  },
  //从小程序列表
  getTokenByList:function(){ 
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    let openid = wx.getStorageSync('openid');
    let url = `${HOST}/main/addUser/${openid}`;
    openid && wx.request({
      url:url,
     header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",  
      success: function (res) {
        wx.hideLoading();
        wx.setStorageSync('token', res.data.details.token);
      },
      fail:function(){
        wx.hideLoading()
      }
    })
  },
  //从群分享中进入
  getTokenByGroup: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let openid = wx.getStorageSync('openid');
    let openGid = wx.getStorageSync('opengid');
    let url = `${HOST}/main/addUser/${openid}/${openGid}`;
    openGid && wx.request({
      url: url,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        wx.setStorageSync('token', res.data.details.token);
      },
      fail: function () {
        wx.hideLoading()
      }
    })
  },
  globalData: {
    userInfo: null
  }
})