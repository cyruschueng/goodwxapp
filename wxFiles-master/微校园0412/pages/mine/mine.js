// pages/wode/wode.js
var app=getApp();
var that;
Page({
  data:{
    bgImg:'/images/mine/bgImg.jpg',
    avatar:'/images/mine/avatar.png',
    name:'',
    head:'',
    showo:false,
    showp:false,
    sh:false,
    ftype:1
  },
  //notIn: function () {
   //  wx.showModal({
     // title: '提示',
    //  content: '亲，先成为会员',
     // confirmText:'立即前往',
     // success: function (res) {
        //if(res.confirm){
         // wx.redirectTo({
         //   url: '/pages/payment/payment',
         // })
      //  }
     // }
    //})
 // }, 
  scan: function(){
    wx.scanCode({
      success: function (res){
        wx.request({
          url: app.globalData.IP + 'wx/adminlogin.do',
          data:{
            uuid:res.result,
            userid:app.globalData.ID,
          },
          success: function (res){
            console.log(res)
          }
        })
      }
    })
  },
  navToAbout: function () {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  navSecond: function(){
    wx.navigateTo({
      url: '/pages/send/qiang/qiang',
    })
  },
  navToRun: function () {
    wx.navigateTo({
      url: '/pages/run/run',
    })
  },
  navToSend: function(){
    wx.navigateTo({
      url: '/pages/send/panel/panel',
    })
  },
  navToPayment: function(){
    wx.navigateTo({
      url: '/pages/payment/payment',
    })
  },
  navToRecharge: function () {
    wx.navigateTo({
      url: '/pages/recharge/recharge',
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    app.getWindow(this);
    that=this;
    that.setData({
      name:app.globalData.userInfo.nickName,
      head:app.globalData.userInfo.avatarUrl
    })
    var that = this
    wx.request({
      url: app.globalData.IP + 'wx/mymsg.do',
      data: {
        userid: app.globalData.ID
      },
      success: function (res) {
        that.setData({ user: res.data })
      }
    });
  },
  showModelsh: function (){
    wx.showModal({
      title: '提示',
      content: '正在审核中，请耐心等待',
      showCancel:false,
      confirmText:'朕知道了'
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    that = this
    app.run("进入我的界面");
    wx.request({
      url: app.globalData.IP + 'wx/checkpsy.do',
      data: {
        userid: app.globalData.ID
      },
      success: function (res) {
        
        if (res.data == 0) {
          that.setData({ showp: true, showo: false })
        } else if (res.data[0].exam == 1) {
          wx.setStorageSync('appid', res.data[0].id)
          wx.setStorageSync('psyaddress', res.data[0].address);
          that.setData({ showp: false, showo: true,ftype: res.data[0].type })
        } else if(res.data[0].exam == 0){
          that.setData({ showp: true, showo: false,sh:true })
        }
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  distributionAddress:function(){
    wx.navigateTo({
      url: '/pages/mine/contactList/contactList'
    })
  }
})