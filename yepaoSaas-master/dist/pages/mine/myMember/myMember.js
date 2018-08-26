// pages/mine/myMember/myMember.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightItemHidden: true,
    yItems: [
      {
        iconUrl: '../../../images/icon/mine/member_registration.png',
        name: '会员登记',
        navigateUrl: 'memberInfoRegistration?memIdentity=pt'
      },
      {
        iconUrl: '../../../images/icon/mine/customer_tracking.png',
        name: '客户跟踪',
        navigateUrl: 'customerTracking?memIdentity=pt'
      },
      {
        iconUrl: '../../../images/icon/mine/work_transfer.png',
        name: '资料移交',
        navigateUrl: '../infoTransfer?memIdentity=pt'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindNavigateTap(e) {
    wx.navigateTo({
      url: e.currentTarget.id,
    })
  }
})