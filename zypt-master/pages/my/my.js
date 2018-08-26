// pages/my/my.js
var app = getApp();
Page({
  data: {
    username:""
  },

  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var info = wx.getStorageSync('ptuserinfo');
    this.setData({username: info.username})
  }, 

  wxlogout(){//解除绑定
    let that = this;
    
  }
})