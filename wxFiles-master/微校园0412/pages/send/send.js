var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    cli:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  username: function (e) {
    this.setData({ username: e.detail.value })
  },
  password: function (e) {
    this.setData({ password: e.detail.value })
  },
  navToPanel: function(){
    this.setData({
      cli: false
    })
    wx.showToast({
      title: '登录中...',
      icon:'loading',
      duration:10000
    })
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/psylogin.do',
      data:{
        appusername:that.data.username,
        apppassword:that.data.password
      },
      method:'post',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success:function(res){
        wx.hideToast();
        that.setData({cli:true})
        if(res.data != 0){
          var id = res.data.id;
          var uin = res.data;
          var address = res.data.address;
          wx.connectSocket({
            url: app.globalData.WS,
          })
          wx.onSocketOpen(function(res){
            console.log('WebSocket连接已打开！');
            wx.sendSocketMessage({
              data: JSON.stringify({ protocol: 1001, id: id, address: address }),
            });
            wx.setStorageSync("appusername", uin.appusername);
            wx.setStorageSync("apppassword", uin.apppassword);
            wx.setStorageSync("appid", uin.id);
            wx.redirectTo({
              url: '/pages/send/panel/panel',
            })
          })
        
        
        }else{
          wx.showToast({
            title: '用户名或密码错误',
            image:'/images/60.png',
            duration:1000
          })
        }
      },
      fail:function(res){
        wx.showToast({
          title: '服务器维护中',
          image: '/images/60.png',
          duration: 1000
        })
        that.setData({ cli: true })
      }
    })
    
  },
  onLoad: function (options) {
    app.getWindow(this);
    if(wx.getStorageSync("appusername")){
      this.setData({
        username: wx.getStorageSync("appusername"),
        password: wx.getStorageSync("apppassword")
      })
    }
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