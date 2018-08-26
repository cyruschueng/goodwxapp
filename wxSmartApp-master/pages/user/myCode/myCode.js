// pages/user/myCode/myCode.js
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
                      userInfo: res.data.user //qrImg 二维码字段
                  })
              }
          },
      });
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
    wx.showShareMenu({
      withShareTicket: true,
      success: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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
  onShareAppMessage: function (res) {
    console.log(app.globalData.id)
    let that = this;
  
    let path_share = '/pages/login/login?id=' + app.globalData.id + "&invideCode=" + app.globalData.userId + '&type=active';


    return {
      title: that.data.title,
      path: path_share,
      success: function (res) {
        console.log(res);
        // 转发成功

        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) {
            console.log(res);

          },
          complete: function (res) {
            // console.log(res);
          }
        })

      },
      fail: function (res) {
        // 转发失败
      },
      complete: function () {
        that.setData({
          hide: false
        })
      }
    }
  },
  lookCode: function (e) {
      console.log(e);
      let url = e.currentTarget.dataset.url;
 
      wx.getImageInfo({
          src: url,
          success: function (res) {
            //   console.log(res);
              let path = res.path;
              wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success: function (res) {
                    //   console.log(res);
                  }
              })
          }
      })
  }
})