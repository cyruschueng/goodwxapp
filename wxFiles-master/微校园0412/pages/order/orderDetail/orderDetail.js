// pages/dingdan/dingdanxiangqing/dingdanxiangqing.js
var that;
var app = getApp();
Page({
  data: {
    id: 0,
    url:app.globalData.IP + 'controller/',
    storeImg: '../../../images/order/storeImg.png',
    only: '',
    store: '',
    canhefei: '',
    peisongfei: '',
    zongji: '',
    shifu: '',
    name: '',
    tel_number: '',
    address: '',
    bianhao: '',
    shijan: ' ',
    min: '45',
    shangpin: [
    ],
    psyid:0,
    fk: false,
    qrsh: false,
    tk: false,
    openStyle: false,
    dopay: false,
    pwdl: [false, false, false, false, false, false],
    pwd: '',
    psy:''
  },
  clickNum: function (e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    if (num == 'c') {
      this.setData({
        pwdl: [false, false, false, false, false, false],
        pwd: '',
      })
    } else if (num != '#') {
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
  closeStyle: function (e) {
    this.setData({
      openStyle: false,
    })
  },
  concelPay: function () {
    this.setData({
      dopay: false,
    })
    setTimeout(function () {
      wx.showToast({
        title: '订单未支付',
        duration: 800
      })
      wx.redirectTo({
        url: "/pages/order/orderDetail/orderDetail?value=0&id=" + that.data.oid
      });
    }, 800)

  },
  tijiaodingdan: function () {
      this.setData({
        openStyle: true
      })


  },
  choosePay: function (e) {
    var that = this
    this.setData({
      openStyle: false,
    })
    var style = e.currentTarget.dataset.id;
    if (style == "wo") {
      wx.request({
        url: app.globalData.IP + "wx/pay.do",
        data: {
          payment: 1001,
          id: that.data.id, 
          userid: app.globalData.ID
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          var price = parseFloat(res.data.total);
          var oid = res.data.oid;
          that.setData({ oid: oid })
          wx.request({
            url: app.globalData.IP + 'wx/mymsg.do',
            data: {
              userid: app.globalData.ID
            },
            success: function (res) {
              if (res.data.money > price) {
                console.log("可支付")
                that.setData({
                  dopay: true,
                });
              } else {
                console.log("不可支付")
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
              }
            }
          });
        }
      })


    } else if (style == "wx") {
      that.wxpay();
    }
  },
  wxpay: function () {
    var that = this

      wx.request({
        url: app.globalData.IP + "wx/pay.do",
        data: {
          payment: 1002,
          id: that.data.id,
          userid: app.globalData.ID
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          // success

          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
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

 
  },
  onLoad: function (options) {
    app.getWindow(this);
    var id = options.id;
    that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: app.globalData.IP + "wx/orderdetail.do",
      data: { id: id },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.hideLoading();
        if (res.data.shop.name != '快递代取') {
          for (var i = 0; i < res.data.ops.length; i++) {
            var item = { caiming: res.data.ops[i].product.name, shuliang: res.data.ops[i].count, jiage: res.data.ops[i].total };
            that.data.shangpin.push(item);
          }

        } else {
          var msg = res.data.bz.split("*");
          var item = { caiming: msg[2], shuliang: '1', jiage: '' };
          that.data.shangpin.push(item);
        }
        // success
        var bz = res.data.bz.split("*");


        if(wx.canIUse("setNavigationBarColor")){
          if (res.data.paystatus == '配送中') {
            wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#80a8cc',
            })
          } else if (res.data.paystatus == '待付款') {
            wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#fc7736',
            })
          } else if (res.data.paystatus == '待接手') {
            wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#fa6374',
            })
          } else if (res.data.paystatus == '完成'){
            wx.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#47c9af',
            })
          }
        }
       
        
        
        that.setData({
          psy:res.data.psy,
          psyid:res.data.psyid,
          info:res.data,
          store: res.data.shop.name,
          canhefei: res.data.boxprice,
          peisongfei: res.data.sendprice,
          zongji: res.data.totalprice,
          shifu: res.data.totalprice,
          name: res.data.addressname,
          tel_number: res.data.addressphone,
          address: res.data.addressdetail,
          shijan: res.data.time,
          shangpin: that.data.shangpin,
          bianhao: res.data.ordernumber,
          id: res.data.id,
          bz: bz[0]
        })
        if (res.data.paystatus == '待付款') {
          that.setData({
            fk: true
          })
        }
        if (res.data.paystatus == '配送中') {
          that.setData({
            qrsh: true
          })
        }
        if (res.data.paystatus == '完成') {
          that.setData({
            tk: res.data.tk
          })
        }
      },
    })

    this.setData({
      id: id
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    app.run("进入订单详情界面");
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },

  pay: function () {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/pay.do',
      data: { id: that.data.id, userid: app.globalData.ID },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.requestPayment({
          timeStamp: res.data.time,
          nonceStr: res.data.nonceStr,
          package: 'prepay_id=' + res.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.paySign,
          success: function (res) {
            // success
            wx.request({
              url: app.globalData.IP + "wx/paysuccess.do",
              data: { id: that.data.id },
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              // header: {}, // 设置请求的 header
              success: function (res) {
                wx.redirectTo({
                  url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.id
                })
              },
            })
          },

        })
      },
    })
  },
  qrsh: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.psy.phone,
    })
  },
  tk: function () {
    var that = this;
    wx.request({
      url: app.globalData.IP + 'wx/tk.do',
      data: { id: that.data.id },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        wx.redirectTo({
          url: "/pages/order/orderDetail/orderDetail?value=1&id=" + that.data.id
        })
      },
    })
  },
  map: function () {
    var that = this;
    wx.navigateTo({
      url: '/pages/order/map?psyid='+that.data.psyid,
    })
  }
})