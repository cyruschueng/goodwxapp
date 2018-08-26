// pages/order-details/order-details.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_state:'',
    order_num:'',
    order_time:'',
    express:'快递', 
    name:'',
    phone:'',
    address:'',
    items:[],
    goods_totalPrice:'',
    discount:'0.00',
    freight:'0.00',
    totalPrice:'100'
  },


  deleteOrder:function(){
    var that = this
    console.log(that.data.order_id)
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      showCancel: true,
      cancelText: '否',
      cancelColor: '#000000',
      confirmText: '是',
      confirmColor: '#3CC51F',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: web_url + '/app.php?c=Order&act=order_del',
            data: {
              id: that.data.order_id
            },
            header: {},
            method: 'GET',
            dataType: 'json',
            success: function(res) {
              if (!res.data.error){
                wx.navigateBack({
                  delta: 1,
                })
              } 
            },
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }, 
    })
  },
  toPay:function(){
    var that = this
    console.log('订单id',that.data.order_id)
    wx.request({
      url: web_url + '/app.php?c=Order&act=buy',
      data: {
        order_id: that.data.order_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('zhifu',res)
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
      fail: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let orderState
    if (options.orderState == "false"){
      orderState = false
    }else{
      orderState =true
    }
    that.setData({
      order_id: options.id,
      orderState: orderState
    })
    wx.request({
      url: web_url + '/app.php?c=Order&act=show',
      data: {
        order_id: options.id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log(res.data)
        that.setData({
          order_state: res.data.zhuangtai,
          order_num: res.data.order_sn,
          order_time: res.data.add_time,
          name: res.data.consignee_name,
          phone: res.data.phone,
          address: res.data.delivery_area,
          items: res.data.goods,
          goods_totalPrice: res.data.total_price,
          freight: res.data.freight_price,
        })
      },
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