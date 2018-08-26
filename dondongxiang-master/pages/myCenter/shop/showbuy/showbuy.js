var app = getApp();
var MD5Util = require('../../../../utils/md5.js');
Page({
  data: {
    checkbox: "circle",
    mapcheckbox:"success",
    total_fee:"",//订单合计价格
    address_id:1, //收获地址编号
    goods_id:0,//产品ID
    shop_id:0,//店铺ID
    sales_id:0,//销售Id
    goods_name:"",//产品名字
    price:0,//产品价格
    total_fee:0,//产品总价格
    alltotal_fee:0,//购物车总订单总价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.cart>0){
      //来自购物车多产品数组
    }else{
      //来自立即购买
      this.setData({
        goods_id: options.goodsid,
        shop_id: options.shop_id,
        sales_id: options.sales_id
      })
      this.refreshGoodsinfo(options.goodsid);
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  selectDish:function(){
      this.setData({
        checkbox: "success",
        mapcheckbox: "circle"
      })
  },
  checksite:function(){
    this.setData({
      checkbox: "circle",
      mapcheckbox: "success"
    })
  },
  maplist:function(){
    wx.navigateTo({
        url: '/pages/myCenter/shop/chartmap/chartmap',
    })
  },
  // chartprice:function(){
  //   wx.navigateTo({
  //     url: '/pages/myCenter/shop/chartprice/chartprice',
  //   })
  // },
  refreshGoodsinfo: function (goodsid){
    var _this = this;
    wx.request({
      url: app.globalData.url + '/shop/shop/getGoodsInfo',
      method: "get",
      data: {
        goods_id: goodsid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        var data = res.data.data;
        _this.setData({
          goods_name: data.goods_name,
          price: data.price,
          // goods_desc: data.goods_desc,
          // goods_desc_imgs: data.goods_desc_imgs,
          // goods_imgs: data.goods_imgs,
          // material: data.material,
          // stock_number: data.stock_number,
        })
      }
    })
  },
  //支付订单
  pay: function (e) {
    var userid = app.globalData.user_id;
    var goods_info = [{ shop_id: this.data.shop_id, goods_id: this.data.goods_id, sales_id: 0, goods_price: this.data.price, goods_num: 1 }];
    var total_fee = 0;
    for (var i = 0; i < goods_info.length; i++) {
      total_fee = total_fee + goods_info[i].goods_price*goods_info[i].goods_num
    }
    this.setData({
      alltotal_fee: total_fee
    })
    var address_id = app.globalData.default_address_id;

    wx.request({
      url: app.globalData.url + '/pay/orders/orders/',
      method: 'POST',
      data: {
        user_id: userid,   /*购买用户ID*/
        goods_info: goods_info,   /*购物车产品详情数组*/
        total_fee: this.data.alltotal_fee,
        address_id: address_id,
        is_shop_consume: 0,
        goods_type: 2
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        console.log(res);
        var sign = '';
        var resdata = res.data.data;
        var signA = "appId=" + "wxf13757beab3b800c" + "&nonceStr=" + res.data.data.nonce_str + "&package=prepay_id=" + res.data.data.prepay_id + "&signType=MD5&timeStamp=" + res.data.data.timestamp;
        var signB = signA + "&key=" + "15914378810jiang0gong13660865011";
        sign = MD5Util.hexMD5(signB).toUpperCase();
        wx.requestPayment({
          'timeStamp': resdata.timestamp,
          'nonceStr': resdata.nonce_str,
          'package': 'prepay_id=' + resdata.prepay_id,
          'signType': 'MD5',
          'paySign': sign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateTo({
              url: '/pages/myCenter/shop/chartprice/chartprice',
            })

          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})