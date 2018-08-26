// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'江纯',
    listArr:[
      { 'class': 'icon-organize', 'name': '组织架构', 'me_right_class': 'icon-right' },
      { 'class': 'icon-list', 'name': '投保人信息', 'me_right_class': 'icon-right'},
      { 'class': 'icon-me', 'name': '被保险人信息', 'me_right_class': 'icon-right'},
      { 'class': 'icon-tel', 'name': '客服电话', 'me_tel': "4008-361-254", 'me_right_class':'me_icon_tel'},
    ]
  },
  //点击对应列表时候
  listTitle: function (e) {
    console.log(e.currentTarget.dataset.title);
    wx.navigateTo({
      url: '../account/account',
    })
  },

  //点击对应列表时候
  listClick:function(e){
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: '../organize/organize',
      })
    }
    if(e.currentTarget.dataset.index == 1){
      wx.navigateTo({
        url: '../policymsg/policymsg',
      })
    }
    if (e.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '../assuredmsg/assuredmsg',
      });
     
    }
    if (e.currentTarget.dataset.index == 3) {
      let phoneNumber =e.currentTarget.dataset.tel
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      })

    }
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(5555)
    if (options.id == '江纯'){
      console.log('进来')
        wx.navigateTo({
          url: '../invitation/invitation',
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
  
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