const _function = require('../../../utils/functionData');
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
const app = getApp();
Page({
  data: {
    shop_quan_info: [],
    glo_is_load: true,
    this_quan_d_img: _DuoguanData.duoguan_host_api_url + '/temp_pic/shop/privilege.jpg'
  },
  onLoad: function (options) {
    var that = this;
    var qid = options.qid;
    // _function.getShopQuanInfo(qid,that.initgetShopQuanInfoData,that);
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/getShopQuanInfo.html',
      { qid: qid },
      (data) => {
        that.initgetShopQuanInfoData(data)
      }, this, { isShowLoading: false });
  },
  initgetShopQuanInfoData: function (data) {
    var that = this;
    that.setData({
      shop_quan_info: data,
      glo_is_load: false
    });
  },
  quan_lingqu_bind: function () {
    var that = this;
    wx.showToast({
      title: '领取中',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
    // _function.getShopQuanLingqu(wx.getStorageSync("utoken"),that.data.shop_quan_info.id,that.initgetShopQuanLingquData,that);
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/Api/ShopQuanLingqu.html',
      { qid: that.data.shop_quan_info.id },
      (data) => {
        that.initgetShopQuanLingquData(data)
      }, this, { isShowLoading: false });
  },
  initgetShopQuanLingquData: function (data) {
    var that = this;
    wx.hideToast();
    wx.showModal({
      title: '提示',
      content: data,
      showCancel: false
    });
  },
  onShareAppMessage: function () {
    var that = this
    return {
      title: that.data.shop_quan_info.q_name,
      desc: that.data.shop_quan_info.q_shuoming,
      path: '/pages/shop/mallquan/index?qid=' + that.data.shop_quan_info.id
    }
  }
});