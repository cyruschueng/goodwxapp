// pages/personalCenter/personalSetting/shippingAddress/editShippingAddress/editShippingAddress.js

var model = require('../citySelectModel/citySelectModel.js')
var show = false;
var item = {};

var app = getApp();
var baseUrl = app.globalData.baseUrl;
var imgUrl = app.globalData.imgUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {
      show: show
    },
    address_id:'',
    is_default:'',
    addressDetailInfoObj:{},
    city_area:'',
    isCity_areaChange:false,
    province: '',
    county: '',
    city: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      address_id: options.address_id,
      is_default: options.is_default
    })
    console.log(this.data.address_id)
    // 获取地址详情数据
    var url = baseUrl + '/api/address/load?address_id=' + this.data.address_id
    this.getAddressDetail(url)
  },
  // 改变性别
  radioChange(e){
    // console.log(e.detail.value)
    var addressDetailInfoObj = this.data.addressDetailInfoObj;
    addressDetailInfoObj.gender=e.detail.value;
    this.setData({
      addressDetailInfoObj: addressDetailInfoObj
    })
  },
  // 保存编辑完的地址
  saveAddress(e){
    var url = baseUrl + '/api/address/edit?address_id=' + this.data.addressDetailInfoObj.address_id + '&receipt_name=' + this.data.addressDetailInfoObj.receipt_name + '&city_area=' + this.data.addressDetailInfoObj.city_area + '&detailed_address=' + this.data.addressDetailInfoObj.detailed_address + '&telephone=' + this.data.addressDetailInfoObj.telephone + '&is_default=' + this.data.is_default + '&gender=' + this.data.addressDetailInfoObj.gender;
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          
          wx.showToast({
            title: '保存成功',
            complete(){
              setTimeout(function () {
                //要延时执行的代码  
                wx.navigateBack({
                  success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onShow();
                  }
                })
              }, 700) 
            }
          })
          
        }
      }
    })
  },
  // 删除收货地址
  deleteAddress(e){
    var that = this
    var url = baseUrl + '/api/address/delete?address_id=' + that.data.address_id
    wx.request({
      url: url,
      success(res) {
        console.log(res)
        if (res.data.success) {
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
  },
  // 获取地址详情数据
  getAddressDetail(url){
    var that = this
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          res.data.result.city_area0 = res.data.result.city_area.split(' ')[0]
          res.data.result.city_area1 = res.data.result.city_area.split(' ')[1]
          res.data.result.city_area2 = res.data.result.city_area.split(' ')[2]
          // console.log(res.data.result)
          
          that.setData({
            addressDetailInfoObj: res.data.result
          })
          // console.log(that.data.addressDetailInfoObj.detailed_address)
        }
      }
    })
  },
  // 获取三级城市列表
  locationAddress(e) {
    // console.log('选择城市')
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
    this.setData({
      isSelectCity: false
    })
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name,
      isCity_areaChange:true
    });
    var city_area = this.data.province + this.data.city + this.data.county;
    var addressDetailInfoObj = this.data.addressDetailInfoObj;
    addressDetailInfoObj.city_area = city_area
    
    this.setData({
      addressDetailInfoObj: addressDetailInfoObj
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },

  // 获取收货人输入内容
  getReceipt_name(e) {
    // console.log(e)
    var addressDetailInfoObj = this.data.addressDetailInfoObj
    addressDetailInfoObj.receipt_name = e.detail.value

    this.setData({
      addressDetailInfoObj: addressDetailInfoObj
    })
  },
  getTelephone(e) {
    var addressDetailInfoObj = this.data.addressDetailInfoObj
    addressDetailInfoObj.telephone = e.detail.value
    this.setData({
      addressDetailInfoObj: addressDetailInfoObj
    })
  },
  getLocationAddress(e) {
    var addressDetailInfoObj = this.data.addressDetailInfoObj
    addressDetailInfoObj.city_area = e.detail.value
    this.setData({
      addressDetailInfoObj: addressDetailInfoObj
    })
  },
  getMorenAddress(e) {
    var addressDetailInfoObj = this.data.addressDetailInfoObj
    addressDetailInfoObj.city_area = e.detail.value
    this.setData({
      addressDetailInfoObj: addressDetailInfoObj
    })
  },
  getDetailAddress(e) {
    console.log(e)
    var addressDetailInfoObj = this.data.addressDetailInfoObj
    addressDetailInfoObj.detailed_address = e.detail.value
    this.setData({
      addressDetailInfoObj: addressDetailInfoObj
    })
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