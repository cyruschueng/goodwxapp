// pages/tool/winepost/winepost.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winename:'',
    winenumber:'',
    desc: ''
  },
  go:function(){
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var userInfo = wx.getStorageSync('userInfo')
    var userInfo = publicUrl.globalData.userInfo;
    var assets = [];
    console.log(userInfo)
    console.log(options)
    var asset = options.asset.split(',')
    console.log(asset)
    this.setData({
      name: userInfo.name,
      winename: options.winename,
      winenumber: options.winenumber,
      desc: options.desc,
      assets: asset,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
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
  onShareAppMessage: function (res) {
    // var userInfo = wx.getStorageSync('userInfo');
    var userInfo = publicUrl.globalData.userInfo
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: userInfo.name + '通知你：',
      path: '/pages/home/weixindetail/weixindetail?id=' + event.currentTarget.id + '&xqname=' + userInfo.xqname + '&xqid=' + userInfo.xqid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})