const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    showpay: false,
    showCostExplain: false,
    detail: {},
    showmore: false,
    textofmore: '查看更多',
    isCollect: false,
    lname: '',
    latitude: '',
    longitude: '',
    isMuted: true,
    fromshare: false,
  },
  bindfullscreen: function (e) {
    this.setData({
      isMuted: false
    })
  },
  tovoiceGuide: function (e) {
    wx.navigateToMiniProgram({
      appId: this.data.VGinfo.voiceGuideAppId,
      path: this.data.VGinfo.voiceGuidePath + e.currentTarget.id,
      envVersion: this.data.VGinfo.voiceGuideEnv,
      success(res) {
        //console.log('跳转至语音小程序');
      }
    })
  },
  understandQuestion: function () {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  callPhone: function (e) {
    var phoneNumber = e.currentTarget.dataset.phonenumber;
    wx.makePhoneCall({
      phoneNumber: phoneNumber,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  ScreenImg: function (e) {
    var imgUrl = e.currentTarget.dataset.imgurl;
    var imgs = [];
    imgs.push(imgUrl);
    wx.previewImage({
      urls: imgs // 需要预览的图片http链接列表
    })
  },
  optCollect: function () {
    if (this.data.isCollect) {
      wx.request({
        url: app.globalData.apiURL + '/collect/del',
        header: { memberId: wx.getStorageSync('memberid'), token: wx.getStorageSync('token') },
        data: { shopId: [this.data.detail.shopId] },
        method: 'POST',
        success: function (res) { wx.showToast({title: '取消成功'}) },
        fail: function (res) {console.log(res)}
      })
    } else {
      wx.request({
        url: app.globalData.apiURL + '/collect/add',
        header: { memberId: wx.getStorageSync('memberid'), token: wx.getStorageSync('token') },
        data: { shopId: this.data.detail.shopId },
        method: 'POST',
        success: function (res) { wx.showToast({ title: '收藏成功' }) },
        fail: function (res) { console.log(res) }
      })
    }
    this.setData({
      isCollect: !this.data.isCollect
    })
  },
  showCostexplain: function () {
    this.setData({ showCostExplain: !this.data.showCostExplain });
  },
  hideDialog: function () {
    this.setData({ showCostExplain: false });
  },
  showDialog: function () {
    this.setData({ showCostExplain: true });
  },
  goorder: function (e) {
    wx.navigateTo({
      url: '../payticket/orderDetail?shopid=' + e.currentTarget.id
    })
  },
  viewdetail: function(event) {
    wx.redirectTo({
      url: 'viewDetail?id=' + event.currentTarget.id
    })
  },
  activeDetail: function (e) {
    wx.navigateTo({
      url: '../experience/activeDetail?shopId=' + e.currentTarget.id
    })
  },
  onLoad: function (option) {
    const self = this
    if (option.fromshare) {
      this.setData({
        fromshare: true,
      })
    }
    //all three kinds of detail use a same api.
    wx.request({
      url: app.globalData.apiURL + '/shop/info?shopId=' + option.id + '&lat=' + wx.getStorageSync('latitude') + '&lon=' + wx.getStorageSync('longitude'),
      success: function (res) {
        self.setData({

          detail: res.data.result,
          lname: res.data.result.shopName + '\n' + res.data.result.addrInfo,
          latitude: res.data.result.lat,
          longitude: res.data.result.lon,
        })
        if (res.data.result.slideList.length<=1){
          self.setData({
            indicatorDots: false,
            autoplay: false
          })
        }
      }
    })
    wx.request({
      url: app.globalData.apiURL + '/shop/recommend?shopId=' + option.id + '&lat=' + wx.getStorageSync('latitude') + '&lon=' + wx.getStorageSync('longitude'),
      success: function (res) {
        //console.log(res.data.result)
        if (res.data.result.length > 0) {
          self.setData({
            recommend: res.data.result
          })
        }
      }
    })
    wx.request({
      url: app.globalData.apiURL + '/collect/isCollect',
      header: {
        memberId: wx.getStorageSync('memberid'),
        token: wx.getStorageSync('token'),
      },
      data: { "shopId": option.id },
      success: function (res) {
        self.setData({
          isCollect: res.data.result
        })
      }
    })
    wx.request({
      url: app.globalData.apiURL + '/tools/voiceGuide',
      success: function (res) {
        self.setData({
          VGinfo: res.data.result
        })
      }
    })
    https://eulingcodgo.chinaotttv.com/api/tools/voiceGuide
    wx.setNavigationBarTitle({
      title: '详情'
    })
  }, 
  onReachBottom: function () {
      this.setData({showpay: true});
  },
  checkMore: function () {
    if (this.data.textofmore == '查看更多') {
      this.setData({
        showmore: true,
        textofmore: '收起'
      });
    } else {
      this.setData({
        showmore: false,
        textofmore: '查看更多'
      });
    }
  },
  onPageScroll: function () {
    this.setData({
      showpay: true
    })
  },
  touchMove: function () {
    this.setData({
      showpay: true
    })
  },
  gotolocation: function () {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.lname,
      scale: 17,
    })
  },
  backtoHome: function () {
    console.log("adsf")
    wx.switchTab({
      url: '../experience/experience',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '乐游欧洲Go',
      desc: '',
      path: '/pages/detail/viewDetail?id=' + this.data.detail.shopId + '&fromshare=true'
    }
  }
})
