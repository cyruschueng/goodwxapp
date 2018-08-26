var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msg: null,
    title3: 'BigJA 会员支付',
    pay: [],
    isBj: false,
    bjDiscount: 0.9,
    flag3: 0,
    count: 1,
    pwdl: [false, false, false, false, false, false],
    pwd: '',
  },
  //减少数量
  remin: function () {
    var count = this.data.count;
    if (count > 1) {
      count = count - 1;
    }
    this.setData({
      count: count
    })
  },
  //增加数量
  readd: function () {
    var count = this.data.count;
    count = count + 1;
    this.setData({
      count: count
    })
  },
  //支付方式选择
  bindPayChange: function (e) {
    var that = this;
    var isBj = false;
    if (that.data.pay[e.detail.value] == "微信支付") {
      isBj = false;
    } else {
      isBj = true;
    }
    that.setData({
      title3: that.data.pay[e.detail.value],
      flag3: e.detail.value,
      isBj: isBj,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var isBj = false;
    app.setWindow(this);
    app.wxRequest('systemconfig/wx/get.do', {}, function (res) {
      if (wx.getStorageSync("phone")) {
        that.data.pay.push("BigJA 会员支付 " + res[0].vip+"折");
        that.data.title3 = "BigJA 会员支付 " + res[0].vip +"折";
        isBj = true;
      } else {
        that.data.title3 = "微信支付";
      }
      that.data.pay.push("微信支付");
      that.setData({
        isBj: isBj,
        pay: that.data.pay,
        title3: that.data.title3,
        bjDiscount: res[0].vip
      })
    })
    
    app.wxRequest('car/wx/find.do', { id: options.id, type: 2, start: 0 }, function (res) {
      that.setData({
        msg: res[0]
      })
    })
  },

  //支付
  payfor: function () {
    var that = this;

    var payment = that.data.flag3;
    if (that.data.title3 == "微信支付") {
      payment = 1
    } else {
      payment = 2
    }
    var datas = {
      userid: wx.getStorageSync("openid"),
      carid: that.data.msg.id,
      payment: payment,
      remark: that.data.remark,
    }
    
    app.wxRequest('order/wx/carorder.do', datas, function (res) {
      console.log(payment)
      if (payment == 1) {
        that.wxpay(JSON.parse(res));
      } else {
        if (res.result == "ok") {
          var da = JSON.parse(res.body)
          that.setData({ dopay: true, total: da.totalprice, orderid: da.ordernumber});
        } else {
          wx.showModal({
            title: '提示',
            content: '余额不足',
            confirmText: '前往充值',
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '/pages/recharge/recharge',
                })
              }
            }
          })
        }
      }
    })

  },
  //取消BJ支付
  concelPay: function () {
    var that = this;
    that.setData({ dopay: false });
  },
  //BJ支付
  clickNum: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    if (num == 'c') {
      this.setData({
        pwdl: [false, false, false, false, false, false],
        pwd: '',
      })
    } else if (num != '#') {
      var pwd = this.data.pwd;
      var pwdl = this.data.pwdl;

      if (pwd.length < 6) {
        pwd += num;
      }

      for (var i = 0; i < pwd.length; i++) {
        pwdl[i] = true;
      }
      this.setData({
        pwd: pwd,
        pwdl: pwdl
      })
      if (pwd.length == 6) {
        wx.showLoading({
          title: '支付中...',
        })
        app.wxRequest('order/wx/bellpay.do', { ordernumber: that.data.orderid, pass: pwd, userid: wx.getStorageSync("openid") }, function (res) {
          if (res.result == "ok") {
            wx.showToast({
              title: '支付成功',
              duration: 1000,
              mask: true
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/cardmarket/cards/cards',
              })
            }, 800)
          } else {
            wx.showToast({
              title: '支付失败',
              duration: 1000,
              mask: true
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/cardmarket/cards/cards',
              })
            }, 800)
          }
        })
      }
    }
  },
  //微信支付
  wxpay: function (data) {
    var that = this;
    wx.requestPayment({
      timeStamp: data.time,
      nonceStr: data.nonceStr,
      package: 'prepay_id=' + data.prepay_id,
      signType: 'MD5',
      paySign: data.paySign,
      success: function () {
        wx.redirectTo({
          url: '/pages/cardmarket/cards/cards',
        })
      },
      fail: function () {
        
      },
    })
  },
})