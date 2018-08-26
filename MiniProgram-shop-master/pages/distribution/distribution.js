// pages/distribution/distribution.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:'',
    infoNumber:[
      {title:'订单总额'},
      {title:'已提现'}
    ],
    balance_items: ['分销记录', '我的团队', '分销二维码', '我要提现', '提现记录']
  },

  skipList:function(event){
    let index = event.currentTarget.dataset.id;
    if( index == 0){
      wx.navigateTo({
        url: '/pages/distribution-list/distribution-list'
      })
    }else if( index == 1){
      wx.navigateTo({
        url: '/pages/myTeam/myTeam'
      })
    } else if (index == 2) {
      wx.navigateTo({
        url: '/pages/QR-code/QR-code'
      })
    } else if (index == 3) {
      // console.log(this.data)
      wx.navigateTo({
        url: '/pages/tixian/tixian?balance=' + this.data.balance
      })
    } else if (index == 4) {
      wx.navigateTo({
        url: '/pages/tixian-record/tixian-record'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var user_id = wx.getStorageSync('user_id')
      that.setData({
        user_id: user_id,
      })
    } catch (e) {
      // Do something when catch error
    }

    wx.request({
      url: web_url + '/app.php?c=Withdraw&act=fenxiao',
      data: {
        user_id: that.data.user_id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        var infoNumber = that.data.infoNumber;
        infoNumber[0].money = res.data.allmoney;
        infoNumber[1].money = res.data.money;
        that.setData({
          balance: res.data.commission,
          infoNumber: infoNumber
        })
      },
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
  
  }
})