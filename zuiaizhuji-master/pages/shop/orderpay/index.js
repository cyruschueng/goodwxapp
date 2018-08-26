// mallcart.js
var _function = require('../../../utils/functionData');
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');
var app = getApp()
Page({
  data: {
    this_order_id: 0,
    oinfo: [],
    submitIsLoading: false,
    buttonIsDisabled: false,
    glo_is_load: true,
    cardinfo:[]
  },
  onLoad: function (options) {
    var that = this
    var order_id = options.order_id;
    that.setData({
      this_order_id: order_id,
    })
    //请求订单详情
    // _function.getOrderInfo(wx.getStorageSync("utoken"), that.data.this_order_id, that.initgetOrderInfoData, this)
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanShop/OrderApi/orderInfo.html", { oid: that.data.this_order_id}, (info) => {
      console.log(info)
      that.initgetOrderInfoData(info)
    }, this, {});
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/Card/CardApi/getMyCardInfo.html", {}, (info) => {
      that.setData({ cardinfo: info })
    }, that, {});


  },
  initgetOrderInfoData: function (data) {
    var that = this
      that.setData({
        oinfo: data,
        glo_is_load: false
      })
  },
  //开始支付
  pay_confirmOrder: function (e) {
    var that = this
    that.setData({
      buttonIsDisabled: true,
      submitIsLoading: true
    })
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/OrderApi/makePay.html', { oid: that.data.this_order_id, pay_name: e.detail.value.pay_name,formId:e.detail.formId }, (info) => {
      if (e.detail.value.pay_name == '0') {
        wx.requestPayment({
          'timeStamp': info.timeStamp,
          'nonceStr': info.nonceStr,
          'package': info.package,
          'signType': 'MD5',
          'paySign': info.paySign,
          'success': function (res) {

          },
          'fail': function (res) {

          },
          'complete': function () {
            that.setData({
              disabled: false
            })
            //支付完成 跳转订单列表
            wx.redirectTo({
              url: '../order/list/index'
            })
          }
        })
      } else if (e.detail.value.pay_name == '1') {
        if (info == '余额支付成功') {
          wx.navigateTo({
            url: '../pay-success/pay-success',
          });
        } else if (info == '余额不足') {
          that.setData({ buttonIsDisabled: false, submitIsLoading: false })
          wx.navigateTo({
            url: '/pages/user/mcard/recharge',
          });
        }
      } else if (e.detail.value.pay_name == '2') {
        if (info == '货到付款设置成功') {
          wx.navigateTo({
            url: '../pay-success/pay-success',
          });
        }
      }


    }, this, { isShowLoading: true, completeAfter:function(){
        that.setData({
          buttonIsDisabled: false,
          submitIsLoading: false
        })
    }});

    // if (that.data.oinfo.pay_name == '微信支付'){
    //   _function.makeOrderPayData(wx.getStorageSync("utoken"),that.data.this_order_id,that.initMakeOrderPayData,this)

    // }else if(that.data.oinfo.pay_name == '余额支付'){

    // }
  },
  // initMakeOrderPayData:function(data){
  //     var that = this
  //     that.setData({
  //         buttonIsDisabled: false,
  //         submitIsLoading:false
  //     })
  //     if(data.code == 1){
  //       wx.requestPayment({
  //         'timeStamp': data.info.timeStamp,
  //         'nonceStr': data.info.nonceStr,
  //         'package': data.info.package,
  //         'signType': 'MD5',
  //         'paySign': data.info.paySign,
  //         'success':function(res){

  //         },
  //         'fail':function(res){

  //         },
  //         'complete':function(){
  //             that.setData({
  //                 disabled: false
  //             })
  //             //支付完成 跳转订单列表
  //             wx.redirectTo({
  //                 url: '../order/list/index'
  //             })
  //         }
  //       })
  //     }else if(data.code == 2){
  //         wx.showToast({
  //             title: '登陆中',
  //             icon: 'loading',
  //             duration: 10000,
  //             success: function () {
  //                 app.getNewToken(function (token) {
  //                     wx.hideToast();
  //                     _function.getOrderInfo(wx.getStorageSync("utoken"), that.data.this_order_id, that.initgetOrderInfoData, that);
  //                 })
  //             }
  //         });
  //     }else if(data.code == 5){
  //         wx.showModal({
  //             title: '提示',
  //             content: data.info,
  //             showCancel:false
  //         })
  //         return false;
  //     }
  // }
})