var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vflag: 0,
    vchoose: ['不打包', '打包'],
    head: null,
    flag1: 0, flag2: 0, flag3: 0,
    title1: '无可用优惠券', title3: 'BijJA 会员支付',
    coupon: [],
    couponList: [],
    pay: [],
    address: null,
    shopCart: [],
    totalPrice: 0,
    url: null,
    bjDiscount: 0.9,
    isBj: false,
    showSum: 0,
    remark: '无信息',
    dopay: false,
    time: '10:00',
    pwdl: [false, false, false, false, false, false],
    pwd: '',
    date: '2017-01-01'
  },
  bindFlagChange: function (e) {
    var that = this;
    var sum = that.data.osum;
    var showSum = 0;
    var isBj = false;
    if (that.data.title1 != '无可用优惠券' && that.data.title1 != '有可用优惠券') {
      if (that.data.couponList[that.data.flag1].type == 1) {
        sum = sum * parseFloat(that.data.couponList[that.data.flag1].couponprice);
      } else if (that.data.couponList[that.data.flag1].type == 2) {
        sum = sum - parseFloat(that.data.couponList[that.data.flag1].couponprice);
      } else if (that.data.couponList[that.data.flag1].type == 3) {
        if (sum > that.data.couponList[that.data.flag1].tprice) {
          sum = sum - parseFloat(that.data.couponList[that.data.flag1].bprice);
        } else {
          wx.showToast({
            title: '您的订单未满￥' + that.data.couponList[that.data.flag1].tprice,
            image: '/img/60.png',
            duration: 800
          })
        }
      }
    }

    if (e.detail.value == 1){
      sum += that.data.shopboxprice
    }
    showSum = (sum * that.data.bjDiscount).toFixed(2);
    this.setData({
      vflag: e.detail.value,
      showSum: showSum
    })
  },
  remark: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  //支付
  payfor: function () {
    var that = this;
    if (this.data.address == null && this.data.isTangs == 0) {
      wx.showToast({
        title: '请选择一个地址',
        image: '/img/60.png',
        duration: 800
      })
    } else {
      var couponid = "";
      var goodid = [];
      var attribute = [];
      var numbers = [];
      for (var i = 0; i < that.data.shopCart.length; i++) {
        goodid.push(that.data.shopCart[i].id);
        var temp = "";
        numbers.push(that.data.shopCart[i].count);

        if (that.data.shopCart[i].attribute != null) {
          for (var j = 0; j < that.data.shopCart[i].attribute.length; j++) {
            for (var k = 0; k < that.data.shopCart[i].attribute[j].content.length; k++) {
              if (that.data.shopCart[i].attribute[j].content[k].active) {
                temp += k + ","
              }
            }
          }
          temp = temp.substring(0, temp.length - 1);
        }
        if (temp == "") {
          temp = "##";
        }
        attribute.push(temp);
      }
      if (that.data.title1 != "无可用优惠券" && that.data.title1 != "有可用优惠券") {
        couponid = that.data.couponList[that.data.flag1].id;
      }
      console.log(attribute.length)
      if (attribute.length == 0) {
        attribute.push("##");
      }
      var payment = that.data.flag3;
      if (that.data.title3 != "微信支付") {
        payment = 4
      } else {
        payment = 3
      }
      var datas = {
        userid: wx.getStorageSync("openid"),
        goodsid: goodid,
        attribute: attribute,
        payment: payment,
        couponid: couponid,
        shopid: that.data.shopid,
        remark: that.data.remark,
        number: numbers
      }
      if (this.data.isTangs == 0) {
        datas.addressname = that.data.address.userName;
        datas.addressphone = that.data.address.telNumber;
        if (that.data.address.address) {
          datas.address = that.data.address.address
        } else {
          datas.address = that.data.address.provinceName + that.data.address.cityName + that.data.address.countyName + that.data.address.detailInfo
        }
      } else {
        //不打包0 打包1
        datas.isPackage = that.data.vflag
      }

      if (that.data.shopCart[0].makeday) {
        datas.reservetime = that.data.date + " " + that.data.time
      }
      app.wxRequest('order/wx/order.do', datas, function (res) {
        if (payment == 3) {
          that.wxpay(JSON.parse(res.body));
        } else {
          if (res.result == "ok") {
            that.setData({ dopay: true, orderid: res.body });
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
    }
  },
  //取消BJ支付
  concelPay: function () {
    var that = this;
    that.setData({ dopay: false });
    wx.redirectTo({
      url: '/pages/orderdetail/orderdetail?orderid=' + that.data.orderid,
    })
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
          console.log(res);
          if (res.result == "ok") {
            wx.showToast({
              title: '支付成功',
              duration: 1000,
              mask: true
            });
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/orderdetail/orderdetail?orderid=' + that.data.orderid,
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
                url: '/pages/orderdetail/orderdetail?orderid=' + that.data.orderid,
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
          url: '/pages/orderdetail/orderdetail?orderid=' + data.oid,
        })
      },
      fail: function () {
        wx.redirectTo({
          url: '/pages/orderdetail/orderdetail?orderid=' + data.oid,
        })
      },

    })
  },
  //优惠券选择
  bindCouponChange: function (e) {
    var that = this;
    var sum = that.data.osum;
    var flag1 = that.data.flag1;
    if (that.data.couponList[e.detail.value].type == 1) {
      sum = sum * parseFloat(that.data.couponList[e.detail.value].couponprice);
      flag1 = e.detail.value;
    } else if (that.data.couponList[e.detail.value].type == 2) {
      sum = sum - parseFloat(that.data.couponList[e.detail.value].couponprice);
      flag1 = e.detail.value;
    } else if (that.data.couponList[e.detail.value].type == 3) {
      if (sum > that.data.couponList[e.detail.value].tprice) {
        sum = sum - parseFloat(that.data.couponList[e.detail.value].bprice);
        flag1 = e.detail.value
      } else {
        wx.showToast({
          title: '您的订单未满￥' + that.data.couponList[e.detail.value].tprice,
          image: '/img/60.png',
          duration: 800
        })
      }
    }
    var showSum = (sum * that.data.bjDiscount).toFixed(2);
    that.setData({
      title1: that.data.coupon[flag1],
      flag1: flag1,
      sum: sum,
      showSum: showSum
    })
  },
  cantacts() {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.shopphone,
    })
  },
  //支付方式选择
  bindPayChange: function (e) {
    var that = this;
    var isBj = false;
    var sum = that.data.osum;
    if (that.data.title1 != '无可用优惠券' && that.data.title1 != '有可用优惠券'){
      if (that.data.couponList[that.data.flag1].type == 1) {
        sum = sum * parseFloat(that.data.couponList[that.data.flag1].couponprice);
      } else if (that.data.couponList[that.data.flag1].type == 2) {
        sum = sum - parseFloat(that.data.couponList[that.data.flag1].couponprice);
      } else if (that.data.couponList[that.data.flag1].type == 3) {
        if (sum > that.data.couponList[that.data.flag1].tprice) {
          sum = sum - parseFloat(that.data.couponList[that.data.flag1].bprice);
        } else {
          wx.showToast({
            title: '您的订单未满￥' + that.data.couponList[that.data.flag1].tprice,
            image: '/img/60.png',
            duration: 800
          })
        }
      }
    }
    var showSum = (that.data.sum * that.data.bjDiscount).toFixed(2);
    if (that.data.pay[e.detail.value] == "微信支付") {
      isBj = false;
    } else {
      isBj = true;
    }
    that.setData({
      title3: that.data.pay[e.detail.value],
      flag3: e.detail.value,
      isBj: isBj,
      showSum: showSum
    })
  },
  //选择地址
  chooseAddress: function () {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        that.setData({
          address: res
        })
      },
      fail: function () {
        wx.openSetting({
          success: function () {
            wx.chooseAddress({
              success: function (res) {
                that.setData({
                  address: res
                })
              }
            })
          },
          fail: function () {
            wx.redirectTo({
              url: '/pages/address/address',
            })
          }
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.shopphone)
    app.setWindow(this);
    var that = this;
    //默认地址
    app.wxRequest('order/wx/myaddress.do', { userid: wx.getStorageSync("openid") }, function (res) {
      if (res.body) {
        var adr = JSON.parse(res.body);
        if (res.result == 'ok') {
          var address = {};
          address.userName = adr.addressname;
          address.telNumber = adr.addressphone;
          address.address = adr.address;
          that.setData({
            address: address
          })
        }
      }
      app.wxRequest('systemconfig/wx/get.do', {}, function (res) {
        that.setData({
          bjDiscount: res[0].vip
        })
      })
    });
    //是否是堂食点单  1是  0否
    var isTangs = 0;
    if (options.isTangs) {
      isTangs = options.isTangs;
    }
    var shopid = null;
    if (options.shopid) {
      shopid = options.shopid;
    }
    //检查参数 地址 是否存在
    var address = null;
    if (options.address) {
      address = JSON.parse(options.address);
    }
    //检查参数 购物车 是否存在
    var shopCart = [];
    if (options.shopCart) {
      shopCart = JSON.parse(options.shopCart);
    }
    var totalPrice = 0;
    if (options.totalPrice) {
      totalPrice = options.totalPrice;
    }
    var shopname = null;
    if (options.shopname) {
      shopname = options.shopname;
    }
    //商品数量
    var shopNum = 0;
    if (options.shopNum) {
      shopNum = options.shopNum;
    }
    //配送费
    var shopsendprice = 0;
    if (options.shopsendprice) {
      shopsendprice = options.shopsendprice;
    }
    //优惠满
    var shopcouponstart = 0;
    if (options.shopcouponstart) {
      shopcouponstart = options.shopcouponstart;
    }
    //优惠减
    var shopcouponend = 0;
    if (options.shopcouponend) {
      shopcouponend = options.shopcouponend;
    }
    //餐盒费
    var shopboxprice = 0;
    if (options.shopboxprice) {
      shopboxprice = options.shopboxprice * options.packageNum;
    }
    var sum = 0;
    if (totalPrice > shopcouponstart) {
      sum = parseFloat(totalPrice) - parseFloat(shopcouponend);
      if (this.data.vflag != 0) {
        sum += parseFloat(shopboxprice);
      }
      if (isTangs != 1) {
        sum += parseFloat(shopsendprice)
      }
    } else {
      sum = parseFloat(totalPrice)
      if (this.data.vflag != 0) {
        sum += parseFloat(shopboxprice);
      }
      if (isTangs != 1) {
        sum += parseFloat(shopsendprice)
      }
    }
    var showSum = (sum * that.data.bjDiscount).toFixed(2);
    //获取优惠券
    app.wxRequest('user_coupon/wx/mycoupon.do', {
      userid: wx.getStorageSync("openid")
    }, function (res) {
      var coupon = [];
      for (var i = 0; i < res.length; i++) {
        var item = "";
        if (res[i].type == 1) {
          item += "折扣券 " + res[i].couponprice * 10 + "折 -￥" + (sum - (sum * res[i].couponprice));
        } else if (res[i].type == 2) {
          item += res[i].couponprice + "元直减券 -￥" + res[i].couponprice;
        } else if (res[i].type == 3) {
          res[i].tprice = res[i].couponprice.substring(0, res[i].couponprice.indexOf(','));
          res[i].bprice = res[i].couponprice.substring(res[i].couponprice.indexOf(',') + 1, res[i].couponprice.length);
          item += "满减券 满￥" + res[i].tprice + "减￥" + res[i].bprice + " -￥" + res[i].bprice;
        }
        coupon.push(item);
      }
      //初始化优惠券选项
      var title1 = '无可用优惠券';
      if (coupon.length > 0) {
        title1 = '有可用优惠券';
      }
      var isBj = false;
      if (wx.getStorageSync("phone")) {
        that.data.pay.push("BigJA 会员支付 " + that.data.bjDiscount + "折");
        that.data.title3 = "BigJA 会员支付 " + that.data.bjDiscount + "折";
        isBj = true;
      } else {
        that.data.title3 = "微信支付";
      }
      that.data.pay.push("微信支付");
      var date = new Date();
      var da = '';
      var ed = '';
      if (shopCart[0].makeday) {
        da = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + parseInt(shopCart[0].makeday))
        ed = date.getFullYear() + "-" + (date.getMonth() + 3) + "-" + (date.getDate() + parseInt(shopCart[0].makeday))
      }
      that.setData({
        shopimage:options.shopimage,
        shopphone:options.shopphone,
        isTangs: isTangs,
        shopcouponstart: shopcouponstart,
        shopcouponend: shopcouponend,
        shopboxprice: shopboxprice,
        coupon: coupon,
        date: da,
        sdate: da,
        edate: ed,
        couponList: res,
        address: address,
        title1: title1,
        shopCart: shopCart,
        totalPrice: totalPrice,
        shopNum: shopNum,
        url: app.ip,
        showSum: showSum,
        shopsendprice: shopsendprice,
        sum: sum,
        osum: sum,
        isBj: isBj,
        shopid: shopid,
        shopname: shopname,
        pay: that.data.pay,
        title3: that.data.title3,
        head: wx.getStorageSync("userInfo").avatarUrl
      })
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
})