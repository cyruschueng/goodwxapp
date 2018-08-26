// pages/jobs/jobs.js
var token;
var title;
var des;

var app = getApp()
Page({
  data:{
    info:{},
    userInfo:{},
    sc:0,
   
  },
  formsubmit: function (e) {
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    console.log(e.detail.formId);
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=moreFormId',
      data: {
        'openid': openid,
        'formId': e.detail.formId
      },
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        console.log(e);
      }
    })
  },
  callphone:function(e){
    // console.log(e);
    var callphone = e.target.dataset.name;
    wx.makePhoneCall({
      phoneNumber: callphone //仅为示例，并非真实的电话号码
    })
  },
  
  onLoad:function(options){
    var that = this
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    
    // 页面初始化 options为页面跳转所带来的参数
    token = options.token
    
    // 加载数据
    wx.showToast({
        title: '数据加载中…',
        icon: 'loading',
        duration: 10000
    });
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
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
      var height1;
      
          that.setData({
            info: res.data,
            sc:res.data.sc,
           
          })
          title = res.data.title;
          des = '';
          // 隐藏提示
          wx.hideToast()
          if(res.data.shangjia==1||res.data.lahei==1){
            wx.showModal({
              title: '提示',
              content: '该职位已下架或者被拉黑',
              showCancel: false,
              success: function (res) {
                if (res) {
                  wx.switchTab({
                    url: '../index/index'
                  })
                }
              }
            })
          }
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

    })
  },
  // mefabu:function(){
  //   // console.log("我也要发布")
  //   // var that = this;
  //   wx.switchTab({
  //     url: '/pages/fabu/fabu'
  //   })
  // },
  toudi:function(e){
    var formid=e.detail.formId;
    var that = this;
     //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      var session_id = wx.getStorageSync('session_id')
      var openid = wx.getStorageSync('wxopenid')
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkjianli',
        data: {
          'token': token,
          'openid': openid,
          
        },
        method: 'post',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id + '; path=/'
        },
        success:function(e){
          if (e.data.status==0){
            wx.showModal({
              title: '提示',
              confirmText: '现在完善',
              confirmColor: '#3CC51F',
              content: '请完善您的个人简历',
              // content: res.data.info ,
              success: function (res) {
                if (res.confirm) {
                  // console.log('用户点击确定')
                  wx.navigateTo({
                    url: '../jianli/jianli'
                  })
                }
              }
            })
          }else {
            if(e.data.lahei==0){
              wx.showModal({
                title: '确定投递简历',
                confirmText: '投递简历',
                confirmColor: '#3CC51F',
                content: "",
                success: function (res) {
                  if (res.confirm) {
                    

                    // 获取数据
                    wx.request({
                      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=toudi', //真实的接口地址
                      data: {
                        'token': token,
                        'openid': openid,
                        
                      },
                      method: 'post',
                      header: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                      },
                      success: function (res) {
                        // console.log(res.data)
                        if (res.data.status == 2) {
                          // 不能投递自己
                          wx.showModal({
                            title: '投递失败',
                            confirmText: '确定',
                            showCancel: false,
                            confirmColor: '#3CC51F',
                            content: res.data.info,
                            success: function (res) {
                              if (res.confirm) {
                                // console.log('用户点击确定')
                              }
                            }
                          })
                        } else {
                          // 投递成功
                          wx.showModal({
                            title: '投递成功',
                            confirmText: '确定',
                            showCancel: false,
                            confirmColor: '#3CC51F',
                            content: res.data.info,
                            success: function (res) {
                              if (res.confirm) {
                                // console.log('用户点击确定')
                                wx.showToast({
                                  title: '投递成功',
                                  icon: 'success',
                                  duration: 1000
                                })

                              }
                            }
                          })
                          var qyopenid = res.data.qyopenid;
                          wx.request({
                            url: 'https://www.mcmchw.com/index.php?m=Home&c=Modenews&a=sendMessage',
                            method: 'post',
                            data: {
                              openid: qyopenid,
                              template_id: 'CJUHLToqs1J_NjxsOGZdB-zcU0UL7pxEtIUfTkCpaZQ',
                              code:1,
                                name: res.data.name,
                                jingyan: res.data.jingyan,
                                title: title,
                                time: res.data.time,
                            },
                            header: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                            },
                            success: function (e) {
                             
                              console.log(e);
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
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '您的简历已被拉黑，如有疑问请联系客服',
                showCancel: false,
              })
            }
           
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
      var openid=wx.getStorageSync('wxopenid')
      // 获取数据
      //console.log(token)
     wx.request({
       url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkshoucang',
       data:{
         'token':token,
         'openid':openid
       },
       method:'post',
       header:{
         'Content-Type': 'application/x-www-form-urlencoded',
         'Cookie':'PHPSESSID='+session_id+'; path=/'
       },
       success:function(res){
         wx.showModal({
                title: '提示',
                confirmText:'确定',
                // showCancel:false,
                confirmColor:'#3CC51F',
                content: res.data.info ,
                success: function(res) {
                  if (res.confirm) {
                    wx.request({
                        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=shoucangzhiwei', //真实的接口地址
                          data: {
                            'token':token,
                            'openid':openid
                          },
                          method:'post',
                          header: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Cookie':'PHPSESSID='+session_id+'; path=/'
                          },
                          success: function(res) {
                            that.setData({
                              sc:res.data.sc
                            }),
                              wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 1000
                              })
                            }
                          })
                  }
                }
              })
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
          title: '确认下架',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '确认下架该职位吗？' ,
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
                            url: '../jobs/jobs?token='+token
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
          title: '确认上架',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '确认从新上架该职位吗？' ,
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
                            url: '../jobs/jobs?token='+token
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
          title: '确认删除',
          confirmText:'确定',
          confirmColor:'#3CC51F',
          content: '警告：确认删除该职位吗？一旦删除无法恢复' ,
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
      title: "只为餐饮人提供机会",
      desc: "",
      path: '/pages/jobs/jobs?token='+token

    }
  }
})