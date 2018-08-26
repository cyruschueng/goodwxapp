// pages/fabu/fabu.js
var app=getApp()
// var openid = wx.getStorageSync('wxopenid')
// var session_id = wx.getStorageSync('session_id')
Page({
  data:{
    height:0,
    height2:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var res=wx.getSystemInfoSync();
    var h=res.windowHeight*0.25;
    var h2=res.windowWidth*0.5*0.30;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        height:h,
        height2:h2,
        userInfo: userInfo
      })
    })
    var openid = wx.getStorageSync('wxopenid')
   var session_id = wx.getStorageSync('session_id')
  },
  fabunum:function(e){
    var id=e.currentTarget.dataset.id;
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkNum',
      data: {
        'openid': openid,
        'token':id
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        console.log(e);
        if(e.data.vip==0){
          wx.navigateTo({
            url: '../put2/put2?token='+id
          })
        }else{
          if(e.data.num>=e.data.max){
            wx.showModal({
              title: '提示',
              content: '最多只能发送'+e.data.max+'条',
              showCancel:false
            })
          }else{
            wx.navigateTo({
              url: '../put2/put2?token=' + id
            })
          }
        }

      }
    })
  },
  fabujianli:function(){
    
     
      // console.log(openid);
    var session_id = wx.getStorageSync('session_id');
    var openid = wx.getStorageSync('wxopenid');
      wx.request({
        url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkjianli',
        data:{
          'openid':openid
        },
        method:'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': 'PHPSESSID=' + session_id + '; path=/'
        },
        success:function(e){
          // console.log(e.data)
          if (e.data.status==1){
              wx.navigateTo({
                url: '../kanjianli/kanjianli'
              })
            }
            else{
              wx.navigateTo({
                url: '../jianli/jianli'
              })
            }
        }
      })
  },
  // checktype:function(e){
    
  //   var token=e.currentTarget.dataset.id;
    
  //   wx.request({
  //     url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=checkType',
  //     data:{
  //       token:token,
  //       openid:openid
  //       },
  //     success:function(res){
  //         if(res.data==1){
  //           wx.navigateTo({
  //             url: '../put2/put2?token='+token
  //           })
  //         }else{
            
  //           wx.showModal({
  //             title: '提示',
  //             content: res.data,
  //             showCancel:false,
              
  //           })
  //         }
  //     }
  //   })
  // },
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
      path: '/pages/fabu/fabu'

    }
  }
})