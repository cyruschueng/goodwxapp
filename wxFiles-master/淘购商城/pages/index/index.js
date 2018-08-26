//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    slider: [
      { picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000rVobR3xG73f.jpg' },
      { picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000j6Tax0WLWhD.jpg' },
      { picUrl: 'http://y.gtimg.cn/music/photo_new/T003R720x288M000000a4LLK2VXxvj.jpg' }
  ],
    swiperCurrent: 0,
    index_item: [
      {
        'img': '/images/index/jiujiu.png',
        'text': '聚划算',
        'url': '/pages/takeaway/takeaway'
      },
      {
        'img': '/images/index/hunqing.png',
        'text': '婚庆用品',
        'url': '/pages/drinking/drinking'
      },

      {
        'img': '/images/index/lipin.png',
        'text': '礼品套餐',
        'url': '/pages/fruit/fruit'
      },
      {
        'img': '/images/index/qiandao.png',
        'text': '每日签到',
        'url': '/pages/snack/snack'
      },
    ],
  },
  navToSearch: function (e) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  navToShop: function (e) {
    wx.navigateTo({
      url: '/pages/shop/shop',
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  item: function (e) {
    var that = this;
    var ThisIndex = e.currentTarget.id;
    if (e.currentTarget.id < 3) {
      wx.navigateTo({
        url: '/pages/item/item'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
