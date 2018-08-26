// pages/payHtml/payHtml.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
    noAddress:true,
    name:'',
    phone:'',
    address:'',
    goods_totalPrice:'',
    freight:'',
    totalPrice:''
  }, 
  //更换地址
  selete_address:function(){ 
    wx.navigateTo({
      url: '/pages/address/address'
    })
  },
  //添加地址
  add_address: function () {
    let address_id = this.data.address_id
    wx.navigateTo({
      url: '/pages/address-add/address-add?id=' + address_id
    })
  },
  //减少数量
  minusCount: function (e) {
    var that = this;
    const index = e.currentTarget.dataset.id;
    let items = that.data.items;
    let cart_id = that.data.items[index].id;
    let goods_num = items[index].goods_num;
    goods_num--;
    if (goods_num == 0) {
      goods_num = 1;
      wx.showModal({
        title: '提示',
        content: '确定删除该商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: function(res) {
          console.log(that.data.way)
          if (res.confirm) {
            console.log('用户点击确定')
            goods_num = 0;
            //删除购物车
            if(that.data.way==1){
              wx.request({
                url: web_url + '/app.php?c=Cart&act=del',
                data: {
                  cart_id: cart_id
                },
                header: {},
                method: 'GET',
                dataType: 'json',
                success: function (res) {
                  console.log(res)
                },
              })
            }
            if(items.length == 1){
              //后台执行删除
              wx.navigateBack({
                delta: 1,
              })
            }else{
              //后台执行删除
              items.splice(index,1);
              that.setData({
                items: items
              })
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    }
    if(that.data.way==0){
      that.data.items[index].goods_num = goods_num;
      that.setData({
        items: that.data.items
      })
      that.getTotalPrice();
    } else if (that.data.way == 1) {
      wx.request({
        url: web_url + '/app.php?c=Cart&act=change',
        data: {
          cart_id: cart_id,
          goods_num: goods_num
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          if (!res.data.error) {
            that.data.items[index].goods_num = goods_num;
            that.setData({
              items: that.data.items
            })
            that.getTotalPrice();
          }
        },
      })
    }
  },
  //增加数量
  addCount: function (e) {
    var that = this;
    const index = e.currentTarget.dataset.id;
    let goods_num = that.data.items[index].goods_num;
    goods_num++;
    console.log(that.data.way)
    if (that.data.way == 0){
      that.data.items[index].goods_num = goods_num;
      that.setData({
        items: that.data.items
      })
      that.getTotalPrice();
    } else if (that.data.way == 1){
      let cart_id = that.data.items[index].id;
      wx.request({
        url: web_url + '/app.php?c=Cart&act=change',
        data: {
          cart_id: cart_id,
          goods_num: goods_num
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          if (!res.data.error) {
            that.data.items[index].goods_num = goods_num;
            that.setData({
              items: that.data.items
            })
            that.getTotalPrice();
          }
        },
      })
    }
  },
  
  //获取总价
  getTotalPrice: function (e) {
    var that = this;
    let items = that.data.items;
    let freight = that.data.freight;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += parseFloat(items[i].price) * parseInt(items[i].goods_num)
    };
    var goods_totalPrice = total.toFixed(2);
    var totalPrice = goods_totalPrice - freight
    that.setData({
      items: items,
      goods_totalPrice: goods_totalPrice,
      totalPrice: totalPrice.toFixed(2)
    });
  },
  //提交支付
  submitPay:function(){
    var that = this
    if (that.data.noAddress) {
      wx.showModal({
        title: '提示',
        content: '请选择地址',
        showCancel: false,
      })
      return false;
    }
    if(that.data.way == 1){
      wx.request({
        url: web_url + '/app.php?c=Order&act=add',
        data: {
          // address: '{"fullname":"' + that.data.name + '","phone":"' + that.data.phone + '","address":"' + that.data.address + '"}',
          // freight: '{"id":"' + that.data.freight_id + '","freight_price":"' + that.data.freight_price + '"}',
          // user_id: that.data.user_id,
          // cart_id: that.data.cart_id

          data:{
            address: {
              fullname: that.data.name,
              phone: that.data.phone, 
               address:that.data.address
               },

            freight: {
              id: that.data.freight_id,
              freight_price: that.data.freight_price,
            },
          user_id: that.data.user_id,
          cart_id: that.data.cart_id
          }
        },
        header: { 'content-type': 'application/json'},
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          console.log('zhifu1',res)
          wx.requestPayment({
            'timeStamp': res.data.wxpackage.timeStamp + '',
            'nonceStr': res.data.wxpackage.nonceStr,
            'package': res.data.wxpackage.package,
            'signType': 'MD5',
            'paySign': res.data.wxpackage.paySign,
            'success': function(res) {
              //支付成功后，跳转到全部订单列表
              wx.redirectTo({
                url: '/pages/order-list/order-list?state=0'
              })
            },
            'fail': function(res) {
              wx.showToast({
                title: '支付失败',
                icon: 'success',
                image: '',
                duration: 1200,
                mask: true,
              })
            },
          })
        },
      })
    } else if (that.data.way == 0){
      wx.request({
        url: web_url + '/app.php?c=Order&act=add',
        data: {
          // address: '{"fullname":"' + that.data.name + '","phone":"' + that.data.phone + '","address":"' + that.data.address + '"}',
          // freight: '{"id":"' + that.data.freight_id + '","freight_price":"' + that.data.freight_price + '"}',
          // user_id: that.data.user_id,
          // goods_id: that.data.goods_id,
          // goods_num: that.data.goods_num,
          data: {
            address: {
              fullname: that.data.name,
              phone: that.data.phone,
              address: that.data.address
            },

            freight: {
              id: that.data.freight_id,
              freight_price: that.data.freight_price,
            },
            user_id: that.data.user_id,
          goods_id: that.data.goods_id,
          goods_num: that.data.goods_num,
          }
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(that.data.user_id)
          console.log(that.data.goods_id)
          console.log('zhifu0', res)
          wx.requestPayment({
            'timeStamp': res.data.wxpackage.timeStamp + '',
            'nonceStr': res.data.wxpackage.nonceStr,
            'package': res.data.wxpackage.package,
            'signType': 'MD5',
            'paySign': res.data.wxpackage.paySign,
            'success': function (res) { 
              //支付成功后，跳转到全部订单列表
              wx.redirectTo({
                url: '/pages/order-list/order-list?state=0'
              })
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'success',
                image: '',
                duration: 1200,
                mask: true,
              })
             },
          })
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }
    that.setData({
      user_id: that.data.user_id
    })
    that.setData({
      way: options.way,
      cart_id: options.cart_id,
      goods_id: options.goods_id,
      goods_num: options.goods_num
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
    if (that.data.way == 0) {   //产品详情过来的
      wx.request({
        url: web_url + '/app.php?c=Order&act=confirm',
        data: {
          user_id: that.data.user_id,
          goods_id: that.data.goods_id,
          goods_num: that.data.goods_num
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log('产品详情', res)
          let address_id = res.data.address.id;
          let name = res.data.address.fullname;
          let phone = res.data.address.phone;
          let address = res.data.address.address;
          let noAddress = res.data.address.success;
          noAddress = !noAddress;
          that.setData({
            items: res.data.goodslist,
            noAddress: noAddress,
            address_id: address_id,
            name: name,
            phone: phone,
            address: address,
            freight: res.data.freights[0].freight_price,
            //以下数据用于提交支付，返回到订单列表
            freight_id: res.data.freights[0].id,
            freight_price: res.data.freights[0].freight_price,
          })
          that.getTotalPrice()
        },
      })
    } else if (that.data.way == 1) { //购物车过来的
      wx.request({
        url: web_url + '/app.php?c=Order&act=confirm',
        data: {
          user_id: that.data.user_id,
          cart_id: that.data.cart_id
        },
        header: { 'content-type': 'application/json' },
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log('购物车', res)
          let address_id = res.data.address.id;
          let name = res.data.address.fullname;
          let phone = res.data.address.phone;
          let address = res.data.address.address;
          let noAddress = res.data.address.success;
          noAddress = !noAddress;
          that.setData({
            items: res.data.goodslist,
            noAddress: noAddress,
            address_id: address_id,
            name: name,
            phone: phone,
            address: address,
            freight: res.data.freights[0].freight_price,
            //以下数据用于提交支付，返回到订单列表
            freight_id: res.data.freights[0].id,
            freight_price: res.data.freights[0].freight_price
          })
          that.getTotalPrice()
        },
      })
    }
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