// mallcart.js
var _function = require('../../../utils/functionData');
const app = getApp();
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
Page({
  data: {
    able_quan_list: [],
    disable_quan_list: [],
    glo_is_load: true,
    goods_id: 0,
    goods_number: 0,
    goods_attr: '',
    attr_str: '',
    all_price: 0
  },
  set_quan_bind: function (e) {
    var that = this
    var qid = e.currentTarget.id;
    wx.setStorageSync('quan_id', qid)
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    var that = this;
    if (options.goods_id != undefined) {
      that.setData({
        goods_id: options.goods_id,
        goods_number: options.goods_number,
        goods_attr: options.goods_attr,
        attr_str: options.attr_str,
        all_price: options.all_price
      });
    } else {
      that.setData({
        all_price: options.all_price
      })
    }
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/listUserQuan.html', { qtype: 0, all_price: that.data.all_price, version: 109 }, (info) => {
      if (info == null) {
        that.setData({
          able_quan_list: null,
          disable_quan_list: null,
          glo_is_load: false
        });
      } else {
        that.setData({
          able_quan_list: info.able_list,
          disable_quan_list: info.disable_list,
          glo_is_load: false
        });
      }

    }, {});

  }
})