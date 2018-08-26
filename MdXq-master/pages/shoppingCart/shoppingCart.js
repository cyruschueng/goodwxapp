// pages/shoppingCart/shoppingCart.js
var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;
var shop_id = app.globalData.shop_id;
var product_infos = [];//商品和规格id
var amount=0;//订单总价
var newAmount = 0;//先点击全选后在点击单选
var quantity=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quantity: 1,
    minusStatus: [],
    isShoppingCartNull:false,
    shoppingCartListInfo:[],
    cart_idsArr:[],
    // 为你推荐数组
    recommendGoodsInfo: [],
    customer_id:0,
    totalDelete:false,
    product_ids:'',
    level:0,
    amount:0.00,
    isTotalOrSignal:false,
    isSignalOrTotal:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 跳转到商品详情
  goProductDetail(e) {
    console.log(e);
    var product_id = e.currentTarget.dataset.product_id;
    debugger
    wx.navigateTo({
      url: '../productDetails/productDetails?product_id=' + product_id,
    })
  },
  //获取为你推荐数据
  getRecommendGoods(url) {
    var that = this
    wx.request({
      url: url,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          var data = res.data.result;
          for (var i = 0; i < data.length; i++) {
            data[i].exhibition = imgUrl + data[i].exhibition;
            that.setData({
              recommendGoodsInfo: data
            })
          }
          // console.log(that.data.recommendGoodsInfo)
        }
      }
    })
  },
  // 获取购物车列表
  getShoppingCartList(url){
    var that=this;
    wx.request({
      url: url,
      success(res){
        // console.log(res)
        if(res.data.success){
          var data=res.data.result;
          for(var i=0;i<data.length;i++){
            data[i].exhibition = imgUrl + data[i].exhibition;
            if (data[i].quantity <= 1){
              data[i].minusStatus ='disabled'
            }else{
              data[i].minusStatus = 'normal'
            }
          }
          that.setData({
            shoppingCartListInfo:data,
            isShoppingCartNull: false
          })
        }else{
          that.setData({
            isShoppingCartNull:true
          })
        }
      },
      fail(error){
        console.log(error)
      }
    })
  },
  // 点击减号按钮函数
  bindMinus:function(e){
    var that=this;
    var cart_id = e.currentTarget.dataset.cart_id;
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.shoppingCartListInfo.length; i++) {
      var quantity = that.data.shoppingCartListInfo[index].quantity;
      if (quantity>1){
        quantity--
      }else{
        quantity=1
      }
      that.bindManual(cart_id, quantity)
    }
  },
  // 点击增加按钮函数
  bindPlus: function (e) {
    var that = this;
    var cart_id = e.currentTarget.dataset.cart_id;
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i < that.data.shoppingCartListInfo.length; i++) {
      var quantity = that.data.shoppingCartListInfo[index].quantity++;
      that.bindManual(cart_id, quantity)
    }
  },
  // 获取修改数量
  bindManual(cart_id, quantity){
    var that=this;
    var quantityUrl = baseUrl + '/api/shopping/cart/edit?cart_id=' +
      cart_id + '&quantity=' + quantity;
    wx.request({
      url: quantityUrl,
      success(res) {
        // console.log(res)
        if (res.data.success) {
          var shoppingCartListUrl = baseUrl + '/api/shopping/cart/load-list?customer_id=' + that.data.customer_id;
          that.getShoppingCartList(shoppingCartListUrl);
        }
      },
      fail(error) {
        console.log(error)
      }
    })
  },
  // 单选
  checkedClick(e){
    // console.log(e)
    var product_id = e.currentTarget.dataset.product_id;
    var cart_id = e.currentTarget.dataset.cart_id;
    var model_id = e.currentTarget.dataset.model_id;
    var market_price = e.currentTarget.dataset.market_price;
    var member_price = e.currentTarget.dataset.member_price;
    var vip_price = e.currentTarget.dataset.vip_price;
    var quantity = e.currentTarget.dataset.quantity;
    var product_ids='';
    var product_infosObj={}
    var checked = e.detail.value;
    var cart_idsArr = this.data.cart_idsArr;
    var index = e.currentTarget.dataset.index;
    var shoppingCartListInfo = this.data.shoppingCartListInfo;
    
    if (this.data.totalDelete){
      this.setData({
        isTotalOrSignal:true
      })
      for (var i = 0; i < cart_idsArr.length; i++) {
        if (cart_idsArr[i] == cart_id) {
          cart_idsArr.splice(i, 1)
          // console.log(cart_idsArr)
          for (var i = 0; i < shoppingCartListInfo.length; i++) {
            shoppingCartListInfo[index].checked = !shoppingCartListInfo[index].checked;
          }
          if (this.data.level == 1) {
            newAmount = quantity * market_price;
            this.setData({
              amount: (this.data.amount - newAmount).toFixed(2)
            })
          } else if (this.data.level == 2) {
            newAmount = quantity * member_price;
            this.setData({
              amount: (this.data.amount - newAmount).toFixed(2)
            })
          } else {
            newAmount = quantity * vip_price;
            this.setData({
              amount: (this.data.amount - newAmount).toFixed(2)
            })
          }
          // console.log(amount)
        }
      }
      for (var j = 0; j < product_infos.length; j++) {
        if (product_infos[j].model_id == model_id) {
          product_infos.splice(j, 1)
        }
      }
      // console.log(product_infos)
    }else{
      if (checked != '') {
        cart_idsArr=[];
        product_infos=[];
        amount=0;
        cart_idsArr.push(cart_id);
        // console.log(cart_idsArr)
        product_infosObj.product_id = product_id;
        product_infosObj.model_id = model_id;
        product_infosObj.quantity = quantity;
        product_infos.push(product_infosObj)
        // console.log(product_infos)
        for (var i = 0; i < shoppingCartListInfo.length;i++){
          shoppingCartListInfo[index].checked = !shoppingCartListInfo[index].checked;
        }
        // console.log(amount)
        if (this.data.level == 1) {
          amount = amount + quantity * market_price;
        } else if (this.data.level == 2) {
          amount = amount + quantity * member_price;
        } else {
          amount = amount + quantity * vip_price;
        }
        // console.log(amount)
      } else {
        for (var i = 0; i < shoppingCartListInfo.length; i++) {
          shoppingCartListInfo[index].checked = !shoppingCartListInfo[index].checked;
        }
        if (this.data.level == 1) {
          amount = amount - quantity * market_price;
        } else if (this.data.level == 2) {
          amount = amount - quantity * member_price;
        } else {
          amount = amount - quantity * vip_price;
        }
        // console.log(amount)
        for (var i = 0; i < cart_idsArr.length; i++) {
          if (cart_idsArr[i] == cart_id) {
            cart_idsArr.splice(i, 1)
          }
        }
        // console.log(cart_idsArr)
        for (var j = 0; j < product_infos.length; j++) {
          if (product_infos[j].model_id == model_id) {
            product_infos.splice(j, 1)
          }
        }
        // console.log(product_infos)
      }
    }
    this.setData({
      cart_idsArr: cart_idsArr,
      amount: amount.toFixed(2),
      isSignalOrTotal: true,
      shoppingCartListInfo: shoppingCartListInfo
    })
    // 当所有的都选择时，全选按钮选中状态
    // console.log(this.data.cart_idsArr)
    if (this.data.cart_idsArr.length == this.data.shoppingCartListInfo.length) {
      this.setData({
        totalDelete: true,
        isTotalOrSignal:false
      })
    }
    // console.log(product_infos)
    // console.log(this.data.cart_idsArr)
    // console.log(this.data.amount)
  },
  // 全选
  totalSelect(e){
    var that=this;
    var cart_ids = that.data.cart_ids;
    var product_ids = that.data.product_ids;
    var shoppingCartListInfo = that.data.shoppingCartListInfo;
    var cart_idsArr = that.data.cart_idsArr;
    var amount=0;
    if (that.data.isSignalOrTotal){
      if (that.data.totalDelete){
        cart_idsArr = [];
        that.setData({
          cart_idsArr: cart_idsArr,
          amount:0
        })
        product_infos = [];
        for (var i = 0; i < shoppingCartListInfo.length; i++) {
          shoppingCartListInfo[i].checked = !shoppingCartListInfo[i].checked;
        }
      }else{
        for (var i = 0; i < shoppingCartListInfo.length; i++) {
          var product_infosObj = {};
          product_infosObj.product_id = shoppingCartListInfo[i].product_id;
          product_infosObj.model_id = shoppingCartListInfo[i].model_id;
          product_infosObj.quantity = shoppingCartListInfo[i].quantity;
          product_infos.push(product_infosObj)
          cart_idsArr.push(shoppingCartListInfo[i].cart_id);
          shoppingCartListInfo[i].checked = !shoppingCartListInfo[i].checked;
          if (that.data.level == 1) {
            // console.log(shoppingCartListInfo)
            amount = amount + shoppingCartListInfo[i].quantity * shoppingCartListInfo[i].market_price;
          } else if (that.data.level == 2) {
            amount = amount + shoppingCartListInfo[i].quantity * shoppingCartListInfo[i].member_price;
          } else {
            amount = amount + shoppingCartListInfo[i].quantity * shoppingCartListInfo[i].vip_price;
          }
        }
      }
      // console.log(this.data.cart_idsArr)
      // console.log(this.data.amount)
      // console.log(product_infos)
    }else{
      if (that.data.totalDelete){
        for (var i = 0; i < shoppingCartListInfo.length; i++){
          shoppingCartListInfo[i].checked = !shoppingCartListInfo[i].checked;
        }
        product_infos=[];
        // console.log(product_infos)
      }else{
        for (var i = 0; i < shoppingCartListInfo.length; i++) {
          var product_infosObj = {};
          product_infosObj.product_id = shoppingCartListInfo[i].product_id;
          product_infosObj.model_id = shoppingCartListInfo[i].model_id;
          product_infosObj.quantity = shoppingCartListInfo[i].quantity;
          product_infos.push(product_infosObj)
          // console.log(product_infos)
          cart_idsArr.push(shoppingCartListInfo[i].cart_id);
          // console.log(this.data.cart_idsArr)
          shoppingCartListInfo[i].checked = !shoppingCartListInfo[i].checked;
          if (that.data.level == 1) {
            // console.log(shoppingCartListInfo)
            amount = amount + shoppingCartListInfo[i].quantity * shoppingCartListInfo[i].market_price;
          } else if (that.data.level == 2) {
            amount = amount + shoppingCartListInfo[i].quantity * shoppingCartListInfo[i].member_price;
          } else {
            amount = amount + shoppingCartListInfo[i].quantity * shoppingCartListInfo[i].vip_price;
          }
          // console.log(amount)

        }
        // console.log(that.data.cart_idsArr)
      }
    }
    // console.log(this.data.shoppingCartListInfo)
    
    that.setData({
      totalDelete: !that.data.totalDelete,
      cart_idsArr: cart_idsArr,
      shoppingCartListInfo: shoppingCartListInfo
    })
    if (that.data.totalDelete){
      that.setData({
        amount: amount.toFixed(2)
      })
    }else{
      that.setData({
        amount: 0.00
      })
    }
    // console.log(product_infos)
    // console.log(this.data.cart_idsArr)
    // console.log(this.data.amount)
  },
  // 删除购物车内容
  deleteShoppingCart(e){
    var that=this;
    var cart_ids = this.data.cart_idsArr.join(',');
    console.log(cart_ids)
    var deleteShoppingCartUrl = baseUrl + '/api/shopping/cart/delete?cart_ids=' + cart_ids;
    var shoppingCartListInfo = that.data.shoppingCartListInfo;
    var cart_idsArr = this.data.cart_idsArr;
    var isShoppingCartNull = that.data.isShoppingCartNull;
    var totalDelete = that.data.totalDelete;
    wx.request({
        url: deleteShoppingCartUrl,
        success(res) {
          // console.log(res)
          if (res.data.success) {
            if (totalDelete){
              that.setData({
                isShoppingCartNull:true,
                shoppingCartListInfo:[]
              })
              // console.log(that.data.isShoppingCartNull)
            }else{
              for (var i = 0; i < shoppingCartListInfo.length; i++) {
                for (var j = 0; j < cart_idsArr.length; j++) {
                  if (shoppingCartListInfo[i].cart_id == cart_idsArr[j]) {
                    shoppingCartListInfo.splice(i, 1)
                  }
                }
              }
              that.setData({
                shoppingCartListInfo: shoppingCartListInfo
              })
              if (that.data.shoppingCartListInfo.length==0){
                that.setData({
                  isShoppingCartNull: true,
                })
              }
              // console.log(that.data.shoppingCartListInfo)
            }
          }
        },
        fail(error) {
          console.log(error)
        }
      })
  },
  goHomepage(e){
    wx.switchTab({
      url: '../homepage/homepage',
    })
  },
  // 点击去提交订单
  goSubmitOrder(e){
    console.log()
    var cart_idsArr = this.data.cart_idsArr;
    var cart_ids = cart_idsArr.join(',');
    // console.log(product_infos)
    wx.navigateTo({
      url: '../submitOrder/submitOrder?product_infos=' + JSON.stringify(product_infos) + '&cart_ids=' + cart_ids + '&amount=' + this.data.amount+'&isShopCart=true',
      success(res){
        product_infos=[]
      }
    })
  },
  // 点击去购物车详情
  shopCartDetail(e){
    var product_id = e.currentTarget.dataset.product_id;
    var model_id = e.currentTarget.dataset.model_id;
    var quantity = e.currentTarget.dataset.quantity;
    wx.navigateTo({
      url: '../productDetails/productDetails?product_id=' + product_id + '&isShopCartPage=' + true + '&model_id=' + model_id + '&quantity=' + quantity,
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
    var that = this;
    // 获取购物车列表
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        that.setData({
          customer_id: res.data
        })
        var shoppingCartListUrl = baseUrl + '/api/shopping/cart/load-list?customer_id=' + that.data.customer_id;
        that.getShoppingCartList(shoppingCartListUrl);
        // 获取为你推荐数据
        that.getRecommendGoods(baseUrl + '/api/product/recommend?shop_id=' + shop_id+'&recommend_id=4')
      },
    })
    wx.getStorage({
      key: 'level',
      success: function(res) {
        that.setData({
          level:res.data
        })
      },
    })
    that.setData({
      totalDelete:false,
      amount:0
    })
    wx.setStorage({
      key: 'product_infos',
      data: '',
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