// page/component/pages/pay1/pay1.js
Page({

  /**
   * 页面的初始数据
   *
  var testkey = '123321';
  wx.setStorage({
    key: testkey,
    data: this.data // Math.random()
  })
    // console.log('data:', data)

    wx.getStorage({
    key: testkey,
    success: function (res) {
      console.log(res.data)
    }
  })
      // console.log('data:', data)
   */
  data: {
    value0: 10000,
    value1: '2017-01-01',
    value2: 5,
    value3: 10000,
    // value4: new Date().toLocaleDateString()  
    value4: new Date().toISOString().slice(0,10)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
    });

    var testkey = 'page/component/pages/vote1/vote1';
    // wx.getStorage({
    //   key: testkey,
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    // })
    try {
      var value = wx.getStorageSync(testkey)
      if (value) {
        // Do something with return value
        console.log('value' + value)
        this.setData({
          value0: value.data.value0
        });
      }
    } catch (e) {
      // Do something when catch error
    }



    // 转发到群组后打开 
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: function (res) {
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    };

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {

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


  input_value0: function (e) {
    this.setData({
      value0: parseFloat(e.detail.value),
    });
  },
  input_value1: function (e) {
    this.setData({
      value1: e.detail.value,
    });
  },
  input_value2: function (e) {
    this.setData({
      value2: e.detail.value,
    });
  },
  input_value3: function (e) {
    this.setData({
      value3: parseFloat(e.detail.value),
    });
  },
  input_value4: function (e) {
    this.setData({
      value4: e.detail.value,
    });
  },


  output: function (e) {

    var testkey = 'page/component/pages/vote1/vote1';
    // value0: 10000,
    //   value1: '2017-01-01',
    //     value2: 5,
    //       value3: 10000,
    //         date: "2017-01-01"
    var date1 = new Date(this.data.value1).getTime();
    var date2 = new Date(this.data.value4).getTime();;
    var daydiff = Math.floor((date2 - date1) / 1000 / 60 / 60 / 24);
    this.setData({
      value3: Math.round(this.data.value0 * (1 + this.data.value2 / 10000 * daydiff)*100)/100,
    });

    try {
      wx.setStorageSync(testkey, this.data);
    } catch (e) {
    }
    wx.setStorage({
      key: testkey,
      data: this.data // Math.random()
    })

  },
  output2: function (e) {

    var testkey = 'page/component/pages/vote1/vote1';
    // value0: 10000,
    //   value1: '2017-01-01',
    //     value2: 5,
    //       value3: 10000,
    //         date: "2017-01-01"
    var date1 = new Date(this.data.value1).getTime();
    var date2 = new Date().getTime();
    var daydiff = Math.floor((date2 - date1) / 1000 / 60 / 60 / 24);
    this.setData({
      value3: Math.round(this.data.value0 * (1 + this.data.value2 / 10000 * daydiff)),
    });

    try {
      wx.setStorageSync(testkey, this.data);
    } catch (e) {
    }
    wx.setStorage({
      key: testkey,
      data: this.data // Math.random()
    })

  },
  // https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=ACCESS_TOKEN // 获取
  // https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN // 发送
  // kDi0aNeHqu_HST96hs0JuRKvB3upfv6UuAPtIv4M5EI // 学习计划提醒
//   模板ID
// kDi0aNeHqu_HST96hs0JuRKvB3upfv6UuAPtIv4M5EI复制
// 标题
// 学习计划提醒
// 关键词
// 直播时间
// {{keyword1.DATA }}
//   课程名称
// {{keyword2.DATA }}
//   学习进度
// {{keyword3.DATA }}
//   内容摘要
// {{keyword4.DATA }}
//   温馨提示
// {{keyword5.DATA }}

  requestPayment: function () {
    var self = this;

    self.setData({
      loading: true
    })
    // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
    // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
    app.getUserOpenId(function (err, openid) {
      if (!err) {
        wx.request({
          url: paymentUrl,
          data: {
            openid
          },
          method: 'POST',
          success: function (res) {
            console.log('unified order success, response is:', res)
            var payargs = res.data.payargs
            wx.requestPayment({
              timeStamp: payargs.timeStamp,
              nonceStr: payargs.nonceStr,
              package: payargs.package,
              signType: payargs.signType,
              paySign: payargs.paySign
            })

            self.setData({
              loading: false
            })
          }
        })
      } else {
        console.log('err:', err)
        self.setData({
          loading: false
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {

    var testkey = 'page/component/pages/vote1/vote1';
    try {
      wx.setStorageSync(testkey, this.data);
    } catch (e) {
    }
    wx.setStorage({
      key: testkey,
      data: this.data // Math.random()
    })
    // console.log('data:', data)

    wx.getStorage({
      key: testkey,
      success: function (res) {
        console.log(res.data)
      }
    })
    // console.log('data:', data)

    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '利息计算器',
      path: 'page/component/pages/vote1/vote1',
      success: function (res) {
        console.log('转发成功');
        // 转发成功

        // 转发时获取群信息 
        var shareTickets = res.shareTickets;
        if (shareTickets.length == 0) {
          return false;
        };

        console.log('shareTickets\t' + shareTickets);
        console.log('shareTickets[0]\t' + shareTickets[0]);
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            console.log('iv\t' + iv);
          }
        });

      },
      fail: function (res) {
        // 转发失败
      }
    }

  },
  showShareMenu: function (res) {
    withShareTicket: true
  }
})
