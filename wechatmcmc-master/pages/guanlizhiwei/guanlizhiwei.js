// pages/guanlizhiwei/guanlizhiwei.js
var page = 1;

var last = false;
var app = getApp();
var jinbi=0;
Page({
  data:{
    info:[],
    inputShowed: false,
    inputVal: "",
    scrollTop : 0,
    scrollHeight:0,
    // jiazai:'none',
    lineheight:0
  },

  getdata:function(that){
    // console.log(page)
    // page ++;
    
    if(last == false){
      var session_id = wx.getStorageSync('session_id')
      var openid = wx.getStorageSync('wxopenid')
      // 加载数据
      wx.showToast({
          title: '数据加载中…',
          icon: 'loading',
          duration: 10000
      });
      
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=guanlizhiwei', //真实的接口地址
          data: {
            page:page,
            openid:openid
          },
          method:'post',
          header: {
              'content-type': 'application/json',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
             console.log(res.data)
            // 设置数据
            jinbi=res.data.jinbi;
            // console.log(jinbi);
            var beinfo = that.data.info;
            for(var i = 0; i < res.data.info.length; i++){
                  beinfo.push(res.data.info[i]);
              }
              that.setData({
                info: beinfo,
            })
            // 隐藏提示
            wx.hideToast()
            if(res.data.info.length == 0){
                last = true;
                // that.setData({
                //   jiazai:'none',
                // })
              }
          },
          // 接口调用失败
          fail:function(){

          },
          complete:function(){
          }
      })

      page ++;

    }

  },
  bindDownLoad:function(){
    // console.log("底部了");
          // 该方法绑定了页面滑动到底部的事件
    var that = this;
    that.getdata(that);
  },
  scroll:function(event){
    // var that = this;
    // //   该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    //  that.setData({
    //      scrollTop : event.detail.scrollTop
    //  });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    last = false;
    page = 1;
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo: userInfo
      })
    })
   
    wx.getSystemInfo({
          success:function(res){
            that.getdata(that);
              that.setData({
                  scrollHeight:res.windowHeight,
                  lineheight:res.windowHeight*0.08
              });
          }
      });

  },
  //删除职位
  shanchu: function (event) {
    // console.log(event);
    var id = event.currentTarget.dataset.id;
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      var session_id = wx.getStorageSync('session_id')
      //var openid=wx.getStorageSync('wxopenid')
      wx.showModal({
        title: '提示',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        content: '确认删除该职位吗？',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            
            wx.request({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweishanchu', //真实的接口地址
              data: {
                'token': id
                
              },
              method: 'post',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PHPSESSID=' + session_id + '; path=/'
              },
              success: function (res) {
                // console.log(res.data)
                if (res.data.status == 1) {
                  wx.showToast({
                    title: '删除成功',
                    icon: 'success',
                    duration: 1000
                  })
                  //删除后刷新
                  
                  wx.redirectTo({
                    url: '../guanlizhiwei/guanlizhiwei'
                  })
                }
              },
             
              // 接口调用失败
              fail: function () {

              },
              complete: function () {
              }
            })
          }
        }
      })
    })
  },
  //职位下架
  xiajia: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      var session_id = wx.getStorageSync('session_id')
      wx.showModal({
        title: '确认下架该职位吗？',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        content: '',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.request({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweixiajia', //真实的接口地址
              data: {
                'token': id,
              },
              method: 'post',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PHPSESSID=' + session_id + '; path=/'
              },
              success: function (res) {
                // console.log(res.data)
                if (res.data.status == 1) {
                  wx.redirectTo({
                    url: 'guanlizhiwei'
                  })
                }

              },
              // 接口调用失败
              fail: function () {

              },
              complete: function () {
              }
            })
          }
        }
      })
    })
  },
  // 职位上架
  shangjia: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      var session_id = wx.getStorageSync('session_id')
      wx.showModal({
        title: '确认上架该职位吗？',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        content: '',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.request({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweishangjia', //真实的接口地址
              data: {
                'token': id,
              },
              method: 'post',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PHPSESSID=' + session_id + '; path=/'
              },
              success: function (res) {
                // console.log(res.data)
                if (res.data.status == 1) {
                  wx.redirectTo({
                    url: 'guanlizhiwei'
                  })
                }

              },
              // 接口调用失败
              fail: function () {

              },
              complete: function () {
              }
            })
          }
        }
      })
    })
  },
  // 分享
  // onShareAppMessage: function (e) {
  // var fid= e.target.dataset.id;
  //   return {
  //     title:"共享餐饮招聘机会",
    
  //     path: '/pages/jobs/jobs?token=' +fid

  //   }
  // },

  //先上架在刷新
  shuaxinshangjia:function(e){
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '上架后才可以对职位进行刷新',
      confirmText: '确定上架',
      confirmColor: '#3CC51F',
      success:function(res){
        if (res.confirm){
          app.getUserInfo(function (userInfo) {
            var session_id = wx.getStorageSync('session_id')
            wx.request({
              url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweishangjia', //真实的接口地址
              data: {
                'token': id,
              },
              method: 'post',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PHPSESSID=' + session_id + '; path=/'
              },
              success: function (res) {
                // console.log(res.data)
                if (res.data.status == 1) {
                  wx.redirectTo({
                    url: 'guanlizhiwei'
                  })
                }

              },
              // 接口调用失败
              fail: function () {

              },
              complete: function () {
              }
            })
          })
        }
      }
    })
  },
  //刷新
  shuaxin: function (e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    //调用应用实例的方法获取全局数据
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Ceshi&a=getRefresh',
      method:'post',
      data:{
        'openid':openid
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(res){
      
        if(res.data==1){
          wx.showModal({
            title: '刷新后排名靠前，曝光量大增',
            confirmText: '刷新',
            confirmColor: '#3CC51F',
            content: '刷新方式：-3金币，剩余金币:' + jinbi,
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击确定')
                if (jinbi < 3) {
                  wx.showModal({
                    title: '提示',
                    confirmText: '去充值',
                    content: '您的可用金币不足',
                    confirmColor: '#3CC51F',

                    success: function (res) {
                      if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.navigateTo({
                          url: '../pay/pay'
                        })
                      }
                    }
                  })
                } else {
                  wx.showToast({
                    title: '职位刷新中…',
                    icon: 'loading',
                    duration: 10000
                  });


                  // 获取数据
                  wx.request({
                    url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shuaxinzhiwei', //真实的接口地址
                    data: {
                      'token': id,
                      'openid': openid,
                    },
                    method: 'post',
                    header: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                    },
                    success: function (res) {
                      // console.log(res.data)
                      // 隐藏提示
                      if (res.data.status == 1) {
                        wx.showToast({
                          title: '刷新成功',
                          icon: 'success',
                          duration: 1000,
                          success: function () {

                            wx.redirectTo({
                              url: 'guanlizhiwei'
                            })

                          }
                        })
                      }
                    },
                    // 接口调用失败
                    fail: function () {

                    },
                    complete: function () {
                    }
                  })
                }

              }
            }
          })
        }else if(res.data==0){
          wx.showModal({
            title: '刷新后排名靠前，曝光量大增',
            confirmText: '刷新',
            confirmColor: '#3CC51F',
            content: '每天可以免费刷新一次',
            success: function (res) {
              if (res.confirm) {
                wx.request({
                  url: 'https://www.mcmchw.com/index.php?m=Home&c=Ceshi&a=refereshJobs',
                  method: 'post',
                  data: {
                    'token': id,
                    'openid': openid
                  },
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                  },
                  success: function (res) {

                    if (res.data == 1) {
                      wx.showToast({
                        title: '刷新成功',
                        icon: 'success',
                        duration: 1000,
                        success: function () {

                          wx.redirectTo({
                            url: 'guanlizhiwei'
                          })

                        }
                      })
                    }
                  }
                })
              }
            }
          })
         
        }
      }
    })
    
  },
  //修改
  xiugai: function (e) {
    var id = e.currentTarget.dataset.id;
    // console.log(id);
    wx.navigateTo({
      url: '../xiugaizhiwei/xiugaizhiwei?token=' + id
    })
  },
  //
  fabu:function(){
    wx.navigateTo({
      url: '../jobspost/jobspost?token=1656546'
    })
   
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
  // onShareAppMessage: function () {
  //   return {
  //     title: "只为餐饮人提供机会",
  //     desc: "",
  //     path: '/pages/guanlizhiwei/guanlizhiwei'

  //   }
  // }
})