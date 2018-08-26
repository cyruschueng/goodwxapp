import {
  goToUser, goToShare, goToNearbyDev, goToMapNav, goToReceiveDev, goToScaneCode,
  goToUserInfo, goToPayUseFee, goToShareDetail
} from "../../libs/router";

let app = getApp();
let PATH = app.globalData.PATH;
let IMG_PATH = app.globalData.IMG_PATH;
//let time=5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IMG_PATH: IMG_PATH
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
      
    let timeInterval = setInterval(function () {
      // console.log(time);
        

        clearInterval(timeInterval);
        wx.redirectTo({
          url: '../user/user?page=device',
        })
    
    }, 5000);

      that.setData({
        timeInterval: timeInterval
      });
  },

  lookDevice:function(){
   
    let that=this;

    clearInterval(that.data.timeInterval);

      wx.redirectTo({
        url: '../user/user?page=device',
      })

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