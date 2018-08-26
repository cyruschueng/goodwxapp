var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id:0,
    couponListInfo:[],
    total_deduction:[],
    pageStatus:false,
    isSelectCoupon_idNum:0,
    totalAmount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // console.log(options.total_deduction)
    if (options.submitOrderStatus){
      that.setData({
        pageStatus: options.submitOrderStatus,
        totalAmount: options.totalAmount
      })
      if (options.total_deduction){
        that.setData({
          total_deduction: JSON.parse(options.total_deduction),
        })
      }
    }
    
    
    wx.setStorage({
      key: 'totalPayNum',
      data: that.data.totalAmount
    })
    // console.log(that.data.total_deduction)
  },
  // 获取优惠券列表
  getCouponInfo(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res);
        if(res.data.success){
          var data = res.data.result;

          that.setData({
            couponListInfo:data,
          })
          // console.log(that.data.total_deduction)
        }
      }
    })
  },
  // 选择优惠券
  selectCoppon(e){
    // console.log(e)
    var isSelectCoupon_id=e.currentTarget.dataset.coupon_id;
    var deduction = e.currentTarget.dataset.deduction;
    var that=this;
    // console.log(deduction)
    that.setData({
      isSelectCoupon_idNum: isSelectCoupon_id
    })
    wx.setStorage({
      key: 'deduction',
      data: deduction,
      success(res){
        wx.setStorage({
          key: 'totalPayNum',
          data: (that.data.totalAmount - deduction).toFixed(2),
        })
        wx.setStorage({
          key: 'isSelectCoupon_id',
          data: isSelectCoupon_id,
          success(res) {
            setTimeout(function () {
              wx.navigateBack({
                success: function (e) {
                  var page = getCurrentPages().pop();
                  if (page == undefined || page == null) return;
                  page.onShow();
                }
              })
            }, 600)
          }
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
    var that=this;
    // 获取优惠券列表
    wx.getStorage({
      key: 'customer_id',
      success: function(res) {
        that.setData({
          customer_id:res.data
        })
        var couponUrl = baseUrl + '/api/customer/coupon/load-list?customer_id=' + that.data.customer_id;
        that.getCouponInfo(couponUrl);
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