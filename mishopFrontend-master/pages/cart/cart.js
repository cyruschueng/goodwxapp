var app = getApp();
// pages/cart/cart.js
var shopcar = require('../../utils/shopcar.js');
Page({
  data: {
    page: 1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: [],
    selectedAllStatus: true
  },

  bindMinus: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--;
      var cart_id = e.currentTarget.dataset.cartid;
      wx.request({
        url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
        method: 'post',
        data: {
          user_id: app.d.userId,
          num: num,
          cart_id: cart_id
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          var status = res.data.status;
          if (status == 1) {
            // 只有大于一件的时候，才能normal状态，否则disable状态
            var minusStatus = num <= 1 ? 'disabled' : 'normal';
            // 购物车数据
            var carts = that.data.carts;
            carts[index].num = num;
            // 按钮可用状态
            var minusStatuses = that.data.minusStatuses;
            minusStatuses[index] = minusStatus;
            // 将数值与状态写回
            that.setData({
              minusStatuses: minusStatuses
            });
            //减少购物车数量
            shopcar.shopCarDel(1);
            that.sum();
          } else {
            wx.showToast({
              title: '操作失败！',
              duration: 2000
            });
          }
        },
        fail: function () {
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      });
    } else {
      this.removeShopCard(e);
    }

  },

  bindPlus: function (e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].num;
    // 自增
    num++;
    var cart_id = e.currentTarget.dataset.cartid;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shopping/up_cart',
      method: 'post',
      data: {
        user_id: app.d.userId,
        num: num,
        cart_id: cart_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var status = res.data.status;
        if (status == 1) {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].num = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          //增加购物车数量
          shopcar.shopCarAdd(that);
          that.sum();
        } else {
          wx.showToast({
            title: '操作失败！',
            duration: 2000
          });
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },

  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // 写回经点击修改后的数组
    this.setData({
      carts: carts
    });
    this.sum()
  },

  bindSelectAll: function () {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum()
  },

  bindCheckout: function () {
    // 初始化toastStr字符串
    var toastStr = '';
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].id;
        toastStr += ',';
      }
    }
    if (toastStr == '') {
      wx.showToast({
        title: '请选择要结算的商品！',
        duration: 2000
      });
      return false;
    }
    //存回data
    wx.navigateTo({
      url: '../order/pay?cartId=' + toastStr,
    })
  },

  bindToastChange: function () {
    this.setData({
      toastHidden: true
    });
  },

  sum: function (e) {
    if(e){
      var carts = e;
    }else{
      var carts = this.data.carts;
    }
    
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].num * carts[i].price;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: '¥ ' + total.toFixed(2)
    });

    /**
     * 下面这种写法 原本是打算把购物车存储到本地 但由于存储到本地 所以价格变动会有错误 于是计算总价时同步下价格
     * 但是由于本地存储的 loadProductData() 总是有问题就放弃了
     * 而且使用下面的方法虽然更严谨 但是呢造成了选择框的失效 因为点击取消选择 也会重新计算价格 但是请求后 选择就又会到默认了
     * 于是 还是等下一版统一规划吧
     */
    // var that = this;
    // wx.request({
    //   url: app.d.ceshiUrl + '/Api/Shopping/index',
    //   method: 'post',
    //   data: {
    //     user_id: app.d.userId
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {

    //     var carts =[];
    //     carts = res.data.cart;
    //     // 计算总金额
    //     var total = 0;
    //     for (var i = 0; i < carts.length; i++) {
    //       if (carts[i].selected) {
    //         total += parseInt(carts[i].num) * parseFloat(carts[i].price);
    //       }
    //     }
    //     // 写回经点击修改后的数组
    //     that.setData({
    //       carts: carts,
    //       total: '¥ ' + total.toFixed(2)
    //     });

    //   },
    // });
  },

  onLoad: function (options) {
    //this.loadProductData();
    // this.sum();
  },
  onShow: function () {
    this.loadProductData();
    //this.sum();
    this.setData({
      selectedAllStatus: true
    });
  },
  //删除购物车产品
  removeShopCard: function (e) {
    var that = this;
    var cardId = (e == 0) ? e : e.currentTarget.dataset.cartid;
    var num = e.currentTarget.dataset.num;
    //console.log(e.currentTarget.dataset.num);

    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + '/Api/Shopping/delete',
          method: 'post',
          data: {
            cart_id: cardId,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            //清除购物车
            shopcar.shopCarDel(num);
            //--init data
            var data = res.data;
            if (data.status == 1) {
              //that.data.productData.length =0;
              that.loadProductData();
              that.sum();
            } else {
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              });
            }
          },
        });
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },

  // 数据案例
  loadProductData: function () {
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + '/Api/Shopping/index',
      method: 'post',
      data: {
        user_id: app.d.userId
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //--init data
        var cart = res.data.cart;
        that.sum(cart);
        //console.log(that.data);
        // that.setData({
        //   carts: cart,
        // });
        //endInitData
      },
    });
  },

})