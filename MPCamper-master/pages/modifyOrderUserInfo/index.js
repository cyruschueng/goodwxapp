// pages/modifyOrderUserInfo/index.js
const util = require('../../utils/util.js')
var strNickName, strPhone
Page({

  /**
   * 页面的初始数据
   */
  data: {
        name:"",
        tel:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
          strNickName=options.orderName
          strPhone = options.orderphone
        this.setData({
                name: strNickName,
                tel:strPhone
        })
  },
  submitForm(e) {
          var that = this;
          var phone = e.detail.value.tel.trim();
          var name = e.detail.value.name;
          if (name == "") {
                  $wuxToast.show({
                          type: 'text',
                          timer: 2000,
                          color: '#fff',
                          text: '请输入预订人'
                  })
                  return
          }
          if (phone == "") {
                  $wuxToast.show({
                          type: 'text',
                          timer: 2000,
                          color: '#fff',
                          text: '请输入手机号码'
                  })
                  return
          }
          if (!util.isPhoneNumber(phone)) {
                  $wuxToast.show({
                          type: 'text',
                          timer: 2000,
                          color: '#fff',
                          text: '请填写正确的手机号码'
                  })
                  return
          }
          
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面

          prevPage.setData({
                  Phone: phone,
                  NickName: name
          })
          wx.navigateBack({
                  delta: 1
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