var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.wxRequest('user/wx/log.do',{userid:wx.getStorageSync("openid")},function(res){
      that.setData({
        list:res,
        loading:false
      })
    })
  },
})