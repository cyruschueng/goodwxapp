var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBar:[{label:'商品订单',active:true},{label:'预定订单',active:false},{label:'取货单',active:false}],
    orders:[],
    loading:false,
    url:null,
    dopay:false,
    pwdl: [false, false, false, false, false, false],
    pwd: '',
    orderid:null,
    findex:0,
    pays:0
  },
  payfor: function (e) {
    var that = this;
    var orderid = e.currentTarget.dataset.orderid;
    var pay = e.currentTarget.dataset.pay;
    if(pay != '' && pay>0){
      this.setData({
        orderid:orderid,
        dopay:true,
        pays: that.data.orders[e.currentTarget.dataset.index].totalprice
      })
    }else{
      app.wxRequest('order/wx/wxpay.do',{ordernumber:orderid,userid:wx.getStorageSync("openid")},function(res){
        console.log(res)
        that.wxpay(JSON.parse(res));
      });
    }
  },
  //取消BJ支付
  concelPay: function () {
    var that = this;
    that.setData({ dopay: false });
    wx.navigateTo({
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
          if (res.result == "ok") {
            wx.showToast({
              title: '支付成功',
              duration: 1000,
              mask: true
            });
            that.setData({ dopay: false });
            setTimeout(function () {
              wx.navigateTo({
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
              wx.navigateTo({
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
        wx.navigateTo({
          url: '/pages/orderdetail/orderdetail?orderid=' + data.oid,
        })
      }
    })
  },
  changeBar: function (e) {
    
    for(var i=0;i<this.data.navBar.length;i++){
      this.data.navBar[i].active = false;
    }
    this.data.navBar[e.currentTarget.dataset.index].active = true;
    var that = this;
    var findex = e.currentTarget.dataset.index;
    if(findex == 2){
      findex = 4
    }
    this.setData({
      navBar: that.data.navBar,
      findex: findex
    })
    this.getOrderList(0)
  },
  //跳转到订单详情
  navToOrderdetail: function (e) {
    var that = this;
    wx.navigateTo({
      url: '/pages/orderdetail/orderdetail?orderid=' + that.data.orders[e.currentTarget.dataset.index].ordernumber,
    })
  },
  getOrderList:function(num){
    var that = this;
    this.setData({loading:true})
    app.wxRequest('order/wx/myorder.do',{
      type:that.data.findex,
      userid:wx.getStorageSync("openid"),
      start: num
    },function(res){
      wx.stopPullDownRefresh();
      for(var i=0;i<res.length;i++){
        res[i].count = 0;
        res[i].totalprice = res[i].totalprice.toFixed(2);
        for (var j = 0; j < res[i].orderproduct.length;j++){
          res[i].count = res[i].count + res[i].orderproduct[j].number;
          if (res[i].orderproduct[j].productattribute && res[i].orderproduct[j].productattribute != null) {
            res[i].orderproduct[j].productattribute = JSON.parse( res[i].orderproduct[j].productattribute);
          }
        }
      }
      that.setData({
        orders:res,
        loading: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: app.ip
    })
    app.setWindow(this);
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderList(0);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    this.data.order = [];
    this.getOrderList(that.data.orders.length);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

})