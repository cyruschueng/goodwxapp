//malldetail.js
const _function = require('../../../utils/functionData');
const requestUtil = require('../../../utils/requestUtil');
const $ = require('../../../utils/underscore');
const _DuoguanData = require('../../../utils/data');
const WxParse = require('../../../wxParse/wxParse.js');
const util = require('../../../utils/util');
const app = getApp()
Page({
  data: {
    goods_info: [],
    goods_specification: [],
    wxParseData: '',
    shop_config: [],
    this_goods_id: 0,
    this_g_nav: 1,
    is_add_cart_view: false,
    is_buy_now_view: false,
    cart_default_number: 1,
    goods_attr_select: {},
    btn_add_cart_disabled: false,
    glo_is_load: true,
    indicatorDots: false,
    swiperCurrent: 0,
    scrollTop: 0,
    floorstatus: true,
    shop_attr_price: [],
    is_shop_vip: 0,
    //属性新增
    property_select:[],
    goods_property:{'shop_price':undefined,'vip_price':undefined,'g_img_url':'','sell_num':undefined,'last_num':undefined},
    show_property: true,
    property_num: null
  },
  showProperty: function () {
    if(this.data.show_property){
      this.setData({show_property:false})
    }else{
      this.setData({ show_property: true })
    }
  },
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  goHome: function (e) {
    wx.switchTab({
      url: '../mall/mall'
    })
  },
  fxgoods: function (e) {
    wx.navigateTo({
      url: '../share/share?sid=' + this.data.this_goods_id
    })
  },
  onLoad: function (options) {
    var that = this
    var post_id = options.sid;
    that.setData({
      this_goods_id: post_id
    });
    //加载用户信息
    requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, (data) => {
      if ($.has(data, 'is_shop_vip')) {
        that.setData({
          is_shop_vip: data.is_shop_vip
        })
      } else {
        that.setData({
          is_shop_vip: 0
        })
      }
    });
    //请求商品详情
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getGoodsInfo.html', { sid: post_id },
      (data) => {
        that.initGoodsInfoData(data)
      }, this, { isShowLoading: false });
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getConfig.html', {},
      (data) => {
        that.initshopConfigData(data)
      }, this, { isShowLoading: false });
  },
  initGoodsInfoData: function (data) {
    var that = this
    that.setData({
      goods_info: data,
      property_select: data.property
    })
    WxParse.wxParse('article', 'html', data.g_content, that, 0)
  },
  initshopConfigData: function (data) {
    this.setData({
      shop_config: data,
      glo_is_load: false
    })
  },
  goods_nav_bind: function (e) {
    var that = this
    var this_target = e.target.id;
    that.setData({
      this_g_nav: this_target
    })
  },
  //显示加入购物车
  bind_goods_add_cart: function () {
    var that = this
    that.setData({
      is_add_cart_view: true
    })
  },
  //显示立即购买
  bind_goods_buy_now: function () {
    var that = this
    that.setData({
      is_buy_now_view: true,

    })
  },
  //隐藏购物车
  add_cart_close_bind: function () {
    var that = this
    that.setData({
      is_add_cart_view: false,
      is_buy_now_view: false
    })
  },
  //减少数量
  bind_cart_number_jian: function () {
    var that = this
    var this_default_number = parseInt(that.data.cart_default_number)
    if (this_default_number > 1) {
      that.setData({
        cart_default_number: this_default_number - 1
      })
    } else {
      that.setData({
        cart_default_number: 1
      })
    }
  },
  //增加数量
  bind_cart_number_jia: function () {
    var that = this
    var this_default_number = parseInt(that.data.cart_default_number)
    that.setData({
      cart_default_number: this_default_number + 1
    })
  },
  //立即购买
  goods_buy_now: function (e) {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/buyNow', {
      goods_id: that.data.this_goods_id, goods_number: that.data.cart_default_number, goods_attr: JSON.stringify(that.data.property_select)
    }, (info) => {
      if (info) {
        wx.navigateTo({
          url: '../mallsure/mallsure?goods_id=' + info.goods_id + '&goods_number=' + info.goods_number + '&attr_str=' + info.attr_str + '&goods_attr=' + info.goods_attr
        })
      } else {
        return false
      }
    }, this, { isShowLoading: true });
  },
  //加入购物车
  goods_add_cart: function () {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/addGoodsCart.html',
      { goods_id: that.data.this_goods_id, goods_number: that.data.cart_default_number, goods_attr: JSON.stringify(that.data.property_select) },
      (data) => {
        console.log('addcart',data)
        that.initAddCartData(data)
      }, this, { isShowLoading: true });
  },
  initAddCartData: function (data) {
    var that = this;
    wx.hideToast();
    that.setData({
      btn_add_cart_disabled: false,
      is_add_cart_view: false
    });
    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 2000,
      mask: true,
    });
  },
  //联系客服
  bind_contant_kefu: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: that.data.shop_config.kefu_contant
    })
  },
  //进入购物车
  bind_go_cart: function () {
    wx.redirectTo({
      url: '../mallcart/mallcart'
    })
  },
  set_close: function () {
    this.setData({
      is_add_cart_view: false,
      is_buy_now_view: false,
    })
  },
  change_cart_number: function (e) {
    var that = this
    that.setData({ cart_default_number: e.detail.value })
  },
  //属性选择
  select_attr_bind:function(e){
    var select = e.currentTarget.dataset
    // 控制标签选中样式
    this.data.property_select[select.index].item = select.key
    this.setData({ property_select: this.data.property_select })
    // 控制商品信息显示
    var num
    if (this.data.property_select.length == 4){
      num=this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length, this.data.property_select[1].item, this.data.goods_info.property[1].item.length, this.data.property_select[2].item, this.data.goods_info.property[2].item.length, this.data.property_select[3].item, this.data.goods_info.property[3].item.length)    
    } else if (this.data.property_select.length == 3){
      num=this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length, this.data.property_select[1].item, this.data.goods_info.property[1].item.length, this.data.property_select[2].item, this.data.goods_info.property[2].item.length)
    } else if (this.data.property_select.length == 2) {
      num=this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length, this.data.property_select[1].item, this.data.goods_info.property[1].item.length)
    } else if (this.data.property_select.length == 1) {
      num=this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length)
    }
    //获取对应属性商品信息
    if (this.data.goods_info.propertydata[num] != undefined){
      this.data.goods_property.g_img_url = this.data.goods_info.propertydata[num].goods_img
      this.data.goods_property.sell_num = this.data.goods_info.propertydata[num].sell_num
      this.data.goods_property.last_num = this.data.goods_info.propertydata[num].last_num
      this.data.goods_property.shop_price = this.data.goods_info.propertydata[num].shop_price > 0 ? this.data.goods_info.propertydata[num].shop_price : this.data.goods_info.shop_price
      this.data.goods_property.vip_price = this.data.goods_info.propertydata[num].vip_price > 0 ? this.data.goods_info.propertydata[num].vip_price : this.data.goods_info.vip_price
      this.data.goods_property.promote_price = this.data.goods_info.propertydata[num].promote_price > 0 ? this.data.goods_info.propertydata[num].promote_price : this.data.goods_info.promote_price
      this.setData({ goods_property: this.data.goods_property,property_num : num })
    }
  },
  check_cart_number: function (e) {
    var value = e.detail.value
    var re = /^[0-9]+$/;
    if (!re.test(value) || value < 1) {
      return 1
    }
  },
  /*
  * x0 当前循环数
  * length0 当前循环长度
  * 0-3  内层循环到外层
  * 返回当前循环的次数
  * */
  num: function (x0, length0, x1, length1, x2, length2, x3, length3) {
    if (length3 > 0) {
      return x0 * length1 * length2 * length3 + x1 * length2 * length3 + x2 * length3 + x3
    } else if (length2 > 0) {
      return x0 * length1 * length2 + x1 * length2 + x2
    } else if (length1 > 0) {
      return x0 * length1 + x1
    } else if (length0 > 0) {
      return x0
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      this_page: 1
    })
    //请求商品详情
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getGoodsInfo.html',
      { sid: that.data.this_goods_id },
      (data) => {
        that.initGoodsInfoData(data)
      }, this, { isShowLoading: false });
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  //滚动加载
  indexscrolltolower: function () {
    var that = this
    that.setData({
      hasMore: true
    })
    var this_target = this.data.this_items
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/Weiba/Api/replyList.html',
      { pid: that.data.this_post_id, pagesize: that.data.this_page + 1, pagenum: that.data.pagesize },
      (data) => {
        that.initReplyLoadData(data)
      }, this, { isShowLoading: false });
  },
  initReplyLoadData: function (data) {
    var that = this
    if (data == null) {
      that.setData({
        is_scroll_y: false,
      })
    } else {
      if (data.length >= that.data.pagesize) {
        that.setData({
          is_scroll_y: true,
        })
      } else {
        that.setData({
          is_scroll_y: false,
        })
      }
      that.setData({
        reply_items: that.data.reply_items.concat(data),
        this_page: that.data.this_page + 1
      })
    }
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: that.data.goods_info.g_name,
      desc: '',
      path: '/pages/shop/malldetail/malldetail?sid=' + that.data.this_goods_id
    };
  },
})
