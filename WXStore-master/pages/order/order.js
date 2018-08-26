// pages/order/order.js
let app = getApp();
let serverHost = app.globalData.serverHost;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAddress: false,
    address: null,
    goodsNum: 0,
    priceCount: 0,
    goodsPrice: 0,
    freight: 5,
    orderList: [],
    userId: wx.getStorageSync("userid")
  },
  chooseAddr: function () {
    let _this = this;
    wx.chooseAddress({
      success: function (res) {
        console.log(res);
        _this.setData({
          address: res,
          isShowAddress: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //this.getUserId();
    this.getCheckdGoodsList();
  },
  // getUserId: function () {
  //   if (this.data.userId) {
  //     try {
  //       let _this = this;
  //       let userId = wx.getStorageSync("userid");
  //       if (userId) {
  //         _this.setData({
  //           userId: userId
  //         })
  //         return userId;
  //       } else {
  //         console.log("未登录");
  //       }
  //     } catch (e) {

  //     }
  //   }
  // },
  onPullDownRefresh: function () {
    this.getCheckdGoodsList();
  },
  getCheckdGoodsList: function () {
    let _this = this;
    let userId = _this.data.userId;
    // if (!userId) {
    //   userId = _this.getUserId();
    // }
    wx.request({
      url: serverHost + 'order/getCheckedGoods',
      data: {
        userId: userId
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          orderList: res.data
        })
        wx.stopPullDownRefresh();
        _this.countPrice();
      }
    })
  },
  // onShow: function () {
  //   console.log(this.data.address)
  //   if (this.data.address != null) {
  //     console.log(this.data.address)
  //     this.setData({
  //       isShowAddress: true
  //     })
  //   }
  // },
  numAdd: function (e) {
    let index = e.currentTarget.dataset.index;//
    let newList = this.data.orderList
    newList[index].num++;
    this.setData({
      orderList: newList
    })
    this.countPrice();
  },
  numSub: function (e) {
    let index = e.currentTarget.dataset.index;
    let num = e.currentTarget.dataset.num;
    let newList = this.data.orderList
    if (num == 1) {
      newList.splice(index, 1)
    } else {
      newList[index].num--;
    }
    this.setData({
      orderList: newList
    })
    this.countPrice();
  },
  countPrice: function () {
    let newList = this.data.orderList;
    let allPrice = 0;
    for (let goods of newList) {
      allPrice += parseInt(goods.num) * goods.price;
    }
    let priceCount = allPrice + this.data.freight;
    this.setData({
      goodsPrice: allPrice,
      priceCount: priceCount
    })
  },
  naviGoodsInfo: function (e) {
    console.log(e);
    let goodId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/goodsInfo?id=' + goodId,
    })
  },
  orderPay: function () {
    this.createOrder();
    // wx.requestPayment(
    //   {
    //     'timeStamp': '',
    //     'nonceStr': '',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     success: function (res) { },
    //     fail: function (res) {
    //       console.log(res);
    //       wx.showModal({
    //         title: '支付结果',
    //         content: res.errMsg,
    //       })
    //     },
    //     complete: function (res) { }
    //   })
  },
  createOrder: function () {
    let _this = this;
    let userId = _this.data.userId;
    let address = JSON.stringify(_this.data.address);
    let goods = JSON.stringify(_this.data.orderList);
    let freight = _this.data.freight;
    wx.request({
      url: serverHost + 'order/create',
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userId: userId,
        address: address,
        goods: goods,
        freight: freight
      },
      success: function (res) {
        console.log(res.data)
        let msg = res.data == 'success' ? '提交成功' : '提交失败';
        wx.showToast({
          title: msg,
        })
      },
      fail: function (e) {
        wx.showModal({
          title: '发生异常',
          content: e,
        })
      }
    })
  }
})