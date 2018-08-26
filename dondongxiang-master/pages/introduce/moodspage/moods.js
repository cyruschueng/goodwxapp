// pages/introduce/moodspage/moods.js
var app = getApp();
Page({
  data: {
    friendsData:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.url +'/user/user/getFriends?user_id=' + app.globalData.user_id +'',
      method:'post',
      data: {
        user_id: app.globalData.user_id,
        type:2
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          that.setData({
            friendsData: res.data.data.friends
          })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  detailsTap:function(e){
    wx.navigateTo({
      url: "/pages/myCenter/details/details?AppUserId=" + e.currentTarget.dataset.inindex + ""
    })
  },
  dialphone:function(e){
    var phone = e.currentTarget.dataset.index == "" ? "号码为空" : e.currentTarget.dataset.index;
    wx.makePhoneCall({
      phoneNumber: phone
    })
  }
})