// pages/mine/recommend/recommendPosts/recommendPosts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tel: '',
    beizhu: '',
    tags:''
  },
  
  go: function () {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var username = wx.getStorageSync('userInfo').name;
    this.setData({
      username: username
    })
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();

    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    this.setData({
      name:options.name,
      tel:options.tel,
      beizhu:options.beizhu,
      tags:options.tags,
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second,
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
    var userInfo = wx.getStorageSync('userInfo');
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '认识邻居',
      path: '/pages/home/topicDetail/topicDetail？id=' + event.currentTarget.id + '&xqname=' + userInfo.xqname + '&xqid=' + userInfo.xqid,
      success: function (res) {
        // 转发成功
        console.log("转发成功")
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})