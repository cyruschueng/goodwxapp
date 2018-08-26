// mallcart.js
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
var _function = require('../../../utils/functionData');
var app = getApp()
Page({
  data: {
    cart_list: [],
    all_g_number: 0,
    all_g_price: 0,
    all_g_yunfei: 0,
    this_check_val: [],
    all_is_checked: false,
    btn_mall_sure_disabled: false,
    glo_is_load: true,
    all_goods_price: 0,
    all_goods_number: 0
  },
  bind_go_home:function(){
    wx.switchTab({
      url: '/pages/shop/mall/mall'
    })
  },
  mallsure: function () {
    var that = this
    if (that.data.cart_list == null) {
      wx.showModal({
        title: '提示',
        content: '对不起,购物车暂无商品',
        showCancel: false
      })
      return
    }
    if (that.data.all_goods_number == 0) {
      wx.showModal({
        title: '提示',
        content: '对不起,请选择商品',
        showCancel: false
      })
      return
    }
    var cart_info = []
    for (var i = 0; i < that.data.cart_list.length; i++) {
      cart_info[i] = { 'goodid': '', 'goodstatus': '' }
      cart_info[i].goodid = that.data.cart_list[i].id
      if (that.data.this_check_val.indexOf(i) > -1 || that.data.this_check_val.indexOf(i + '') > -1) {
        cart_info[i].goodstatus = 1
      } else {
        cart_info[i].goodstatus = 0
      }
    }
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/setCartStatus.html', { cart_info: cart_info }, (info) => {
      if (info = '成功') {
        wx.navigateTo({
          url: '../mallsure/mallsure'
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '服务器开小差了,可以稍后再试哦',
          showCancel: false
        })
        return
      }
    }, {})
  },
  onShow: function (options) {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getCartList.html', { },
      (data) => {
        that.initgetCartListData(data)
      }, that, { isShowLoading: false });
  },
  initgetCartListData: function (data) {
    var that = this
    that.setData({
      cart_list: data,
      glo_is_load: false,
      all_goods_price: 0,
      all_goods_number: 0,
      all_is_checked: false,
      this_check_val: []
    })
  },
  //全选
  all_checkboxChange: function (e) {
    var that = this
    var datas = that.data.cart_list
    var isallcheck = false
    if (e.detail.value[0] == 1) {
      isallcheck = true
      var price=0
      var num=0 
      for (var i = 0; i < datas.length; i++) {
        price += datas[i].goods_info.price_info.price * datas[i].goods_number
        num += datas[i].goods_number*1
      }
      that.setData({
        all_goods_price: price.toFixed(2),
        all_goods_number: num
      })
    } else {
      isallcheck = false
      that.setData({
        all_goods_price: 0,
        all_goods_number: 0,
      })
    }
   
    var check_val = []
    for (var i = 0; i < datas.length; i++) {
      datas[i].is_checked = isallcheck
      if (isallcheck == true) {
        check_val[i] = i
      }
    }
    that.setData({
      cart_list: datas,
      this_check_val: check_val,
    })
  },
  //单选
  single_checkboxChange: function (e) {
    var that = this
    var price = 0
    var num = 0
    for (var i = 0; i < e.detail.value.length; i++) {
      price += that.data.cart_list[e.detail.value[i]].goods_number * that.data.cart_list[e.detail.value[i]].goods_info.price_info.price
      num += that.data.cart_list[e.detail.value[i]].goods_number * 1
    }
    that.setData({
      all_goods_price: price.toFixed(2),
      all_goods_number: num
    })
    var c_length = e.detail.value.length
    var g_length = that.data.cart_list.length
    if (c_length >= g_length) {
      that.setData({
        all_is_checked: true,
        this_check_val: e.detail.value,

      })
    } else {
      that.setData({
        all_is_checked: false,
        this_check_val: e.detail.value
      })
    }
  },
  change_price1: function (e) {
    var that = this
  },
  //减少数量
  bind_cart_number_jian: function (e) {
    var that = this
    var this_cart_id = e.currentTarget.id
    var datas = that.data.cart_list
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].id == this_cart_id) {
        if (datas[i].goods_number > 1) {
          datas[i].goods_number = parseInt(datas[i].goods_number) - 1
        } else {
          datas[i].goods_number = 1
        }
        //更新购物车数量
        requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/editCartList.html', { cid: this_cart_id, cnum: datas[i].goods_number,},
          (data) => {
            that.initeditCartListData(data)
          }, that, { isShowLoading: false });
      }
    }
    that.setData({
      all_goods_price: 0,
      all_goods_number: 0,
      all_is_checked: false,
      this_check_val: e.detail.value
    })
  },
  //增加数量
  bind_cart_number_jia: function (e) {
    var that = this
    var this_cart_id = e.currentTarget.id
    var datas = that.data.cart_list
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].id == this_cart_id) {
        datas[i].goods_number = parseInt(datas[i].goods_number) + 1
        //更新购物车数量
        requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/editCartList.html', { cid: this_cart_id, cnum: datas[i].goods_number, },
          (data) => {
            that.initeditCartListData(data)
          }, that, { isShowLoading: false });
      }
    }
    that.setData({
      all_goods_price: 0,
      all_goods_number: 0,
      all_is_checked: false,
      this_check_val: e.detail.value
    })
  },
  initeditCartListData: function (data) {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getCartList.html', {},
      (data) => {
        that.initgetCartListData(data)
      }, that, { isShowLoading: false });
  },
  //删除购物车
  bind_delete_cart: function () {
    var that = this
    if (that.data.all_goods_number == 0) {
      wx.showModal({
        title: '提示',
        content: '请选择要删除的商品',
        showCancel: false,
      })
      return false;
    }

    wx.showModal({
      title: '提示',
      content: "确认要删除已购商品吗?",
      success: function (res) {
        if (res.confirm == true) {
          var del_good_id = [];
          for (var i = 0; i < that.data.this_check_val.length; i++) {
            del_good_id[i] = that.data.cart_list[that.data.this_check_val[i]].id
          }
          requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/delCartList.html', { cid: del_good_id.toString()},
            (data) => {
              that.initdelCartListData(data)
            }, that, { isShowLoading: false });
        }
      }
    })
  },
  initdelCartListData: function (data) {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getCartList.html', {},
      (data) => {
        that.initgetCartListData(data)
      }, that, { isShowLoading: false });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getCartList.html', {},
      (data) => {
        that.initgetCartListData(data)
      }, that, { isShowLoading: false });
    that.setData({
      all_is_checked: false,
      all_goods_price: 0,
      all_goods_number: 0,
    })
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
})