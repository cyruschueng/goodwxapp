var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id: 0,
    partnerInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        // console.log(res)
        that.setData({
          customer_id: res.data
        })
        var partnerInfoUrl = baseUrl + '/api/fort/hostess/partner?customer_id=' + that.data.customer_id ;
        that.getPartnerInfo(partnerInfoUrl)
      },
    })
  },
  getPartnerInfo(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var result = res.data.result;
          for (var i = 0; i < result.length;i++){
            result[i].picture = imgUrl + result[i].picture
          }
          that.setData({
            partnerInfo: result
          })
        }else{
          if (res.data.msg == "尚未进行分享"){
            wx.showModal({
              title: '提示',
              content: '尚未进行分享',
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '数据获取失败',
            })
          }
          
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