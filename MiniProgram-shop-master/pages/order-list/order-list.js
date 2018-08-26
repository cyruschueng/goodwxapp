// pages/order-List/order-list.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '待付款', '待发货', '待收货', '待评价',],
    currentTab:0,
    lists:[],
  },

  //导航选项
  navbar:function(e){
    let currentTab = e.currentTarget.dataset.id;
    let state  = currentTab
    this.setData({
      currentTab: currentTab,
      state: state
    })
    var that = this
    wx.request({
      url: web_url + '/app.php?c=OrderList',
      data: {
        user_id: that.data.user_id,
        state: state
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        for(let i = 0; i < res.data.length; i++){
          let orderState = res.data[i].orderState;
          if (res.data[i].state == 1){
            orderState = true
          }else{
            orderState = false
          }
          res.data[i].orderState = orderState;

          let isMessage = res.data[i].isMessage;
          if (res.data[i].state == 4) {
            isMessage = true
          } else {
            isMessage = false
          }
          res.data[i].isMessage = isMessage
        }
        that.setData({
          lists: res.data
        })
      },
    })
  },
  //查看订单详情
  order_details:function(e){
    console.log(e.currentTarget.dataset)
    var idx = e.currentTarget.dataset.id
    var orderState = e.currentTarget.dataset.nopay
    wx.navigateTo({
      url: '/pages/order-details/order-details?id=' + idx + '&orderState=' + orderState
    })
  },
  //删除订单
  deleteOrder:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    let order_id = e.currentTarget.dataset.id;
    let lists = that.data.lists;
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      showCancel: true,
      cancelText: '否',
      cancelColor: '#000000',
      confirmText: '是',
      confirmColor: '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: web_url + '/app.php?c=Order&act=order_del',
            data: {
              id: order_id
            },
            header: {},
            method: 'GET',
            dataType: 'json',
            success: function(res) {
              console.log(res.data)
              if (!res.data.error) {
                lists.splice(index, 1);
                that.setData({
                  lists: lists
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
    })
  },
  //提交支付
  submitPay:function(e){
    var that = this
    let order_id = e.currentTarget.dataset.id;
    console.log('订单id', that.data.order_id)
    wx.request({
      url: web_url + '/app.php?c=Order&act=buy',
      data: {
        order_id: order_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log('zhifu', res)
        wx.requestPayment({
          'timeStamp': res.data.wxpackage.timeStamp + '',
          'nonceStr': res.data.wxpackage.nonceStr,
          'package': res.data.wxpackage.package,
          'signType': 'MD5',
          'paySign': res.data.wxpackage.paySign,
          'success': function (res) {
            //支付成功后，跳转到全部订单列表
            wx.navigateBack({
              delta: 1,
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              image: '',
              duration: 1200,
              mask: true,
            })
          },
        })
      },
      fail: function (res) { },
    })
  },
//提交评论
  // wx:if='{{list.isMessage}}'
  formSubmit:function(e){
    let that = this
    let order_id = e.currentTarget.dataset.id;
    wx.request({
      url: web_url + '/app.php?c=Message',
      data: {
        userid: that.data.user_id,
        orderid: order_id,
        content: e.detail.value.content
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if (res.data.success){
          wx.showToast({
            title: '评论成功',
            icon: 'success',
            image: '',
            duration: 800,
            mask: true,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var state = options.state
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) { 
      // Do something when catch error
    }
    that.setData({
      user_id: that.data.user_id,
      state: options.state
    })
    // console.log(user_id)
      
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
      url: web_url + '/app.php?c=OrderList',
      data: {
        user_id: that.data.user_id,
        state: that.data.state
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          let orderState = res.data[i].orderState;
          if (res.data[i].state == 1) {
            orderState = true
          } else {
            orderState = false
          }
          res.data[i].orderState = orderState;

          let isMessage = res.data[i].isMessage;
          if (res.data[i].state == 4){
            isMessage = true
          }else{
            isMessage = false
          }
          res.data[i].isMessage = isMessage
        }
        that.setData({
          lists: res.data
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