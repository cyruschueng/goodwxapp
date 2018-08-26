// pages/setting/setting.js
Page({
  data: {
    name:'未设置',
    phone:'未绑定'
  },
  onLoad:function(){
    var that = this;
    console.log(getApp().globalData.userphone)
    if(getApp().globalData.userphone==null){
      that.setData({
        userphone:'1'
      })
    }else{
      that.setData({
        userphone:'0',
        name: getApp().globalData.username,
        phone: getApp().globalData.userphone
      })
    }
  },
  onShow:function(){
    var that = this;
    console.log(getApp().globalData.userphone)
    if (getApp().globalData.userphone == undefined) {
      that.setData({
        userphone: '1'
      })
    } else {
      that.setData({
        userphone: '0',
        name: getApp().globalData.username,
        phone: getApp().globalData.userphone
      })
    }
  },
  tobind:function(){
    wx.navigateTo({
      url: '/pages/bindphone/bindphone',
    })
  }
})