var util = require('../../../../utils/util.js')
var WxParse = require('../../../../wxParse/wxParse.js');
var app = getApp()
Page({
  data:{
    remind:'加载中',
    title:'',
    scrollHeight:0,
    tip:[],
  },

  onLoad:function(options){
    var that=this
    var title=options.name
    this.getTips(options.id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
          title:title
        });
      }
    });
    wx.setNavigationBarTitle({
      title: title
    })
  },

  getTips:function(id){
    var that = this

    //渲染Tip_content页面
    function TipContentRender(info){
      for(var i in info){
        info[i].intro = info[i].intro.replace(/\/n/g, '\n')
      }
      that.setData({
        tip:info,
      })
    }
    
    //获取tip
    //获取列表头数据
    wx.request({
      url: app._server+'/tip/tipsoftheme?appid='+app._appid+'&tip_theme_id='+id,
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info) {
            TipContentRender(info)
          }
        }
      },
      complete:function(){
        that.setData({
          remind:''
        })
      }
    })
  }
})