// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     list:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    console.log(options.id)
    var that = this;
    wx.request({
      url: 'https://route.showapi.com/213-4?showapi_appid=53050&showapi_sign=3efebeba00b94897be10e80c7dc6fe5e&topid='+options.id,
      success(res){
        console.log(res.data)
        var list = res.data.showapi_res_body.pagebean.songlist;
        var newlist = list.slice(50, 68);
        function formatSeconds(value) {
          var theTime = parseInt(value);// 秒
          var theTime1 = 0;// 分
          var theTime2 = 0;// 小时
          if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
              theTime2 = parseInt(theTime1 / 60);
              theTime1 = parseInt(theTime1 % 60);
            }
          }
          var result = "" + parseInt(theTime);
          if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + ":" + result;
          }
         
          return result;
        }
        for(var i=0;i<newlist.length;i++){
         newlist[i].id=options.id,
           newlist[i].seconds = formatSeconds(newlist[i].seconds)
        }
        that.setData({
          list:newlist
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