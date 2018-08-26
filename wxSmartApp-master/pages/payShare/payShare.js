
import {
  goToUser, goToShare, goToNearbyDev, goToMapNav, goToReceiveDev, goToScaneCode,
  goToUserInfo, goToPayUseFee, goToShareDetail, reToMainPage
} from "../../libs/router";



import {
  scansaoma, gofujin, gofenxaing, getDeviceState
} from "../../libs/saoma";


let app = getApp();
let PATH = app.globalData.PATH;


let IMG_PATH = app.globalData.IMG_PATH;

let userInfoSync = wx.getStorageSync("userInfo");
let index = 1;

Page({

  data: {
    IMG_PATH: IMG_PATH,
   
    money: null,
    rental: null,
    payMoney: null,
    device: null,
    canPay: null
  },

  onLoad: function (options) {

    let that = this;

    this.setData({ money: options.money });
    this.setData({ reminShare: options.reminShare });
    this.setData({ canPay: false });
    console.log(this.data.money);

    wx.request({
      url: PATH + '/resource-service/device/getDeviceDetail',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        deviceId: options.deviceId,
      },
      success: function (data) {
        console.log(data)
        that.setData({ device: data.data.device });

        if (data.data.device.rentalType == 1) {
          that.setData({ rentalType: "小时" });
          that.setData({ rental: parseFloat(data.data.device.rentalH ) });
        }

        if (data.data.device.rentalType == 2) {
          that.setData({ rentalType: "日" });
          that.setData({ rental: parseFloat(data.data.device.rental ) });
        }

        if (data.data.device.rentalType == 3) {
          that.setData({ rentalType: "月" });
          that.setData({ rental: parseFloat(data.data.device.rentalM / 100.0) });
        }

      }

    });

  

  },

  // 去地图
  goToMap: function () {
    gofujin(app.globalData.location)
  },
  // 触电扫码
  scanCode: function () {
    let that = this;
    scansaoma(app.globalData.userId, goToReceiveDev, PATH)
  },
  // 我的
  goToUser: function () {
    goToUser();
  },
  // 分享
  goToShare: function () {
    let that = this;
    gofenxaing()

  },
  //首页
  homePage: function () {
    wx.redirectTo({
      url: '/pages/main/main',
    })
  },

  // 支付
  wechatPay: function () {

    console.log("开始支付押金");
    let that = this;

    if(!that.data.canPay){


    that.setData({ canPay: true });

    wx.request({
      url: PATH + "/resource-service/pay/payShare",
      data: {
        userId: app.globalData.userId,
        deviceNo: that.data.device.deviceNo,
        money: that.data.money
      },

      success: function (res) {
        console.log(res.data);
         
        if (res.data.status == 200) {
 
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
            
              wx.redirectTo({
                url: '../scaneCode/scaneCode?deviceNo=' + that.data.device.deviceNo,
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

    });
    }

    



  }

})




