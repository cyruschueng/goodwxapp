// shareInfo.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    leaveClass: "line",
    orderStatusText: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中..',
    })
    //根据id获取订单信息
    if (options.orderId) {
      //获取订单信息
      wx.request({
        url: app.globalData.serverUrl + 'getOrderInfoById.als',
        data: { id: options.orderId },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.status == 0) {
            console.log('订单信息')
            console.log(res.data.order)
            that.updateDataAndText(res.data.order)

          } else {
            wx.showToast({
              title: '出错了',
              icon: 'loading',
              duration: 1000
            })
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: '请求失败',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }
    //根据token获取订单信息
    else if (options.type) {
      //获取订单信息
      wx.request({
        url: app.globalData.serverUrl + 'getOrderInfoByToken.als',
        data: { token: wx.getStorageSync('token'), type: 1 },
        success: function (res) {
          wx.hideLoading()
          console.log(res.data)
          if (res.data.status == 0) {
            console.log('订单信息')
            console.log(res.data.order)
            that.updateDataAndText(res.data.order)

          } else {
            wx.showToast({
              title: '出错了',
              icon: 'loading',
              duration: 1000
            })
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: '请求失败',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    }

  },

  //取消共享
  cancleShare: function () {
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定取消共享吗?',
      confirmColor: '#f4c600',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '操作中..',
          })
          wx.request({
            url: app.globalData.serverUrl + 'cancelOrder.als',
            data: { id: that.data.orderInfo.id },
            success: function (res2) {
              wx.hideLoading()
              if (res2.data.status == 0) {
                wx.showModal({
                  title: '提示',
                  content: '您共享的车位已经取消',
                  showCancel: false,
                  confirmColor: '#f4c600',
                  success: function (res3) {
                    if (res3.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              } else if (res2.data.status == -2) {
                wx.showModal({
                  title: '提示',
                  content: '该车位已经被预约,不能取消',
                  showCancel: false,
                  confirmColor: '#f4c600',
                  success: function (res3) {
                    if (res3.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
              } else {
                wx.showToast({
                  title: '出错了',
                  icon: 'loading',
                  duration: 1000
                })
              }
            },
            fail: function () {
              wx.hideLoading()
              wx.showToast({
                title: '出错了',
                icon: 'loading',
                duration: 1000
              })
            }
          })
        }
      }
    })
  },

  //交付车位
  giveParking:function(){
    var that=this
    wx.showModal({
      title: '提示',
      content: '确定交付车位吗?',
      confirmColor:'#f4c600',
      success:function(res){
        if(res.confirm){
          wx.showLoading({
            title: '操作中',
          })
          wx.request({
            url: app.globalData.serverUrl +'giveParking.als',
            data:{id:that.data.orderInfo.id},
            success:function(res2){
              wx.hideLoading()
              if(res2.data.status==0){
                wx.showModal({
                  title: '提示',
                  content: '交付成功',
                  showCancel:false,
                  confirmColor:'#f4c600',
                  success:function(res3){
                    if(res3.confirm){
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  }
                })
              }else{
                wx.showToast({
                  title: '出错了',
                  icon: 'loading',
                  duration: 1000
                })
              }
            },
            fail:function(){
              wx.hideLoading()
              wx.showToast({
                title: '出错了',
                icon:'loading',
                duration:1000
              })
            }
          })
        }
      }
    })
  },

  //打电话给预约人
  callUser: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.orderInfo.appointPhone
    })
  },
  //查看订单详情
  orderDetail: function () {
    var that = this
    wx.redirectTo({
      url: '/pages/shareInfoDetail/shareInfoDetail?orderId=' + that.data.orderInfo.id,
    })
  },

  //更新状态和显示数据
  updateDataAndText: function (order) {
    //待预约
    if (order.status == 0) {
      this.setData({
        orderInfo: order,
        leaveClass: '',
        orderStatusText: '待预约'
      })
    } else if (order.status == 3) {
      this.setData({
        orderInfo: order,
        orderStatusText: '待交付'
      })
    } else if (order.status == 4) {
      this.setData({
        orderInfo: order,
        orderStatusText: '待支付'
      })
    } else if (order.status == 5) {
      this.setData({
        orderInfo: order,
        orderStatusText: '已完成'
      })
    } else if (order.status == 1 || order.status == 6 || order.status == 7) {
      this.setData({
        orderInfo: order,
        orderStatusText: '已取消'
      })
    } else if (order.status == 2) {
      this.setData({
        orderInfo: order,
        orderStatusText: '已失效'
      })
    }
  }


})