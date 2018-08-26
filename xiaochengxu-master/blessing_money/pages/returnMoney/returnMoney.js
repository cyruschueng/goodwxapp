//index.js
var app = getApp()

Page({
  data: {
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: 0,
    lastTapTimeoutFunc: null,
    value: "",
    returnMoney: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  globalData: {
    hid: "",
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转到常见问题
  NormalProblem: function (res) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = res.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        // console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.navigateTo({
          url: '../NormalProblem/NormalProblem'
        })
      }  
    }
  },
  //跳转到收支明细
  list: function (res) {
    var that = this
    // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
    if (that.touchEndTime - that.touchStartTime < 350) {
      // 当前点击的时间
      var currentTime = res.timeStamp
      var lastTapTime = that.lastTapTime
      // 更新最后一次点击时间
      that.lastTapTime = currentTime
      // 如果两次点击时间在300毫秒内，则认为是双击事件
      if (currentTime - lastTapTime < 300) {
        // console.log("double tap")
        // 成功触发双击事件时，取消单击事件的执行
        clearTimeout(that.lastTapTimeoutFunc);
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.navigateTo({
          url: '../list/list'
        })
      }  
    }
  },


  //获取输入金额的值
  returnMoneyEvent: function (e) {
    var price = e.detail.value;
    var arrPrice = price.split(".");
    if (e.detail.value > 500) {
      price = 500
      this.setData({
        value: price
      })
      wx.showModal({
        title: '单笔最大金额为500元',
        content: '请点击确定重新输入',
        showCancel: false,
        success: function (res) { 

        },
      })
    }
    if (arrPrice[1] != null && arrPrice[1].length > 2) {
      price = Math.floor(price * 100) / 100;
    } else {
      var rgpoint = new RegExp('^\\d{1,3}(\\.\\d{0,2})?$', 'g');//判断用户输入的是否为小数点
      var rgpoint = rgpoint.exec(e.detail.value);
      if (!rgpoint) {
        if (e.detail.value.length > 3) {
          price = Math.floor(price / 10);
        } else {
          return ""
        }
      }
    }

    var returnMoney = e.detail.value;
    this.setData({
      value: price,
      e: e.detail.value,
      returnMoney: e.detail.value,
    })
    getApp().globalData.returnMoney = e.detail.value;
    //console.log(returnMoney)
  },
  // 按钮触摸开始触发的事件
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },

  // 按钮触摸结束触发的事件
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },

  moneyBack: function (res) {
    var that = this
    if (getApp().globalData.return_num > 0) {
      // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
      if (that.touchEndTime - that.touchStartTime < 350) {
        // 当前点击的时间
        var currentTime = res.timeStamp
        var lastTapTime = that.lastTapTime
        // 更新最后一次点击时间
        that.lastTapTime = currentTime
        // 如果两次点击时间在300毫秒内，则认为是双击事件
        if (currentTime - lastTapTime < 300) {
          // console.log("double tap")
          // 成功触发双击事件时，取消单击事件的执行
          clearTimeout(that.lastTapTimeoutFunc);
          wx.navigateBack({
            delta: 1
          })
        } else {
          if (100 * getApp().globalData.myCount >= 100 * getApp().globalData.returnMoney && getApp().globalData.returnMoney >= 2 && getApp().globalData.returnMoney <= 500) {
            setTimeout(function () {
              wx.showModal({
                title: '提现确认',
                content: '提现不得小于2元，含手续费1%',
                success: function (res) {
                  if (res.confirm) {
                    wx.request({
                      url: 'https://www.mqtp8.cn/wishis/getmoney/getMoney', //余额接口
                      method: 'GET',
                      header: {
                        'Content-Type': 'application/json'
                      },
                      data: {//这里写你要请求的参数
                        openId: getApp().globalData.openId,
                        money: getApp().globalData.returnMoney
                      },
                      success: function (res) {
                        console.log(res)
                        if (res.data == 0) {
                          wx.showToast({
                            title: '操作太频繁',
                            icon: 'loading',
                            duration: 1000,
                            mask: true
                          })
                        } else {
                          getApp().globalData.returnMoney = ""
                          that.setData({
                            value: ""
                          })
                          wx.showToast({
                            title: '提现成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
                          })
                        }
                        var page = getCurrentPages().pop();
                        if (page == undefined || page == null) return;
                        page.onLoad();
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res)
                        }
                      },
                    })
                  } else {
                    getApp().globalData.returnMoney = ""
                    that.setData({
                      value: ""
                    })
                    wx.showToast({
                      title: '取消提现',
                      icon: 'loading',
                      duration: 1000,
                      mask: true,
                    })
                  }
                },
              })
            }, 1000) //延迟时间 这里是1秒  
          }
          else if (getApp().globalData.returnMoney < 2) {
            wx.showToast({
              title: '提现不小于2元',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
          }
          else if (getApp().globalData.returnMoney >= 500) {
            wx.showToast({
              title: '单笔小于500元',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
          }
          else if (100 * getApp().globalData.myCount < 100 * getApp().globalData.returnMoney) {
            wx.showToast({
              title: '您的余额不足',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
          }
          else {
            wx.showToast({
              title: '提现不能为空',
              icon: 'loading',
              duration: 1000,
              mask: true
            })
          }
          //console.log(returnMoney)
        }
      }
    } else {
      wx.showToast({
        title: '今天不能提现',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
  },
  allReturn: function (res) {
    this.setData({
      value: getApp().globalData.myCount
    })
  },
  onLoad: function () {
    var that = this;
    //全局变量获取图像名字信息并显示
    this.setData({
      name: app.globalData.nickName,
      imgUrl: app.globalData.avatarUrl,
    });
    //请求余额接口数据
    wx.request({
      url: 'https://www.mqtp8.cn/wishis/pay/mycount', //余额接口
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {//这里写你要请求的参数
        openId: getApp().globalData.openId,
      },
      success: function (res) {
        var res = res;
        that.setData({
          myCount: res.data.count.toFixed(2),
          return_num: res.data.num
        })
        getApp().globalData.myCount = res.data.count.toFixed(2)
        getApp().globalData.return_num = res.data.num
        console.log(getApp().globalData.return_num);
      },
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // onLoad: function () {
  //   var that = this;
  //   this.setData({
  //     name: app.globalData.nickName,
  //     imgUrl: app.globalData.avatarUrl,
  //   });
  //     //全局变量获取图像名字信息并显示
  //     this.setData({
  //       name: app.globalData.nickName,
  //       imgUrl: app.globalData.avatarUrl,
  //     });
  //     //请求余额接口数据
  //     wx.request({
  //       url: 'https://www.mqtp8.cn/wishis/pay/mycount', //余额接口
  //       method: 'POST',
  //       header: {
  //         'Content-Type': 'application/json'
  //       },
  //       data: {//这里写你要请求的参数
  //         openId: getApp().globalData.openId,
  //       },
  //       success: function (res) {
  //         var res = res;
  //         that.setData({
  //           myCount: res.data.count.toFixed(2),
  //           return_num: res.data.num
  //         })
  //         getApp().globalData.myCount = res.data.count.toFixed(2)
  //         getApp().globalData.return_num = res.data.num
  //         console.log(getApp().globalData.return_num);
  //       },
  //     })
  //     if (app.globalData.userInfo) {
  //       this.setData({
  //         userInfo: app.globalData.userInfo,
  //         hasUserInfo: true
  //       })
  //     } else if (this.data.canIUse) {
  //       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //       // 所以此处加入 callback 以防止这种情况
  //       app.userInfoReadyCallback = res => {
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     } else {
  //       // 在没有 open-type=getUserInfo 版本的兼容处理
  //       wx.getUserInfo({
  //         success: res => {
  //           app.globalData.userInfo = res.userInfo
  //           this.setData({
  //             userInfo: res.userInfo,
  //             hasUserInfo: true
  //           })
  //         }
  //       })
  //     }
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
