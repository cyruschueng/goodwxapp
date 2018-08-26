const app = getApp();
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
const _function = require('../../../utils/functionData');
Page({
  data: {
    goods_data: null,
    this_cate_id: 0,
    this_pinpai_id: 0,
    this_keywords: '',
    this_page_size: 1,
    this_page_num: 10,
    glo_is_load: true,
    list_type: true,
    select_type: '',
    select_jiage_type: '',
    is_select_jiage: false,
    is_loadmore: true,
    scrollTop: 0,
    floorstatus: false,
    son_cate:[],
    select_cate:0,
    //购买与加入购物车所需参数
    is_show_card: false,
    this_goods_id: 0,
    goods_info: [],
    goods_specification: [],
    goods_attr_select: {},
    shop_attr_price: [],
    cart_default_number: 1,
    btn_add_cart_disabled: false,
    //end
    //属性新增
    property_select: [],
    goods_property: { 'shop_price': undefined, 'vip_price': undefined, 'g_img_url': '', 'sell_num': undefined, 'last_num': undefined },
    show_property: true,
    property_num: null
  },
  //切换分类
  change_cate:function(e){
    this.setData({ select_cate:e.target.dataset.val})
    this.data.goods_data = null
    this.data.this_page_size = 1
    this.data.is_loadmore = true
    this.load_data()
  },
  //立即购买与加入购物车
  is_show_card: function (e) {
    var that = this
    if (that.data.is_show_card) {
      that.setData({ is_show_card: false })
    } else {
      //请求商品详情
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/DuoguanShopApi/getGoodsInfo.html',
        { sid: e.currentTarget.dataset.id },
        (data) => {
          that.initGoodsInfoData(data)
        }, this, { isShowLoading: false });
      that.setData({
        is_show_card: true,
        this_goods_id: e.currentTarget.dataset.id,
        cart_default_number: 1,
        property_num: null,
        btn_add_cart_disabled: false
      })
    }
  },
  initGoodsInfoData: function (data) {
    var that = this
    that.setData({
      goods_info: data,
      property_select: data.property,
      goods_specification: data.goods_specification
    })
  },
  change_cart_number: function (e) {
    var that = this
    that.setData({ cart_default_number: e.detail.value })
  },
  //属性选择
  select_attr_bind: function (e) {
    var select = e.currentTarget.dataset
    // 控制标签选中样式
    this.data.property_select[select.index].item = select.key
    this.setData({ property_select: this.data.property_select })
    // 控制商品信息显示
    var num
    if (this.data.property_select.length == 4) {
      num = this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length, this.data.property_select[1].item, this.data.goods_info.property[1].item.length, this.data.property_select[2].item, this.data.goods_info.property[2].item.length, this.data.property_select[3].item, this.data.goods_info.property[3].item.length)
    } else if (this.data.property_select.length == 3) {
      num = this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length, this.data.property_select[1].item, this.data.goods_info.property[1].item.length, this.data.property_select[2].item, this.data.goods_info.property[2].item.length)
    } else if (this.data.property_select.length == 2) {
      num = this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length, this.data.property_select[1].item, this.data.goods_info.property[1].item.length)
    } else if (this.data.property_select.length == 1) {
      num = this.num(this.data.property_select[0].item, this.data.goods_info.property[0].item.length)
    }
    //获取对应属性商品信息
    if (this.data.goods_info.propertydata[num] != undefined) {
      this.data.goods_property.g_img_url = this.data.goods_info.propertydata[num].goods_img
      this.data.goods_property.sell_num = this.data.goods_info.propertydata[num].sell_num
      this.data.goods_property.last_num = this.data.goods_info.propertydata[num].last_num
      this.data.goods_property.shop_price = this.data.goods_info.propertydata[num].shop_price > 0 ? this.data.goods_info.propertydata[num].shop_price : this.data.goods_info.shop_price
      this.data.goods_property.vip_price = this.data.goods_info.propertydata[num].vip_price > 0 ? this.data.goods_info.propertydata[num].vip_price : this.data.goods_info.vip_price
      this.data.goods_property.promote_price = this.data.goods_info.propertydata[num].promote_price > 0 ? this.data.goods_info.propertydata[num].promote_price : this.data.goods_info.promote_price
      this.setData({ goods_property: this.data.goods_property, property_num: num })
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
  //属性选择
  select_attr_bind_old: function (e) {
    var that = this
    var this_attr_id = e.currentTarget.id
    var this_attr_name = e.currentTarget.dataset.type
    var datas = that.data.goods_specification
    var this_spec_price = 0;
    var a_datas = that.data.goods_attr_select
    var g_datas = that.data.goods_info
    var shop_attr_price = that.data.shop_attr_price
    var this_shop_price = 0
    var all_shop_price = 0
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].name == this_attr_name) {
        a_datas[datas[i].name] = null
        for (var j = 0; j < datas[i].values.length; j++) {
          datas[i].values[j].ischeck = false
          if (datas[i].values[j].id == this_attr_id) {
            datas[i].values[j].ischeck = true
            a_datas[datas[i].name] = this_attr_id
            if (datas[i].values[j].format_price > 0) {
              this_shop_price = datas[i].values[j].format_price
            }
          }
        }
        shop_attr_price[i] = this_shop_price
        that.setData({
          shop_attr_price: shop_attr_price
        })
      }
      if (that.data.shop_attr_price[i]) {
        all_shop_price = that.data.shop_attr_price[i] * 1 + all_shop_price * 1
        all_shop_price = all_shop_price.toFixed(2);
      }
    }

    if (all_shop_price > 0) {
      g_datas.shop_price = all_shop_price
    }
    that.setData({
      goods_specification: datas,
      goods_attr_select: a_datas,
      goods_info: g_datas
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
  // 关闭购物车
  set_close: function () {
    this.setData({
      is_show_card: false,
    })
  },
  //立即购买
  goods_buy_now: function (e) {
    var that = this
    // var attr_str = that.data.goods_info.propertydata[that.data.property_num].attr_str
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
        console.log('addcart', data)
        that.initAddCartData(data)
      }, this, { isShowLoading: true });
  },
  initAddCartData: function (data) {
    var that = this;
    wx.hideToast();
    that.setData({
      btn_add_cart_disabled: false,
      is_show_card: false
    });
    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 2000,
      mask: true,
    });
    // wx.showModal({
    //   title: '提示',
    //   content: "添加购物车成功! 点确定进入下单页面,取消留在该页面",
    //   success: function (res) {
    //     if (res.confirm == true) {
    //       wx.switchTab({
    //         url: '../bcart/index',
    //         fail: function () {
    //           wx.redirectTo({
    //             url: '../bcart/index'
    //           })
    //         }
    //       })
    //     } else {
    //       that.setData({
    //         is_add_cart_view: false
    //       })
    //     }
    //   }
    // })
  },

  //end



  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  pay_scroll: function (e, res) {
    if (e.detail.scrollTop > 50) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  onLoad: function (options) {
    var that = this;
    var this_cate_id = options.cid ? options.cid : 0;
    var this_pinpai_id = options.pid ? options.pid : 0;
    var this_keywords = options.keywords;
    that.setData({ this_cate_id: this_cate_id, this_pinpai_id: this_pinpai_id, this_keywords: this_keywords, select_cate:this_cate_id });
    if (this_cate_id > 0){
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getCateSonList', { pid: this_cate_id }, (info) => {
        that.setData({ son_cate: info })
      });
    }
    
  },
  onShow: function () {
    this.load_data()
  },
  load_data:function(){
    var that = this;
    var requestData = {};
    requestData.cid = that.data.select_cate;
    requestData.ppid = that.data.this_pinpai_id;
    requestData.pagesize = 1;
    requestData.pagenum = that.data.this_page_num;
    requestData.keywords = that.data.this_keywords;
    requestData.stype = that.data.select_type;
    requestData.stype_jiage = that.data.select_jiage_type;
    if (that.data.goods_data == null) {
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getGoodsList', { searchData: requestData }, (info) => {
        if (info == null) {
          that.setData({ is_loadmore: false });
        } else {
          if (info.length < 10) {
            that.setData({ is_loadmore: false });
          }
        }
        that.setData({ goods_data: info, glo_is_load: false });

      }, this, { isShowLoading: false });
    }
  },
  onReachBottom: function (e) {
    var that = this;
    wx.showNavigationBarLoading();
    if (that.data.is_loadmore == false) {
      wx.hideNavigationBarLoading();
      return false;
    }
    var this_cate_id = that.data.select_cate;
    var searchData = {};
    searchData.cid = that.data.select_cate;
    searchData.ppid = that.data.this_pinpai_id;
    searchData.keywords = that.data.this_keywords;
    searchData.stype = that.data.select_type;
    searchData.stype_jiage = that.data.select_jiage_type;
    searchData.pagesize = that.data.this_page_size + 1;
    searchData.pagenum = that.data.this_page_num;
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getGoodsList', { searchData: searchData }, (info) => {
      wx.hideNavigationBarLoading();
      if (info == null) {
        that.setData({ is_loadmore: false });
      } else {
        if (info.length < 10) {
          that.setData({ is_loadmore: false });
        }
        that.setData({ goods_data: that.data.goods_data.concat(info), this_page_size: searchData.pagesize, glo_is_load: false });
      }

    }, this, { isShowLoading: false });
  },
  select_goods_list: function (e) {
    var that = this;
    var s_type = e.currentTarget.dataset.stype;
    that.setData({ select_jiage_type: '' });
    if (s_type == 'jiage') {
      if (that.data.is_select_jiage == true) {
        that.setData({ select_jiage_type: 'jiage_sheng', is_select_jiage: false });
      } else {
        that.setData({ select_jiage_type: 'jiage_jiang', is_select_jiage: true });
      }
    }
    that.setData({ select_type: s_type, this_page_size: 1, is_loadmore: true });
    that.onShow();
    var requestData = {};
    requestData.cid = that.data.select_cate;
    requestData.ppid = that.data.this_pinpai_id;
    requestData.pagesize = 1;
    requestData.pagenum = that.data.this_page_num;
    requestData.keywords = that.data.this_keywords;
    requestData.stype = that.data.select_type;
    requestData.stype_jiage = that.data.select_jiage_type;
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getGoodsList', { searchData: requestData }, (info) => {
      if (info == null) {
        that.setData({ is_loadmore: false });
      } else {
        if (info.length < 10) {
          that.setData({ is_loadmore: false });
        }
      }
      that.setData({ goods_data: info, glo_is_load: false });

    }, this, { isShowLoading: false });
  },
  toggle_list_type_bind: function () {
    var that = this;
    that.setData({ list_type: that.data.list_type == true ? false : true });
  },
  detail: function (e) {
    wx.navigateTo({
      url: '../malldetail/malldetail?sid=' + e.currentTarget.id
    })
  },
})