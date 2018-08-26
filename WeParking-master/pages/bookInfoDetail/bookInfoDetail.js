// bookInfoDetail.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    moneyClass: "line",
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
          if (res.data.status == 0) {
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
        data: { token: wx.getStorageSync('token'), type: 2 },
        success: function (res) {
          wx.hideLoading()
          if (res.data.status == 0) {
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

  //检查支付
  checkPay: function () {
    var that = this
    wx.showLoading({
      title: '操作中..',
    })
    //获得用户余额
    wx.request({
      url: app.globalData.serverUrl + 'getUserMoney.als',
      data: { token: wx.getStorageSync('token') },
      success: function (res) {
        wx.hideLoading()
        if (res.data.status == 0) {
          //用户的余额足以支付本次的订单金额
          if (res.data.money >= that.data.orderInfo.money) {
            //弹窗让用户选择支付方式
            wx.showActionSheet({
              itemList: ['微信支付', '余额支付'],
              itemColor: '#f4c600',
              success: function (res) {
                //用户选择微信支付
                if (res.tapIndex == 0) {
                  that.wechatPay()
                }
                //用户选择余额支付
                else if (res.tapIndex == 1) {
                  wx.showModal({
                    title: '提示',
                    content: '确定支付吗？',
                    confirmColor: '#f4c600',
                    success: function (res) {
                      if (res.confirm) {
                        wx.showLoading({
                          title: '操作中..',
                        })
                        wx.request({
                          url: app.globalData.serverUrl + 'payWithBalance.als',
                          data: { id: that.data.orderInfo.id, token: wx.getStorageSync('token') },
                          success: function (res) {
                            wx.hideLoading()
                            if (res.data.status == 0) {
                              wx.showModal({
                                title: '提示',
                                content: '感谢使用,本次订单已完结',
                                confirmColor: '#f4c600',
                                showCancel: false,
                                success: function (res) {
                                  if (res.confirm) {
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
                            wx.showModal({
                              title: '提示',
                              content: '网络有点问题,请稍后再试',
                              showCancel: false,
                              confirmColor: '#f4c600',
                              success: function (res) {
                                if (res.confirm) {

                                }
                              }
                            })
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
          //用户的余额不足以支付本次的订单金额,直接微信支付
          else {
            that.wechatPay()
          }
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
        wx.showModal({
          title: '提示',
          content: '网络有点问题,请稍后再试',
          showCancel: false,
          confirmColor: '#f4c600',
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
      }
    })
  },


  //微信支付
  wechatPay: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定支付吗？',
      confirmColor: '#f4c600',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.serverUrl + 'payParking.als',
            data: { id: that.data.orderInfo.id, token: wx.getStorageSync('token') },
            success: function (res1) {
              if (res1.data.status == 0) {
                wx.requestPayment({
                  timeStamp: res1.data.timeStamp,
                  nonceStr: res1.data.nonceStr,
                  package: res1.data.package,
                  signType: 'MD5',
                  paySign: res1.data.paySign,
                  success: function (res2) {
                    if (res2.errMsg == 'requestPayment:ok') {
                      wx.request({
                        url: app.globalData.serverUrl + 'updateParkingComplete.als',
                        data: { id: that.data.orderInfo.id },
                        success: function (res3) {
                          wx.showModal({
                            title: '提示',
                            content: res3.data.status + '',
                          })
                          if (res3.data.status == 0) {
                            wx.showModal({
                              title: '提示',
                              content: '感谢使用,本次订单已完结',
                              confirmColor: '#f4c600',
                              showCancel: false,
                              success: function (res4) {
                                if (res4.confirm) {
                                  wx.navigateBack({
                                    delta: 1
                                  })
                                }
                              }
                            })
                          } else {
                            wx.showToast({
                              title: '状态更新失败',
                              icon: 'loading',
                              duration: 1000
                            })
                          }
                        }
                      })
                    }


                  },
                  fail: function (res) {

                  },
                  complete: function (res) {

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

  //打电话给共享人
  callUser: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.orderInfo.sharingPhone
    })
  },
  //订单有异议
  submitComment:function(){
    var that=this
    wx.navigateTo({
      url: '/pages/reportOrder/reportOrder?status=7&reportUser=2&id='+that.data.orderInfo.id,
    })
  },
  //举报
  submitReport:function(){
    var that = this
    wx.navigateTo({
      url: '/pages/reportOrder/reportOrder?status=6&reportUser=2&id=' + that.data.orderInfo.id,
    })
  },
  //查看车位地点
  view_location:function(){
    var that=this
    wx.navigateTo({
      url: '/pages/location/location?orderId='+that.data.orderInfo.id,
    })
  },

  //更新状态和显示数据
  updateDataAndText: function (order) {
    //待预约
    if (order.status == 0) {
      this.setData({
        orderInfo: order,
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