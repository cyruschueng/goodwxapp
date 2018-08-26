// pages/tool/transmit/transmitPosts/transmitPosts.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    body: '',
    time: ''
  },
  go: function () {
    wx.reLaunch({
      url: '/pages/home/home'
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发布成功'
    })
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      username: userInfo.name,
      avatar: userInfo.avatar
    })
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();

    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    console.log(options);
    this.setData({
      title: options.title,
      desc: options.body,
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second,
      asset: options.asset
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
      title: userInfo.name + '通知你：',
      path: '/pages/home/chuandiDetail/chuandiDetail?id=' + event.currentTarget.id + '&xqname=' + userInfo.xqname + '&xqid=' + userInfo.xqid,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }

  }

})