// pages/getjianli/getjianli.js
var app = getApp()
var token;
var name;

Page({
  data:{
    userInfo:{},
    info:{},
    token:null,
    isshangxian:0,
    height:0
  },
  xiugai:function(e){
    // console.log(token);
    wx.navigateTo({
      url: '../jianli/jianli?token='+token
    })
  },
  shuaxin:function(e){
    var that = this;
    var session_id = wx.getStorageSync('session_id')
        wx.showModal({
                  title: '提示',
                  confirmText:'确定',
                  confirmColor:'#3CC51F',
                  content: '刷新后排名靠前，更容易找到工作' ,
                  success: function(res) {
                    if (res.confirm) {
                      // 加载数据
            wx.showToast({
                title: '正在刷新…',
                icon: 'loading',
                duration: 10000
            });
            // 获取数据
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=jianlishuaxin', //真实的接口地址
                  data: {
                    'token':token,
                  },
                  method:'post',
                  header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'Cookie':'PHPSESSID='+session_id+'; path=/'
                  },
                  success: function(res) {
                      // console.log(res.data)
                      // 隐藏提示
                      wx.hideToast()
                      if(res.data.status == 1){
                        wx.showToast({
                          title: '刷新成功',
                          icon: 'success',
                          duration: 2000
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

    
    
  },
  shangjia:function(e){
    var that = this;
    var session_id = wx.getStorageSync('session_id')

    wx.showModal({
          title: '确认上架该简历吗？',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '' ,
          success: function(res) {
            if (res.confirm) {
                // 加载数据
    wx.showToast({
        title: '正在操作…',
        icon: 'loading',
        duration: 10000
    });
      // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=jianlishangjia', //真实的接口地址
            data: {
              'token':token,
            },
            method:'post',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
                // console.log(res.data)
                
                if(res.data.status == 2){
                  wx.showToast({
                    title: '上架成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
                // 隐藏提示
                wx.hideToast()
                wx.redirectTo({
                    url: '../kanjianli/kanjianli'
                  })
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })
            }
          }
    });


    
  },
  xiajia:function(e){
    var that = this;
    var session_id = wx.getStorageSync('session_id')
    wx.showModal({
          title: '确认下架该简历吗？',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '' ,
          success: function(res) {
            if (res.confirm) {
              // 加载数据
    wx.showToast({
        title: '正在操作…',
        icon: 'loading',
        duration: 10000
    });
      // 获取数据
        wx.request({
          url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=jianlixiajia', //真实的接口地址
            data: {
              'token':token,
            },
            method:'post',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie':'PHPSESSID='+session_id+'; path=/'
            },
            success: function(res) {
                // console.log(res.data)
                
                if(res.data.status == 2){
                  wx.showToast({
                    title: '下架成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
                // 隐藏提示
                wx.hideToast()
                wx.redirectTo({
                    url: '../kanjianli/kanjianli'
                  })
            },
            // 接口调用失败
            fail:function(){

            },
            complete:function(){
            }
        })
            }
          }
    });
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    var that = this;
    // 加载数据
    wx.showToast({
      title: '简历加载中…',
      icon: 'loading',
      duration: 10000
    });
    // 获取数据
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=kanjianli', //真实的接口地址
          data: {
            openid:openid,
          },
          header: {
              'content-type': 'application/json',
              'Cookie':'PHPSESSID='+session_id+'; path=/'
          },
          success: function(res) {
             
              name = res.data.name;
              // if (res.data.name == null || res.data.name == '' ){
              //   wx.redirectTo({
              //   url: '../jianli/jianli'
              // })
              // }
              console.log(res);
              token = res.data.token; 
              wx.getSystemInfo({
                success: function(e) {
                  that.setData({
                    info: res.data,
                    token: res.data.token,
                    height:e.windowHeight*0.07
                  })
                },
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
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this;
    var session_id = wx.getStorageSync('session_id')
    // 加载数据
   
    // 获取数据
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=kanjianli', //真实的接口地址
      data: {
      },
      header: {
        'content-type': 'application/json',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
        
        name = res.data.name;
        // if (res.data.name == null || res.data.name == '' ){
        //   wx.redirectTo({
        //   url: '../jianli/jianli'
        // })
        // }
        token = res.data.token;
        that.setData({
          info: res.data,
          token: res.data.token
        })
        // 隐藏提示
        wx.hideToast()
      },
      // 接口调用失败
      fail: function () {

      },
      complete: function () {
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