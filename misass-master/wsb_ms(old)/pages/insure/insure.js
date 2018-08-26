// pages/insure/insure.js
var address = require('../../utils/city.js')
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _iconChange: true,           //判断协议状态
    _date: 0,                    //判断起运时间点击状态 
    years: years,                //年数组
    year: date.getFullYear(),    //具体年
    months: months,              //月数组
    month: date.getMonth() + 1,  //具体月
    days: days,                  //日数组
    day: date.getDate(),         //具体日
    value: [9999, 1, 1],         //假设数组
    dateValue:'起运时间',          
    holder: '投保人',
    _holder:0 ,                   //判断投保点击状态
    holderArr:['陈浮生','李力'],   //投保人名单
    _insurant: 0,                 //判断被保险人点击状态
    insurant:'被保险人',
    insurantArr: ['陈三才', '王大武', '徐小梅'], //被保险人名单
    _cargoType: 0,                              //货物类型状态
    cargoType: '货物类型',
    cargoArr: ['易碎品', '非易碎品'],            //货物类型名单
    _packType: 0,                              //包装类型状态
    packType: '包装类型',
    packArr: ['箱型', '包裹类'],               //包装类型名单
    /**地图的默认数据**/
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    animationAddressStart: {},
    addressMenuIsShow: false,
    startState:false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    startArea:'起运地',
    areaInfo:'目的地',
    carnonenum:'',
    carnum:'',
    carhangnum:'',
    carNumber:'请输入车牌号'
  },
  //点击是否同意协议
  iconChange:function(e){
    if (e.currentTarget.dataset.iconv){
      console.log('点击取消的时候')
      this.setData({
        _iconChange: false
      })
    }else{
      console.log('点击确定的时候')
      this.setData({
        _iconChange: true
      })
    }
   
  },
  /***********************起运时间*******************************/
  //点击 弹出选项
  bindChange: function (e) {
    const val = e.detail.value;
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      dateValue: this.data.years[val[0]] + '年' + this.data.months[val[1]] + '月' + this.data.days[val[2]]+'日'
    })
  },
  //取消
  closeDate: function (e) {
    this.setData({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      _date: 0,
      dateValue: date.getFullYear() + '年' + (date.getMonth() + 1 )+ '月' + date.getDate() + '日'  
    })
  },
  //确定
  rightDate: function (e) {
    this.setData({
      _date: 0
    })
  },
  //点击时间  
  clickDate: function (e) {
    this.setData({
      _date: 1
    })
  },
  /***********************投保人*******************************/
  //点击 弹出选项
  clickHolder:function(e){
    this.setData({
      _holder: 1
    })
  },
  //滑动选择
  holderChange: function (e) {
    const val = e.detail.value;
    this.setData({
      holder: this.data.holderArr[val[0]]
    })
  },
  //确定
  rightHolder:function(e){
     if(this.data.holder == '投保人'){
       this.setData({
         holder: this.data.holderArr[0]
       })
     }
    this.setData({
      _holder: 0
    })
  },
  //取消
  closeHolder: function (e) {
    this.setData({
      _holder: 0,
      holder: '投保人',
    })
  },

  /***********************被保险人*******************************/
  //点击 弹窗选项
  clickInsurant: function (e) {
    this.setData({
      _insurant: 1
    })
  },
  //滑动选择
  insurantChange: function (e) {
    const val = e.detail.value;
    this.setData({
      insurant: this.data.insurantArr[val[0]]
    })
  },
  //确定
  rightInsurant: function (e) {
    if (this.data.insurant == '被保险人') {
      this.setData({
        insurant: this.data.insurantArr[0]
      })
    }
    this.setData({
      _insurant: 0
    })
  },
  //取消
  closeInsurant: function (e) {
    this.setData({
      _insurant: 0,
      insurant: '被保险人',
    })
  },
  /***********************货物类型*******************************/
  //点击 弹窗选项
  clickCargo: function (e) {
    this.setData({
      _cargoType: 1
    })
  },
  //滑动选择
  cargoChange: function (e) {
    const val = e.detail.value;
    this.setData({
      cargoType: this.data.cargoArr[val[0]]
    })
  },
  //确定 
  rightCargo: function (e) {
    if (this.data.cargoType == '货物类型') {
      this.setData({
        cargoType: this.data.cargoArr[0]
      })
    }
    this.setData({
      _cargoType: 0
    })
  },
  //取消 
  closeCargo: function (e) {
    this.setData({
      _cargoType: 0,
      cargoType: '货物类型',
    })
  },
/***********************包装类型*******************************/
  //点击  弹出选项
  clickPack: function (e) {
    this.setData({
      _packType: 1
    })
  },
  //滑动选择
  packChange: function (e) {
    const val = e.detail.value;
    this.setData({
      packType: this.data.packArr[val[0]]
    })
  },
  //确定
  rightPack: function (e) {
    if (this.data.packType == '包装类型') {
      this.setData({
        packType: this.data.packArr[0]
      })
    }
    this.setData({
      _packType: 0
    })
  },
  //取消
  closePack: function (e) {
    this.setData({
      _packType: 0,
      packType: '包装类型',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  },
  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
    console.log(that.data)
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
  
  },


  /********起运地********/
  cityStart:function(e){
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddress(false)
    // 将选择的城市信息显示到输入框
    var startArea = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name;
    that.setData({
      startArea: startArea,
    })
  },
  selectStart:function(e){
    var that = this;
    if (that.data.startState) {
      return
    }
    that.startAddress(true)
  },

  // 执行动画
  startAddress: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(60 + 'vh').step()
    }
    that.setData({
      animationAddressStart: that.animation.export(),
      startState: isShow,
    })
  },
  /*********目的地******************/
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this;
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
      that.animation.translateY(60 + 'vh').step()
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
    var areaInfo = that.data.provinces[value[0]].name + ',' + that.data.citys[value[1]].name + ',' + that.data.areas[value[2]].name;
    that.setData({
      areaInfo: areaInfo,
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

  //输入车牌
  inputCar:function(e){
    wx.navigateTo({
      url:'../keyboard/keyboard'
    })
  },

  //预览保单
  previewPolicy:function(e){
    wx.navigateTo({
      url: '../policy/policy',
    })
  }
})