//index.js
var app = getApp()
Page({
  data: {
    touchStartTime: 0,
    touchEndTime: 0,
    lastTapTime: 0,
    lastTapTimeoutFunc: null,
    showView: false,
    showView1: true,
    showView2: true,
    addClass: true,
    addClass1: false,
    addClass2: false,
  },
  //事件处理函数
  themeContent: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../themeContent/themeContent'
        })
      }
    }
  },

  holiday1: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday1/holiday1'
        })
      }
    }
  },

  holiday2: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday2/holiday2'
        })
      }
    }
  },

  holiday3: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday3/holiday3'
        })
      }
    }
  },

  holiday4: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday4/holiday4'
        })
      }
    }
  },
  holiday5: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday5/holiday5'
        })
      }
    }
  },
  holiday6: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday6/holiday6'
        })
      }
    }
  },
  holiday7: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday7/holiday7'
        })
      }
    }
  },
  holiday8: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday8/holiday8'
        })
      }
    }
  },
  holiday9: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../holiday9/holiday9'
        })
      }
    }
  },

  birthday1: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../birthday1/birthday1'
        })
      }
    }
  },

  birthday2: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../birthday2/birthday2'
        })
      }
    }
  },
  birthday3: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../birthday3/birthday3'
        })
      }
    }
  },
  birthday4: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../birthday4/birthday4'
        })
      }
    }
  },
  wedding1: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../wedding1/wedding1'
        })
      }
    }
  },
  wedding2: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../wedding2/wedding2'
        })
      }
    }
  },
  wedding3: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../wedding3/wedding3'
        })
      }
    }
  },
  wedding4: function (res) {
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
        wx.stopBackgroundAudio()
        wx.navigateBack({
          delta: 2
        })
      } else {
        wx.navigateTo({
          url: '../wedding4/wedding4'
        })
      }
    }
  },
  

  // 按钮触摸开始触发的事件
  touchStart: function (e) {
    this.touchStartTime = e.timeStamp
  },

  // 按钮触摸结束触发的事件
  touchEnd: function (e) {
    this.touchEndTime = e.timeStamp
  },

  onShow: function() {
    wx.stopBackgroundAudio()
  },
  onLoad: function () {
    //请求我的记录收到的接口数据
    // wx.request({
    //   url: 'https://www.mqtp8.cn/applet/pay/record', //收到的接口
    //   method: 'POST',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: {//这里写你要请求的参数
    //     openId: getApp().globalData.openId,
    //   },
    //   success: function (res) {
    //     var res = res;
    //     // var money = res.data[0].money;
    //     // var num = res.data[0].num;
    //     that.setData({
    //       receivedMoney: res.data.my.money,
    //       receivedCount: res.data.my.num,
    //       items1: res.data.da,
    //     })
    //     console.log(res.data);
    //   },
    // })
  },
  //点击切换类
  header_left: function () {
    var that = this;
    that.setData({
      addClass: true,
      addClass1: false,
      addClass2: false,
      showView: false,
      showView1: true,
      showView2: true,
    })
  },
  header_center: function () {
    var that = this;
    that.setData({
      addClass: false,
      addClass1: true,
      addClass2: false,
      showView: true,
      showView1: false,
      showView2: true,
    })
  },
  header_right: function () {
    var that = this;
    that.setData({ 
      addClass: false,
      addClass1: false,
      addClass2: true,
      showView: true,
      showView1: true,
      showView2: false,
    })
  }

})
