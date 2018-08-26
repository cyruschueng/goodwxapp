//活动页面基本没有

// pages/activePage/activePage.js
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
    this.setData({
        title: options.title,
        id: options.active_id
    })
    getActive(this);
  },

  bindHome: function () {
    wx.reLaunch({
      url: '../main/main',
    })
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
    // console.log("ref");
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
  // onShareAppMessage: function (res) {
  //   let that = this;
  //   that.setData({
  //     hide: true
  //   })
  //   let path_share;
  //   // if (res.from === 'button') {
  //   //   // 来自页面内转发按钮
  //   //   console.log(res.target)
  //   //   path_share = '/pages/login/login?type=share&id=' + that.data.id
  //   // } else {
  //   //     path_share = '/pages/login/login';
  //   // }
  //   path_share = '/pages/login/login?type=share&id=' + that.data.id + "&invideCode=" + app.globalData.userId
  //   return {
  //     title: '爱心分享图片，轻松月入百万！',
  //     path: path_share,
  //     success: function (res) {
  //       console.log(res);
  //       // 转发成功
  //       wx.getShareInfo({
  //         shareTicket: res.shareTickets[0],
  //         success: function (res) {
  //           console.log(res);
  //         },
  //         complete: function (res) {
  //           console.log(res);

  //         }
  //       })
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     },
  //     complete: function () {
  //       that.setData({
  //         hide: false
  //       })
  //     }
  //   }
  // },
  onShareAppMessage: function (res) {
      let that = this;
      console.log(that.data.id)
      
      let path_share = '/pages/login/login?id=' + that.data.id + "&invideCode=" + app.globalData.userId + '&type=active' ;
        
      
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
  bindSaveImg: function (e) {
      console.log(e);
      let url = e.currentTarget.dataset.url;
      wx.getImageInfo({
          src: url,
          success: function (res) {
              let path = res.path;
              wx.saveImageToPhotosAlbum({
                  filePath: path,
                  success: function (res) {

                  }
              })
          }
      })
  },
  bindGoHome: function () {
      wx.navigateTo({
          url: '../main/main',
      });
  }
})

function getActive(that) {
    wx.request({
        url: PATH + "/resource-service/share/getActive",
        header: {
            'Access-Token': app.globalData.accessToken,
        },
        method: "GET",
        data: {
            id: that.data.id
        },
        success: function (res) {
            console.log(res);
            if (res.statusCode == 200 && res.data.status == 200) {
                that.setData({
                    activeImg: res.data.url
                });
            }
        }
    });
}