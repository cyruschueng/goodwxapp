var wxCharts = require('../../../utils/wxcharts.js');
var MD5Util = require('../../../utils/md5.js');
var app = getApp();
var lineChart = null;
Page({
    data: {
      allnumber:0,//市场冬瓜总量
      canbuynumber:0,//冬瓜可购买数量
      oneselfnumber:0,//个人存量
      buyprice:0,//价格
      buynumber:0,//购买数量
      totalprice:0,//购买的总价格
      putaway:0 //上架出售的数量
    },
    touchHandler: function (e) {
        console.log(lineChart.getCurrentDataIndex(e));
        lineChart.showToolTip(e, {
            // background: '#7cb5ec',
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data 
            }
        });
    },    
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 4; i++) {
            categories.push('2018-' + (i + 1));
            data.push(Math.random()*(20-10)+100);
        }
        // data[4] = null;
        return {
            categories: categories,
            data: data
        }
    },
    //获取输入价格
    buypriceInput: function (e) {
      this.setData({
        buyprice: e.detail.value
      })
    },
    //获取输入数量
    buynumberInput: function (e) {
      this.setData({
        buynumber: e.detail.value
      })
    },
    updateData: function () {
        this.RefreshCurrency();
        var simulationData = this.createSimulationData();
        var series = [{
            name: '实际成交',
            data: simulationData.data,
            format: function (val, name) {
                return val.toFixed(2) + '万';
            }
        }];
        lineChart.updateData({
            categories: simulationData.categories,
            series: series
        });
    },
    onLoad: function (e) {
      var that = this;
      that.RefreshCurrency();

        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        
        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: true,
            // background: '#f5f5f5',
            series: [{
                name: '实际成交价',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }, {
                name: '预估成交价',
                data: [100 + 2, 100 + 0, 100 + 0, 100 + 3],
                format: function (val, name) {
                    return val.toFixed(2) + '万';
                }
            }],
            xAxis: {
                disableGrid: true
            },
            yAxis: {
                title: '月平均成交金额 (积分)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    //更新市场可购买冬瓜数量等数值
    RefreshCurrency: function () {
      var that = this;
      wx.request({
        url: app.globalData.url + '/sxcurrency/Trade/renovate',
        method: 'POST',
        data: {
          id: app.globalData.user_id
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res);
          var resdata = res.data.data;
          // console.log("货币返回数据111" + typeof res.data.data);
          console.log("货币返回数据" + resdata[0].buy);

          that.setData({
            allnumber: resdata[0].buy,
            canbuynumber: resdata[0].buy,
            oneselfnumber: resdata[0].personal,
            putaway: resdata[0].shelves
          })
        }
      })
    },
    //根据价格查询可以购买冬瓜数量
    QueryCurrencyPrice :function(){
      var that = this;
      wx.request({
        url: app.globalData.url +'/sxcurrency/Trade/cx',
        method: 'POST',
        data: {
          id: app.globalData.user_id,
          price:that.data.price,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var resdata = res.data.data;
          console.log(res);
          that.setData({
            buynumber: resdata.a
          })
          
        }
      })
    },
    //下架接口
    SoldOutCurrency: function () {
      var that = this;
      if (that.data.buyprice == 0) {
        wx.showToast({
          title: '请输入价格',
          icon: 'success',
          duration: 2000
        })
      } else if (that.data.buynumber == 0) {
        wx.showToast({
          title: '请输入数量',
          icon: 'success',
          duration: 2000
        })
      } else {
      wx.request({
        url: app.globalData.url +'/sxcurrency/Trade/unsell',
        method: 'post',
        data: {
          id: app.globalData.user_id,
          price: that.data.buyprice,
          number: that.data.buynumber
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var resdata = res.data.data;
          console.log("货币返回数据" + res.data.data.a);
          that.setData({

          })
        }
      })
      }
    },
    //上架接口
    PutawayCurrency: function () {
      var that = this;
      if (that.data.buyprice == 0) {
        wx.showToast({
          title: '请输入价格',
          icon: 'success',
          duration: 2000
        })
      } else if (that.data.buynumber == 0) {
        wx.showToast({
          title: '请输入数量',
          icon: 'success',
          duration: 2000
        })
      } else {
      wx.request({
        url: app.globalData.url +'/sxcurrency/Trade/sell',
        method: 'post',
        data: {
          id: app.globalData.user_id,
          price: that.data.buyprice,
          number: that.data.buynumber
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var resdata = res.data.data;
          console.log("货币返回数据" + res.data.data.a);
          that.setData({

          })
        }
      })
      }
    },
    //购买冬瓜接口
    BuyCurrency: function (price,number) {
      var that = this;
      if (that.data.buyprice == 0) {
        wx.showToast({
          title: '请输入价格',
          icon: 'success',
          duration: 2000
        })
      } else if (that.data.buynumber == 0) {
        wx.showToast({
          title: '请输入数量',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.request({
          url: app.globalData.url + '/sxcurrency/Trade/buy',
          method: 'post',
          data: {
            id: app.globalData.user_id,
            price: price,
            number: that.data.buynumber
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var resdata = res.data.data;
            console.log("货币返回数据" + res.data.data.a);
            that.setData({

            })
          }
        })
      }
    },
    //冬瓜购买
    pay: function () {
      var that = this;
      if (this.data.buyprice== 0){
        wx.showToast({
          title: '请输入价格',
          icon: 'success',
          duration: 2000
        })
      } else if (this.data.buynumber == 0){
        wx.showToast({
          title: '请输入数量',
          icon: 'success',
          duration: 2000
        })
      } else{
      
      var userid = app.globalData.user_id;
      var goods_info = [{ shop_id: 0, goods_id: 1, sales_id: 0, goods_price: this.data.price, goods_num: this.data.buynumber }];
      var total_fee = this.data.price * this.data.buynumber;

      wx.request({
        url: app.globalData.url +'/pay/orders/orders/',
        method: 'POST',
        data: {
          user_id: userid,   /*购买用户ID*/
          goods_info: goods_info,   /*购物车产品详情数组*/
          total_fee: total_fee,
          is_shop_consume: 0,
          goods_type: 1
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
              BuyCurrency(this.data.price, this.data.buynumber);
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
      }
    }
  }
);