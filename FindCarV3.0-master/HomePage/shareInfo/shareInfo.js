// HomePage/shareInfo/shareInfo.js
const app = getApp()
const { wc } = app
let { companyNo } = app
const { imgUrl, data, code, success } = wc

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImg: ['beij.png', 'beiji.jpg'],
    bgIndex: 0,
    phoneImg: ['phop.png', 'phop.png'],
    info: {}
  },

  makePhone: function (e) {
    let phone = e.currentTarget.dataset.phone.toString()
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  touchStart: function (e) {
    let startX = e.touches[0].clientX
    this.data.startX = startX
  },
  touchMove: function (e) {
    let startX = this.data.startX
    let endX = e.touches[0].clientX
    let moveX = endX - startX

    this.setData({
      scrollLeft: -moveX
    })
  },
  touchEnd: function (e) {
    let startX = this.data.startX
    let endX = e.changedTouches[0].clientX
    let moveX = endX - startX
    let bgIndex = this.data.bgIndex
    if (Math.abs(moveX) < 20) {
      return;
    }
    if (moveX > 0) {
      if (bgIndex > 0) {
        this.setData({
          bgIndex: bgIndex - 1
        })
      }
    } else {
      if (bgIndex < this.data.bgImg.length - 1) {
        this.setData({
          bgIndex: bgIndex + 1
        })
      }
    }
  },
  moreCar: function () {
    wx.switchTab({
      url: '/HomePage/ZhaoCar/ZhaoCar',
    })
  },
  myShare: function () {
    wx.navigateTo({
      url: '/HomePage/apply/apply',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    companyNo = app.companyNo
    if (!!options.companyNo) {
      companyNo = options.companyNo
    }

    const that = this
    let shareData = {
      a: 'getShareInfo',
      input: {
        company_no: companyNo
      }
    }

    wc.get(shareData, (json) => {
      if (json[code] === success) {
        that.setData({
          'info.lgSrc': !!json[data].lg_src ? imgUrl + json[data].lg_src : '',
          'info.carList': json[data].car_list,
          'info.remark': json[data].remark,
          'info.companyInfo': json[data].company_info
        })
      } else {
        wc.showToast(['请求失败', 'loading'])
      }
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
    return {
      title: '我的车源',
      path: '/HomePage/shareInfo/shareInfo?companyNo=' + companyNo,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})