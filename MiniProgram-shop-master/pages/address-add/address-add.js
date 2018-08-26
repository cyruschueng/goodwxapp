// pages/myInfo-address-add/myInfo-address-add.js
const web_url = getApp().globalData.web_url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '',
  },

  bindRegionChange: function (e) {
    console.log(e.detail)
    this.setData({
      region: e.detail.value
    })
  },
  // 姓名
  userNameFn: function (event){
    var that = this
    that.setData({
      fullname: event.detail.value
    })
  },
  // 手机号码
  telFn: function (event){
    var that = this
    that.setData({
      phone: event.detail.value
    })
  },
  // 邮政编码
  codeFn: function (event){
    var that = this
    that.setData({
      zip_code: event.detail.value
    })
  },
  // 详细地址
  addressFn: function (event){
    var that = this
    that.setData({
      address: event.detail.value
    })
  },
  //设为默认
  changeState:function(e){
    var state;
    var that = this
    if (e.detail.value){
      state = 1
    }else{
      state = 0
    }
    that.setData({
      state: state
    })
  },
  //提交表单
  formSubmit: function (e) {
    var that = this;
    console.log('1111',that.data)
    if (that.data.fullname == '' || that.data.fullname == null || that.data.phone == '' || that.data.phone == null || that.data.zip_code == '' || that.data.zip_code == null || that.data.address == '' || that.data.address == null || that.data.phone.length !== 11) {
        wx.showToast({
          title: '请填写正确信息',
          icon: 'success',
          duration: 2000
        })
    } else if (that.data.address_id == null || that.data.address_id==''){     //保存地址
      console.log('地址ID', that.data.address_id)
      wx.request({
        url: web_url + '/app.php?c=Address',
        data: {
          // id: that.data.address_id, 
          user_id: that.data.user_id,
          address_obj: '{"fullname":"' + that.data.fullname + '","phone":"' + that.data.phone + '","region":"' + that.data.region + '","address":"' + that.data.address + '","zip_code":"' + that.data.zip_code + '","province":"' + that.data.region[0] + '","city":"' + that.data.region[1] + '","county":"' + that.data.region[2] + '","state":"' + that.data.state + '"}'
        },
        success: function (res) {
          console.log('222',res)
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            // wx.navigateTo({
            //   url: '/pages/address/address',
            //   success: function(res) {},
            // })
            wx.navigateBack({
              delta: 1,
            })
          }, 2000)
        }
      })
      }else{     //修改地址
      console.log('地址ID', that.data.address_id)
      wx.request({
        url: web_url + '/app.php?c=Address',
        data: {
          id: that.data.address_id, 
          user_id: that.data.user_id,
          address_obj: '{"fullname":"' + that.data.fullname + '","phone":"' + that.data.phone + '","region":"' + that.data.region + '","address":"' + that.data.address + '","zip_code":"' + that.data.zip_code + '","province":"' + that.data.region[0] + '","city":"' + that.data.region[1] + '","county":"' + that.data.region[2] + '","state":"' + that.data.state + '"}'
        },
        success: function (res) {
          console.log('222', res)
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            // wx.navigateTo({
            //   url: '/pages/address/address',
            //   success: function(res) {},
            // })
            wx.navigateBack({
              delta: 1,
            })
          }, 2000)
        }
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
    //获取编辑地址列表
    wx.request({
      url: web_url + 'app.php?c=Address&act=edit',
      data: {
        id: options.id
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.data.state == 1 || options.items_length == 0){
          var checkedState = true
        }
        that.setData({
          fullname: res.data.fullname,
          phone: res.data.phone,
          zip_code: res.data.zip_code,
          address: res.data.address,
          address_id: res.data.id,
          state: res.data.state,
          checkedState: checkedState
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