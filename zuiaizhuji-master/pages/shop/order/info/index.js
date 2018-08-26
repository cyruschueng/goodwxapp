// mallcart.js
const _function = require('../../../../utils/functionData');
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
const QR = require('../../../../utils/qrcode');
const app = getApp()
Page({
  data: {
    this_order_id: 0,
    oinfo: [],
    glo_is_load: true,
    version: '2.2.1'
  },
  //创建二维码
  createQrCode: function (code, canvasId) {
    //调用插件中的draw方法，绘制二维码图片
    QR.qrApi.init(code, canvasId, 0, 0, 160, 160);
  },
  //查看物流
  wuliu_info_bind: function () {
    var that = this;
    if (that.data.oinfo.express_code == '' || that.data.oinfo.express_code == null) {
      wx.showModal({
        title: '提示',
        content: '对不起，该订单暂无物流信息',
        showCancel: false
      });
      return false;
    } else {
      wx.navigateTo({
        url: '../../../shop/mallwuliu/index?oid=' + that.data.oinfo.id
      })
    }
  },
  onLoad: function (options) {
    var that = this
    var order_id = options.oid;
    that.setData({
      this_order_id: order_id,
    })
    //请求订单详情
    that.loaddata()
  },
  loaddata: function () {
    var that = this
    // _function.getOrderInfo(wx.getStorageSync("utoken"),that.data.this_order_id,that.initgetOrderInfoData,this)
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/orderInfo.html',
      { oid: that.data.this_order_id, version: that.data.version },
      (data) => {
        that.initgetOrderInfoData(data)
      }, this, { isShowLoading: false });
  },
  initgetOrderInfoData: function (data) {
    var that = this
    that.createQrCode(data.order_off_id, 'mycanvas');
    that.setData({
      oinfo: data,
      glo_is_load: false
    })
  },
  //支付
  order_go_pay_bind: function () {
    var order_id = this.data.this_order_id
    wx.redirectTo({
      url: '../../../shop/orderpay/index?order_id=' + order_id
    })
  },
  //评论
  order_go_comment_bind: function () {
    var order_id = this.data.this_order_id
    wx.redirectTo({
      url: '../comment/index?order_id=' + order_id
    })
  },
  //确认收货
  order_go_shouhuo_bind: function () {
    var that = this
    var order_id = this.data.this_order_id
    wx.showModal({
      title: '提示',
      content: "确认收货吗?",
      success: function (res) {
        if (res.confirm == true) {
          // _function.shouhuoOrderInfo(wx.getStorageSync("utoken"), order_id, that.initshouhuoOrderInfoData, this)
          requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/shouhuoUserOrder.html',
            { oid: order_id },
            (data) => {
              that.initshouhuoOrderInfoData(data)
            }, this, { isShowLoading: true });
        }
      }
    })
  },
  initshouhuoOrderInfoData: function (data) {
    var that = this
    // _function.getOrderInfo(wx.getStorageSync("utoken"), that.data.this_order_id, that.initgetOrderInfoData, this)
    that.loaddata()
  }
})