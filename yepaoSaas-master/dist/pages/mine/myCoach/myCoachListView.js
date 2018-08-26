// pages/mine/myCoach/myCoachListView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rightItemHidden: true,
    yItems: [
      {
        iconUrl: '../../../images/icon/mine/member_registration.png',
        name: '登记客户资料',
        navigateUrl: 'registerCustomers'
      },
      {
        iconUrl: '../../../images/icon/mine/customer_tracking.png',
        name: '客户跟踪',
        navigateUrl: '../myMember/customerTracking?memIdentity=pt'
      },
      {
        iconUrl: '../../../images/icon/mine/work_transfer.png',
        name: '资料移交',
        navigateUrl: '../infoTransfer?memIdentity=pt'
      },
      {
        iconUrl: '../../../images/icon/mine/private_member.png',
        name: '私教会员',
        navigateUrl: 'privateMember'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindNavigateTap (e) {
    wx.navigateTo({
      url: e.currentTarget.id,
    })
  }

})