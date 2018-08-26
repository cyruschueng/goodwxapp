// pages/jobs/jobs.js
var token;
var title;
var des;
var app = getApp()
Page({
  data:{
    info:{},
    userInfo:{},
  },
  callphone:function(e){
    var callphone = e.target.dataset.hi;
    wx.makePhoneCall({
      phoneNumber: callphone //仅为示例，并非真实的电话号码
    })
  },
  xiugai:function(e){
    wx.navigateTo({
      url: '../xiugaizhiwei/xiugaizhiwei?token='+token
    })
  },
  onLoad:function(options){
    var that = this
    // 页面初始化 options为页面跳转所带来的参数
    token = options.token
    // 加载数据
    wx.showToast({
        title: '数据加载中…',
        icon: 'loading',
        duration: 10000
    });
    var session_id = wx.getStorageSync('session_id')
    var openid=wx.getStorageSync('wxopenid')
    // 获取数据
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Ceshi&a=zhiwei', //真实的接口地址
      data: {
        'token':token,
        'openid':openid
      },
      header: {
          'content-type': 'application/json',
          'Cookie':'PHPSESSID='+session_id+'; path=/'
      },
      success: function(res) {
        // console.log(res.data)
          that.setData({
            info: res.data,
          })
          title = res.data.title;
          des = '';
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
  shuaxin:function(e){
    var that = this;
     //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
	
	
	wx.showModal({
          title: '提示',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '刷新后排名靠前' ,
          success: function(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              
			  wx.showToast({
          title: '职位刷新中…',
          icon: 'loading',
          duration: 10000
      });
        
      var session_id = wx.getStorageSync('session_id')
      // 获取数据
      wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shuaxinzhiwei', //真实的接口地址
          data: {
            'token':token,
          },
          method:'post',
          header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
            // console.log(res.data)
              // 隐藏提示
              wx.hideToast()
          },
          // 接口调用失败
          fail:function(){

          },
          complete:function(){
          }
      })
			  
			  
            }
          }
        })
	

    })
  },
  // fabu:function(e){
    
  //   wx.switchTab({
  //     url: '/pages/fabu/fabu'
  //   })
  // },
  toudi:function(){
    var that = this;
     //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      var session_id = wx.getStorageSync('session_id')
      wx.showModal({
        title: '确定投递简历吗？',
        confirmText:'投递简历',
        confirmColor:'#3CC51F',
        content:"" ,
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            
            // 获取数据
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=toudi', //真实的接口地址
                  data: {
                    'token':token,
                  },
                  method:'post',
                  header: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Cookie':'PHPSESSID='+session_id+'; path=/'
                  },
                  success: function(res) {
                    // console.log(res.data)
                    if(res.data.status == 0){
                      // 未完善简历
                      wx.showModal({
                        title: '请完善简历',
                        confirmText:'现在完善',
                        confirmColor:'#3CC51F',
                        content: '您的简历尚未达到可投递标准，请完善简历后再进行投递',
                        // content: res.data.info ,
                        success: function(res) {
                          if (res.confirm) {
                            // console.log('用户点击确定')
                            wx.navigateTo({
                              url: '../jianli/jianli'
                            })
                          }
                        }
                      })

                    }else if(res.data.status == 2){
                      // 不能投递自己
                      wx.showModal({
                        title: '投递失败',
                        confirmText:'确定',
                        showCancel:false,
                        confirmColor:'#3CC51F',
                        content: res.data.info ,
                        success: function(res) {
                          if (res.confirm) {
                            // console.log('用户点击确定')
                          }
                        }
                      })
                    }else{
                      // 投递成功
                      wx.showModal({
                        title: '投递成功',
                        confirmText:'确定',
                        showCancel:false,
                        confirmColor:'#3CC51F',
                        content: res.data.info ,
                        success: function(res) {
                          if (res.confirm) {
                            // console.log('用户点击确定')
                            wx.redirectTo({
                              url: '../toudi/toudi'
                            })
                          }
                        }
                      })
                    }
                      // that.setData({
                      // xingbietype: res.data.xingbie,
                      // })
                      // 隐藏提示
                      // wx.hideToast()
                  },
                  // 接口调用失败
                  fail:function(){

                  },
                  complete:function(){
                  }
              })

            
          }
        }
      })
      

      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  shoucang:function(){
    var that = this;
     //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      var session_id = wx.getStorageSync('session_id')
      // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shoucangzhiwei', //真实的接口地址
          data: {
            'token':token,
          },
          method:'post',
          header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
            // console.log(res.data)
            if(res.data.status == 0){
              // 收藏失败
              wx.showModal({
                title: '收藏职位失败',
                confirmColor:'#3CC51F',
                content: res.data.info ,
                success: function(res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                  }
                }
              })

            }else{
              // 收藏成功
              wx.showModal({
                title: '操作成功',
                confirmText:'确定',
                showCancel:false,
                confirmColor:'#3CC51F',
                content: res.data.info ,
                success: function(res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                  }
                }
              })
            }
              // that.setData({
              // xingbietype: res.data.xingbie,
              // })
              // 隐藏提示
              // wx.hideToast()
          },
          // 接口调用失败
          fail:function(){

          },
          complete:function(){
          }
      })

      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  // 职位下架
  xiajia:function(){
    var that = this;
     //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      var session_id = wx.getStorageSync('session_id')
      wx.showModal({
          title: '确认下架该职位吗？',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '' ,
          success: function(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweixiajia', //真实的接口地址
                    data: {
                      'token':token,
                    },
                    method:'post',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie':'PHPSESSID='+session_id+'; path=/'
                    },
                    success: function(res) {
                      // console.log(res.data)
                      if(res.data.status == 1){
                        wx.redirectTo({
                            url: '../bianjizhiwei/bianjizhiwei?token='+token
                          })
                      }

                    },
                    // 接口调用失败
                    fail:function(){

                    },
                    complete:function(){
                    }
                })
            }
          }
        })
    })
  },
  // 职位上架
  shangjia:function(){
    var that = this;
     //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      var session_id = wx.getStorageSync('session_id')
      wx.showModal({
          title: '确认上架该职位吗？',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '' ,
          success: function(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweishangjia', //真实的接口地址
                    data: {
                      'token':token,
                    },
                    method:'post',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie':'PHPSESSID='+session_id+'; path=/'
                    },
                    success: function(res) {
                      // console.log(res.data)
                      if(res.data.status == 1){
                        wx.redirectTo({
                            url: '../bianjizhiwei/bianjizhiwei?token='+token
                          })
                      }

                    },
                    // 接口调用失败
                    fail:function(){

                    },
                    complete:function(){
                    }
                })
            }
          }
        })
    })
  },
  // 职位删除
  shanchu:function(){
    var that = this;
     //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      var session_id = wx.getStorageSync('session_id')
      wx.showModal({
          title: '提示',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '确认删除该职位吗？' ,
          success: function(res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=zhiweishanchu', //真实的接口地址
                    data: {
                      'token':token,
                    },
                    method:'post',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie':'PHPSESSID='+session_id+'; path=/'
                    },
                    success: function(res) {
                      // console.log(res.data)
                      if(res.data.status == 1){
                        wx.navigateBack({
                            delta: 1
                          })
                      }

                    },
                    // 接口调用失败
                    fail:function(){

                    },
                    complete:function(){
                    }
                })
            }
          }
        })
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
  // 分享
  onShareAppMessage: function () {
    return {
      title: title,
      desc: des,
      path: '/pages/jobs/jobs?token='+token

    }
  }
})