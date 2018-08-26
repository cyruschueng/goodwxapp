//index.js
//获取应用实例
var common = require("../../utils/util.js")
var wxApi = require("../../utils/wxApi.js");
var app = getApp()
Page({
  data:{
    path:'',
    opentype:''
  },
  onLoad: function (options){
    console.log(options);
    this.setData({
      path: options.path,
      opentype: options.opentype
    })
  },
  reflesh:function(){
    var that=this;
    app.login(function(){
      that.redirect();
    });
  },
  redirect:function(){
    var opentype = this.data.opentype;
    var path = this.data.path;
    if (opentype =="switchTab"){
      wx.switchTab({
        url: path,
      });
    } else if (opentype =="navigateTo"){
      wx.navigateTo({
        url: path
      })
    } else if (opentype == "redirectTo") {
      wx.redirectTo({
        url: path
      })
    }
  }
})