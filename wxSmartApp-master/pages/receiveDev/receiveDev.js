import { reToMainPage } from "../../libs/router";
let app = getApp();
let PATH = app.globalData.PATH;


let IMG_PATH = app.globalData.IMG_PATH;

let userInfoSync = wx.getStorageSync("userInfo");
let index = 1;

Page({

  data: {
    IMG_PATH: IMG_PATH,

    items: [
      { name: '充值200元', value: 200 },
      { name: '充值500(送50)元', value: 500 },
      { name: '充值1000(送200)元', value: 1000},
      { name: '充值0元', value: 0, checked: 'true' }
      
    ],
    
    money :null,
    rental:null,
    payMoney:null,
    device:null,
    canPay:null
  },

  onLoad: function (options) {
    console.log("进入交押金页面");
    console.log(options);

    let that = this;

    this.setData({ money: options.money });
    this.setData({ canPay: false});
    console.log(this.data.money);
    
    wx.request({
      url: PATH + '/resource-service/device/getDeviceDetail',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
         deviceId: options.deviceId,
       // deviceId:"3",
      },
      success: function (data) {
        console.log(data)
        that.setData({ device: data.data.device });

        if (data.data.device.rentalType == 1) {
          that.setData({ rentalType: "小时" });
          that.setData({ rental: parseFloat(data.data.device.rentalH/100.0) });
        }

        if (data.data.device.rentalType == 2) {
          that.setData({ rentalType: "日" });
          that.setData({ rental: parseFloat(data.data.device.rental/100.0) });
        }

        if (data.data.device.rentalType == 3) {
          that.setData({ rentalType: "月" });
          that.setData({ rental: parseFloat(data.data.device.rentalM/100.0 )});
        }
        
        that.setData({

          deviceNo: options.deviceNo,
          payMoney: (parseFloat(that.data.money) + parseFloat(500) + that.data.rental).toFixed(2),
          shareMoney:options.shareMoney,

        });

      }

    });

  },

  // 支付
  wechatPay: function () {

    console.log("开始支付押金");
    let that = this;
    that.setData({ canPay: true });
    
    wx.request({
      url: PATH +"/resource-service/pay/payShare",
      data: {
         userId: app.globalData.userId,
  
        deviceNo: that.data.device.deviceNo,
        money:that.data.payMoney
      }, 

      success: function (res) {
        console.log(res.data);
        
        if (res.data.status == 200){
          
          var payInfo = res.data.payInfo; 
          wx.requestPayment({
            'timeStamp': payInfo.timeStamp,
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.payPackage,
            'signType': 'MD5',
            'paySign': payInfo.paySign,

            //扫码成功之后直接开始领取设备
            'success': function (res) {
              console.log("开始扫码逻辑");
              console.log(res);

              wx.request({
                url: PATH + '/resource-service/device/reciveDevice',
                method: 'GET',
                header: {
                  'Access-Token': app.globalData.accessToken,
                },
                data: {
                  userId: app.globalData.userId,
                  deviceId: that.data.device.id,
                },
                success: function (data) {
                  console.log(data)
                  let device = data.data.device;

          
                    wx.showToast({
                      title: data.data.message,
                      icon: 'loading',
                      duration: 3000,
                      success: function () {
                        setTimeout(function () {
                          reToMainPage();
                        }, 3000)
                      }
                    })
                 

                }
              });

            },

            'fail': function (res) {
              that.setData({ canPay: false });
              console.log(res);
            }
          })
        }
      },

      fail: function (res) {
        console.log(res);
       
      }

    })

  },

  radioChange: function(e) {

    let that = this;    
    console.log('选择要充值的金额为：', e.detail.value);
    this.setData({ payMoney: (parseFloat(that.data.money) + parseFloat(e.detail.value) + parseFloat(that.data.rental)).toFixed(2) });
  }

})




