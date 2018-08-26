// pages/suggestion/suggestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    sum: 500,
    discription: '',
    input:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**可以将options参数传递给wx.request()，将获取到的值赋值给discription */
    var obj=this.data.input;
    var that=this;
    wx.request({
      url: getApp().globalData.host+"/GetDiscription",
      data: {page: options.page},
      method: 'POST',
      header: { 'content-type': "application/x-www-form-urlencoded"},
      success: function(e) {
        that.setData({discription: e.data});
      }
    });
    obj["page"]=options.page;
    obj["app"]="四则运算出题器";
    obj["username"] = getApp().globalData.userInfo.nickName;
    this.setData({input:obj});
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
  
  },
  bindInput: function(e) {
    var obj=this.data.input;
    var text=e.detail.value;//输入的具体内容
    obj[e.target.id]=text;
    this.setData({input: obj});
    if(e.target.id==='content'){//建议的具体内容部分
      this.setData({current: text.length});
    }
  },
  tijiao: function(e) {
    console.log(this.data.input);
    var that=this;
    wx.request({
      url: getApp().globalData.host+"/InsertSuggestion",
      data: that.data.input,
      method: "POST",
      header: { 'content-type': "application/x-www-form-urlencoded"},
      success: function(e) {
        console.log(e);
        if(e.data==="成功"){
          wx.showToast({
            title: '提交成功',
            duration: 3000,
            icon: 'success'
          });
        }else {
          wx.showToast({
            title: '提交失败',
            duration: 3000,
            image: '/images/wrong.png'
          })
        }
      }
    });
  }
})