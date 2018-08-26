// pages/personal/myservice/myservice.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sermens = [];
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    wx.request({
      url: url + '/users/allsermen/' + userInfo.id,
      data: {
      },
      header: {
        'Accept': "*/*"
      },
      success: function (res) {
        console.log(res.data);
        console.log(res.data.serman);
        //请求sermen数
        for (var i = 0; i < res.data.serman.length; i++) {
          var sermen = {
            id: res.data.serman[i].id,
            username: userInfo.name,
            userasset: userInfo.avatar,
            name: res.data.serman[i].name
          }
          sermens.push(sermen);
          console.log(sermens)
        }
        that.setData({
          sermens: sermens
        })
      },
      fail: function (error) {
        console.log(error);
        return 0;
      }
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