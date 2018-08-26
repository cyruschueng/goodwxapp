// pages/cooperation/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgHeight: 0,
    currentTab: 0,
    currentindex: 0,
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
    var width = wx.getSystemInfoSync().screenWidth;
    var imgHeight = (width-100) / 3 * 0.8;
    this.setData({
      imgHeight: imgHeight
    });
  },
  changeActive:function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.current,
      currentindex: e.currentTarget.dataset.current
    })
  },
  viewMoreGoods: function () {
    wx.navigateTo({
      url: '/pages/business/goodsList/goodsList'
    })
  }
})