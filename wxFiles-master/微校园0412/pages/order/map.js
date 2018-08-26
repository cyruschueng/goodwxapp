var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/ps.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 30,
      height: 30
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.getWindow(this);
    wx.request({
      url: app.globalData.IP + 'wx/psylocation.do',
      data: { psyid: options.psyid },
      success: function (res) {
        console.log(res)
        var pol = that.data.markers;
        var ll = res.data.result.split(',');
        pol[0].longitude = ll[1];
        pol[0].latitude = ll[0];
        console.log('other')
        console.log(pol)
        that.setData({ markers:pol})
      }
    })
    that=this;
       wx.getLocation({
         success: function(res) {
           console.log('my')
           console.log(res)
               that.setData({
                 latitude: res.latitude,
                 longitude: res.longitude
               })
           
         },
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
    app.run("进入map界面");
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