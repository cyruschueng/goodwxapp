// pages/alterAddress/alterAddress.js
var util = require('../../utils/util.js');
var address = require('../../utils/city.js')
var animation
Page({
  data: {
    openid: '', //用户id
    adrName: '', //收件人姓名
    goodid:'', //商品id
    adrPhone: '', //收件人手机号
    adrDetail: '', //	详细地址
    areaInfo: '', // 省市区
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [], //省列表
    citys: [], //市列表
    areas: [], //区列表
    adrProvince: '', //省
    adrCity: '', //市
    adrDistrict: '',  //区
    isTanchuang:false,
    isTijiao:false,
    giftList:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'sessionKey',
      success: function (res) {
        that.setData({
          openid: res.data.openid
        })
      }
    })
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
    //获取礼物列表
    wx.request({
      url: util.Apis + '/h5/game/user/giftList',
      method: 'POST',
      data: {},
      header: {
        'Accept': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        
        that.setData({
          giftList: res.data.data.data
        })
      }
    })
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ' ' + that.data.citys[value[1]].name + ' ' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
      adrProvince: that.data.provinces[value[0]].name, //	省
      adrCity: that.data.citys[value[1]].name, //	市
      adrDistrict: that.data.areas[value[2]].name, //		区
    })
  },
  hideCitySelected: function (e) {
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },
  //姓名
  addname(e){
    this.setData({
      adrName: e.detail.value
    })
  },
  //电话
  addphone(e) {
    this.setData({
      adrPhone: e.detail.value
    })
  },
  //详细地址
  addDetail(e) {
    this.setData({
      adrDetail: e.detail.value
    })
  },
  //新增地址
  submitInfo() {
    var adrName = this.data.adrName,  //用户名
      openid = this.data.openid,
      goodid = this.data.goodid,
      adrPhone = this.data.adrPhone,  //手机号
      areaInfo = this.data.areaInfo,  // 省市区
      province = this.data.adrProvince,
      city = this.data.adrCity,
      area = this.data.adrDistrict,
      adrDetail = this.data.adrDetail; //详细地址
    if (adrName && adrPhone && areaInfo && adrDetail) {
      if ((/^((1[3,5,8][0-9])|(14[5,7])|(17[0,3,6,7,8])|(19[7]))\d{8}$/.test(adrPhone))) {
        var that = this;
        wx.request({
          url: util.Apis + '/h5/game/user/createOrder',
          method: 'POST',
          data: {
            name: adrName,  //用户名
            openid: openid,
            goodid: goodid,
            phone: adrPhone,  //手机号
            province: province,
            city: city,
            area: area,
            address_detail: adrDetail //详细地址
          },
          header: {
            'Accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
          
            if(!res.data.code){
              that.setData({
                isTijiao: true
              })
            }else{
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '手机号格式错误',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '请填写完整资料',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //打开弹窗
  openPopup(e) {
    this.setData({
      isTanchuang: true,
      goodid: e.currentTarget.dataset.gid
    })
  },
  //关闭弹窗
  closePopup() {
    this.setData({
      isTanchuang: false
    })
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.reLaunch({
      url: '../index/index'
    })
  },

})
