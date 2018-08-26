//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        that.globalData.code = res.code
        that.getUserInfo();// 获取用户信息
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });

  },

  // 获取用户信息
  getUserInfo: function () {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        that.globalData.userInfo = res.userInfo
        //解析openId和unionId
        wx.request({
          url: "https://df2018.reane.cn/common/user.ashx",
          method: "GET",
          data: {
            Command: "getUserInfo_encryptedData",
            jscode: that.globalData.code,
            rawData: res.rawData,
            signature: res.signature,
            encryptedData: res.encryptedData,
            iv: res.iv,
            tag: "sc"
          },
          header: {
            "content-type": "application/json"
          },
          success: function (res) {
            if (res.data.openId != undefined) {
              console.log(res.data)
              console.log("openId:" + res.data.openId)
              console.log("unionId:" + res.data.unionId)
              that.globalData.openId = res.data.openId
              that.globalData.unionId = res.data.unionId
              that.globalData.session_key = res.data.session_key
              that.getGuestUserData();
            }
          }
        });
        //解析openId和unionId

      },
      fail: function () {
        wx.showModal({
          title: '是否要打开设置页面重新授权',
          content: '需要获取您的公开信息(昵称、头像等)，请到小程序的设置中打开用户信息授权',
          confirmText: "去设置",
          success: function (res) {
            if (res.confirm) {
              //打开设置去授权
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting["scope.userInfo"] == true) {
                    that.getUserInfo();
                  }
                },
              })
              //打开设置去授权
            } else if (res.cancel) {

            }
          }
        });
      }
    });
    //获取用户信息
  },
  onShow: function (options) {
    var that = this;
    that.globalData.scene = options.scene
    console.log(options)
    if (options.scene == 1044) {
      that.globalData.appshareTicket = options.shareTicket
      // that.globalData.dl_AccountData = options.query.dl_AccountData
      that.globalData.productId = options.query.productId;
      that.globalData.dl_pic = options.query.dl_pic;
      that.globalData.dl_name = options.query.dl_name;
      that.globalData.dl_AccountId = options.query.dl_AccountId
      that.globalData.shareAccountId = options.query.shareAccountId
    }
    console.log("分享人信息：")
    if (options.referrerInfo != undefined) {

      that.globalData.dl_AccountData = options.referrerInfo.extraData;
      that.globalData.productId = options.referrerInfo.extraData.ProductId;
      that.globalData.dl_pic = options.referrerInfo.extraData.AccountData.FaceUrl;
      that.globalData.dl_name = options.referrerInfo.extraData.AccountData.Pwd;
      that.globalData.dl_AccountId = options.referrerInfo.extraData.AccountData.AccountId,
        console.log(that.globalData.productId + "--" + that.globalData.dl_pic + '--' + that.globalData.dl_name)
    }


  },
  //获取用户信息
  getGuestUserData: function () {
    var that = this;
    wx.request({
      url: "https://df2018.reane.cn/scweb/server/lingshou.ashx",
      method: "GET",
      data: {
        Command: "getGuestUserData",
        GuestOpenId: that.globalData.openId,
        UnionId: that.globalData.unionId,
        NickName: that.globalData.userInfo.nickName,
        Gender: that.globalData.userInfo.gender,
        City: that.globalData.userInfo.city,
        Province: that.globalData.userInfo.province,
        Country: that.globalData.userInfo.country,
        AvatarUrl: that.globalData.userInfo.avatarUrl,
      }, header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("用户信息:")
        console.log(res)
        that.globalData.GuestUserData = res.data//用户信息
<<<<<<< HEAD
        that.globalData.ImgageDomainUrl = res.data.ImgageDomainUrl
=======
        that.getGuest_AccountData();
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
        if (that.appCallback) {
          that.appCallback(res)
        }

      }
    });
  },
  getGuest_AccountData:function(){
    var that = this;
    wx.request({
      url: "https://df2018.reane.cn/scweb/server/lingshou.ashx",
      method: "GET",
      data: {
        Command: "getGuest_AccountData",
        UserId: that.globalData.GuestUserData.ds[0].UserId,
      }, header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("获取AccountId：")
        console.log(res)
        if(res.data.ds!=undefined){
        that.globalData.AccountId = res.data.ds[0].AccountId
        that.globalData.RoleId = res.data.ds[0].RoleId
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    dl_AccountData: "",//代理信息
    productId: 0,//商品ID
    dl_pic: "",//分享人头像
    dl_name: "",//分享人昵称
    dl_AccountId: 0,//分享人AccountId
    code: "",
    userInfo: null,
    openId: "",
    unionId: "",
    GuestUserData: null,//用户信息
    session_key: "",//ssk
    scene: "",//场景值
    appshareTicket: "",
<<<<<<< HEAD
    shareAccountId: 0,
    ImgageDomainUrl: '',
=======
    AccountId:0,
    RoleId:0,
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
  }
})