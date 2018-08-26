//index.js
//获取应用实例
var app = getApp()
const ZuserlistUrl = require('../../config').config.ZuserlistUrl;
const YuserlistUrl = require('../../config').config.YuserlistUrl;
const friendlistUrl = require('../../config').config.friendlistUrl;
Page({
  data: {
    addClass:true,
    addClass1: false,
    addClass2: false,
    showView:false,
    showView1:true,
    showView2: true,
    con:true,
    items1:'', 
    con1: true,
    items3: '',
    pas:'',
    pag:'',
    pass: '',
    pags: '',
    more:true,
    nomore:false,
    more1: true,
    nomore1: false
  },
  //点击智力排行
  select_left:function(){
    var that= this
    that.setData({
      addClass: true,
      addClass1: false,
      addClass2: false,
      showView: false,
      showView1: true,
      showView2: true
    })
  },
  //点击毅力排行
  select_right: function () {
    var that = this
    that.setData({
      addClass: false,
      addClass1: true,
      addClass2: false,
      showView: true,
      showView1: false,
      showView2: true,
    })
  },
  //点击好友排行
  select_center: function () {
    var that = this
    that.setData({
      addClass: false,
      addClass1: false,
      addClass2: true,
      showView: true,
      showView1: true,
      showView2: false,
    })
  },
  //加载更多
  loadMore: function () {
    var that = this
    var pas = this.data.pas
    var pag = this.data.pag
    console.log(pas)
    console.log(pag)
    if(pas < pag){
      if (this.data.con == true) {
        pas += 1;
        var _this = this;
        wx.request({
          url: ZuserlistUrl,
          data: {
            pas: pas
          },
          complete: function (res) {
            var items1 = _this.data.items1.concat(res.data.data);
            _this.setData({
              items1: items1,
              pas: pas
            })
            that.setData({
              con: false,
            })
          }
        })
      }
      setTimeout(function () {
        that.setData({
          con: true
        });
      }, 1000);
    }else{
      that.setData({
        more:false,
        nomore:true
      })
    }   
  },
  //加载更多
  loadMore1: function () {
    var that = this
    var pass = this.data.pass
    var pags = this.data.pags
    console.log(pass)
    console.log(pags)
    if (pass < pags) {
      if (this.data.con1 == true) {
        pass += 1;
        var _this = this;
        wx.request({
          url: YuserlistUrl,
          data: {
            pass: pass
          },
          complete: function (res) {
            var items3 = _this.data.items3.concat(res.data.data);
            _this.setData({
              items3: items3,
              pass: pass
            })
            that.setData({
              con1: false,
            })
          }
        })
      }
      setTimeout(function () {
        that.setData({
          con1: true
        });
      }, 1000);
    } else {
      that.setData({
        more1: false,
        nomore1: true
      })
    }
  },
  onLoad: function () {
    var that = this
//智力排行
    wx.request({
      url: ZuserlistUrl,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
       
      },
      success: function (res) {
        //console.log(res.data.code.pas)
        that.setData({
          pas: res.data.code.pas,
          pag: res.data.code.pag,
          items:res.data.msg,
          items1:res.data.data
        })
      }
    })
//毅力排行
    wx.request({
      url: YuserlistUrl,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {

      },
      success: function (res) {
        //console.log(res.data.data)
        that.setData({
          pass: res.data.code.pass,
          pags: res.data.code.pags,
          items2: res.data.msg,
          items3: res.data.data
        })
      }
    })
//好友排行
    wx.request({
      url: friendlistUrl,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        openid: getApp().globalData.openid
      },
      success: function (res) {
        //console.log(res.data.data)
        that.setData({
          items4: res.data.data
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // getUserInfo: function (e) {
  //   // console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
})
