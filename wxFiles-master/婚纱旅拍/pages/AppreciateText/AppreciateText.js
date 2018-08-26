// pages/AppreciateText/AppreciateText.js
var imageUtil = require('../../utils/util.js');  
var app=getApp();
Page({
  data:{
     ScrollTop:0,
     image:'/images/115.jpg',
     showFlag:false,
     list:[],
  },
   //显示，隐藏回到顶部 
  EventHandle:function(e){
    var that =this;

  },
  //回到顶部
  BackTop:function(){
 
    var that = this;
    that.setData({
      ScrollTop:0
    })
       console.log(that.data.ScrollTop)
  },
  onLoad:function(options){
    var that=this;
    var month=options.month;
    var classesid=options.classesid;
    wx.request({
      url: app.globalData.IP+"wx/findarticlebymonth.do?month="+month+'&classesid='+classesid,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res){
        // success
        for(var i=0;i<res.data.length;i++)
        {
          that.data.list=that.data.list.concat(app.globalData.IP+"controller/"+res.data[i].url);

        };
        that.setData({
          list:that.data.list
        })
      },
    })
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //显示大图
  show:function(e){
    var that =this;
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [that.data.list[e.currentTarget.id]],
    })
  },
  //关闭显示
  closeShow:function(){
    var that = this;
    that.setData({
      showFlag:false
    })    
  },
  // convertHtmlToText: function convertHtmlToText(inputText) {  
  //           var returnText = "" + inputText;  
  //           returnText = returnText.replace(/<\/div>/ig, '\r\n');  
  //           returnText = returnText.replace(/<\/li>/ig, '\r\n');  
  //           returnText = returnText.replace(/<li>/ig, ' * ');  
  //           returnText = returnText.replace(/<\/ul>/ig, '\r\n');  
            
  //           returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");   
              
  //           returnText=returnText.replace(/<p.*?>/gi, "\r\n");  
  //           returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");  
            
  //           returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");  

  //           returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");  

  //           returnText=returnText.replace(/<(?:.|\s)*?>/g, "");   
            
  //           returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");  
            
  //           returnText = returnText.replace(/ +(?= )/g,'');  
              
  //           returnText=returnText.replace(/ /gi," ");  
  //           returnText=returnText.replace(/&/gi,"&");  
  //           returnText=returnText.replace(/"/gi,'"'); 
  //           returnText=returnText.replace(/</gi,'<'); 
  //           returnText=returnText.replace(/>/gi,'>');  
  //           return returnText;
  //     }
})