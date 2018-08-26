// pages/followList/followList.js
import moment from "../../libs/moment"; // 引入moment插件
let app = getApp();
let userInfoSync = wx.getStorageSync("userInfo");
let PATH = app.globalData.PATH;


let IMG_PATH = app.globalData.IMG_PATH;



Page({
  /**
   * 页面的初始数据
   */
  data: {
    IMG_PATH: IMG_PATH,
    logType: 4
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: PATH + "/resource-service/wallet/getWalletLogByUserId", //https://api.didicharging.com
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "GET",
      data: {
        userId: app.globalData.userId,
        
      },
      success: function (res) {
        console.log(res);
        if (res.data.status == 200) {
          let arr1 = [], arr2 = [], arr3 = [], arr4 = [];
          for (let i = 0; i < res.data.result.data.length; i ++) {
            res.data.result.data[i].logDate = moment(res.data.result.data[i].logDate).format('YYYY-MM-DD HH:mm:ss');
        
            if (res.data.result.data[i].logType == 0) {
              arr1.push(res.data.result.data[i]);
              // break;
            }
            if (res.data.result.data[i].logType == 1) {
              arr2.push(res.data.result.data[i]);
              // break;
            }
            if (res.data.result.data[i].logType == 2) {
              arr3.push(res.data.result.data[i]);
              // break;
            }
            if (res.data.result.data[i].logType == 4) {
              arr4.push(res.data.result.data[i]);
            }
          }
          that.setData({
            arr1: arr1,
            arr2: arr2,
            arr3: arr3,
            arr4: arr4,
            walletList: arr4
          });
          console.log(that.data.walletList);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  bindChooseType: function (e) {
    this.setData({
      logType: e.currentTarget.dataset.type
    });
    console.log(e.currentTarget.dataset.type);

    if (e.currentTarget.dataset.type == 0) {
      this.setData({
        walletList: this.data.arr1
      });
      return;
    }
    
    if (e.currentTarget.dataset.type == 1) {
      this.setData({
        walletList: this.data.arr2
      });
      return;
    }

    if (e.currentTarget.dataset.type == 2) {
      this.setData({
        walletList: this.data.arr3
      });
      return;
    }
    
    if (e.currentTarget.dataset.type == 4) {
      this.setData({
        walletList: this.data.arr4
      });
    }
    
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

function loadingList(that) {
  
}

