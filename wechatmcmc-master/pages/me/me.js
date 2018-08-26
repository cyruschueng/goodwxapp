// pages/me/me.js
//获取应用实例
var app = getApp()
var res=wx.getSystemInfoSync();
var w = res.windowWidth*0.80-50
Page({
  data:{
      userInfo: {},
      scrollTop: 0,
      wxname:'头像暂时无法显示',
      
      token:3,    
      gongsi:0,
      width:w,
  },


  //检测企业简介是否填写
  checkjianjie:function(){
    var openid = wx.getStorageSync('wxopenid')
    var session_id = wx.getStorageSync('session_id')
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkjianjie',
        data:{

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id + '; path=/'
        },
        success: function (e) {
          // console.log(e.data)
          if (e.data == 1) {
            wx.navigateTo({
              url: '../kanjianjie/kanjianjie'
            })
          }
          else {
            wx.navigateTo({
              url: '../gongsijianjie/gongsijianjie'
            })
          }
        }
      })
  },
//检测简历是否填写
  fabujianli: function () {

    var openid = wx.getStorageSync('wxopenid')
    var session_id = wx.getStorageSync('session_id')
    console.log(openid);

    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkjianli',
      data: {
        'openid': openid
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        // console.log(e.data)
        if (e.data.status == 1) {
          wx.navigateTo({
            url: '../kanjianli/kanjianli'
          })
        }
        else {
          wx.navigateTo({
            url: '../jianli/jianli'
          })
        }
      }
    })
  },
    //初始化
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var that = this
        // 获取数据
    var openid2 = wx.getStorageSync('wxopenid')
    var session_id2 = wx.getStorageSync('session_id')
    // console.log('openid:'+openid2);
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=getme', //真实的接口地址
            data: {
              'openid':openid2
            },
            method:'get',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id2+'; path=/'
            },
            success: function(res) {
             var fuck='';
             var name = wx.getStorageSync('wxname');
             
              if (res.data.jl_tuxiang == "") {
                if (res.data.logo =='undefined'){
                  
                  fuck = '/images/renwu.png'
                }else{
                  fuck = res.data.logo
                  
                }
                
              }else{
               fuck = res.data.jl_tuxiang
               
              }
              
              that.setData({
                token: res.data.jianli,
                gongsi: res.data.gs,
                gun:fuck,
                wxname:name
              })
          
               
                
                // 隐藏提示
                wx.hideToast()
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })
  

   
  },

  share:function(res){
    // console.log(res);
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkzhiwei',
        data:{
          openid:openid
        },
        method:'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id + '; path=/'
        },
        success:function(e){
          // console.log(e.data);
          if (res.currentTarget.dataset.id==0){
            if (e.data == 1) {
              wx.navigateTo({
                url: '../share/share?token=1'
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '你还没有发布招聘职位',
                showCancel: false
              })
            }
          }else{
            if (e.data == 1) {
              wx.navigateTo({
                url: '../jianliku/jianliku'
              })
            } else {
              wx.showModal({
                title: '提示',
                content: '你还没有发布招聘职位',
                showCancel: false
              })
            }
          }
            
        }
      })
  },
  click:function(){
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkShop',
      data: {
        openid: openid
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
       
          if (e.data == 1) {
            wx.navigateTo({
              url: '../shareshop/shareshop?token=1'
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '你还没有发布服务',
              showCancel: false
            })
          }


      }
    })
  },
  
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    // console.log('怎么就触发了');
    var openid3 = wx.getStorageSync('wxopenid')
    var that=this;
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=getlogo',
      data:{
        openid:openid3
      },
      success:function(e){
        var url;
        // console.log(e.data.jianjie);
        if (e.data.jl_tuxiang==0){
          if (wx.getStorageSync('logo')){
            url = wx.getStorageSync('logo')
          }else{
            url='/images/renwu.png'
          }
         
       }else{
          url = e.data.jl_tuxiang
       }
      that.setData({
        gun: url,
        token: e.data.jianli,
        gongsi: e.data.jianjie
      })
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})