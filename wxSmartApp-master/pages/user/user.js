import { goToUser, goToShare, goToMyWallet, goToUserInfo, goToMyDevice, goToFollowList, goToFansList, goToPhoneTest, goToReceiveDev} from "../../libs/router";
import {
  scansaoma, gofujin, gofenxaing
} from "../../libs/saoma";
let app = getApp();
let PATH = app.globalData.PATH;



let IMG_PATH = app.globalData.IMG_PATH;


let userInfoSync = wx.getStorageSync("userInfo");
Page({

  data: {
    IMG_PATH: IMG_PATH,
  },

  onLoad: function (option) {
    console.log(option);
    if(option.page=='device'){
      wx.navigateTo({
        url: '../myDevice/myDevice',
      })
    }

  },
   
  onShow: function () {
    let that = this;
    wx.request({
      url: PATH + "/account-service/user/getUserInfoById",
      header: {
        'Access-Token': app.globalData.accessToken,
      },

      method: "GET",
      
      data: {
        id: app.globalData.userId
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 200) {
          that.setData({
            userInfo: res.data.user
          })
        }
      },
    });
  },
  goToNewPage: function (e) {
    // console.log(e);
    let pageName = e.currentTarget.dataset.page;
    if (pageName == 'userInfo') {
      goToUserInfo();
      return;
    }
    if (pageName == 'myDevice') {
      goToMyDevice();
      return;
    }
    if (pageName == 'myWallet') {
      goToMyWallet();
      return;
    }
    if (pageName == 'followList') {
      goToFollowList();
      return;
    } 
    if (pageName == 'fansList') {
      goToFansList();
      return;
    } 
    if (pageName == 'myCode') {
        wx.navigateTo({
            url: '../user/myCode/myCode',
        })
        return;
    }
    wx.showToast({
      title: '功能暂未开放',
      icon: 'loading',
      duration: 1500
    });
  },
  goToNotice: function () {
    wx.navigateTo({
      url: '../user/notice/notice?id=' + app.globalData.userId
    });
  },
  goToHistoryShare: function () {
    let that = this;
    wx.navigateTo({
      url: '../shareHistory/shareHistory?id=' + app.globalData.userId
    });
  },
  // 去地图
  goToMap: function () {
    gofujin(app.globalData.location)
  },
  // 触电扫码
  scanCode: function () {
    let that = this;
    scansaoma(app.globalData.userId, goToReceiveDev,PATH)
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
