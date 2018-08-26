// pages/caidan/jiesuan/jiesuan.js
var util = require('../../../utils/util.js')

var app = getApp();
Page({
  data: {
    name: '请选择',
    tel: '',
    address: '收货地址',
    addressid: 0,
    ids: [],
    counts: [],
    arival_time: '40',
    dianming: '',
    canhefei: 0,
    peisongfei: 6,
    foodTotalPrice: 0,
    zongji: 0,
    shifu: 0,
    foodTotalPrice: 0,
    shangpin: [],
    bz: '',
    tj: 'tijiaodingdan',
    openStyle:false,
    dopay:false,
    url:app.globalData.IP+'controller/',
    head:'',
    pwdl:[false,false,false,false,false,false],
    pwd:'',
    fid:0
  },
  clickNum: function(e){
    var that = this;
    var num = e.currentTarget.dataset.num;
    if (num == 'c') {
      this.setData({
        pwdl: [false, false, false, false, false, false],
        pwd: '',
      })
    }else if(num != '#'){
      var pwd = this.data.pwd;
      var pwdl = this.data.pwdl;

      if (pwd.length < 6) {
        pwd += num;
      }

      for (var i = 0; i < pwd.length; i++) {
        pwdl[i] = true;
      }
      this.setData({
        pwd: pwd,
        pwdl: pwdl
      })
      if (pwd.length == 6) {
        this.setData({
          dopay: false,
        })
        wx.showToast({
          title: '支付中...',
          icon: 'loading',
          duration: 5000
        })
        wx.request({
          url: app.globalData.IP + 'wx/wojupay.do',
          data: {
            userid: app.globalData.ID,
            pass: pwd,
            oid: that.data.oid
          },
          success: function (res) {
            wx.hideToast();
            setTimeout(function () {

              if (res.data == 1) {
                wx.showToast({
                  title: '支付成功',
                  duration: 800
                })
                wx.redirectTo({
                  url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.oid
                });

              } else if (res.data == 2) {
                wx.showToast({
                  title: '密码错误',
                  image: '/images/60.png',
                  duration: 800
                })
                that.setData({
                  dopay: true,
                  pwd: '',
                  pwdl: [false, false, false, false, false, false]
                })
              } else if (res.data == 3) {
                wx.showModal({
                  title: '提示',
                  content: '余额不足',
                  cancelText: '取消支付',
                  confirmText: '微信支付',
                  success: function (res) {
                    if (res.confirm) {
                      that.wxpay();
                    } else {
                      setTimeout(function () {
                        wx.showToast({
                          title: '订单未支付',
                          image: '/images/60.png',
                          duration: 800
                        })
                        wx.redirectTo({
                          url: "/pages/order/orderDetail/orderDetail?value=0&id=" + that.data.oid
                        });
                      }, 800)
                    }
                  }
                })

              } else {
                wx.showToast({
                  title: '支付失败',
                  duration: 800
                })
                wx.redirectTo({
                  url: "/pages/order/orderDetail/orderDetail?value=0&id=" + that.data.oid
                });
              }
            }, 1000)
          }
        })
      }
    }
    
  },
  moreCusInfo: function () {
    wx.navigateTo({
      url: '/pages/mine/contactList/contactList?type=1',
    })
  },
  closeStyle:function(e){
    this.setData({
      openStyle: false,
    })
  },
  concelPay:function(){
    this.setData({
      dopay: false,
    })
    
  },
  choosePay: function (e){
    var that = this
    this.setData({
      openStyle: false,
    })
    var style = e.currentTarget.dataset.id;
    if (style == "wo"){
      wx.request({
        url: app.globalData.IP + "wx/order.do",
        data: {
          payment: 1001,
          ids: that.data.ids,
          counts: that.data.counts,
          userid: app.globalData.ID,
          sendprice: that.data.peisongfei,
          boxprice: that.data.canhefei,
          addressid: that.data.addressid,
          addressname: that.data.name,
          addressphone: that.data.tel,
          addressdetail: that.data.address,
          bz: that.data.bz,
          fid:that.data.fid
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success:function(res){
          var price = parseFloat(res.data.total);
          var oid = res.data.oid;
          that.setData({oid:oid})
          wx.request({
            url: app.globalData.IP + 'wx/mymsg.do',
            data: {
              userid: app.globalData.ID
            },
            success: function (res) {
              if(res.data.money > price){
                console.log("可支付")
                that.setData({
                  dopay: true,
                });
              }else{
                console.log("不可支付")
                wx.showModal({
                  title: '提示',
                  content: '余额不足',
                  cancelText:'取消支付',
                  confirmText:'前往充值',
                  success:function(res){
                    console.log(res)
                    if(res.confirm){
                      wx.navigateTo({
                        url: '/pages/recharge/recharge',
                      })
                    }else{
                      setTimeout(function () {
                        wx.showToast({
                          title: '订单未支付',
                          image:'/images/60.png',
                          duration: 800
                        })
                        wx.redirectTo({
                          url: "/pages/order/orderDetail/orderDetail?value=0&id=" + that.data.oid
                        });
                      }, 800)
                    }
                  }
                })
              }
            }
          });
        }
      })

      
    }else if(style == "wx"){
      that.wxpay();
    }
  },
  wxpay:function(){
    debugger
    var that = this
    if (that.data.tj == 'tijiaodingdan') {
      that.setData({
        tj: 'tijiaodingdan2'
      })
      wx.request({
        url: app.globalData.IP + "wx/order.do",
        data: {
          payment: 1002,
          ids: that.data.ids,
          counts: that.data.counts,
          userid: app.globalData.ID,
          sendprice: that.data.peisongfei,
          boxprice: that.data.canhefei,
          addressid: that.data.addressid,
          addressname: that.data.name,
          addressphone: that.data.tel,
          addressdetail: that.data.address,
          bz: that.data.bz,
          fid: that.data.fid
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          // success

          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.clearCart();
          that.data.oid = res.data.oid;
          wx.requestPayment({
            timeStamp: res.data.time,
            nonceStr: res.data.nonceStr,
            package: 'prepay_id=' + res.data.prepay_id,
            signType: 'MD5',
            paySign: res.data.paySign,
            success: function (res) {
              // success
              /*wx.request({
                url: app.globalData.IP + "wx/paysuccess.do",
                data: { id: that.data.oid },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                  wx.redirectTo({
                    url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.oid
                  })
                },
              })*/
              wx.redirectTo({
                url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.oid
              })
            },
            fail: function () {
              wx.redirectTo({
                url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.oid
              })
            }
          })
        },
      })

    }
  },
  tijiaodingdan: function () {
    
    var that = this;
    if (that.data.tel == '') {
      wx.showToast({
        title: '请选择地址',
        duration: 2000
      })
    } else {
      this.setData({
        openStyle: true
      })

    
    }

  },
  onLoad: function (options) {
    app.getWindow(this);
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    this.setData({ head: app.globalData.avatarUrl})
    var total = 0;
    var counts = options.counts.split(",");
    that.setData({
      ids: options.ids,
      counts: options.counts
    })
    wx.request({
      url: app.globalData.IP + "wx/orderj.do",
      data: { ids: options.ids },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        console.log(res)

        for (var i = 0; i < res.data.length; i++) {
          var item = { img:res.data[i].imagec.url,name: res.data[i].name, num: counts[i], oneTotalPrice: (counts[i] * res.data[i].price * res.data[i].discount).toFixed(1) };
          that.data.shangpin.push(item);
          total += item.oneTotalPrice * 1.0;
        }

        that.setData({
          shangpin: that.data.shangpin,
          zongji: (total * 1.0 + options.boxprice * 1.0 + options.psf * 1.0).toFixed(2),
          shifu: (total * 1.0 + options.boxprice * 1.0 + options.psf * 1.0).toFixed(2),
        });
      },
    })
    that.setData({
      canhefei: options.boxprice,
      arival_time: options.arrivetime,
      peisongfei: options.psf,
      dianming: options.shopname
    })
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    wx.request({
      url: app.globalData.IP + "wx/myorder.do",
      data: { id: app.globalData.ID },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            name: res.data[0].addressname,
            tel: res.data[0].addressphone,
            address: res.data[0].addressdetail,
            addressid: res.data[0].addressid,
            fid:res.data[0].address.fid
          })

        }
        wx.hideLoading();
      },
    })
  },


  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    app.run("进入结算界面");
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  getbz: function (e) {
    var that = this;
    that.data.bz = e.detail.value;
    console.log(that.data.bz);
  }
})