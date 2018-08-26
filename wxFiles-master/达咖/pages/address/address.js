// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  navToAdd: function(){
    wx.redirectTo({
      url: '/pages/address/add/add',
    })
  },
  del: function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空本地缓存地址？',
      success: function (res){
        if(res.confirm){
          that.setData({
            list:[]
          })
          wx.setStorageSync("addressList", []);
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!wx.getStorageSync("addressList")){
      wx.setStorageSync("addressList", []);
    }else{
      this.setData({
        list: wx.getStorageSync("addressList")
      })
      
    }
  },
  choose: function(e){
    var that = this;
    wx.redirectTo({
      url: '/pages/payfor/payfor?address='+JSON.stringify(that.data.list[e.currentTarget.dataset.index]),
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
})