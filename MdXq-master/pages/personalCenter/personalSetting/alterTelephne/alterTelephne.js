var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telephone:'',
    customer_id:'',
    nickname:'',
    referee_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'telephone',
      success: function (res) {
        that.setData({
          telephone: res.data
        })
      },
    })
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        that.setData({
          customer_id: res.data
        })
      },
    })
    wx.getStorage({
      key: 'referee_id',
      success: function (res) {
        if (res.data!=null){
          that.setData({
            referee_id: res.data
          })
        }
      },
    })
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          nickname: res.data
        })
      },
    })
  },
  // 输入电话号码
  telephoneInput(e){
    this.setData({
      telephone:e.detail.value
    })
  },
  // 点击保存
  saveButton(e){
    var saveUrl = baseUrl + '/api/customer/edit?customer_id=' + this.data.customer_id + '&nickname=' + this.data.nickname
      + '&telephone=' + this.data.telephone + '&referee_id=' + this.data.referee_id;
      wx.request({
        url: saveUrl ,
        success(res){
          // console.log(res)
          if(res.data.success){
            wx.setStorage({
              key: 'telephone',
              data: res.data.result.telephone,
            })
            wx.showModal({
              title: '提示',
              content: '保存成功',
              complete(res){
                // console.log(res)
                if (res.confirm){
                  wx.navigateBack({
                    success: function (e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onShow();
                    }
                  })
                }
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '保存失败',
            })
          }
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
  
  }
})