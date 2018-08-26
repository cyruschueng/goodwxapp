// experiene.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentcity: {},
    recommendlist: [],
    floorlist: [],
    adlist: []
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (option) {
    const self = this
    var cid = app.globalData.cityid
    wx.request({
      url: app.globalData.apiURL + '/city/info?cityId=' + cid,
      success: function (res) {
        self.setData({
          currentcity: res.data.result
        });
        if (res.data.result.slideList && res.data.result.slideList.length == 1) {
          self.setData({
            indicatorDots: false,
            autoplay: false
          })
        }
      }
    })
    //retrieve recommendlist
    wx.request({
      url: app.globalData.apiURL + '/recommend/list?cityId=' + cid + '&lat=' + wx.getStorageSync('latitude') + '&lon=' + wx.getStorageSync('longitude'),
      success: function (res) {
        if (res.data.result) {
          self.setData({
            recommendlist: res.data.result.recommendList,
          })
        }
      }
    })
    //retrieve floorlist
    wx.request({
      url: app.globalData.apiURL + '/floor/list?cityId=' + cid + '&lat=' + wx.getStorageSync('latitude') + '&lon=' + wx.getStorageSync('longitude'),
      success: function (res) {
        //console.log(res.data.result)
        self.setData({
          floorlist: res.data.result,
        })
      }
    })
    //retrieve adlist
    wx.request({
      url: app.globalData.apiURL + '/ad/list',
      success: function (res) {
        self.setData({
          adlist: res.data.result,
        })
      }
    })
    wx.setNavigationBarTitle({
      title: '乐游欧洲Go'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.onShow()
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
  cityDetail: function () {
    const cityinfo = this.data.currentcity;
    wx.navigateTo({
      url: `../detail/cityDetail?cityId=${cityinfo.cityId}`
    })
  },
  checktool: function () {
    const cityinfo = this.data.currentcity;
    wx.navigateTo({
      url: `../detail/cityDetail?cityId=${cityinfo.cityId}&num=1`
    })
  },
  checkCity: function () {
    wx.navigateTo({
      url: 'checkCity?cityName=' + this.data.currentcity.name
    })
  },
  enterDetail: function (event) {
    wx.navigateTo({
      url: '../detail/viewDetail?id=' + event.currentTarget.id
    })
  },
  adDetail: function (event) {
    wx.navigateToMiniProgram({
      appId: this.data.adlist[0].link,
      success(res) {
        // 打开成功
      }
    })
  },
  enterSubject: function (event) {
    wx.navigateTo({
      url: 'enterSubject?subjectid=' + event.currentTarget.id
    })
  },
  showAll: function (event) {
    wx.navigateTo({
      url: 'showAll?shoptypeid=' + event.currentTarget.id + '&shoptext=' + event.currentTarget.dataset.shoptext
    })
  },
  onPullDownRefresh() {
    this.onShow();
    wx.stopPullDownRefresh();
  }
})
