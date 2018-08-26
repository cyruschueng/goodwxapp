var app = getApp()
Page({
  data: {
    city: "上海",
    i: 0,
    j: 0,
    arrayPro: ["河南省", "河北省", 3, 4, 5],
    arrayCity: ["驻马店", "上海", '5'],
    show: true,
    photoURL: '../../img/photo.jpg',
    imgUrls: [
      '../../img/list1.png',
      '../../img/list2.png',
      '../../img/list3.png'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular:true,
    content:[
      '百公里综合油耗4.2L/100km,一箱油可行驶超过1000公里(根据邮箱容积45L计算,实际情况可能有所差异)',
      '丰田油电混合双擎动力汽车全球销售突破1000万辆',
      '百公里综合工况油耗值为特定条件下测定所得,具体油耗会由于使用环境,驾驶方法等有所变化.'
    ],
    arrayModel: ["选择试驾车型", "河北省", 3, 4, 5],
    arrayS: ["选择试驾4S店", "上海", '5'],
    iModel: 0,
    iS:0,
    // 电话
    tel:"010-62598989",
    // 地址
    address:"北京市海淀区杏石口路78号",
    // 4s店信息
    fourSItem: [
      { value: '1', checked: 'true', fourSTitle: "北京市海淀区杏石路78号", fourSCon:"北京市海淀区杏石路78号,010-625090909"},
      { value: '2', fourSTitle: "北京市海淀区杏石路78号", fourSCon: "北京市海淀区杏石路78号,010-625090909" },
      { value: '3', fourSTitle: "北京市海淀区杏石路78号", fourSCon: "北京市海淀区杏石路78号,010-625090909" },
      { value: '4', fourSTitle: "北京市海淀区杏石路78号", fourSCon: "北京市海淀区杏石路78号,010-625090909"},
      { value: '5', fourSTitle: "北京市海淀区杏石路78号", fourSCon: "北京市海淀区杏石路78号,010-625090909"},
      { value: '6', fourSTitle: "北京市海淀区杏石路78号", fourSCon: "北京市海淀区杏石路78号,010-625090909"},
    ],
    // 地图显示
    showMap:false,
    // map
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    showLogin: false
  },
  // 换头像
  updatePhoto: function () {
    this.setData({
      showLogin: true
    })
  },
  close2: function () {
    this.setData({
      showLogin: false
    })
  },
  switchCity: function () {
    this.setData({
      show: (!this.data.show)
    })
  },
  bindProChange: function (e) {
    this.setData({
      i: e.detail.value
    })
  },
  bindCityChange: function (e) {
    this.setData({
      j: e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数 
  
      console.log(options.id);
  },
  // 选择车型和4S店
  bindModelChange: function (e) {
    this.setData({
      iModel: e.detail.value
    })
  },
  bindSChange: function (e) {
    this.setData({
      iS: e.detail.value
    })
  },
  // 下一步
  next:function(){
    wx.navigateTo({
      url: '../regInfo/regInfo',
    })
  },
// 地图显示
  showMap:function(){
    this.setData({
      showMap:true
    })
  },
  close: function () {
    this.setData({
      showMap: false
    })
  }
})

