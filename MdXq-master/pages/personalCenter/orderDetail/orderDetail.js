// pages/personalCenter/orderDetail/orderDetail.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id:0,
    orderDetailsInfo:{},
    currentID:0,
    state:'',
    create_time:'',
    // 倒计时
    countDownDay: 0,
    countDownHour: 0,
    countDownMinute: 0,
    countDownSecond: 0,  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取order_id
    this.setData({
      order_id: options.order_id,
      currentID: options.currentID*1,
      state: options.state
    })
    // console.log(options.state)
    // 获取订单详情
    var orderDetailsInfoUrl = baseUrl + '/api/order/load?order_id=' + this.data.order_id;
    this.getOrderDetail(orderDetailsInfoUrl);
  },
  // 确认收货
  goConfirmReceipt(e){
    var url = baseUrl + '/api/order/confirm-receipt?order_id=' + this.data.order_id
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
          wx.showToast({
            title: '确认收货成功',
          })
        } else {
          wx.showToast({
            title: '确认收货失败',
          })
        }
      }
    })
    wx.navigateBack({
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onShow();
      }
    })

  },
  // 提醒发货
  goRemind(e){
    var RemindUrl = baseUrl + '/api/order/remind?order_id=' + this.data.order_id;
    wx.request({
      url: RemindUrl ,
      success(res){
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '提醒发货成功',
            complete(res) {
              console.log(res)
            }
          })
          setTimeout(function(){
            // 获取订单详情
            var orderDetailsInfoUrl = baseUrl + '/api/order/load?order_id=' + this.data.order_id;
            this.getOrderDetail(orderDetailsInfoUrl);
          },700)
        }
      }
    })
    
  },
  // 取消订单点击事件
  cancleOrder(e){
    var url = baseUrl + '/api/order/cancel?order_id=' + this.data.order_id
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '取消订单成功',
          })
          wx.navigateBack({
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
          
        }
      }
    })
  },
  // 重新下单
  placingOrder(e){
    wx.switchTab({
      url: '../../category/category',
    })
  },
  // 获取订单详情
  getOrderDetail(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          var orderDetail=res.data.result.orderDetail;
          for (var i = 0; i < res.data.result.orderDetail.length;i++){
            res.data.result.orderDetail[i].mallProduct.exhibition = imgUrl + res.data.result.orderDetail[i].mallProduct.exhibition;
          }
          that.setData({
            orderDetailsInfo:res.data.result,
            create_time: res.data.result.create_time
          })
          if (that.data.orderDetailsInfo.state == '待付款' && that.data.currentID == 0){
            that.Countdown(that.data.create_time)
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '数据加载失败',
          })
        }
      },
      fail(error){
        console.log(error)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 倒计时函数
  Countdown(time) {
    var testTime = 24 * 60 * 60 * 1000;
    var time = Date.parse(time) + testTime;
    var currentTime = new Date().getTime();
    var totalSecond = (time - currentTime)/1000;
    var interval = setInterval(function () {
      // 总秒数  
      var second = totalSecond;
      // 天数位  
      var day = Math.floor(second / 3600 / 24);
      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      // 分钟位  
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      // 秒位  
      var sec = Math.floor(second - day * 3600 * 24 - hr * 3600 - min * 60);
      this.setData({
        countDownDay: day,
        countDownHour: hr,
        countDownMinute: min,
        countDownSecond: sec,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        var url = baseUrl + '/api/order/cancel?order_id=' + this.data.order_id;
        var order_id = this.data.order_id;
        var that=this;
        wx.request({
          url: url,
          success(res) {
            // console.log(res)
            if (res.data.success) {
              // 获取订单详情
              var orderDetailsInfoUrl = baseUrl + '/api/order/load?order_id=' + order_id;
              that.getOrderDetail(orderDetailsInfoUrl);
            }
          }
        })
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
        });
      }
    }.bind(this), 1000);
  },
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