import { goToShareDetail } from "../../libs/router";
//获取应用实例
// pages/shareHistory/shareHistory.js
let windowWidth = wx.getStorageSync("windowWidth");
let imgWidth = windowWidth * 0.48;
let num = 0;
let imgArr = [];
let col1H = 0;
let col2H = 0;
let arr1 = [];
let arr2 = [];

let app = getApp();
let PATH = app.globalData.PATH;

let IMG_PATH = app.globalData.IMG_PATH;


let userInfoSync = wx.getStorageSync("userInfo");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    IMG_PATH: IMG_PATH,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let that = this;
    that.setData({
      userId: options.id
    });
    getHistoryList(that);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  // 私信
  bindToLetter: function () {
    let that = this;
    if (that.data.userId == app.globalData.userId) {
      tipModal("不能私信自己");
      return;
    }
    wx.navigateTo({
      url: '../user/letter/letter?id=' + that.data.userId + '&nick=' + that.data.userInfo.nickName,
    })
  },
  // 取消关注
  bindDelFollow: function (e) {
    let that = this;
    let followUserId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定取消关注该用户吗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: PATH + "/resource-service/fans/delFollow",
            header: {
              'Access-Token': app.globalData.accessToken,
            },
            method: "GET",
            data: {
              userId: app.globalData.userId,
              followUserId: followUserId
            },
            success: function (res) {
              console.log(res);
              if (res.data.status == 200) {
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 2000,
                  success: function () {
                    getHistoryList(that);
                  }
                })
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 关注
  bindFollow: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    if (id == app.globalData.userId) {
      tipModal("不能关注自己");
      return;
    }
    // console.log(id);
    wx.request({
      url: PATH + "/resource-service/fans/follow",
      header: {
        'Access-Token': app.globalData.accessToken,
      },
      method: "GET",
      data: {
        userId: app.globalData.userId,
        followUserId: id
      },
      success: function (res) {
        // console.log(res);
        if (res.data.status == 200) {
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 2000,
            success: function () {
              getHistoryList(that);
            }
          })
        }
        if (res.data.status == 210) {
          wx.showToast({
            title: res.data.message,
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
  },
  goToShareDetail: function (e) {
    goToShareDetail(e.currentTarget.dataset.id, 'list');
  }
})
function getHistoryList(that) {
  wx.request({
    url: PATH + '/resource-service/share/getMyShareList',
    method: 'GET',
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    data: {
      userId: app.globalData.userId,
      shareUserId: that.data.userId
    },
    //post success
    success: function (res) {
      console.log(res)
      if (res.statusCode == 200) {
        that.setData({
          userInfo: res.data.result.shareUser,
          isNotice: res.data.result.isNotice
        });
        console.log(that.data.isNotice);
        let data = res.data.result.data;
        let len = data.length;
        arr1 = [];
        arr2 = [];
        col1H = 0;
        col2H = 0;
        for (let i = 0; i < len; i++) {
          let imgItem = data[i];
          let scale = imgWidth / imgItem.imageWidth;
          let imgHeight = imgItem.imageHeight * scale;
          if (col1H <= col2H) {
            col1H += imgHeight;
            arr1.push(data[i]);
          } else {
            col2H += imgHeight;
            arr2.push(data[i]);
          }
        }
        that.setData({
          arr1: arr1,
          arr2: arr2
        })
        // console.log(arr1, arr2)
      }
    }
  });
}
function tipModal(tip) {
  wx.showToast({
    title: tip,
    icon: 'loading',
    duration: 1500
  })
}