import { goToUser, goToShare, goToMyWallet, goToUserInfo, goToMyDevice } from "../../libs/router";
import moment from "../../libs/moment"; // 引入moment插件
let app = getApp();
let PATH = app.globalData.PATH;

let IMG_PATH = app.globalData.IMG_PATH;
let userInfoSync = wx.getStorageSync("userInfo");


Page({

  data: {
    IMG_PATH: IMG_PATH,
    scrollHeight: "100%",

  },

  onLoad: function (option) {
    let that = this;
    getInUserList(that);

  },



  bindgetInUserList: function () {
    getInUserList(this);
  },

  goToDevInfo: function (e) {

    let phone = e.currentTarget.dataset.phone;
    console.log(phone);

    wx.showModal({
      title: '提示',
      content: '联系充电侠',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: phone
          });

        }
      }
    })     

  }
})

function getInUserList(e) {
  let local = app.globalData.location;
  let that = e;

  wx.request({
    url: PATH + '/resource-service/map/nearbyStation',
    method: 'get',
    header: {
      'Access-Token': app.globalData.accessToken,
    },

    data: {

      userId: app.globalData.userId,
      longitude: local.longitude,
      latitude: local.latitude

    },

    success: function (res) {
      console.log(res);
      console.log("查找成功");
      if (res.statusCode == 200 && res.data.status == 200) {
        that.setData({
          devList: res.data.list
        });
      }

    }
  });


}


