var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loading:false,
    url:'',
    imgUrl:[]
  },
  navToShop: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/cardmarket/allshop/allshop?id='+e.currentTarget.dataset.id,
    })
  },
  navToCmdetail: function (e){
    var that = this;
    wx.navigateTo({
      url: '/pages/cardmarket/cmdetail/cmdetail?id=' + that.data.list[e.currentTarget.dataset.in].car[e.currentTarget.dataset.dex].id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.wxRequest('image/wx/find.do', { type: 2 }, function (res) {
      that.setData({
        imgUrl: res,
        url:app.ip
      })
    })
    this.getCarList();
  },
  getCarList: function () {
    var that = this;
    that.setData({ loading:true })
    app.wxRequest('carclasses/wx/find.do',{type:2},function(res){
      that.setData({
        list:res,
        loading:false
      })
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