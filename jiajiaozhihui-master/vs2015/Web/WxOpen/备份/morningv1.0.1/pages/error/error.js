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
    var opentype = this.data.opentype;
    var path = this.data.path;
    app.login(function(){
      wxApi.wxSwitchTab('/pages/myhabit/myhabit');
    });
  },
  redirect:function(){
    var opentype = this.data.opentype;
    var path = this.data.path;
    if (opentype =="switchTab"){
      wx.switchTab({
        url: path,
        success:function(){
         
        }
      });
    }
  }
})