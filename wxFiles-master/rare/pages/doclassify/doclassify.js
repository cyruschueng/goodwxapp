var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.load(this)
    var li = JSON.parse(options.li)
    console.log(li)
    wx.setNavigationBarTitle({
      title: '当前分类:'+li.classname,
    })
    this.setData({
      name:li.classname,
      list: li.tmemessage
    })
  },
  navToGoods: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/goods/goods?id=' + e.currentTarget.id,
    })
  },
  onReady: function () {
  
  },

  onShow: function () {
  
  },

  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onPullDownRefresh: function () {
  
  },

  onReachBottom: function () {
  
  },

  onShareAppMessage: function () {
  
  }
})