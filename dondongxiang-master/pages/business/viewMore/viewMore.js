// pages/cooperation/viewMore/viewMore.js
var app = getApp();
var MD5Util = require('../../../utils/md5.js');
var page = 1;
var requestUserList = function (ele, val) {
  var _this = this;
  wx.request({
    url: app.globalData.url + '/user/user/getUserList',
    method: 'get',
    data: {
      page: page,
      size: 10,
      search: val == undefined ? "" : val,
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.data.data.arr != 0) {
        console.log(res.data.data)
        var userlist = ele.data.userlist
        for (var i = 0; i < res.data.data.arr.length; i++) {
          userlist.push(res.data.data.arr[i]);
          ele.setData({
            userlist: userlist
          });
         }
        page++;
      } else {
        wx.showToast({
          title: '没有更多数据了',
          icon: 'success',
          duration: 1000
        })
        return false;
      }
    }
  })
}
Page({
  data: {
    userlist:[],
    search: "",
    alldata: true,
    pagenum: 1,
  },
  onLoad: function (options) {
    page = 1;
    requestUserList(this);
  },
  getueerdata:function(){
    var _this = this;
    wx.request({
      url: app.globalData.url +'/user/user/getUserList',
      data: {
        page: 1,
        size: 10,
        search:""
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          userlist:res.data.data.arr,
        })
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    requestShopList(this);
    console.log("上拉");
  },
  //广告充值入口
  pay: function (e) {
    console.log(e.currentTarget.dataset.id);
    var userid = app.globalData.user_id;
    var goods_info = [{ shop_id: 0, goods_id: e.currentTarget.dataset.id, sales_id: 0, goods_price: e.currentTarget.dataset.id, goods_num: 1 }];

    var total_fee = e.currentTarget.dataset.id;

    wx.request({
      url: app.globalData.url +'/pay/orders/orders/',
      method: 'POST',
      data: {
        user_id: userid,   /*购买用户ID*/
        goods_info: goods_info,   /*购物车产品详情数组*/
        total_fee: total_fee,
        is_shop_consume: 0,
        goods_type: 3
      },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        var sign = '';
        var resdata = res.data.data;
        var signA = "appId=" + "wxf13757beab3b800c" + "&nonceStr=" + res.data.data.nonce_str + "&package=prepay_id=" + res.data.data.prepay_id + "&signType=MD5&timeStamp=" + res.data.data.timestamp;
        var signB = signA + "&key=" + "15914378810jiang0gong13660865011";
        sign = MD5Util.hexMD5(signB).toUpperCase();
        wx.requestPayment({
          'timeStamp': resdata.timestamp,
          'nonceStr': resdata.nonce_str,
          'package': 'prepay_id=' + resdata.prepay_id,
          'signType': 'MD5',
          'paySign': sign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  detailsTap: function (e) {
    wx.navigateTo({
      url: '/pages/introduce/ddshow/ddshow?user_info=' + e.currentTarget.dataset.index + ''
    })
  },
  getsearch: function (e) {
    page = 1;
    this.setData({
      userlist: [],
    });
    requestUserList(this, e.detail.value);
  }
})