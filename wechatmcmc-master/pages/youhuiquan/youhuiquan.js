// youhuiquan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0,
    sliderOffset: 0,
    sliderLeft: 0,
    tabs: ["待使用", "已使用","已过期"],
    wei:[],
    yi:[],
    guo:[]
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var session_id = wx.getStorageSync('session_id')
    var openid = wx.getStorageSync('wxopenid')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=yohuileibiao',
      data: {
        openid: openid,
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (res) {
     // console.log(res.data);
      that.setData({
        wei: res.data.wei,
        yi: res.data.yi,
        guo: res.data.guo
      })
        
      }
    })
  },
  lingqu:function(){
      wx.navigateTo({
        url: '../lingqu/lingqu',
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
  // onShareAppMessage: function () {
  
  // }
})