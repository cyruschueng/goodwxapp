function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "")
}
Page({
  data: {
    user:'',
    where:'',
    nickname:'',
    avatar:'',
    uid:'',
    textInput:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    
    var that = this;
    let userInfo = getApp().globalData.userInfo;
    console.log(userInfo['avatarUrl']);
    that.setData({
      nickname: userInfo['nickName'],
      avatar: userInfo['avatarUrl'] ? userInfo['avatarUrl'] : getApp().globalData.default_avatar,
      uid: getApp().globalData.uid
    });
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
    
    // wx.setNavigationBarTitle({
    //   title: '微问卷'
    // })
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
  textInput:function(e){
   this.setData({
     textInput:e.detail.value
   })
  }, 
  check: function () { 
    var that = this;
    if (!trim(this.data.textInput)){
      wx.showModal({
        title: '爱心提示！',
        content: '建议不能为空',
        showCancel: false
      });
      return false;
    }
    wx.showLoading({
      title: '提交中...',
    })
    wx.request({
      url: getApp().appApi.feedbackAPI,
      data: {
        uid: that.data.uid,
        content: that.data.textInput
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token'),
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        setTimeout(() => {
          wx.hideLoading();
        }, 100);
        if (res.data.code == 1001) {
          getApp().userLogin();
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
        if (res.data.code != 200) {
          wx.showModal({
            title: '请求失败！',
            content: res.data.msg,
            showCancel: false
          })
        } else {
          wx.showToast({
            title: '提交成功！',
          });
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    });
  }
})