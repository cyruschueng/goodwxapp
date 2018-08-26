var comm = require('../../../utils/common.js');
var app = getApp()
Page({
  data:{
    remind:'加载中',
    scrollHeight:0,
    id:'',
    name:'',
    swiper_img:[],
    profile:'',
    details:[],
  },

  onLoad:function(option){
    var that=this
    this.getSport(option.id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
          name:option.name
        });
      }
    });
    wx.setNavigationBarTitle({
      title: option.name
    })
  },

 
  getSport: function (id) {
    var that=this
    console.log('id: '+id)
    function sportRender(info){
      console.log('探险： ')
      console.log(info)
      var swiper_img = info.live.gallery
      var profile=info.live.intro
      var details = info.places

      that.setData({
        swiper_img: swiper_img,
        profile:profile,
        details: details

      })
    }

    wx.request({
      url: app._server+'/place/explore?appid='+app._appid+'&id='+id,
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info) {
            sportRender(info)
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