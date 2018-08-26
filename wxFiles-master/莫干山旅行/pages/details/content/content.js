
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp()
Page({
  data:{
    remind:'加载中',
    id:0,
    img:'',
    title:'',
    author:'',
    place_ids:[],
  },

  onLoad: function (option) {
    var that = this
    this.getContent(option.id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  skip:function(){
    wx.navigateTo({
      url: '../../live/food/merchants/merchants?id='+this.data.id
    })
  },

  getContent:function(id){
    var that=this
    function contentRender(info){
      console.log(info)
      var content =unescape(info.content)
      //console.log(content)
      WxParse.wxParse('content', 'html', content, that, 25);

      that.setData({
        img:info.img,
        title:info.title,
        author: info.author + ' ' + info.created_time,
        id:info.place_id,
        place_ids: info.place_ids
      })
      wx.setNavigationBarTitle({
        title: info.title
      })
    }
    //获取文章数据
    wx.request({
      url: app._server+'/article/detail?appid='+app._appid+'&id='+id,
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            contentRender(info)
          }
        }
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(){
        that.setData({
          remind:''
        })
      }
    })


  },

  //图片加载错误处理
  errImg: function () {
    this.setData({
      img:'../../../image/default.png'
    })
  }, 

})