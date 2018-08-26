// pages/getjianli/getjianli.js
var token;
var name;
var qiyechankan;
var app = getApp()
var jianlishu;
Page({
  data:{
    userInfo:{},
    info:{},
    look:0,
    phone:0
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    token = options.token;
    // 加载数据
    wx.showToast({
        title: '简历加载中…',
        icon: 'loading',
        duration: 10000
    });
    // 获取数据
    var openid = wx.getStorageSync('wxopenid')
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=getjiali', //真实的接口地址
          data: {
              'token':token,
              'openid':openid
          },
          header: {
              'content-type': 'application/json',
          },
          success: function(res) {
              // console.log(res.data)
              name = res.data.name;
              qiyechankan = res.data.look;
              if (res.data.jianlishu==null){
                jianlishu = 0;
              }else{
                jianlishu = res.data.jianlishu;
              }
             
              that.setData({
                info:res.data,
                look:res.data.look,
                phone:res.data.phone
              })
              // 隐藏提示
              wx.hideToast()
              if(res.data.lahei==1){
                wx.showModal({
                  title: '提示',
                  content: '该简历已被拉黑，请慎重',
                  showCancel: false,
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
  callphone:function(e){
    var that = this;
    app.getUserInfo(function(userInfo){
      var session_id = wx.getStorageSync('session_id')
      var openid = wx.getStorageSync('wxopenid')
      if (that.data.look ==0){
        wx.showModal({
          title: '下载方式:-1简历数',
          confirmText: '立即下载',
          confirmColor: '#3CC51F',
          content: '剩余简历数:' + jianlishu,
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
             
              // 获取数据
              wx.request({
                url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=callphone', //真实的接口地址
                data: {
                  'token': token,
                  'openid': openid
                },
                method: 'post',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Cookie': 'PHPSESSID=' + session_id + '; path=/'
                },
                success: function (res) {
                  // console.log(res.data)
                  // 0,说明企业简历数不够了
                  if (res.data.status == 0) {
                    wx.showModal({
                      title: '提示',
                      confirmText: '去购买',
                      // content: '您的可用简历数不足',
                      confirmColor: '#3CC51F',
                      content: res.data.info,
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
                    // 调用电话
                    // wx.makePhoneCall({
                    //   phoneNumber: res.data.phone  //
                    // })
                    wx.showToast({
                      title: '下载成功',
                      icon: 'success',
                      duration: 1500,
                      success: function () {
                        that.setData({
                          phone: res.data.phone,
                          look: 1
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
        })
      }
      else{
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.id    //
        })
        
      }
     
      that.setData({
        userInfo:userInfo
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
  }
})