// pages/personal/mytopic/mytopic.js
var publicUrl = getApp();
var url = publicUrl.globalData.baseAPI;
var picUrl = publicUrl.globalData.picurl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xqid: 0,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    length:0,
    posts: []
  },
  clickHuati: function(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/home/topicDetail/topicDetail?id=' + event.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // var userInfo = wx.getStorageSync('userInfo');
    var userInfo = publicUrl.globalData.userInfo
    var posts = [];
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: url + '/users/allposts/' + userInfo.id,
      data: {
      },
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      success: function (res) {
        if(res.data.code==10001){
          that.setData({
            message:'您还没有发布话题，快去发布吧~'
          })
        } else if (res.data.code == 10002){
          console.log(res.data)
          for (var i = 0; i < res.data.posts.length; i++) {
            var post = {
              id: res.data.posts[i].id,
              username: userInfo.name,
              userasset: userInfo.avatar,
              title: res.data.posts[i].title,
              sumcomment: res.data.posts[i].sumcomment,
              sumthumb: res.data.posts[i].sumthumb,
              created_at: res.data.posts[i].created_at,
              leixing: res.data.posts[i].leixing
            }
            posts.push(post);
          }
          that.setData({
            posts: posts,
            length: res.data.sumposts
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