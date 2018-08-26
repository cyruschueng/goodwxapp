// pages/detail/cityDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityinfo:{},
    currency: 0,
    revertc: 0,
    emoney: '',
    cmoney: '',
    flag: false,
    start: {},
    end: {},
    checked: false,
    checked1: false,
    eu: 'upper',
    rmb: 'lower',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '乐游欧洲Go'
    })
    const self = this
    const cityId = options.cityId;
    const num = options.num;
    if (num == 1) {
      this.setData({
        flag: true
      })
    }
    wx.request({
      url: app.globalData.apiURL + '/city/info',
      data: {cityId: cityId},
      success: function (res) {
        //console.log(res.data.result)
        // var t = new Date()
        // var chour = t.getHours()
        // var ehour = chour - parseInt(res.data.result.timeDifference)
        // if (ehour > 23) { ehour -= 24 }
        // var minutes = t.getMinutes()
        // if (minutes < 10) {
        //   minutes = '0' + minutes
        // }
        self.setData({
          cityinfo: res.data.result,
          revertc: (1 / res.data.result.currencyRate).toFixed(2),
          currency: res.data.result.currencyRate,
        })
      }
    })
  },
  currencychange: function(e) {
    var self = this
    if (this.data.checked) {
      if (e.detail.value == '') { 
        var eu = 0
      } else {
        var eu = parseFloat(e.detail.value)
      }
      self.setData({
        cmoney: (eu * this.data.currency).toFixed(2),
      })
    } else if (this.data.checked1) {
      if (e.detail.value == '') {
        var rmb = 0
      } else {
        var rmb = parseFloat(e.detail.value)
      }
      self.setData({
        emoney: (rmb * this.data.revertc).toFixed(2),
      })
    }
  },
  changeplace: function() {
    if (this.data.eu == 'upper') {
      this.setData({
        eu: 'lower',
        rmb: 'upper'
      })
    } else {
      this.setData({
        eu: 'upper',
        rmb: 'lower'
      })
    }
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
  onShareAppMessage: function () {
  
  },
  touchStart: function (e) {
    this.setData({
      start: {
        startX: e.touches[0].pageX,
        startY: e.touches[0].pageY
      }
    });
  },
  touchMove: function (e) {
    this.setData({
      end: {
        endX: e.touches[0].pageX,
        endY: e.touches[0].pageY
      }
    })
    if (this.data.end.endY - this.data.start.startY >= 150) {
      this.setData({
        flag: true
      })
    }
  },
  touchEnd: function (e) {
    
  },
  changeChecked: function () {
    this.setData({
      cmoney: '',
      emoney: '',
      checked: true,
      checked1: false
    })
  },
  changeChecked1: function () {
    this.setData({
      cmoney: '',
      emoney: '',
      checked: false,
      checked1: true,
    })
  }
})