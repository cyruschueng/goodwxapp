var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
var shop_id = app.globalData.shop_id;
var data=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultAddress:0,
    addressDetailInfo:'',
    customer_id:'',
    product_idArr:[],
    level:'',
    model_idArr:[],
    cart_idArr:'',
    isDefaultAddress:false,
    couponNum:0,
    SureProductInfo:[],
    product_infos:[],
    totalAmount:0,
    isCouponTotal:0,
    quantity:0,
    isSelectCoupon_id:0,
    deduction:0,
    fortHostess:null,//爱心蜜豆币抵线（必须是堡主）
    freight:0,//运费,
    payment_type:1,//支付方式
    payment_type_name:'微信支付',
    totalPayNum:0,
    SugarSnapPeasDeduction:0,//蜜豆抵扣
    cart_ids:'',
    amount:0,
    isShopCart:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.setStorage({
      key: 'deduction',
      data: 0,
    })
    wx.setStorage({
      key: 'totalPayNum',
      data: 0,
    })
    // 获取商品信息
    if (options.isShopCart){
      that.setData({
        product_infos: options.product_infos,
        cart_ids: options.cart_ids,
        amount: options.amount,
        isShopCart: options.isShopCart
      })
    }
    // 获取customer_id
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        that.setData({
          customer_id: res.data
        })
        var couponUrl = baseUrl + '/api/customer/coupon/load-list?customer_id=' + that.data.customer_id;
        that.getCouponInfo(couponUrl)
        // 确认商品信息
        // console.log(that.data.product_infos)
        var SureProductInfoUrl = baseUrl + '/api/order/confirm-info?customer_id=' + that.data.customer_id + '&amount=' + that.data.amount + '&product_infos=' + that.data.product_infos;
        // console.log(SureProductInfoUrl)
        if (that.data.isShopCart == true) {
          console.log(that.data.isShopCart)
          SureProductInfoUrl = SureProductInfoUrl + '&cart_ids=' + that.data.cart_ids;
        }
        that.getSureProductInfo(SureProductInfoUrl)
      },
    })
  },
  // 选择地址
  goAddress(e){
    wx.navigateTo({
      url: '../personalCenter/personalSetting/shippingAddress/shippingAddress?product_infos=' + this.data.product_infos,
    })
  },
  // 获取地址详情数据
  getAddressDetail(url) {
    var that = this
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
          that.setData({
            addressDetailInfo: res.data.result
          })
        }
      }
    })
  },
  // 获取商品信息
  getSureProductInfo(url){
    var that=this;
    console.log(that.data.level)
    wx.getStorage({
      key: 'level',
      success: function(res) {
        // that.setData({
        //   level:3
        // })
        that.setData({                                      
          level: res.data
        })
        wx.request({
          url: url,
          success(res) {
            console.log(res)
            if (res.data.success) {
              var data = res.data.result.product_info;
              var fortHostess = res.data.result.customer.fortHostess;
              var product_infos = [];
              for (var i = 0; i < data.length; i++) {
                var product_infosObj = {};
                product_infosObj.product_id = data[i].product_id;
                product_infosObj.quantity = data[i].quantity;
                if (that.data.level == 1) {
                  product_infosObj.price = data[i].market_price;
                } else if (that.data.level == 2) {
                  product_infosObj.price = data[i].member_price;
                } else {
                  product_infosObj.price = data[i].vip_price;
                }
                product_infos.push(product_infosObj)
                data[i].exhibition = imgUrl + data[i].exhibition;
              }
              that.setData({
                SureProductInfo: data,
                freight: res.data.result.freight,
                totalAmount: res.data.result.freight + res.data.result.amount,
                product_infos: product_infos,
                fortHostess: fortHostess,
                SugarSnapPeasDeduction: fortHostess.love_honey_bean
              })
              wx.setStorage({
                key: 'isCouponTotal',
                data: res.data.result.amount,
              })
            } else {

            }
          }
        })
      },
    })
  },
  // 获取优惠券列表
  getCouponInfo(url) {
    var that = this;
    wx.request({
      url: url,
      success(res) {
        console.log(res);
        if (res.data.success) {
          var data = res.data.result;
          var total_deduction = [];
          wx.getStorage({
            key: 'isCouponTotal',
            success: function(res) {
              var isCouponTotal=res.data;
              // console.log(isCouponTotal)
              for (var i = 0; i < data.length; i++) {
                if (data[i].total_deduction < isCouponTotal) {
                  // 、、可用
                  var total_deductionOBj = {};
                  total_deductionOBj = {
                    coupon_id: data[i].coupon_id,
                    total_deduction: data[i].total_deduction,
                    coupon_name: data[i].coupon_name,
                    validity_time: data[i].validity_time,
                    enabledStatus: false,
                    deduction: data[i].deduction
                  }
                  total_deduction.push(total_deductionOBj)
                } else {
                  var total_deductionOBj = {};
                  total_deductionOBj = {
                    coupon_id: data[i].coupon_id,
                    total_deduction: data[i].total_deduction,
                    coupon_name: data[i].coupon_name,
                    validity_time: data[i].validity_time,
                    enabledStatus: true,
                    deduction: data[i].deduction
                  }
                  total_deduction.push(total_deductionOBj)
                }
              }
              that.setData({
                total_deduction: total_deduction,
              })
              var couponNum=0;
              // console.log(that.data.total_deduction)
              for (var j = 0; j < that.data.total_deduction.length;j++){
                if (!that.data.total_deduction[j].enabledStatus){
                  couponNum++
                }
                that.setData({
                  couponNum: couponNum
                })
              }
             
              // console.log(that.data.total_deduction)
            },
          })
        }
      }
    })
  },
  goCouponPage(e){
    var total_deduction=''
    if (this.data.total_deduction){
      var total_deduction = JSON.stringify(this.data.total_deduction);
      wx.navigateTo({
        url: '../personalCenter/discountCoupon/discountCoupon?total_deduction=' + total_deduction + '&submitOrderStatus=true' + '&totalAmount=' + this.data.totalAmount,
      })
    }
    // console.log(total_deduction)
   
  },
  // 支付方式选择
  paymentType(e){
    // console.log(e);
    if (e.detail.value == "微信支付"){
      this.setData({
        payment_type:1,
        payment_type_name: "微信支付"
      })
    } else if (e.detail.value == "蜜豆币支付"){
      this.setData({
        payment_type: 7,
        payment_type_name: "蜜豆币支付"
      })
    }

  },
  // 点击提交订单
  payClick(e){
    var that=this;
    // 提交订单
    var product_infos = JSON.stringify(that.data.product_infos)
    var payClickUrl = baseUrl + '/api/order/save?shop_id=' + shop_id
      + '&customer_id=' + that.data.customer_id + '&address_id=' + that.data.defaultAddress + '&product_infos=' + product_infos + '&coupon_id=' + that.data.isSelectCoupon_id + '&freight=' + that.data.freight + '&payment_type=' + that.data.payment_type;
    if (that.data.level==3){
      // 还需要处理堡主的
      payClickUrl = payClickUrl + 'balance_cash=' + that.data.SugarSnapPeasDeduction
    }else{
      payClickUrl = payClickUrl;
    }
    // console.log(payClickUrl)
    // 订单预支付(微信)
    var advancePaymentUrl = baseUrl + '/api/pay/prepay' + '?customer_id=' + that.data.customer_id;
    //   // 订单支付(蜜豆币)
    var rechargeBalanceUrl = baseUrl + '/api/order/pay' + '?customer_id=' + that.data.customer_id;
    // console.log(advancePaymentUrl)
    wx.request({
      url: payClickUrl,
      success(res){
        console.log(res)
        if(res.data.success){
          var data = res.data.result;
          if (that.data.payment_type==1){
            console.log(advancePaymentUrl + '&shop_id=' + shop_id + '&order_no=' + data.order_no + '&app_id=wxb27dd17f341dc468&amount=' + data.amount + '&type=buy')
            wx.request({
              url: advancePaymentUrl + '&shop_id=' + shop_id + '&order_no=' + data.order_no +'&app_id=wxb27dd17f341dc468&amount=' + data.amount + '&type=buy',
              success(res) {
                console.log(res)
                if (res.data.success) {
                  wx.requestPayment({
                    'timeStamp': res.data.result.timeStamp,
                    'nonceStr': res.data.result.nonceStr,
                    'package': res.data.result.package,
                    'signType': res.data.result.signType,
                    'paySign': res.data.result.sign,
                    success: function (res) {
                      // console.log(res);
                    },
                    fail: function (res) {
                      console.log(res);
                    },
                    complete: function (res) {
                      console.log(res)
                      // wx.switchTab({
                      //   url: '../homePage/homePage',
                      // })
                    }
                  })
                }
              }
            })
          } else if (that.data.payment_type==7){
            var payment_infos=[];
            if(that.data.level==3){
              var payment_infosObj={};
              payment_infosObj={
                amount: that.data.SugarSnapPeasDeduction,
                payment_type: '抵扣'
              }
              payment_infos.push(payment_infosObj)
            } else if (that.data.couponNum!=0){
              var payment_infosObj={};
              payment_infosObj={
                coupon_id: that.data.isSelectCoupon_id,
                amount: deduction,
                payment_type: '优惠券'
              }
              payment_infos.push(payment_infosObj)
            } else if (that.data.couponNum == 0){
              var payment_infosObj = {};
              payment_infosObj = {
                amount: that.data.totalAmount,
                payment_type: '蜜豆币'
              }
              payment_infos.push(payment_infosObj)
            }
            wx.request({
              url: rechargeBalanceUrl + '&order_no=' + data.order_no + '&payment_infos=' + JSON.stringify(payment_infos),
              success(res){
                console.log(res)
                if (res.data.success){
                  wx.showToast({
                    title: '付款成功',
                  })
                } else if (res.data.msg == "蜜豆余额不足以支付本订单"){
                  wx.showToast({
                    title: '蜜豆余额不足',
                    icon: 'loading'
                  })
                }
              }
            })
          }
        }else{
          wx.showModal({
            title: '提示',
            content: '生成订单失败',
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
    var that=this;
    // 获取默认地址
    // console.log(that.data.defaultAddress)
    wx.getStorage({
      key: 'defaultAddress',
      success: function (res) {
        that.setData({
          defaultAddress: res.data
        })
        // console.log(that.data.defaultAddress)
        // 获取地址详情数据
        var url = baseUrl + '/api/address/load?address_id=' + that.data.defaultAddress
        that.getAddressDetail(url)
      },
    })
    // 获取选中的优惠券
    wx.getStorage({
      key: 'isSelectCoupon_id',
      success: function(res) {
        console.log
        that.setData({
          isSelectCoupon_id:res.data,
        })
      },
    })
    // 获取选中优惠券的钱数
    wx.getStorage({
      key: 'deduction',
      success: function(res) {
        that.setData({
          deduction:res.data
        })
      },
    })
    // 用户等级
    // wx.getStorage({
    //   key: 'level',
    //   success: function(res) {
    //     // console.log(res.data)
    //     that.setData({
    //       level:res.data
    //     })
    //   },
    // })
    // 获取支付的钱
    wx.getStorage({
      key: 'totalPayNum',
      success: function(res) {
        that.setData({
          totalPayNum:res.data
        })
      },
    })
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