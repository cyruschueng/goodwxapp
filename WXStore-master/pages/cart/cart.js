// pages/cart/cart.js
const app = getApp()
const serverHost = app.globalData.serverHost
const opType = {
  'unchecked': 0,
  'checked': 1,
  'add': 2,
  'sub': 3
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSelect: false,
    goodsNum: 0,
    priceCount: 0,
    cartArr: [],
    userId: ""
  },
  onLoad: function () {
    let _this = this;
    try {
      var value = wx.getStorageSync('userid')
      if (value) {
        _this.setData({
          userId: value
        })
        this.getCartGoods();
      }
    } catch (e) {
      // Do something when catch error
    }

  },
  getCartGoods: function () {
    let _this = this;
    wx.request({
      url: serverHost + 'cart/get',
      data: {
        userId: _this.data.userId
      },
      success: function (res) {
        console.log(res);
        if (!res.data) {
          wx.showModal({
            title: '您未登录',
            content: '请先登录',
          })
        } else {
          _this.setData({
            cartArr: res.data
          })
          wx.stopPullDownRefresh();
          _this.countNum();
          _this.countPrice();
          _this.countSelect();
        }
      }
    })
  },
  onPullDownRefresh: function () {
    this.getCartGoods();
  },
  goodsChecked: function (e) {
    let index = e.currentTarget.dataset.index;
    let checked = e.currentTarget.dataset.checked;
    let newList = this.data.cartArr;
    newList[index].checked = checked == '0' ? '1' : '0';
    //console.log(newList[index].checked)
    this.setData({
      cartArr: newList
    })
    this.countPrice();
    this.countNum();
    this.countSelect();
    this.updateCartNum(newList[index].id, newList[index].checked)
  },
  numAdd: function (e) {
    let index = e.currentTarget.dataset.index;//
    let newList = this.data.cartArr
    newList[index].num++;
    this.setData({
      cartArr: newList
    })
    this.countPrice();
    this.countNum();
    this.updateCartNum(newList[index].id, opType.add)
  },
  numSub: function (e) {
    let index = e.currentTarget.dataset.index;
    let num = e.currentTarget.dataset.num;
    let newList = this.data.cartArr
    if (num == 1) {
      return;
      //newList.splice(index, 1)
    } else {
      newList[index].num--;
    }
    this.setData({
      cartArr: newList
    })
    this.countPrice();
    this.countNum();
    this.updateCartNum(newList[index].id, opType.sub)
  },
  allSelect: function (e) {
    let allSelect = e.currentTarget.dataset.select;
    let newList = this.data.cartArr;
    for (let goods of newList) {
      goods.checked = allSelect ? '0' : '1';
    }
    this.setData({
      cartArr: newList,
      allSelect: !allSelect
    })
    this.countPrice();
    this.countNum();
    //this.updateCartNum(newList[index].id, opType.add)
  },
  countSelect: function () {
    let newList = this.data.cartArr;
    let len = 0;
    for (let goods of newList) {
      if (goods.checked == '1') len++;
    }
    console.log(len);
    this.setData({
      allSelect: len == newList.length ? true : false
    })

  },
  countNum: function () {
    let newList = this.data.cartArr;
    let allNum = 0
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].checked == '1') {
        allNum += parseInt(newList[i].num)
      }
    }
    this.setData({
      goodsNum: allNum
    })
  },
  countPrice: function () {
    let newList = this.data.cartArr;
    let allPrice = 0;
    for (let goods of newList) {
      if (goods.checked == '1') {
        allPrice += parseInt(goods.num) * goods.price;
      }
    }
    this.setData({
      priceCount: allPrice
    })
  },
  naviToPay: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  goodsInfo: function (e) {
    let goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/goodsInfo?id=' + goodsId,
    })
  },
  updateCartNum: function (cartId, opType) {
    wx.request({
      url: serverHost + 'cart/update',
      data: {
        cartId: cartId,
        opType: opType
      },
      success: function (res) {
        console.log(res);
      }
    })
  }
})