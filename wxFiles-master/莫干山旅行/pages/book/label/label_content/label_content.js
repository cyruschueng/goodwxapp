var comm = require('../../../../utils/common.js');  
var app = getApp()
Page({
  data:{
    remind:'加载中',
    current:0,
    scrollHeight:0,
    labels:[],
    icon1:'<  ',
    icon2:'',
  },

  onLoad:function(option){
    console.log(option)
    var current=parseInt(option.index)
    var that = this
    this.getLabelsContent()
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.screenHeight,
          current: current
        });
      }
    });
    wx.setNavigationBarTitle({
      title: "名词标示"
    })
    function getPageSum(){
      var sum=that.data.length
      return '/'+sum+'  >'
    }
  },

  getLabelsContent: function () {
    var that = this
    //渲染标示内容页
    function labelRender(info) {
      var icon2
      var labels = info
      
      icon2='/'+info.length+'  >'
      for(var i in info){
        labels[i].index=parseInt(i)+1
        labels[i].divide_width = labels[i].name.length * 22 + 20
      }
      that.setData({
        labels: labels,
        icon2:icon2,
      })
      console.log(that.data.labels)
    }

    //获取标示内容页数据
    wx.request({
      url: app._server+'/sign/signs?appid='+app._appid+'&size=100',
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info) {
            labelRender(info)
          }
        }
      },
      complete:function(){
        that.setData({
          remind:''
        })
      }
    })
  },

  //图片加载错误处理
  errImg: function (ev) {
    var that = this;
    comm.errImgFun(ev, that);
  }, 
})