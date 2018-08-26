//获取应用实例
var app = getApp()

Page({
  data: {
    lv:1,
    speed:1
  },
  more_play:function(){
    wx.navigateTo({
      url: '../more_play/more_play'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://caimusic4.mytp8.cn/public_html/index.php/index/Index/wangs',
      method: 'POST',
      data: {
        openid: getApp().globalData.openId,
        user: getApp().globalData.nickName,
        pic: getApp().globalData.avatarUrl
      },
    })
    //console.log('onLoad')
    try {
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        that.setData({
          lv: userInfo.lv,
          speed: userInfo.speed,
        })
      }
    } catch (e) {
      //console.log('catch');
      //var userInfo = wx.getStorageSync('userInfo');
      // Do something when catch error
    }
  },
  onReady:function(){
    //console.log('onReady')
  },
  //存formId
  obtainFormId: function (e) {
    var formId = e.detail.formId;
    //console.log("123" + e.detail.formId)
    //console.log(getApp().globalData.openId)
    wx.request({
      url: 'https://caimusic4.mytp8.cn/public_html/index.php/index/Index/addformid',
      method: 'POST',
      data: {
        openid: getApp().globalData.openId,
        fromid: e.detail.formId,
        user: getApp().globalData.nickName,
        pic: getApp().globalData.avatarUrl
      },
    })
    // var xinxi = wx.getStorageSync('userInfo');
    // console.log(xinxi);
    // var formId = e.detail.formId;
    // console.log(xinxi.openid, formId)
    // app.setFormId(xinxi.openid, formId)
  },
  onShow:function(){
    //console.log('onShow')
  },
  //分享
  onShareAppMessage: function (res) {
    return {
      title: '我的小目标：独闯600关，敢应战否？',
      path: '/pages/index/index',
      success: function (res) {
        var userInfo = wx.getStorageSync('userInfo');
        userInfo.score = n_score
        wx.setStorageSync('userInfo', userInfo)
        wx.showToast({
          icon: 'success',
          title: '获得30个金币',
          duration: 2000
        })
      }
    }
  }
  
})
