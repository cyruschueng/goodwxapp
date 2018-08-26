Page({
  data: {
    province:'选择地址',
    userName: '', telNumber:'',detail:''
  },
  navToChoose: function(){
    wx.navigateTo({
      url: '/pages/address/choose/choose',
    })
  },
  username: function(e){
    this.setData({
      userName:e.detail.value
    })
  },
  telnumber: function (e){
    this.setData({
      telNumber: e.detail.value
    })
  },
  detail: function (e){
    this.setData({
      detail: e.detail.value
    })
  },
  save: function () {
    var that = this
    if (that.data.userName == ''){
      wx.showToast({
        title: '请填写联系人名称',
        image:'/img/60.png',
        duration:800
      })
    }else if(that.data.telNumber == ''){
      wx.showToast({
        title: '请填写联系电话',
        image: '/img/60.png',
        duration: 800
      })
    }else if(that.data.detail == ''){
      wx.showToast({
        title: '请填写详细地址',
        image: '/img/60.png',
        duration: 800
      })
    } else if (that.data.province == '选择地址'){
      wx.showToast({
        title: '请选择地址',
        image: '/img/60.png',
        duration: 800
      })
    }else{
      var list = wx.getStorageSync("addressList");
      list.push({userName:that.data.userName,telNumber:that.data.telNumber,provinceName:that.data.province,cityName:that.data.city,countyName:that.data.area,detailInfo:that.data.detail})
      wx.setStorageSync("addressList", list);
      wx.redirectTo({
        url: '/pages/address/address',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

})