// mallcart.js
var _function = require('../../../utils/functionData');
const app = getApp();
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
Page({
  data: {
    cart_list: [],
    all_g_number: 0,
    all_price: 0,
    all_g_price: 0,
    all_g_yunfei: 0,
    is_show_address: false,
    address_list: null,
    this_address_id: 0,
    this_address_info: '请选择',
    btn_submit_disabled: false,
    glo_is_load: true,
    quan_data: [],
    quan_dai_id: 0,
    quan_dai_jiner: 0,
    quan_dai_text: '使用代金券',
    wx_address_info: '',
    is_show_logistics: false,
    ship_address: '',
    right_price: 0,
    goods_id: 0,
    goods_number: 0,
    goods_attr: '',
    attr_str: '',
    cardinfo: [],
    name: '',
    phone: ''
  },
  choose_shipping_type: function (e) {
    this.setData({
      shipping_type: e.detail.value,
      all_g_yunfei: 0,
      right_price: (this.data.right_price - this.data.all_g_yunfei * (100 - this.data.cardinfo.level)/100).toFixed(2),
    })
    if (e.detail.value == '快递') {
      var value = false
      if (this.data.wx_address_info){
        value = this.data.wx_address_info
      }else{
        value = wx.getStorageSync('shop_wx_address_info')
      }
      if (value) {
        // Do something with return value
        this.setData({wx_address_info:value})
        requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getShippingFee.html', { data: value, all_price: this.data.all_price, id: this.data.goods_id, number: this.data.goods_number }, (info) => {
          this.setData({
            all_g_yunfei: info,
            right_price: ((((this.data.all_price) * 1) - this.data.quan_data.manjian_jiner * 1 - this.data.quan_dai_jiner * 1 + info * 1) * (100 - this.data.cardinfo.level_info.discount) / 100).toFixed(2),
          })
        }, {});
      }else{
        this.select_address_bind()
      } 
    }
  },
  go_select_dai_bind: function () {
    var that = this
    if (that.data.goods_id > 0) {
      wx.navigateTo({
        url: '../mallquanselect/index?goods_id=' + that.data.goods_id + '&goods_number=' + that.data.goods_number + '&goods_attr=' + that.data.goods_attr + '&all_price=' + that.data.all_price
      });
    } else {
      wx.navigateTo({
        url: '../mallquanselect/index?all_price=' + that.data.all_price
      });
    }
  },
  onLoad: function (options) {
    var that = this
    console.log(options)
    if (options.quan_id != undefined) {
      that.setData({
        quan_dai_id: options.quan_id
      });
    } else {
      wx.removeStorageSync('quan_id')
      that.setData({
        quan_dai_id: 0
      });
    }
    if (options.goods_id != undefined) {
      that.setData({
        goods_id: options.goods_id,
        goods_number: options.goods_number,
        goods_attr: options.goods_attr,
        attr_str: options.attr_str
      });
    }
    wx.getStorage({
      key: 'shop_name',
      success: function (res) {
        console.log(res)
        that.setData({ name: res.data })
      }
    })
    wx.getStorage({
      key: 'shop_phone',
      success: function (res) {
        that.setData({ phone: res.data })
      }
    })
  },
  onShow: function () {
    var that = this;
    if (wx.getStorageSync('quan_id')) {
      this.setData({
        quan_dai_id: wx.getStorageSync('quan_id')
      });
    }
    if (that.data.all_g_number == 0) {
      //请求订单信息
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getOrderInfo.html', { goods_id: that.data.goods_id, goods_number: that.data.goods_number, attr_str: that.data.attr_str, goods_attr: that.data.goods_attr }, (info) => {
        that.initgetCartListData(info)
      }, {});
    }
  },
  initgetCartListData: function (data) {
    var that = this
    data.manjian_jiner = parseFloat(data.manjian_jiner)
    that.setData({
      quan_data: data,
      cart_list: data.glist,
      all_g_number: data.all_g_number,
      all_g_price: (data.all_g_price * 1 + that.data.all_g_yunfei * 1).toFixed(2),
      all_price: data.all_g_price,
      ship_address: data.ship_address,
      right_price: (data.all_g_price - data.manjian_jiner - that.data.quan_dai_jiner).toFixed(2)
    });
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/getAddressList.html',
      {},
      (data) => {
        that.initgetAddressListData(data)
      }, this, { isShowLoading: false });
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/Card/CardApi/getMyCardInfo.html", {}, (info) => {
      that.setData({ cardinfo: info, right_price: (that.data.right_price * (100 - info.level_info.discount) / 100).toFixed(2) })
    }, that, {});
  },
  //提交订单
  order_formSubmit: function (e) {
    var that = this;
    if (e.detail.value.shipping_type == '到店取货') {
      if (e.detail.value.phone.search(/^([0-9]{11})?$/) == -1) {
        wx.showModal({ content: '请输入正确的手机号！', showCancel: false });
        return;
      }
    }


    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000,
      mask: true
    });
    that.setData({
      btn_submit_disabled: true
    });

    var order_info = e.detail.value;
    order_info.wx_address = that.data.wx_address_info;
    order_info.quan_id = that.data.quan_dai_id;
    order_info.manjian_id = that.data.quan_data.mianjian_id;
    order_info.form_id = e.detail.formId;
    order_info.version = '2.3.0'
    order_info.order_key = wx.getStorageSync("utoken") + '_' + that.data.cart_list[0].goods_id
    order_info.goods_id = that.data.goods_id
    order_info.goods_number = that.data.goods_number
    order_info.goods_attr = that.data.goods_attr
    order_info.attr_str = that.data.attr_str
    order_info.usecard = 1
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/postOrder.html',
      { oinfo: order_info },
      (data) => {
        wx.setStorage({ key: "shop_name", data: e.detail.value.name })
        wx.setStorage({ key: "shop_phone", data: e.detail.value.phone })
        wx.setStorage({ key: "shop_wx_address_info", data: that.data.wx_address_info })
        that.initorderPostData(data)
      }, this, {
        isShowLoading: false, complete: function () {
          that.setData({
            btn_submit_disabled: false
          });
        }
      });
  },
  initorderPostData: function (data) {
    var that = this;
    wx.hideToast();
    that.setData({
      btn_submit_disabled: false
    });
    //跳转支付
    var order_id = data;
    wx.redirectTo({
      url: '../orderpay/index?order_id=' + order_id
    })
  },
  //选择收货地址
  select_address_bind: function () {
    var that = this;
    if (!wx.chooseAddress) {
      that.setData({
        is_show_address: true
      })
      return false;
    }
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success() {
              // 用户已经同意小程序使用通讯地址
              wx.chooseAddress({
                success: function (res) {
                  that.setData({
                    wx_address_info: res
                  })
                  requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getShippingFee.html', { data: res, all_price: that.data.all_price, id: that.data.goods_id, number: that.data.goods_number }, (info) => {
                    that.setData({
                      all_g_yunfei: info,
                      right_price: ((((that.data.all_price) * 1) - that.data.quan_data.manjian_jiner * 1 - that.data.quan_dai_jiner * 1 + info * 1) * (100 - that.data.cardinfo.level_info.discount) / 100).toFixed(2),
                    })
                  }, {});

                }
              })
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '请授权微信用户地址',
                showCancel: false,
                success: function (res) {
                  wx.openSetting({
                    success: (res) => {

                    }
                  })
                }
              })
            }
          })
        } else {
          // 用户已经同意小程序使用通讯地址
          wx.chooseAddress({
            success: function (res) {
              that.setData({
                wx_address_info: res
              })
              requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getShippingFee.html', { data: res, all_price: that.data.all_price, id: that.data.goods_id, number: that.data.goods_number }, (info) => {
                that.setData({
                  all_g_yunfei: info,
                  right_price: ((((that.data.all_price) * 1) - that.data.quan_data.manjian_jiner * 1 - that.data.quan_dai_jiner * 1 + info * 1) * (100 - that.data.cardinfo.level_info.discount) / 100).toFixed(2),
                })
              }, {});
            }
          })
        }
      }
    })
  },
  initgetAddressListData: function (data) {
    var that = this
    that.setData({
      address_list: data
    });
    if (data != null) {
      var datas = data;
      var address_str = '请选择收货地址';
      for (var i = 0; i < datas.length; i++) {
        if (datas[i].id == that.data.this_address_id) {
          datas[i].is_check = 'active';
        } else {
          datas[i].is_check = ''
        }
      }
      that.setData({
        address_list: datas
      });
    }
    //读取单个优惠券
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getOneQuanInfo.html', { quan_id: that.data.quan_dai_id, all_price: that.data.all_price, version: 108 }, (info) => {
      if (info == null) {
        that.setData({
          quan_dai_text: '使用代金券',
          quan_dai_jiner: 0,
          quan_dai_di: 0,
          right_price: ((that.data.all_g_price - that.data.quan_data.manjian_jiner - 0) * (100 - that.data.cardinfo.level_info.discount) / 100).toFixed(2)
        });
      } else {
        info.quan_jiner = parseFloat(info.quan_jiner);
        that.setData({
          quan_dai_text: info.quan_name,
          quan_dai_jiner: info.quan_jiner,
          right_price: ((that.data.all_g_price - that.data.quan_data.manjian_jiner - info.quan_jiner) * (100 - that.data.cardinfo.level_info.discount) / 100).toFixed(2)
        });
      }
      that.setData({
        glo_is_load: false
      })
    }, {});
  },
  //确认选择地址
  chose_address_bind: function (e) {
    var that = this;
    var aid = e.currentTarget.id
    that.setData({
      this_address_id: aid
    })
    var datas = that.data.address_list;
    var address_str = '';
    var this_wx_address_info = {};
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].id == aid) {
        datas[i].is_check = 'active';
        this_wx_address_info.userName = datas[i].consignee;
        this_wx_address_info.telNumber = datas[i].mobile;
        this_wx_address_info.provinceName = datas[i].province;
        this_wx_address_info.cityName = datas[i].city;
        this_wx_address_info.countyName = datas[i].district;
        this_wx_address_info.detailInfo = datas[i].address;
      } else {
        datas[i].is_check = ''
      }
    }
    that.setData({
      address_list: datas,
      wx_address_info: this_wx_address_info
    })
    that.select_address_close_bind()
  },
  //关闭收货地址
  select_address_close_bind: function () {
    var that = this
    that.setData({
      is_show_address: false
    })
  },
  //添加收货地址
  index_item_bind: function () {
    wx.navigateTo({
      url: '../../user/shop/address_add/index'
    })
  }
})