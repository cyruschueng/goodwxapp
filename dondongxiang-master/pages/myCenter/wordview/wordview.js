// pages/myCenter/wordview/wordview.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  worddist:function(e){
    wx.navigateTo({
      url: "/pages/myCenter/worddist/worddist?wordid=" + e.currentTarget.dataset.index+""
    })
  }
})