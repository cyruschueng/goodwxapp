// pages/address/addressAdd/addressAdd.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opty: 'insert',
    so: 1,
    province: '',
    city: '',
    area: '',
    phone: '',//电话号码
    name: '',//收货人姓名
    address: '',//详细地址
  },
  navToArea: function () {
    wx.navigateTo({
      url: '/pages/address/addressAdd/area/area',
    })
  },
  //获取收货人姓名
  name: function (e) {
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  //获取手机号码
  phone: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  //获取详细地址
  address: function (e) {
    var that = this;
    that.setData({
      address: e.detail.value
    })
  },
  //格式化时间
  formatDate: function (now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    // var hour = now.getHours();
    // var minute = now.getMinutes();
    // var second = now.getSeconds();
    return year + "-" + month + "-" + date;
  },

  update:function(e){
    console.log(e)
    var swit = 0
    if(e.detail.value.swit == true){
      swit = 3
    }else{
      swit = 0
    }
    var that = this;
    var data = new Date();
    var addtime = that.formatDate(data);
    wx.request({
      url: app.url + 'WxUserAddress/update',
      data: {
        addressid: that.data.addressid,
        telusername: that.data.name,
        tel: that.data.phone,
        province: that.data.province,
        city: that.data.city,
        area: that.data.area,
        address: that.data.address,
        addtime: addtime,
        isdelete: 3,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 800
        });
        setTimeout(function () {
          wx.navigateBack({
            data: 1
          })
        }, 1000)
      }
    });
  },
  //提交地址
  submit: function (e) {
    console.log(e)
    var swit = 0
    if (e.detail.value.swit == true) {
      swit = 3
    }
    var that = this;
    var data = new Date();
    var addtime = that.formatDate(data);
    wx.request({
      url: app.url + 'WxUserAddress/AddUserAddress',
      data: {
        openid: app.globalData.openid,
        telusername: that.data.name,
        tel: that.data.phone,
        province: that.data.province,
        city: that.data.city,
        area: that.data.area,
        address: that.data.address,
        addtime: addtime,
        isdelete: swit,
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 800
        });
        setTimeout(function(){
          wx.navigateBack({
            data:1
          })
        },1000)
      }
    });
  },
  blur: function (e) {
    var id = e.currentTarget.dataset.se
    this.setData({
      so: id
    })
  },
  onLoad: function (options) {
    if (options.opty == "update"){
      var sets = JSON.parse(options.sets)
      this.setData({
        opty: options.opty,
        address:sets.address,
        addressid:sets.addressid,
        province:sets.province,
        city:sets.city,
        area:sets.city,
        name:sets.telusername,
        tel:sets.tel
      })
    }
    this.setData({
      opty: options.opty
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
    this.setData({
      province: wx.getStorageSync('dprovince'),
      city: wx.getStorageSync('dcity'),
      area: wx.getStorageSync('darea'),
    })
    wx.clearStorage()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})