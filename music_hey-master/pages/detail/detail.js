// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  song_id:'',
  singerid:'',
  detailArr:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
  console.log(options.id)
    this.setData({
      songid:options.songid,
      singerid: options.singerid
    })
      var that=this
    wx.request({
      url: "https://route.showapi.com/213-4?showapi_appid=53050&showapi_sign=3efebeba00b94897be10e80c7dc6fe5e&topid="+options.id,
      success(res) {
         console.log(res.data);
        var list = res.data.showapi_res_body.pagebean.songlist;
        var detail=[]
        for(var i=0;i<list.length;i++){
          if (that.data.songid == list[i].songid && that.data.singerid == list[i].singerid){
            detail.push(list[i])
            that.setData({
              detailArr: detail
            })
          }
        }
        console.log(that.data.detailArr,"2")
      }}),
      // 转发
      wx.showShareMenu({
        withShareTicket: true
      })
  },
  onShareAppMessage: function () {
    return {
      title: '标题',
      path: 'pages/hotst',
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
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