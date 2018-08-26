// pages/my.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World!!',
   list:[
     '/pages/image/myphoto1.jpg',
     '/pages/image/myphoto2.jpg',
     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509083854109&di=90c55355e5ac4395d9cb9d1cf5f1c659&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F960a304e251f95ca12444c75c3177f3e66095244.jpg',
     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509083782212&di=d22661be71b3072a9810f5ff522faaa8&imgtype=0&src=http%3A%2F%2Fmvimg1.meitudata.com%2F551f2718c5cbf4963.jpg',
     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509083782211&di=6d0404004b1be941aebcc7b7c98e4331&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201412%2F10%2F20141210234151_GGQH3.thumb.700_0.jpeg',
     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509083854109&di=2400bc4e8290e1967690cdf1a2c29ecb&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fd058ccbf6c81800ae72a1fcdbb3533fa838b4722.jpg'
   ]
  },
  //事件处理函数
  swiphandle: function () {
    console.log('go')
    wx.navigateTo({
      url: 'logs/logs',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('my:onload')
    wx.showLoading({
      title: '加载中...',
    })
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  wx.login({
    success:function(res){
      if(res.code){
       
      }else{
        wx.showToast({
          title:res.errMsg,
        })
      }
     
    }
  })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  console.log('my:onshow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})