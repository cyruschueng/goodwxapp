// pages/success/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    this.setData({
      from:e.from,
    })
    var url = '/pages/'+e.to+'/'+e.to;
    setTimeout(function(){
      console.log(url);
      wx.switchTab({
        url: url,
      })
    },2000)
  },
})