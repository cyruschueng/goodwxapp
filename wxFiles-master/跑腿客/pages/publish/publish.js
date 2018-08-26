var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateLimit:[
      '当天到','次日到','3天内到达'
    ],dlFlag:0,
    goodsSize:['小件','中件','大件'],
    tempWxFlag:0,
    glFlag: 0,
    submitData:{
      startLocation:{},
      endLocation: {},
      startAddress:{},
      endAddress:{},
      startPhone:"",
      endPhone:"",
      sendTime:"",
      goodsSize:"",
      inputPay:0,
      servicePay:0,
      distance:0,
      remark:""
    }
  }, 
  startAddressInput(e){
    var sdata = this.data.submitData;
    sdata.startAddress.detailInfo = e.detail.value;
    this.setData({
      submitData: sdata
    })
  },
  endAddressInput(e) {
    var sdata = this.data.submitData;
    sdata.endAddress.detailInfo = e.detail.value;
    this.setData({
      submitData: sdata
    })
  },
  startPhoneInput(e){
    var sdata = this.data.submitData;
    sdata.startPhone = e.detail.value;
    this.setData({
      submitData: sdata
    })
  },
  endPhoneInput(e) {
    var sdata = this.data.submitData;
    sdata.endPhone = e.detail.value;
    this.setData({
      submitData: sdata
    })
  },
  priceInput(e){
    var sdata = this.data.submitData;
    sdata.inputPay = e.detail.value;
    this.setData({
      submitData: sdata
    })
  },
  dateLimitChange(e){
    this.setData({
      dlFlag:e.detail.value
    })
  },
  goodsSizeChange(e){
    this.setData({
      glFlag: e.detail.value
    })
  },
  //获取地图地址
  getMapAddress(e){
    var that = this;
    // tempWxFlag   1为起点微信地址   2为终点微信地址
    this.setData({
      tempWxFlag: e.currentTarget.dataset.type
    })
    this.mapAddress();
  },
  //选择图片地点
  mapAddress(){
    var that = this
    wx.chooseLocation({
      success: function(res) {
        var location = {
          lat:res.latitude,
          lng:res.longitude
        }
        wx.request({
          url: app.MAP_URL +'ws/geocoder/v1/?location='+res.latitude+','+res.longitude+'&key='+app.MAP_KEY,
          success(res){
            console.log(res.data.result.address_component)
            var sdata = that.data.submitData;
            if(that.data.tempWxFlag == 1){
              sdata.startAddress = {
                provinceName: res.data.result.address_component.province,
                cityName: res.data.result.address_component.city,
                countyName: res.data.result.address_component.district,
                detailInfo: res.data.result.address_component.street_number
              }
              sdata.startLocation = location
              that.setData({
                submitData: sdata
              })
            }else{
              sdata.endAddress = {
                provinceName: res.data.result.address_component.province,
                cityName: res.data.result.address_component.city,
                countyName: res.data.result.address_component.district,
                detailInfo: res.data.result.address_component.street_number
              }
              sdata.endLocation = location
              that.setData({
                submitData: sdata
              })
            }
            that.countDistance()
          }
        })
      },
      fail(res){
        wx.openSetting({
          success(res) {
            that.mapAddress()
          }
        })
      }
    })
  },
  //获取微信地址
  getWxAddress(e){
    var that = this;
    // tempWxFlag   1为起点微信地址   2为终点微信地址
    this.setData({
      tempWxFlag:e.currentTarget.dataset.type
    })
    this.wxAddress();
  },
  //选择微信地址
  wxAddress(){
    var that = this;
    wx.chooseAddress({
      success(res) {
        var sdata = that.data.submitData;
        wx.request({
          url: app.MAP_URL + 'ws/geocoder/v1/?address=' +res.provinceName+res.cityName+ res.countyName + res.detailInfo  +'&key=' + app.MAP_KEY,
          success(data){
            if (that.data.tempWxFlag == 1) {
              sdata.startAddress = {
                provinceName: res.provinceName,
                cityName: res.cityName,
                countyName: res.countyName,
                detailInfo: res.detailInfo
              }
              sdata.startPhone = res.telNumber;
              sdata.startLocation = data.data.result.location
              that.setData({
                submitData: sdata
              })
            } else {
              sdata.endAddress = {
                provinceName: res.provinceName,
                cityName: res.cityName,
                countyName: res.countyName,
                detailInfo: res.detailInfo
              }
              sdata.endPhone = res.telNumber;
              sdata.endLocation = data.data.result.location
              that.setData({
                submitData: sdata
              })
            }
            that.countDistance()
          }
        })
        
      }, fail(res) {
        wx.openSetting({
          success(res) {
            that.wxAddress()
          }
        })
      }
    })
  },
  countDistance(){
    var that = this;
    if (this.data.submitData.startLocation.lat && this.data.submitData.endLocation.lat){
      wx.request({
        url: app.MAP_URL + 'ws/distance/v1/',
        data:{
          from: this.data.submitData.startLocation.lat+','+ this.data.submitData.startLocation.lng,
          to: this.data.submitData.endLocation.lat + ',' + this.data.submitData.endLocation.lng,
          key:app.MAP_KEY
        },
        method:'get',
        success:function(res){
          var sdata = that.data.submitData;
          sdata.distance = (res.data.result.elements[0].distance).toFixed(0);
          that.setData({
            submitData:sdata
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    if (wx.getStorageSync("defaultPublishData")) {
      var sdata = this.data.submitData;
      sdata.startPhone = wx.getStorageSync("defaultPublishData").startPhone;
      sdata.endPhone = wx.getStorageSync("defaultPublishData").endPhone;
      this.setData({
        submitData: sdata,
        dlFlag: wx.getStorageSync("defaultPublishData").dlFlag,
        glFlag: wx.getStorageSync("defaultPublishData").glFlag
      })
    }
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