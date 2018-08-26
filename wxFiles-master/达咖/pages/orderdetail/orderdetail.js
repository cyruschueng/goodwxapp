var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    order:null,
    url:null,
    dopay: false,
    pwdl: [false, false, false, false, false, false],
    pwd: '',
  },
  cantacts(){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.order.shop.shopphone ,
    })
  },
  payfor: function (e) {
    var that = this;
    var orderid = e.currentTarget.dataset.orderid;
    var pay = e.currentTarget.dataset.pay;
    if (pay != '' && pay > 0) {
      this.setData({
        orderid: orderid,
        dopay: true
      })
    } else {
      app.wxRequest('order/wx/wxpay.do', { ordernumber: orderid, userid: wx.getStorageSync("openid") }, function (res) {
      
        that.wxpay(JSON.parse(res));
      });
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
      complete: function (res) {
        wx.redirectTo({
          url: '/pages/orderdetail/orderdetail?orderid=' + data.oid,
        })
      }
    })
  },
  navToShop:function(e){
    var that = this;
    wx.redirectTo({
      url: '/pages/shop/shop?shopid='+that.data.order.shop.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    app.setWindow(this);
    if(options.orderid){
      app.wxRequest('order/wx/orderdetail.do', {
        id: options.orderid,
        userid: wx.getStorageSync("openid")
      }, function (res) {
        res[0].count = 0;
        res[0].totalprice = res[0].totalprice.toFixed(2);
        res[0].goodsprice = 0;
        res[0].vipdiscount = res[0].vipdiscount.toFixed(2)
        for (var j = 0; j < res[0].orderproduct.length; j++) {
          res[0].count = res[0].count + res[0].orderproduct[j].number;
          res[0].goodsprice = res[0].goodsprice + res[0].orderproduct[j].productprice;
          if (res[0].orderproduct[j].productattribute && res[0].orderproduct[j].productattribute != null) {
            res[0].orderproduct[j].productattribute = JSON.parse( res[0].orderproduct[j].productattribute );
          }
        }
        that.setData({
          order: res[0],
          url: app.ip
        })
      });
    }else{
      wx.showModal({
        title: '提示',
        content: '发生错误',
        showCancel:false,
        confirmText:'返回'
      })
    }
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

})