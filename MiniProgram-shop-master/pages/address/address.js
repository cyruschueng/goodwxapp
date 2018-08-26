// pages/myInfo-address/myInfo-address.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[]
  },

  bindCheck:function(e){
    var that = this;
    var address_id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let items = that.data.items;
    if (items[index].selectStatus){
      return false
    }
    for(let i = 0; i < items.length; i++){
      items[i].selectStatus = false;
    }
    items[index].selectStatus = true;
    wx.request({
      url: web_url + '/app.php?c=Address&act=defaulting',
      data: {
        id: address_id,
        user_id: that.data.user_id,
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        console.log('返回',items)
        that.setData({
          items: items
        })
        wx.showToast({
          title: '操作成功',
          icon: 'success',
          image: '',
          duration: 800,
          mask: true,
          success: function (res) { },
        })
      },
    })
  },

  add_address:function(e){
    var that = this
    console.log('长度',that.data.items.length)
    var items_length = that.data.items.length
    var address_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/address-add/address-add?id=' + address_id + '&items_length=' + items_length
    })
  },

  delete_address:function(e){
    var that = this;
    var address_id = e.currentTarget.dataset.id;
    var items = that.data.items;
    var index = e.currentTarget.dataset.index;
    wx.request({
      url: web_url + '/app.php?c=Address&act=del',
      data: {
        id: address_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        items.splice(index,1);
        that.setData({
          items: items
        })
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          image: '',
          duration: 1000,
          mask: true,
          success: function(res) {},
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
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
    var that = this
    wx.request({
      url: web_url + '/app.php?c=Address&act=lists',
      data: {
        user_id: that.data.user_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        var items = res.data
        //判断默认地址
        for (let i = 0; i < items.length; i++) {
          if (items[i].state == 1) {
            items[i].selectStatus = true
          }
        }
        that.setData({
          items: items
        })
      },
    })
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