// page/verification/menuverification/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    memberFlag: 0
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }

  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        
        that.setData({
          winHeight: calc
        });
      }
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
    this.allShow();
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
  allShow(event) {
    var subdata = {}
    app.commonAjax('/shop/manage/verifyBusiness/verifyList', ['shopId'], subdata, (res) => {
      this.setData({
        verifyList: res.data.data.orderMenuList
      });
      this.noVerificationCertificate();
      this.verificationCertificate();
    }, app, 'post')
  },
  //未验单数量
  noVerificationCertificate(){
    var noVerificationCertificate = [];//未验单
    for (var i = 0; i < this.data.verifyList.length;i++){
      if (this.data.verifyList[i].memberFlag==0){
        noVerificationCertificate.push(this.data.verifyList[i]);
      }
    }
    this.setData({
      noVerificationCertificate: noVerificationCertificate.length
    });
  },
  //已验单数量
  verificationCertificate:function(){
    var verificationCertificate = [];//未验单
    for (var i = 0; i < this.data.verifyList.length; i++) {
      if (this.data.verifyList[i].memberFlag == 1) {
        verificationCertificate.push(this.data.verifyList[i]);
      }
    }
    this.setData({
      verificationCertificate: verificationCertificate.length
    });
  },
  swichMain(e) {
    var deskNo = e.currentTarget.dataset.deskno;
    var memberflag = e.currentTarget.dataset.memberflag;
    var orderShopId = e.currentTarget.dataset.ordershopid;
    if (memberflag == 0) {
      wx.navigateTo({
        url: '/page/verification/index/index?deskNo=' + e.currentTarget.dataset.deskno + '&memberflag=' + e.currentTarget.dataset.memberflag + '&orderShopId=' + e.currentTarget.dataset.ordershopid
      })
    } else if (memberflag == 1){
      wx.navigateTo({
        url: '/page/verification/alreadyMenuverification/index?deskNo=' + e.currentTarget.dataset.deskno + '&memberflag=' + e.currentTarget.dataset.memberflag + '&orderShopId=' + e.currentTarget.dataset.ordershopid
      })
    }

  },
  footerTap: app.footerTap
})