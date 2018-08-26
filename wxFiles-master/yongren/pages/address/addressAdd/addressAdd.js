var app = getApp()
Page({
  data: {
    sets: 'insert',
    so: 1,
    province:'',
    city:'',
    area:'',
    isdef:0
  },
  navToArea: function () {
    wx.navigateTo({
      url: '/pages/address/addressAdd/area/area',
    })
  },
  switchChange: function (e) {
    console.log(e)
  },
  submit:function (e) {
    var that = this
    console.log(e)
    var isdef = 0
    if(e.detail.value.isdef == true){
      isdef = 1
    }

    if(e.detail.value.name == ""){
      wx.showToast({
        title: '收货人姓名不能为空',
        icon:'loading',
        duration:2000
      })
    } else if (e.detail.value.number == ""){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else if(that.data.province == ""){
      wx.showToast({
        title: '地区信息不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else if (e.detail.value.address == ""){
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else if(e.detail.value.postcode == ""){
      wx.showToast({
        title: '邮政编码不能为空',
        icon: 'loading',
        duration: 2000
      })
    }else{
      wx.request({
        url: app.globalData.api + 'insertAddressForApp.do',
        data: {
          uid: that.data.uid,
          province: that.data.province,
          city: that.data.city,
          area: that.data.area,
          name: e.detail.value.name,
          number: e.detail.value.number,
          postcode: e.detail.value.postcode,
          address:e.detail.value.address,
          isdef: isdef
        },
        method:"post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if(res.data == 1){
            wx.showToast({
              title: '保存成功',
              icon:'success',
              duration:1000
            })
            setTimeout(function (){
              wx.navigateBack({
                delta:1
              })
            },1000)
          }
        },
        fail: function(res) {
          console.log(res)
        }
      })
    }
    
  },
  blur: function (e) {
    var id = e.currentTarget.dataset.se
    this.setData({
      so: id
    })
  },
  onLoad: function (options) {
    this.setData({
      sets: options.sets,
      uid: wx.getStorageSync("userInfo").data.id
    })
    console.log(wx.getStorageSync("userInfo").data.id)
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
    this.setData({
      province: wx.getStorageSync('dprovince'),
      city: wx.getStorageSync('dcity'),
      area: wx.getStorageSync('darea'),
    })
    wx.setStorageSync('dprovince', '')
    wx.setStorageSync('dcity', '')
    wx.setStorageSync('darea', '')
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


})