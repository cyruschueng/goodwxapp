// pages/bind/bind.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '用户绑定',
    userInfo: {},
    mobile:''
  },
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bind:function(){
    var that=this;
    var mobile = that.data.mobile
    if(!mobile){
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        mask:true,
        duration: 1000
      })
      return false;
    }
    wx.request({
      url: app.globalData.domain + '/binduser',
      data: { 
        nickname: app.globalData.userInfo.nickName,
        openid: app.globalData.userInfo.openid,
        mobile:mobile,
        groupid: app.globalData.userInfo.groupid
      },
      success: function (res) {
        if (res.data) {
          var g = app.globalData;
          g.userInfo.isbind = true;
          g.userInfo.groupid = res.data.groupid;
          var score = res.data.score;
          var rule = g.scoreRule.find(e => e.start <= score && e.end > score);
          g.userInfo.ph = rule.name;
          g.userInfo.score = score;
          g.userInfo.mobile = res.data.mobile;
          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            mask: true,
            duration: 2000
          })
          wx.reLaunch({
            url: "/pages/index/index"
          });
        }
        else{
          wx.showToast({
            title: '绑定失败',
            icon: 'none',
            mask: true,
            duration: 1000
          })

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo
      })
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
  onShareAppMessage: function () {
  
  }
})