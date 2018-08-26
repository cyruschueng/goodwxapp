import { reToMainPage } from "../../libs/router";
let app = getApp();
let PATH = app.globalData.PATH;



let IMG_PATH = app.globalData.IMG_PATH;

let userInfoSync = wx.getStorageSync("userInfo");

Page({


  data: {
    IMG_PATH: IMG_PATH,
    isManager: 'false',
    device: null,
  },

  onLoad: function (options) {

    let that = this;

    that.setData({ isManager: options.isManager });

    console.log("options: " + options.deviceId);

    wx.request({
      url: PATH + '/resource-service/device/getDeviceDetail',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        deviceId: options.deviceId
      },
      success: function (data) {
        that.setData({ device: data.data.device });
      }

    })

  },

  reciveDevice: function () {
    let that = this;

    wx.showModal({
      title: "提示",
      content: "您将领取该设备，成为该设备的管理员",
      showCancel: true,
      success: function (res) {

        if (res.confirm) {
          console.log('用户点击确定')

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
              
              wx.showModal({
                title: '提示',
                content: data.data.message,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: 'pages/main/main',
                    })
                  }
                }
              })


             

            }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
          reToMainPage();
        }
      }
    })

  },



  buyStart: function () {
    wx.request({
      url: PATH + '/resource-service/device/buyStart',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        userId: app.globalData.userId,
        deviceId: this.data.device.id,
      },
      success: function (data) {
        console.log(data)

        wx.showModal({
          title: '提示',
          content: data.data.message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: 'pages/main/mian',
              })
            }
          }
        })

      }
    })
  },

  startService: function () {
    wx.request({
      url: PATH + '/resource-service/device/startService',
      method: 'GET',
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      data: {
        userId: app.globalData.userId,
        deviceId: this.data.device.id,
      },
      success: function (data) {
        console.log(data)
        wx.showModal({
          title: '提示',
          content: data.data.message,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        })

      }
    })
  }

})

