const app = getApp();
import requestUtil from '../../../utils/requestUtil';
import _DuoguanData from '../../../utils/data';
import _function from '../../../utils/functionData';
import util from '../../../utils/util';
import dg from '../../../utils/dg';
import plugUtil from '../../../utils/plugUtil';

Page({
  data: {
    shareopenid:'',
    userInfo:'',
    swiper_data:[],
    index_data:[],
    glo_is_load:true,
    shareInfo:'',
    page:1,
    load_more:true,
    text: '',
    is_show_notice:false,
    index_set:[],
    address:"北京市...",
//购买与加入购物车所需参数
    is_show_card: false,
    this_goods_id:0,
    goods_info: [],
    goods_specification: [],
    goods_attr_select: {},
    shop_attr_price: [],
    cart_default_number: 1,
    btn_add_cart_disabled: false,
    //属性新增
    property_select: [],
    goods_property: { 'shop_price': undefined, 'vip_price': undefined, 'g_img_url': '', 'sell_num': undefined, 'last_num': undefined },
    show_property: true,
    property_num: null
  },
  //location
  location:function(){
    var that= this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          address: res.address
        })
      },
      fail:function(res){
        console.log(1)
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              wx.openSetting({
                success: (res) => {
                  console.log(res)
                }
              })
            }
          }
        })
      }
    })
  },
  //立即购买与加入购物车
  is_show_card:function(e){
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
      that.setData({ is_show_card: true, 
                     this_goods_id: e.currentTarget.dataset.id,
                     cart_default_number: 1,
                     property_num:null,
                     btn_add_cart_disabled: false
                    })
    }
  },
  initGoodsInfoData: function (data) {
    var that = this
    console.log(data)
    that.setData({
      goods_info: data,
      property_select: data.property,
      goods_specification: data.goods_specification
    })
  },
  change_cart_number: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({ cart_default_number: e.detail.value })
  },
  // 关闭购物车
  set_close: function () {
    this.setData({
      is_show_card: false,
    })
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
      is_show_card:false
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
  is_show_notice:function(){
    var that = this 
    if(that.data.is_show_notice){
      that.setData({is_show_notice:false})
    }else{
      that.setData({ is_show_notice: true })
    }
  },
  detail: function (e) {
      wx.navigateTo({
          url: '../malldetail/malldetail?sid=' + e.currentTarget.id
      })
  },
  mall_list_bind:function(e){
      wx.navigateTo({
          url: '../malllist/malllist?cid=' + e.currentTarget.id
      })
  },
  mall_list_bind2: function (e) {
    wx.navigateTo({
      url: '../malllist/malllist?pid=' + e.currentTarget.id
    })
  },
  goods_search_bind: function (e) {
    if (e.type == "confirm") {
      var s_key = e.detail.value;
    } else {
      var s_key = e.detail.value['k-word'];
    }
    wx.navigateTo({
      url: '../malllist/malllist?keywords=' + s_key
    });
  },
  shop_ad_bind: function (e) {
    var that = this;
    if (e.currentTarget.dataset.url == ''){
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },
  swiper_top_bind:function(e){
      var that = this;
      wx.navigateTo({
          url: e.currentTarget.dataset.url
      });
  },
  shop_saoma_bind:function(){
      wx.scanCode({
          success: (res) => {
          }
      });
  },
  //读取首页数据
  onLoad: function (options){
    plugUtil.popup(this,'DuoguanShop');
    var that = this
    var scene = decodeURIComponent(options.scene)
    var sopenid = options.shareopenid;
    if (sopenid != undefined) {
      that.setData({
        shareopenid: sopenid
      });
      //加载用户信息
      requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, (data) => {
        that.setData({ userInfo: data });
        that.loaddata()
      });
    } else if (scene != 'undefined') {
      that.setData({
        shareopenid: scene
      });
      //加载用户信息
      requestUtil.get(_DuoguanData.duoguan_user_info_url, {}, (data) => {
        that.setData({ userInfo: data });
        that.loaddata()
      });
    }else{
      that.loaddata()
    }
   
    // wx.setNavigationBarTitle({
    //    title: "可以在这里设置首页标题",
    //  })
    
  },
  loaddata:function(){
    var that = this;
    console.log(that.data.userInfo.openId)
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getIndexDataList', { other_openid: that.data.shareopenid, user_openid: that.data.userInfo.openId, version:108}, (info) => {
      that.setData({ index_data: info, glo_is_load: false, text: info.public.shop_notice, load_more: true, page: 1,index_set:info.index_set});
      that.getShareInfo();
      if (that.data.index_data.public['is_position'] == 1) {
        var address_shop = wx.getStorageSync('address_shop')
        if (address_shop) {
          that.setData({
            address: address_shop
          });
        }else{
          wx.getLocation({
            type: 'wgs84', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
              var qqmapsdk = util.getMapSdk()
              qqmapsdk.reverseGeocoder({
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                success: (res) => {
                  that.setData({
                    address: res.result.address
                  });
                  wx.setStorageSync('address_shop', res.result.address)
                }
              });
            }
          })
        }
      }
    }, this, { isShowLoading: false });
  },
  onShow:function(){
    // 页面显示
    
  },

 

  go_quan_info_bind:function(e){
      var that = this;
      wx.navigateTo({
          url: '../mallquan/index?qid=' + e.currentTarget.id
      });
  },
  getShareInfo:function(){
      //获取分享信息
      requestUtil.get(_DuoguanData.duoguan_get_share_data_url, { mmodule: 'duoguanshop' }, (info) => {
          this.setData({ shareInfo:info});
      });
  },
  onShareAppMessage: function () {
      var that = this;
      return {
          title: that.data.shareInfo.title,
          desc: that.data.shareInfo.desc,
          path: 'pages/shop/mall/mall',
          success: () => {
            requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php/addon/MarketingLuckDraw/ApiShare/shareSetData", {}, (info) => {});
          }
      }
      
  },
  //下拉刷新
  onPullDownRefresh: function () {
    plugUtil.popup(this, 'DuoguanShop');
    this.loaddata()
      setTimeout(() => {
          wx.stopPullDownRefresh()
      }, 1000)
  },
  //进入购物车
  bind_go_cart: function () {
    wx.navigateTo({
      url: '../mallcart/mallcart'
    })
  },
  onReachBottom:function(){
    var that = this 
    if(that.data.load_more){
      that.data.page = that.data.page + 1
      requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getIndexGoodsList',{page:that.data.page},(data)=>{
        console.log(data)
        that.data.index_data['index_new_list'] = that.data.index_data['index_new_list'].concat(data)
        console.log(that.data.index_data)
        if (data == null){
          that.setData({
            load_more:false
          })
        }else{
          that.setData({
            index_data: that.data.index_data
          })
        }
      }, this, { isShowLoading: true })
    }
  }
})