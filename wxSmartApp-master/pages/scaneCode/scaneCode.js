import {
  goToUser, goToShare, goToNearbyDev, goToMapNav, goToReceiveDev, goToScaneCode,
  goToUserInfo, goToPayUseFee, goToShareDetail
} from "../../libs/router";

import {
  scansaoma, gofujin, gofenxaing, getDeviceState, RentDevice, changeDevice
} from "../../libs/saoma";

import {
  payDebt
} from "../../libs/publiceFn";

let app = getApp();
let PATH = app.globalData.PATH;

let IMG_PATH = app.globalData.IMG_PATH;

let userInfoSync = wx.getStorageSync("userInfo");

Page({

  data: {
    IMG_PATH: IMG_PATH,
    device: null,
  },

  onLoad: function (options) {

    console.log(options);
    let that = this;

    wx.request({

      url: PATH + '/resource-service/device/scaneCode',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },

      data: {
        deviceNo: options.deviceNo,
        userId: app.globalData.userId,
      },

      success: function (data) {
        console.log(data)

        // 设置提示信息
        that.setData({ message: data.data.message });
        that.setData({ state: data.data.status});
 

        //集团用户 员工管理
        if (data.statusCode == 200 && data.data.status == 204) { 
          console.log("开始管理员工");
        }

        //错误提示
        if (data.statusCode == 200 && data.data.status == 210) {

          wx.showModal({
            title: '提示',
            content: '设备故障',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../main/main',
                })
              }
            }
          })

        }





        //押金不足直接跳
        if (data.statusCode == 200 && data.data.status == 213) {
          var money = data.data.money;

          wx.redirectTo({
            url: '../payShare/payShare?deviceId=' + data.data.device.id + '&money=' + data.data.money + "&reminShare=" + data.data.reminShare,
          })
        }

        that.setData({ device: data.data.device });

        if (data.data.device.rentalType == 1) {
          that.setData({ rentalType: "小时" });
          that.setData({ rental: data.data.device.rentalH });
        }

        if (data.data.device.rentalType == 2) {
          that.setData({ rentalType: "日" });
          that.setData({ rental: data.data.device.rental });
        }

        if (data.data.device.rentalType == 3) {
          that.setData({ rentalType: "月" });
          that.setData({ rental: data.data.device.rentalM });
        }

      }

    })

  },

  getDeviceState: function () {


    let that = this;

    console.log(that.data);

    //用户租用电池
    if (that.data.state == 201) {
      console.log("用户开始租用");
      RentDevice(app.globalData.userId, that.data.device.id, PATH);

    }

    //用户换电
    if (that.data.state == 202) {
      
      console.log("用户开始换电");
      changeDevice(app.globalData.userId, that.data.device.id, PATH);

    }

    //充电侠回收电池 库管入库
    if (that.data.state == 203 || that.data.state == 203 ) {
      console.log("回收电池");
      wx.request({
        url: PATH + '/resource-service/device/ReciveDevice',
        method: 'GET',
        header: {
          'Access-Token': app.globalData.accessToken,
        },
        data: {
          deviceId: that.data.device.id,
          userId: app.globalData.userId,
        },
        success: function (data) {


          if (data.statusCode == 200 && data.data.status == 210) {

            wx.showModal({
              title: '提示',
              content: data.data.message,
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../main/main',
                  })
                }
              }
            })

          }
          
          if (data.statusCode == 200 && data.data.status == 200) {
            wx.redirectTo({
              url: '../reciveSuccess/reciveSuccess',
            })

          }




        }
      })
    }

    //超级管理员重复领取可报废设备
    if (that.data.state == 209) {

      wx.request({
        url: PATH + '/resource-service/device/destroyDevice',
        method: 'GET',
        header: {
          'Access-Token': app.globalData.accessToken,
        },
        data: {
          deviceId: that.data.device.id,
          userId: app.globalData.userId,
        },
        success: function (data) {
  
          wx.redirectTo({
            url: '../main/main',
          })

        }
      }) 

    }

  //  //充电侠三次扫码 充电完成
  //   if (that.data.state == 221) {
  //     wx.request({
  //       url: PATH + '/resource-service/device/chargeFinish',
  //       method: 'GET',
  //       header: {
  //         'Access-Token': app.globalData.accessToken,
  //       },
  //       data: {
  //         deviceId: that.data.device.id,
  //         userId: app.globalData.userId,
  //       },
  //       success: function (data) {

  //         wx.showModal({
  //           title: '提示',
  //           content: data.data.message,
  //           showCancel: false,
  //           success: function (res) {
  //             if (res.confirm) {
  //               wx.redirectTo({
  //                 url: '../main/main',
  //               })
  //             }

  //           }
  //         })

  //       }
  //     })
  //   }

    //重复领取
    if (that.data.state == 206 ) {
     
      wx.showModal({
        title: '提示',
        content: '已领过了',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    }

    //成功领取
    if (that.data.state == 200){
     
      wx.redirectTo({
        url: '../reciveSuccess/reciveSuccess',
      })

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
