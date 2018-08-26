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

    /*
    重要
    */
    wx.showShareMenu({
      withShareTicket: true
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
  onShareAppMessage: function (options) {
    // if (options.from === 'button') {
    //   // 来自页面内转发按钮
    //   //console.log(options.target)
    //   console.log('来自页面内转发按钮');
    // }

    return {
      title: "转发标题",
      path: "pages/Bition/bition",
      success: function (res){

        var shareTicket = res.shareTickets[0];
        console.log("转发成功-shareTicket:", shareTicket);

        wx.getShareInfo({
          shareTicket: shareTicket,
          success: function(ress) {
            console.log("获取转发信息成功");
            console.log(ress);
          }
        });
      }
    };

  },











})