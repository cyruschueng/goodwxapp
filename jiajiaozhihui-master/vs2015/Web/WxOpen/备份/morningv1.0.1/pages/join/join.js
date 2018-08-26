var app=getApp();
var wxRequest = require("../../utils/wxRequest.js");
var wxApi = require("../../utils/wxApi.js");
Page({
    data:{
        path:'',
        query:'',
        shareticket:'',
        scene:'',
        gNameEmpty:false
    },
    onLoad:function(options){
      var that=this;
      console.log(options);
      this.setData({
        path: options.path,
        query:[],
        shareticket: options.shareticket
      })
    },
    update:function(){
      this.setData({
        gNameEmpty:false
      })
    },
    parseParam:function(query){
      var search = '';
      if (query != null && query != undefined && typeof query == 'object') {
        for (var i in query) {
          search+='&'+i+'='+query[i];
        }
      }
      return '?'+search.substr(1);
    }
})
