const app = getApp()

Page({
  data: {
    showCostExplain: false,
    shopid: '',
    biztype: 0,
    counts: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//门票用
    count: 0,//车票用
    ename: '',
    cname: '',
    cpt: 0,//当前选中的车票类型
    goods: {},//通用，票列表
    ticketsdetail: [],//通用,显示金额明细
    total: 0,
    geter: {},
    currentItem: 0,
    cday: '',
    ctime: '',
    hasTimeslots: false,
    timeslots: '',
  },
  backDetail: function () {
    wx.navigateTo({
      url: '../detail/viewDetail?id=' + this.data.shopid,
    })
  },
  checkDay: function () {
    var chday = this.data.cday
    if (!chday) {
      var t = new Date()
      chday = t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate()
    }
    wx.navigateTo({
      url: '../checkDate/checkDay?shopId=' + this.data.shopid + '&cday=' + chday
    })
  },
  checkTime: function () {
    wx.navigateTo({
      url: '../checkDate/checkTime'
    })
  },
  choosecp: function (e) {
    this.setData({
      cpt: e.currentTarget.id,
      currentItem: e.currentTarget.dataset.index
    })
    if (this.data.count > 0) {
      this.dosum()
    }
  },
  chooseday: function (e) {
    this.setData({
      cday: e.currentTarget.id,
    })
  },
  choosetime: function (e) {
    this.setData({
      ctime: e.currentTarget.id,
    })
  },
  goPay: function () {
    if (this.data.biztype == 1 && this.data.cday == '') {
      wx.showToast({ title: '请选择日期', })
      return -1
    }
    if (this.data.biztype == 1 && this.data.goods.hasTimeslots && this.data.ctime == '') {
      wx.showToast({ title: '请选择时间', })
      return -1
    }
    if (this.data.total == 0) {
      wx.showToast({ title: '请选择票数', })
      return -1
    }
    var self = this
    wx.showLoading({
      title: "请稍侯",
      success: function () {
        setTimeout(function () {
          wx.hideLoading({
            success: function () {
              self.dopay()
            }
          })
        }, 1000)
      }
    })
  },
  dosum: function () {
    var newt = []
    var news = 0
    var cpt = this.data.cpt
    if (this.data.biztype == 2) {
      newt.push({'name': this.data.goods[cpt].name, 'goodsId': this.data.goods[cpt].goodsId, 'nums': this.data.count, 'price':this.data.goods[cpt].price})
      news += this.data.goods[cpt].price * this.data.count
    } else {
      for (var i in this.data.goods.goodsList) {
        newt.push({ 'name': this.data.goods.goodsList[i].name, 'goodsId': this.data.goods.goodsList[i].goodsId, 'nums': this.data.counts[i], 'price': this.data.goods.goodsList[i].price})
        news += this.data.goods.goodsList[i].price * this.data.counts[i]
      }
    }
    this.setData({
      total: news.toFixed(2),
      ticketsdetail: newt
    })
  },
  dopay: function () {
    //生成订单
    wx.request({
      url: app.globalData.apiURL + '/order/submit',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      data: {
        ordersItemList: this.data.ticketsdetail,
        buyerId: this.data.geter.buyerId,
        shopId: this.data.shopid,
        day: this.data.cday,
        timeslot: this.data.ctime,
      },
      method: 'POST',
      success: function (res1) {
        //console.log(res1)
        if (res1.data.code == 'E500') {
          console.log(res1.data.msg)
          wx.showToast({ title: res1.data.msg, })
          return -1
        }
        //获取支付凭证
        wx.request({
          url: app.globalData.apiURL + '/pay/sign',
          header: { memberId: wx.getStorageSync('memberid'), token: wx.getStorageSync('token') },
          data: { orderId: res1.data.result },
          method: 'POST',
          success: function (res2) {
            if (res1.data.code == 'E500') {
              console.log(res2.data.msg)
              wx.showToast({ title: res2.data.msg })
              return -1
            }
            //调用微信支付接口
            wx.requestPayment({
              'timeStamp': res2.data.result.timeStamp,
              'nonceStr': res2.data.result.nonceStr,
              'package': res2.data.result.package,
              'signType': res2.data.result.signType,
              'paySign': res2.data.result.paySign,
              'success': function (res3) {
                wx.showLoading({
                  title: "正在出票中...",
                  success: function () {
                    setTimeout(function () {
                      wx.hideLoading({
                        success: function () {
                          wx.navigateTo({
                            url: '../payticket/paySuccess?orderId=' + res1.data.result
                          })
                        }
                      })
                    }, 5000)
                  }
                })
              },
            })
          },
        })
      },
    })
  },
  moneyMessage: function () {
    this.setData({ showCostExplain: !this.data.showCostExplain });
  },
  showDialog: function () {
    this.setData({ showCostExplain: true });
  },
  hideDialog: function () {
    this.setData({ showCostExplain: false });
  },
  checkUser: function () {
    wx.navigateTo({
      url: '../checkUser/checkUser'
    })
  },
  showterm: function () {
    wx.navigateTo({
      url: '../payticket/ticketType'
    })
  },
  onShow: function () {
    const self = this
    if (this.data.cday && this.data.hasTimeslots) {
      wx.request({
        url: app.globalData.apiURL + '/goods/timeslots?shopId=' + this.data.shopid + '&days=' + this.data.cday,
        success: function (res) {
          //console.log(res.data.result)
          self.setData({
            timeslots: res.data.result
          })
        }
      })
    }
    this.setData({
      geter: app.globalData.geter
    })
  },
  onLoad: function (options) {
    const self = this
    wx.request({
      url: app.globalData.apiURL + '/shop/info?shopId=' + options.shopid,
      success: function (res) {
        self.setData({
          shopid: options.shopid,
          biztype: res.data.result.bizType,
          ename: res.data.result.englishName,
          cname: res.data.result.shopName,
        })
      }
    })
    wx.request({
      url: app.globalData.apiURL + '/goods/list?shopId=' + options.shopid,
      success: function (res) {
        //console.log(res.data.result)
        self.setData({
          goods: res.data.result,
          hasTimeslots: res.data.result.hasTimeslots,
        })
      }
    })
    self.setData({
      geter: wx.getStorageSync('geter'),
    })
    wx.setNavigationBarTitle({
      title: '确认订单'
    })
  },
  reducecount: function () {
    if (this.data.count > 0) {
      this.data.count -= 1
      this.setData({
        count: this.data.count
      })
    }
    this.dosum()
  },
  addcount: function () {
    if (this.data.count > 7) {
      wx.showToast({
        title: '每笔订单限购8张',
        icon: 'loading'
      })
      return -1
    }
    this.data.count = this.data.count+1;
    this.setData({
      count: this.data.count
    })
    this.dosum()
  },
  reducecounts: function (e) {
    var idx = e.currentTarget.id
    var newc = this.data.counts
    if (this.data.counts[idx] > 0) {
      newc[idx] = this.data.counts[idx] -1
      this.setData({
        counts: newc
      })
    }
    this.dosum()
  },
  addcounts: function (e) {
    var idx = e.currentTarget.id
    if (this.data.counts[idx] > 7) {
      wx.showToast({
        title: '每笔订单限购8张',
        icon: 'loading'
      })
      return -1
    }
    var newc = this.data.counts
    newc[idx] = this.data.counts[idx] + 1
    this.setData({
      counts: newc
    })
    this.dosum()
  },
})
