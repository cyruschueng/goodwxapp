// pages/followList/followList.js
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
    let that = this;
    loadingList(that);
  },
  // 取消关注
  bindDelFollow: function (e) {
    console.log(e);
    let that = this;
    let followUserId = e.currentTarget.dataset.item.starUserId;
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
              userId:app.globalData.userId,
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
                    loadingList(that);
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
  
  },
  lookUserInfo: function (e) {
    // console.log(e);
    let id = e.currentTarget.dataset.item.starUserId;
    wx.navigateTo({
      url: '../shareHistory/shareHistory?id=' + id
    });
  }
})

function loadingList (that) {
  wx.request({
    url: PATH+"/resource-service/fans/getFollowList",
    header: {
      'Access-Token': app.globalData.accessToken,
    },
    method: "GET",
    data: {
      userId:app.globalData.userId,
      page: 1,
      perPage: 10
    },
    success: function (res) {
      console.log(res);
      if (res.data.status == 200) {
        that.setData({
          followList: res.data.result.data
        });
      }
    },
    fail: function (res) {
      console.log(res);
    },
    complete: function (res) {
      // console.log(res);
    }
  });
}