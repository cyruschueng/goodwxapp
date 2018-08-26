// pages/nextPage/nextPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  back:function(){   
    /*
      wx.redirectTo(Object) 跳转到此页面  所以不能使用wx.navigateBack(OBJECT)跳转回去
      如果是wx.navigateTo(OBJECT)跳转过来的 则就可以用wx.navigateBack(OBJECT)跳转返回
    */
    // wx.navigateBack({  //不能返回上一层
    //   delta: 1
    // });
    // console.log('请进来')
  
     wx.navigateTo({   //跳转到其他页面
      url: '../test/test?id=1'
    });
  
    // wx.switchTab({
    //   url: '../index/index?abc=555',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
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