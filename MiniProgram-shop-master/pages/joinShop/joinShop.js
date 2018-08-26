// pages/joinShop/joinShop.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [],
    input_items:[
      { name: 'cpname', placeholder: '您的商户名称'},
      { name: 'project', placeholder: '请输入您的主营项目'},
      { name: 'nickname', placeholder: '您的姓名'},
      { name: 'phone', placeholder: '您的手机号码'},
    ]
  },
  inputFn:function(e){
    var that = this;
    var index = e.currentTarget.dataset.id
    if(index == 0){
      that.setData({
        cpname: e.detail.value
      })
    } else if (index == 1) {
      that.setData({
        project: e.detail.value
      })
    } else if (index == 2) {
      that.setData({
        nickname: e.detail.value
      })
    } else if (index == 3) {
      if (e.detail.value.length !== 11){
        wx.showToast({
          title: '号码格式不对',
          icon: 'success',
          image: '',
          duration: 800,
          mask: true,
          success: function (res) { },
        })
      }
      that.setData({
        phone: e.detail.value
      })
    } else if (index == 4) {
      that.setData({
        content: e.detail.value
      })
    }
  },
  formSubmit: function (e) {
    var that = this;
    console.log(that.data)
    if (that.data.cpname == '' || that.data.cpname == null || that.data.project == '' || that.data.project == null || that.data.nickname == '' || that.data.nickname == null || that.data.phone == '' || that.data.phone == null || that.data.content == '' || that.data.content == null ){
      wx.showToast({
        title: '表单不能为空',
        icon: 'success',
        image: '',
        duration: 800,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      return false
    }
    wx.request({
      url: web_url + '/app.php?c=Message',
      data: {
        cpname: e.detail.value.cpname,
        project: e.detail.value.project,
        nickname: e.detail.value.nickname,
        phone: e.detail.value.phone,
        content: e.detail.value.content,
      },
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        // console.log(that.data.value)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          image: '',
          duration: 1000,
          mask: true,
          success: function (res) { },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取轮播图
    wx.request({
      url: web_url + '/app.php?c=Message&act=photo',
      data: {},
      header: { 'content-type': 'application/json' },
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({
          imgUrl:res.data
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