// pages/me/me.js
var app = getApp()
Page({
  data:{
    userinfo:null
  },

  //跳转到我的订单
  gotoMyOrder:function(){
    wx.navigateTo({
      url: '/pages/MyOrder/MyOrder',
      success: function(res){
        // success
      },
    })
  },
    
  //跳转到常见问题
  gotoQuestions:function(){
    wx.navigateTo({
      url: '/pages/Questions/Questions',
      success: function(res){
        // success
      },
    })
  },
  //跳转到地址管理
  gotoAddress:function(){
    wx.navigateTo({
      url: '/pages/Address/Address',
    })
  },
  //跳转到待付款
  Payment:function(){
    wx.navigateTo({
      url: '/pages/MyOrder/MyOrder?NavFlag='+1,

    })
  },
    //跳转到待发货
  Send:function(){
    wx.navigateTo({
      url: '/pages/MyOrder/MyOrder?NavFlag='+2,

    })
  },
    //跳转到待收货
  Receipt:function(){
    wx.navigateTo({
      url: '/pages/MyOrder/MyOrder?NavFlag='+3,

    })
  },
  //跳转到待评价
  Evaluate:function(){
    wx.navigateTo({
      url: '/pages/MyOrder/MyOrder?NavFlag='+4,

    })
  },
  onLoad:function(options){
     var that=this;
     that.setData({
       userinfo:app.globalData.userInfo
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
  //调用登入接口
  
})