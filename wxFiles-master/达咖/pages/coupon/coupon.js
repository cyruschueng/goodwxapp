var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loading:false
  },
  //使用优惠券
  useCoupon: function (e) {
    //将优惠券id 放入 缓存
    wx.setStorageSync('couponid', e.currentTarget.dataset.id);
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync("userInfo") == null || !wx.getStorageSync("userInfo")) {
      app.getUserInfo(function (res) {});
    }
    this.getCouponList();
  },
  //获得优惠券列表
  getCouponList(){
    var that = this;
    this.setData({
      loading:true
    })
    app.wxRequest('user_coupon/wx/mycoupon.do', {
      userid: wx.getStorageSync("openid")
    }, function (res) {
      wx.stopPullDownRefresh();
      for (var i = 0; i < res.length; i++) {
        if (res[i].type == 3) {
          res[i].tprice = res[i].couponprice.substring(0, res[i].couponprice.indexOf(','));
          res[i].bprice = res[i].couponprice.substring(res[i].couponprice.indexOf(',') + 1, res[i].couponprice.length);
        }
      }
      that.setData({
        list: res,
        loading:false
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getCouponList();
  },


})