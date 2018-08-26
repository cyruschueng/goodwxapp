// kanjianjie.js
var id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:[],
      height:0
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this;
    var session_id = wx.getStorageSync('session_id')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=kanjianjie',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success:function(e){
        id=e.data.id;
        wx.getSystemInfo({
          success: function(res) {
            that.setData({
              info: e.data,
              height:res.windowHeight*0.07
            })
          },
        })
        
      }
      })
  },
  xiugai:function(){
    wx.navigateTo({
      url: '../gongsijianjie/gongsijianjie?token='+id
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
    var that = this;
    var session_id = wx.getStorageSync('session_id')
    wx.request({
      url: 'https://www.mcmchw.com/index.php?m=Home&c=Mcmc&a=kanjianjie',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'PHPSESSID=' + session_id + '; path=/'
      },
      success: function (e) {
        id = e.data.id;
        that.setData({
          info: e.data
        })
      }
    })
  },
  xiugai: function () {
    wx.navigateTo({
      url: '../gongsijianjie/gongsijianjie?token=' + id
    })
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