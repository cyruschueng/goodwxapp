var comm = require('../../../utils/common.js');
var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp()
Page({
  data:{
    remind:'加载中',
    list_title:'',
    list_img:'',
    list_intro:'',
    isContent:true,
    scrollHeight:0,
    detail_list:[],
  },

  onLoad:function(option){
    var that=this
    this.getList(option.id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
        });
      }
    });
    wx.setNavigationBarTitle({
      title: "班夫旅游"
    })
  },

  //获取专题列表数据
  getList: function (id) {
    var that=this

    function listRender(info){
      var detail_list=info
      for(var i in info){
        detail_list[i].name=info[i].title
        detail_list[i].img=info[i].img
        detail_list[i].url ='../content/content?id='+info[i].id
      }
      that.setData({
        detail_list:detail_list
      })
      
    }
    var loadsum = 0
    loadsum++
    wx.request({
      url: app._server+'/article/theme?appid='+app._appid+'&theme_id='+id,
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            console.log(info)
            listRender(info)
          }
        }
      },
      complete:function(){
        loadsum--
        if (!loadsum) {
          that.setData({
            remind: ''
          })
        }
      }
    })

    //获取专题信息
    wx.request({
      url: app._server+'/article/detail?appid='+app._appid+'&id=' + id,
      success:function(res){
        if(res.data){
          var info=res.data
          if(info.length != 0){
            console.log(info)
            var list_title = info.title
            var list_img = info.img
            var list_intro = info.intro
            var list_content = unescape(info.content)
            var isContent=false
            if(list_content.length > 0){
              isContent=true
            }
            WxParse.wxParse('list_content', 'html', list_content, that,12.5);
            that.setData({
              list_title: list_title,
              list_img: list_img,
              list_intro: list_intro,
              isContent: isContent
            })
          }
        }
      },
      complete:function(){
        loadsum--
        if (!loadsum) {
          that.setData({
            remind: ''
          })
        }
      }
    })
  },

  //图片加载错误处理
  errImg: function (ev) {
    var that = this;
    comm.errImgFun(ev, that);
  }, 

  
})