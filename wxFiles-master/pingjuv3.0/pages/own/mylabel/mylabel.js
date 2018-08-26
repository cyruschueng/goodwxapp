// pages/own/mylabel/mylabel.js
Page({
  data:{
    tags:[]
  },
  onLoad:function(options){
    this.setData({tags:wx.getStorageSync('userInfo').tags.split('|')})
    
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