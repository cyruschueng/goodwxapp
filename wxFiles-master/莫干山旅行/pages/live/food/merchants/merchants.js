var comm = require('../../../../utils/common.js');  
var event = require('../../../../utils/event.js')
var WxParse = require('../../../../wxParse/wxParse.js');
var app = getApp()
Page({
  data:{
    article_id:0,
    remind:'加载中',
    scrollHeight:0,
    indicator_dots:true,
    id:0,
    schedule_id:0,
    imgs:[],
    title:'',
    profile:'',
    address:'',
    telphone:'',
    email:'',
    website:'',
    content:'',
    ismerchantsDetails:true,
    isCollect:0,
    isArrived:0,
    regoin_id:0,
    category_id:0,
    category_two_id:0,
    longitude: 0,
    latitude: 0,
    isTomap:true,
  },

  onLoad:function(options){
    console.log("商户页面加载")
    var that=this
    this.getMechant(options.id)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight,
          article_id: options.id
        });
      }
    });
    
   
  },

  //分享
  onShareAppMessage: function () {
    var that=this
    var id = this.data.article_id
    var path ='page/live/food/merchants/merchants?appid='+app._appid+'&id='+id
    return {
      title: that.data.title,
      path: path
    }
  },

  //地图
  tomap:function(e){
    var regoin_id = this.data.regoin_id
    var category_id = this.data.category_id
    var category_two_id = this.data.category_two_id
    var longitude = this.data.longitude
    var latitude = this.data.latitude
    var place_id=this.data.id
    var isCollect = this.data.isCollect
    console.log('regoin_id: ' + regoin_id)
    wx.redirectTo({
      url: '../../food/food?regoin_id=' + regoin_id + '&id=' + category_id + '&category_two_id=' + category_two_id + '&longitude=' + longitude + '&latitude=' + latitude + '&place_id=' + place_id + '&isCollect=' + isCollect,
      complete: function (res) {
        console.log(res)
      }  
    })
  },

  //添加行程
  addTrait:function(){
    var that=this
    var id = this.data.id
    var isArrived = this.data.isArrived
    console.log(id)
    console.log(app.cache.userdata)

    if(isArrived){
      wx.showModal({
        content: '该景点已在您的已达行程！',
        showCancel:false
      })
    }else{
      wx.showModal({
        content: '您确定要将此景点填加到您的行程吗？',
        success: function (res) {
          if (res.confirm) {
            //通知后台填加
            wx.request({
              method: 'POST',
              url: app._server+'/schedule/add',
              data: {
                ukey: app.cache.userdata,
                appid: 'banfu123',
                place_id: id
              },
              success: function (res) {
                console.log(res)
                if (res.data.success) {
                  wx.showToast({
                    title: '填加成功',
                    icon: 'success',
                    duration: 2000
                  })
                  that.setData({
                    isCollect: 1,
                    schedule_id: res.data.schedule_id
                  })

                  event.emit('markersChange', id)
                } else {
                  wx.showToast({
                    title: '添加失败',
                    icon: 'fail',
                    duration: 2000
                  })
                }
              },
              fail: function (res) {
                wx.showToast({
                  title: '添加失败',
                  icon: 'fail',
                  duration: 2000
                })
              }
            })
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  //删除行程
  deleteTrait: function () {
    var that=this
    var id = this.data.schedule_id
    wx.showModal({
      content: '您确定要将此景点从您的行程删除吗？',
      success: function (res) {
        if(res.confirm){
          //通知后台删除
          wx.request({
            url: app._server+'/schedule/mark',
            method: 'POST',
            data: {
              ukey: app.cache.userdata,
              appid: 'banfu123',
              status: 2,
              schedule_id: id,
            },
            success: function (res) {
              if (res.data.success) {
                wx.showToast({
                  title: '取消收藏成功',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  isCollect: 0
                })
                //通知我的行程页面更改
                event.emit('isCollectChanged', id);
              } else {
                wx.showToast({
                  title: '取消收藏失败',
                  icon: 'success',
                  duration: 2000
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '取消收藏失败',
                icon: 'fail',
                duration: 2000
              })
            }
          })
        }else{
          console.log('用户点击取消')
        }
      }
    })
  },

  
  getMechant: function (id) {
    var that=this
    
    function mechantRender(info){
      console.log(info)
      var merchants_tips =unescape(info.content)
      var ismerchantsDetails = that.data.ismerchantsDetails
      WxParse.wxParse('merchants_tips', 'html', merchants_tips, that, 25);
      if (info.location.length == 0 && info.location.length == 0 && info.email.length == 0 && info.website.length == 0){
        ismerchantsDetails=false
      }
      if (info.gallery.length == 1){
        that.data.indicator_dots=false
      }

      if(info.intro == null){
        info.intro=''
      }
      if(info.content == null){
        info.content=''
      }
      
      if (info.longitude.length == 0 || info.latitude.length == 0 || parseFloat(info.longitude == 0) || parseFloat(info.latitude) == 0){
        that.data.isTomap=false
      }

      that.setData({
        id:info.id,
        schedule_id: info.schedule_id,
        imgs: info.gallery,
        title:info.title,
        profile:info.intro,
        address: info.location,
        telphone: info.contacts,
        email:info.email,
        website:info.website,
        content:info.content,
        ismerchantsDetails: ismerchantsDetails,
        indicator_dots: that.data.indicator_dots,
        isCollect: info.is_collect,
        isArrived:info.is_arrived,
        regoin_id: info.region_id,
        category_id:info.category_id,
        category_two_id: info.category_two_id,
        longitude: info.longitude,
        latitude: info.latitude,
        isTomap: that.data.isTomap
      })

      wx.setNavigationBarTitle({
        title: info.title
      })
    }

    wx.request({
      url: app._server+'/place/detail?appid='+app._appid+'&place_id='+id+'&ukey='+app.cache.userdata,
      success: function (res) {
        if (res.data) {
          var info = res.data;
          if (info.length != 0) {
            mechantRender(info)
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