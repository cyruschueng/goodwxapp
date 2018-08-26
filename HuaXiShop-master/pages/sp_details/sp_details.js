// pages/sp_details/sp_details.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    GuestUserData: null,//用户信息
    productid:0,
    ProductInfo:null,//商品详情
<<<<<<< HEAD
=======
    banner_img:null,//产品滚动图
    product_jianjie:null,//产品简介图
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
    number: 1,//购买数量
    totalPrice: 0,//支付总价
    SalePrice: 0,//折扣价格
    payShop: false,//立即购买的弹出层是否显示
<<<<<<< HEAD
=======
    small_img:"",//购买小商品图片

    Name: '',//收货人姓名
    Province: '',//省
    City: '',//市
    Area: '',//区
    Address: '',//详细地址
    Phone: '',//收货人手机号

    accountid:0,//代理id
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
  },

  onLoad: function (options) {
    this.setData({
<<<<<<< HEAD
      productid: options.productid
    })
=======
      productid: options.productid,
    })
    if (options.accountid != undefined && options.accountid!=null){
      this.setData({
        accountid: options.accountid
      })
    }
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
    this.getLingShouProductInfo();
  },
  onShow: function () {
    var that = this
    if (app.globalData.GuestUserData) {
      that.setData({
        GuestUserData: app.globalData.GuestUserData,
        userInfo: app.globalData.userInfo
      })
<<<<<<< HEAD
=======
      if (app.globalData.AccountId != 0) {//当前人是代理
        that.setData({
          accountid: app.globalData.AccountId
        })
      }
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
    } else {
      app.appCallback = res => {//用户信息返回后调用
        that.setData({
          GuestUserData: res.data,
          userInfo: app.globalData.userInfo
        });
<<<<<<< HEAD
      }
    }
  },
  getLingShouProductInfo:function(){
=======
        
        if (app.globalData.AccountId!=0){//当前人是代理
              that.setData({
                accountid: app.globalData.AccountId
              })
        }

      }
    }
  },
  getLingShouProductInfo:function(){
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
        Command: "getLingShouProductInfo",
        ProductId: that.data.productid,
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        console.log("商品详情：")
        console.log(res)
        that.setData({
          ProductInfo:res.data.ds[0],
          banner_img: res.data.ds[0].Product_Photos.split(','),
          product_jianjie: res.data.ds[0].Product_Photos_JianJie.split(','),
          totalPrice: res.data.ds[0].SalePrice,
          SalePrice: res.data.ds[0].SalePrice,
          small_img: res.data.ds[0].Product_Photos.split(',')[0],
        })

        wx.setNavigationBarTitle({//标题
          title: res.data.ds[0].ProductName,
          success: function (res) {
            // success
          }
        })
        that.getUserLatestOrderAddress();
      }
    });
  },
  //获取最近一次收货地址
  getUserLatestOrderAddress:function(){
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
    var that = this;
    wx.request({
      url: 'https://df2018.reane.cn/scweb/server/lingshou.ashx',
      method: "GET",
      data: {
<<<<<<< HEAD
        Command: "getLingShouProductInfo",
        ProductId: that.data.productid,
=======
        Command: "getUserLatestOrderAddress",
        UserId: that.data.GuestUserData.ds[0].UserId,
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
<<<<<<< HEAD
        console.log("商品详情：")
        console.log(res)
        that.setData({
          ProductInfo:res.data.ds[0],
          totalPrice: res.data.ds[0].SalePrice,
          SalePrice: res.data.ds[0].SalePrice,
        })
      }
    });
  },

=======
        console.log("最近一次收货地址:")
        console.log(res)
        if (res.data.ds != undefined) {
          that.setData({
            Name: res.data.ds[0].UserName,
            Province: res.data.ds[0].Province,
            City: res.data.ds[0].City,
            Area: res.data.ds[0].Area,
            Address: res.data.ds[0].Address,
            Phone: res.data.ds[0].UserPhone,
          })
        }
      }
    });
  },
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
  // 增加数量
  addCount(e) {
    var num = this.data.number;//获取当前数量
    num = num + 1;
    this.setData({
      number: num
    });
    this.getTotalPrice();
  },
  // 减少数量
  minusCount(e) {
    var num = this.data.number;//获取当前数量
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    this.setData({
      number: num
    });
    this.getTotalPrice();
  },
  //计算总价选中的商品的 价格 * 数量
  getTotalPrice() {
    var total = 0;//总价
    var price = this.data.SalePrice;//获取商品价格
    var num = this.data.number;//获取当前数量
    this.setData({
      totalPrice: price * num
    });
  },
<<<<<<< HEAD
=======
  //收货地址
  pay_Address: function () {
    var that = this
    if (wx.chooseAddress) {
      wx.chooseAddress({
        success: function (res) {
          console.log("收货地址")
          console.log(res)
          that.setData({
            Name: res.userName,
            Province: res.provinceName,
            City: res.cityName,
            Area: res.countyName,
            Address: res.detailInfo,
            Phone: res.telNumber,
          });
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
  //立即购买
  buy_shop() {
    this.setData({
      payShop: true
    });
<<<<<<< HEAD
  },
  //立即支付
  //关闭购买
  payClose: function () {
    this.setData({
      payShop: false
    });
  },
=======
  },
  //立即支付
  //关闭购买
  payClose: function () {
    this.setData({
      payShop: false
    });
  },
  //立即支付
  lj_pay() {
    var that=this
    if (that.data.Address == '') {
      wx.showToast({
        icon: "none",
        title: '请选择收货地址',
      });
      return false;
    }else{
      that.postAddLingShouOrder();
    }

  },
  //生成零售订单-单品购买
  postAddLingShouOrder:function(){
    var that = this
    console.log(that.data.accountid + "#" + that.data.productid + "#" + app.globalData.openId + "#" + that.data.GuestUserData.ds[0].UserId + "#" + that.data.Name + "#" + that.data.number)
    wx.request({
      url: "https://df2018.reane.cn/scweb/server/wxpay.ashx",
      method: "POST",
      data: {
        Command: "postAddLingShouOrder",
        AccountId: that.data.accountid,
        ProductId: that.data.productid,
        GuestOpenId: app.globalData.openId,
        GZHOpenId:that.data.GuestUserData.ds[0].GZHOpenId,
        UserId: that.data.GuestUserData.ds[0].UserId,
        UserName: that.data.Name,
        UserPhone: that.data.Phone,
        Province: that.data.Province,
        City: that.data.City,
        Area: that.data.Area,
        Address: that.data.Address,
        BuyCount: that.data.number
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          'success': function (res) {
            console.log(res)
            /*wx.showToast({
              icon: "success",
              title: '购买成功',
            });*/
          },
          'fail': function (res) {
          }
        });
      }
    });
  },
  //分享
>>>>>>> 7b36655c77a4765d6dcbee386e9d573080b7f122
  onShareAppMessage: function () {
    var that = this
    return {
      title: "￥" + that.data.ProductInfo.SalePrice + "|" + that.data.ProductInfo.ProductName,
      desc: '最具人气的小程序开发联盟!',
      path: '/pages/sp_details/sp_details?productid=' + that.data.productid + "&accountid=" + that.data.accountid,
    }
  }
})