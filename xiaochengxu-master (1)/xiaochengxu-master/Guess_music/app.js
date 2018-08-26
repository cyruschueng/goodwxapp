
var apputil = require('utils/util.js')

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function (res) {
        //console.log(res)
        if (res.code) {
          var that = this
          //发起网络请求
          wx.request({
            url: 'https://caimusic4.mytp8.cn/public_html/index.php/index/Index/user',
            method: 'POST',
            data: {
              code: res.code
            },
            success: function (res) {
              var openId = res.data.openid;
              //console.log(res.data.openid)
              getApp().globalData.openId = res.data.openid;
              //console.log("222"+getApp().globalData.openId)
            },
          })
        }
        //console.log(res.code)
        wx.getUserInfo({
          success: res => {
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var city = userInfo.city
            var country = userInfo.country
            var gender = userInfo.gender
            var language = userInfo.language
            var province = userInfo.province
            // console.log(userInfo)
            // console.log(nickName)
            getApp().globalData.userInfo = res.userInfo;
            getApp().globalData.nickName = res.userInfo.nickName;
            getApp().globalData.avatarUrl = res.userInfo.avatarUrl;
            getApp().globalData.city = res.userInfo.city;
            getApp().globalData.country = res.userInfo.country;
            getApp().globalData.gender = res.userInfo.gender;
            getApp().globalData.language = res.userInfo.language;
            getApp().globalData.province = res.userInfo.province;
            // console.log(nickName)
            // 可以将 res 发送给后台解码出 unionId
            //this.globalData.userInfo = res.userInfo
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            //更新当前页面以便读取login信息
            // var page = getCurrentPages().pop();
            // if (page == undefined || page == null) return;
            // page.onLoad();
            // if (this.userInfoReadyCallback) {
            //   this.userInfoReadyCallback(res)
            // }
          }
        })
      }
    });
    //判断兼容性
    // if (!wx.canIUse('web-view')) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }
    apputil.getUserInfo();
  },
  onShow: function () {
    
  },
  onHide: function () {
    //console.log('onHide');
  },

  //存formId(app.js)
  setFormId: function (xinxiId, formId) {
    var that = this;
    const formIdUrl = require('./config').config.formIdUrl;
    //console.log(formIdUrl);
    var formIdList = wx.getStorageSync('formIdList') || [];
    formIdList.unshift(formId);
    wx.setStorageSync('formIdList', formIdList);
    console.log(formIdList, '---', formIdList.length);
    //当天只获取两个formId
    if (formIdList.length < 3) {
     
      wx.request({
        url: formIdUrl,
        data: {
          "id": xinxiId,
          'formid': formId
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //console.log("formid接口回复:", res.data);
          
        },
        fail: function (err) {
          //console.log("存储formId失败");
        }
      })
    } else {
      //console.log("当天的已经获取够了！")
    }
  },
  util: require('utils/util.js'),
  globalData: {
    userInfo: null,
    ok: null,
    hasUserInfo: false,
    openId:""
  }
})