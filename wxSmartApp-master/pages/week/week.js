import { goToUser, goToShare, goToMyWallet, goToWalletLog } from "../../libs/router";
import {
  payDebt
} from "../../libs/publiceFn";

let app = getApp();
let userInfoSync = wx.getStorageSync("userInfo");
let PATH = app.globalData.PATH;

Page({
  data: {
    video_data: []
  },
  onLoad: function (option) {
    let that = this;
    wx.request({
      url: PATH + "/resource-service/pay/getWeekOrder",
      header: {
        "Access-token": app.globalData.accessToken,
      },
      method: 'GET',
      success: function (res) {
        console.log("aaa");
        console.log(res.data.list)
        that.setData({ video_data: res.data.list })
      }
    })

  },
  bindChooseTypeone: function () {
    wx.navigateTo({
      url: '../performance/performance'
    })
  },
  bindChooseTypesherr: function () {
    wx.navigateTo({
      url: '../month/month'
    })
  },
})


