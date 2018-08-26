import {
  goToUser, goToShare, goToNearbyDev, goToMapNav, goToReceiveDev, goToScaneCode,
  goToUserInfo, goToPayUseFee, goToShareDetail
} from "../../libs/router";


import {
  scansaoma, gofujin, gofenxaing, getDeviceState, RentDevice, changeDevice
} from "../../libs/saoma";


let app = getApp();
let PATH = app.globalData.PATH;
let IMG_PATH = app.globalData.IMG_PATH;


Page({

  /**
   * 页面的初始数据
   */

  data: {
    items: [
      { name: '10', value: '10' },
      { name: '50', value: '50', checked: 'true' },
      { name: '100', value: '100' },
      { name: '500', value: '500' },
      { name: '1000', value: '1000' },
      { name: '2000', value: '2000' },
    ],
    IMG_PATH: IMG_PATH,
    canPay: null

  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    let that = this;

    that.setData({

      inputMoney: "off",
      inputMoneyTip: "手动输入充值金额"

    });

    wx.request({
      url: PATH + '/resource-service/device/getDeviceDetail',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        deviceId: options.deviceId,
  //      deviceId: '3',
      },
      success: function (data) {
        console.log(data)
        that.setData({ device: data.data.device });

        if (data.data.device.rentalType == 1) {
          that.setData({ rentalType: "小时" });
          that.setData({ rental: parseFloat(data.data.device.rentalH) });
        }

        if (data.data.device.rentalType == 2) {
          that.setData({ rentalType: "日" });
          that.setData({ rental: parseFloat(data.data.device.rental) });
        }

        if (data.data.device.rentalType == 3) {
          that.setData({ rentalType: "月" });
          that.setData({ rental: parseFloat(data.data.device.rentalM) });
        }

        that.setData({

          deviceNo: options.deviceNo,
          payMoney: (parseFloat(that.data.money) + parseFloat(500) + that.data.rental).toFixed(2),
          shareMoney: options.shareMoney,
          types:options.type

        });


      },

    });

    wx.request({
      url: PATH + '/resource-service/wallet/getWalletInfoByUserId',
      method: 'get',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        userId: app.globalData.userId
      },
      //post success
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            wallet: res.data.wallet
          });

        }
      }
    })
   

  },



  radioChange: function (e) {

    let that = this;
    console.log('选择要充值的金额为：', e.detail.value);
    this.setData({ choosePay: e.detail.value });
  },



  bindInputBlur: function (e) {
    this.setData({
      choosePay: e.detail.value
    });
  },

  bindPayMoney: function () {
    let that = this;
    pay(that.data.choosePay, that);

  },

  bindInputMoney: function () {
    if (this.data.inputMoney == 'off') {
      this.setData({
        inputMoney: 'on',
        inputFocus: true,
        inputMoneyTip: '选择固定金额'
      });
    } else {
      this.setData({
        inputMoney: 'off',
        inputFocus: false,
        inputMoneyTip: '手动输入充值金额',
        initMoney: null,
        choosePay: null
      });
    }
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
  }

})
  function pay(money, that) {



    if (!that.data.canPay) {

    wx.request({
      url: PATH + '/resource-service/pay/recharge',
      method: 'post',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        userId: app.globalData.userId,
        money: money
      },
      //post success
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          let payInfo = res.data.payInfo;
          wx.requestPayment({
            'timeStamp': payInfo.timeStamp,
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.payPackage,
            'signType': 'MD5',
            'paySign': payInfo.paySign,
            'success': function (res) {
              
              console.log("充值成功");
              console.log(that);

              if (that.data.types=="rental"){

                console.log("充值完的租电");
                RentDevice(app.globalData.userId, that.data.device.id, PATH);

              }

              //用户换电
              if (that.data.types == 'change') {
           
                console.log("充值完的换电");
                changeDevice(app.globalData.userId, that.data.device.id, PATH);
              
              }

              // getDeviceState(app.globalData.userId, that.data.device.deviceNo, PATH);
              
            },
            'fail': function (res) {
              console.log(res);
              that.setData({ canPay: false });
            }
          });

        }
      }
    })
    
    }

  }