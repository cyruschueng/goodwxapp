// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [],
    style: 0,
    heImg: '',
    wecha_id: ''
  },

  //跳转到聊天页面
  toTalk: function(e) {
    var mid = e.currentTarget.dataset.itemIndex;
    var wid = getApp().globalData.wecha_id;

    wx.navigateTo({
      url: '../talk/talk?mid=' +mid+ '&wid=' +wid,
    })

  },

  //聊天列表详情
  talkList: function() {
    var that = this;
    setInterval(function() {
      wx.request({
        url: 'https://xcx.misass.com/huadu/index.php?s=/api/Message/message_list',
        method: 'POST',
        data: {
          wecha_id: getApp().globalData.wecha_id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data.code == '100000') {
            that.setData({
              users: res.data.message,
            })
          }
        }
      })
    },500)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.talkList();
    this.setData({
      status: getApp().globalData.status,
      wecha_id: getApp().globalData.wecha_id
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
  onShareAppMessage: function () {
  
  }
})