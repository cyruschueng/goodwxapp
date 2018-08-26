var util = require('../../../utils/util.js')
var app = getApp()
Page({
    data:{
      remind:'加载中',
      _Color:['rgb(0, 153, 102)', 'rgb(51,204,204)', 'rgb(204,102,0)', 'rgb(153,204,51)', 'rgb(102,51,102)','rgb(204,0,51)'],
      _Icon:['../../../image/tips_icon1.png', '../../../image/tips_icon4.png', '../../../image/tips_icon2.png', '../../../image/tips_icon5.png', '../../../image/tips_icon3.png', '../../../image/tips_icon6.png'],
     tips:[]
    },

    onLoad:function(){
      var that=this
      this.getTips()
      wx.setNavigationBarTitle({
        title: "旅游贴士"
      })
    },

    getTips: function () {
      var that = this
      //渲染Tips页面
      function tipsRender(info){
        var tips=[]
        tips = info
        for(var i in tips){
          tips[i].color=that.data._Color[i%6]
          tips[i].icon=that.data._Icon[i]
        }
        that.setData({
          tips:tips
        })
      }

      //获取Tips数据
      wx.request({
        url: app._server+'/tip/themes?appid='+app._appid+'',
        success: function (res) {
          if (res.data) {
            var info = res.data;
            if (info) {
              tipsRender(info)
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




})