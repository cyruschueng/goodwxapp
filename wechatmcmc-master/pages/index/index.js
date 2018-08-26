//index.js
//获取应用实例
var app = getApp()
var page2=10;
var info={};
var scene ;
Page({
  data: {
    zhiwei: {},
    slide: [],
    indicatorDots: true,
     autoplay: true,
    interval: 5000,
    duration: 500,
    height:0,
    height2:0,
    // height3:0,
  },
  formsubmit: function (e) {
    // console.log(e.detail.formId);
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=moreFormId',
      data: {
        'openid': openid,
        'formId': e.detail.formId
      },
      method:'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(e){
          console.log(e);
      }
    })
  },
  toubu:function(e){
    // console.log(e);
    wx.navigateTo({
      url: '../toubu/toubu?token='+e.currentTarget.dataset.hi
    })
  
  },
 
  getdata:function(that){
    
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })

    })
    wx.showToast({
      title: '加载更多…',
      icon: 'loading',
      duration: 10000
    });
    // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=index2', //真实的接口地址
        data: {
         'token':'1',
         'page':page2
        },
        header: {
            'content-type': 'application/json'
        },
        success: function(res) {
        info=res.data;
          page2=res.data.page;
            that.setData({
              zhiwei: res.data.zhiwei,
              slide: res.data.slide,
            })
            // 隐藏提示
            wx.hideToast()
        },
        // 接口调用失败
        fail:function(){
          
        },
        complete:function(){
          wx.stopPullDownRefresh(); //停止下拉刷新
        }
      })
  },
  viewSearch: function () {
    // 搜索框
    wx.navigateTo({
      url: '../search/search'
    })
  },
  jianliku:function(){
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkzhiwei',
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
            url: '../jianliku/jianliku'
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '发布招聘职位后方可查看',
            showCancel: false
          })
        }

      }
    })
  },
  t_close:function(){
      this.setData({
        showw:'none',
      })
  },
  t_jump:function(){
      wx.navigateTo({
        url: '../activity/activity',
      })
      this.setData({
        showw: 'none',
      })
  },
  onLoad: function (options) {
    // wx.showShareMenu({//转发时可以获取shareTickets
    //   withShareTicket: true
    // })
    var that = this;
    var res = wx.getSystemInfoSync()
    var h = res.windowHeight*0.32;
    // var h3=res.windowWidth-90;
    var h2 = res.windowWidth *0.25*0.5;
    var h4= res.windowWidth * 0.8;    
      that.getdata(that);
      that.setData({
        height:h,
        height2:h2,
        // height3:h3,
        height4:h4,
        })
      
     scene = decodeURIComponent(options.scene);
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=selnum',
        data:{},
        success:function(e){
            that.setData({
              num:e.data
            })
        }
      })
     
        // console.log(h);
  },
  onHide: function () {
    if (scene != 'undefined' && scene != 'null' && scene != '' && scene) {
      var session_id2 = wx.getStorageSync('session_id');
      var openid2 = wx.getStorageSync('wxopenid');
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=saomiao',
        method: 'post',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id2 + '; path=/'
        },
        data: {
          'openid': openid2,
          'varid': scene
        },
        success: function (e) {
          // console.log(e);
        }
      })
    }
  },
  onUnload: function () {
    if (scene != 'undefined' && scene != 'null' && scene != '' && scene) {
      var session_id2 = wx.getStorageSync('session_id');
      var openid2 = wx.getStorageSync('wxopenid');
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=saomiao',
        method: 'post',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id2 + '; path=/'
        },
        data: {
          'openid': openid2,
          'varid': scene
        },
        success: function (e) {
          // console.log(e);
        }
      })
    }
  },
 
  onPullDownRefresh:function(){
    var that = this;
    that.getdata(that);
    // wx.setStorageSync('zhiwei', info.zhiwei)
    // wx.setStorageSync('slide', info.slide)
  },
  onReachBottom:function(){
    var that = this;
    if(page2==10){
      page2 = 20;
    }
   
    that.getdata(that);
  },
  // 分享
  onShareAppMessage: function () {
    // var session_id = wx.getStorageSync('session_id');
    // var openid = wx.getStorageSync('wxopenid');
    // console.log(openid);
    return {
      title: "专业餐饮领域求职招聘信息服务平台",
      desc: "",
      path: '/pages/index/index'}
    //   success: function () {
    //     //转发成功获得金币
    //     wx.request({
    //       url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=CheckShare',
    //       method:'get',
    //       data:{
    //         'openid':openid
    //       },
    //       success:function(res){
    //         if(res.data==1){
    //           wx.showModal({
    //             title: '提示',
    //             content: '每天只能分享领取一次，明天再来吧～～',
    //             showCancel:false,
    //           })
    //         }else{
    //             wx.request({
    //               url: 'https://www.mcmchw.com/index.php?m=Home&c=Activity&a=getJinbi',
    //               method:'post',
    //               data:{
    //                 'openid':openid
    //               },
    //               header: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //                 'Cookie': 'PHPSESSID=' + session_id + '; path=/'
    //               },
    //               success:function(e){
    //                 wx.showModal({
    //                   title: '提示',
    //                   content: e.data,
    //                   showCancel: false,
    //                 }) 
    //               }
    //             })
    //         }
    //       }
    //     })
    //   }
    // }
  }
})
