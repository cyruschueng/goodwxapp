// pages/pay/pay.js
var app = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addressInfo: "",
    token: "",
    Datalist: [],
    odd: {},
    orderData: {},
    payData: {},
    hiddenLoading: false,
    coupon: [],
    cop_index: 0,
    cop: 0,
    count: 0.00,
    counts: 0,
    userCount: 0,
    slewRate: null,
    integral: 0,
    coupons: 0,
    numm: 0,
    off: false,
    switchChecked: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCode()
    var that = this
    wx.getStorage({
      key: 'editAddress',
      success: function (res) {
        that.setData({
          addressInfo: res.data
        })
      }
    })
    this.change(this.data.switchChecked)
  },
  switchChange: function (e) {
    this.setData({
      off: e.detail.value
    })
    // console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    this.change(e.detail.value)
  },
  jf_button: function () {
    console.log(this.data.userCount.integral)
  },
  change: function (e) {
    var num = Math.floor(this.data.userCount.integral / 100) * this.data.slewRate * 100
    if (e) {
      console.log(this.data.coupons)
      if (this.data.slewRate != null) {
        console.log(this.data.counts)
        console.log(Number(this.data.coupons))
        console.log(num)
        this.setData({
          integral: Math.floor(this.data.userCount.integral / 100) * 100,
          count: Number(this.data.counts - Number(this.data.cop) - num).toFixed(2),
          numm: num
        })
      }
    } else {
      console.log(this.data.counts)
      console.log(Number(this.data.coupons))
      console.log(num)
      this.setData({
        integral: 0,
        count: (this.data.counts - Number(this.data.cop)).toFixed(2),
        numm: 0
      })
    }

  },
  radioChange: function (e) {
    var num = Math.floor(this.data.userCount.integral / 100) * this.data.slewRate * 100
    if (e.detail.value == 99999) {
      if (this.data.off) {
        this.setData({
          coupons: 0,
          count: Number(this.data.counts - this.data.numm - num).toFixed(2),
          cop: 0,
        })
      } else {
        this.setData({
          coupons: 0,
          count: Number(this.data.counts - this.data.numm).toFixed(2),
          cop: 0
        })
      }

    } else {
      if (this.data.off) {
        for (var i = 0; i < this.data.coupon.length; i++) {
          if (e.detail.value == this.data.coupon[i].coupon.coupon_id) {
            this.setData({
              coupons: Number(e.detail.value),
              cop: Number(this.data.coupon[i].coupon.money),
              count: Number(this.data.counts - Number(this.data.coupon[i].coupon.money) - this.data.numm - num).toFixed(2)
            })
          }
        }
      } else {
        for (var i = 0; i < this.data.coupon.length; i++) {
          if (e.detail.value == this.data.coupon[i].coupon.coupon_id) {
            this.setData({
              coupons: Number(e.detail.value),
              cop: Number(this.data.coupon[i].coupon.money),
              count: Number(this.data.counts - Number(this.data.coupon[i].coupon.money) - this.data.numm).toFixed(2)
            })
          }
        }
      }
    }
  },
  getData: function (token) {
    var count = 0
    var arr = []
    var that = this
    // 获取下单列表
    wx.getStorage({
      key: 'order_list',
      success: function (res) {
        // 测试优惠券
        for (var i = 0; i < res.data.length; i++) {
          count += Number(res.data[i].price) * res.data[i].number
        }
        that.setData({
          Datalist: res.data,
          counts: count,
          count: count.toFixed(2)
        })
        wx.request({
          url: app.url + 'coupon/userlist',
          method: 'post',
          data: { applet_id: app.v },
          header: { 'content-type': 'application/json', "token": token },
          success: function (res) {
            console.log(res.data)
            for (var i = 0; i < res.data.length; i++) {
              console.log(Number(res.data[i].coupon.amount))
              if (count >= Number(res.data[i].coupon.amount) && res.data[i].status == 0) {
                arr.push(res.data[i])
              }
            }
            if (arr.length != 0) {
              that.setData({
                cop: Number(arr[0].coupon.money),
                coupon: arr,
                coupons: arr[0].coupon.coupon_id,
                count: Number(count - Number(arr[0].coupon.money)).toFixed(2),
              })
            } else {
              that.setData({
                coupon: arr,
                coupons: 0,
              })
            }

          }
        })


      },
    })

    // 获取订单信息
    // wx.getStorage({
    //   key: 'odd',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       odd: res.data
    //     }) 
    //     wx.request({
    //       url: url + 'order/' + res.data.order_id,
    //       method: 'post',
    //       header: { 'content-type': 'application/json', "token": that.data.token },
    //       success: function (res) {
    //         that.setData({
    //           orderData: res.data,
    //           Datalist: res.data.snap_items,
    //           hiddenLoading:true
    //         })

    //       }
    //     })
    //     console.log(res.data.order_id)
    //     console.log(that.data.token)

    //   },
    // })

    // 获取积分
    wx.request({
      url: app.url + 'userinfo',
      method: 'post',
      data: { applet_id: app.v },
      header: { 'content-type': 'application/json', "token": that.data.token },
      success: function (res) {
        that.setData({
          userCount: res.data
        })
        // 获取积分兑换率
        wx.request({
          url: app.url + 'aboutour',
          data: { applet_id: app.v },
          header: {
            'content-type': 'application/json',// 默认值
          },
          success: function (res) {
            that.setData({
              slewRate: 1 / res.data.integral_rule,
            })
          }
        })
      }
    })
  },
  /*修改或者添加地址信息*/
  editAddress: function () {
    var that = this
    wx.chooseAddress({
      success: function (res) {
        wx.setStorage({
          key: 'editAddress',
          data: res,
        })
        that.setData({
          addressInfo: res,
          dis: true
        })
      }
    })
  },
  getCode: function () {
    var that = this
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          userData: res.userInfo
        })
        // 判断是否授权
        wx.login({
          success: function (res) {
            that.setData({
              code: res.code
            })
            console.log("code:" + res.code)
            if (res.code) {
              // 获取openId
              wx.request({
                url: app.url + 'token/user',
                data: {
                  code: res.code,
                  applet_id: app.v,
                  avatarUrl: that.data.userData.avatarUrl,
                  nickname: that.data.userData.nickName,
                  city: that.data.userData.city,
                  gender: that.data.userData.gender,
                  country: that.data.userData.country,
                  province: that.data.userData.province
                },
                method: 'POST',
                header: { 'content-type': 'application/json' },
                success: function (openIdRes) {
                  that.setData({
                    token: openIdRes.data.token
                  })
                  that.getData(openIdRes.data.token)
                },
                fail: function (error) {
                  console.info("获取用户openId失败");
                }
              })
            }

          }
        });
      },
      // fail: function (error) {
      //   console.log("失败")

      // }
    })
  },
  pay_end: function () {
    console.log(this.data.addressInfo)
    console.log(this.data.Datalist)
    console.log(this.data.Datalist)
    var that = this

    wx.request({
      url: app.url + 'morder',
      method: 'post',
      data: { applet_id: app.v, addressInfo: this.data.addressInfo, Cartlist: this.data.Datalist, coupon_id: this.data.coupons, integral: this.data.integral },
      header: {
        'content-type': 'application/json',
        "token": that.data.token
      },
      success: function (res) {
        if (that.data.addressInfo != "") {
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': res.data.signType,
            'paySign': res.data.paySign,
            success: function (res) {
              console.log('支付成功')
              wx.navigateTo({
                url: '/pages/pay_end/pay_end?stu=0&&ord=' + that.data.count,
              })
              wx.setStorage({
                key: 'shop',
                data: '',
              })
            },
            fail: function (res) {
              console.log('支付失败')
              wx.navigateTo({
                url: '/pages/pay_end/pay_end?stu=1&&ord=' + that.data.count,
              })
              wx.setStorage({
                key: 'shop',
                data: '',
              })
            }
          });
        } else {
          wx.showModal({
            title: '提示',
            content: '请填写地址信息',
          })
        }
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