// pages/personal/myChuandi/myChuandi.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    length: 0,
  },
  clickChuandi:function(event){
    wx.navigateTo({
      url: '/pages/home/chuandiDetail/chuandiDetail?id=' + event.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = publicUrl.globalData.userInfo
    var that = this;
    var passes = [];
    wx.request({
      url: url + '/passes',
      data: {
        userid: userInfo.id
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        if(res.data.code == 10001){
          that.setData({
            message: '您还没有发布图书传递，快去发布吧~'
          })
        }else if(res.data.code == 10002){
          console.log(res.data)
          for (var i = 0; i < res.data.passes.length; i++) {
            var pass = {
              id: res.data.passes[i].id,
              username: userInfo.name,
              userasset: userInfo.avatar,
              userid: res.data.passes[i].user_id,
              title: res.data.passes[i].title,
              time: res.data.passes[i].time,
              sumthumb: res.data.passes[i].sumthumb,
              created_at: res.data.passes[i].created_at,
              leixing: res.data.passes[i].leixing
            }
            passes.push(pass);
          }
          that.setData({
            passes: passes,
            length: res.data.passes.length
          })
        }
        
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