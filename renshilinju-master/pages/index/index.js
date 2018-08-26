//index.js
var tcity = require("../../utils/citys.js");
var app = getApp()
var url = app.globalData.baseAPI;

Page({
  data: {
    provinces: ['北京','上海','广州','深圳'],
    province: "北京",
    citys: [],
    city: "朝阳",
    countys: [],
    county: '安贞',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: true,
    id:1,
    Community: '',  //小区
    resultCity: '',  //如：朝阳区
    resultCountys: '', //如：望京
  },
  bindChange: function (e) {
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if(val[0] != t[0]){
      let j = val[0]
      let citys= []
      let countys = []
      for (let i = 0; i < cityData[j].subs.length; i++) {
        citys.push(cityData[j].subs[i].name)
      }
      for (let i = 0; i < cityData[j].subs[0].subs.length; i++) {
        countys.push(cityData[j].subs[0].subs[i])
      }
      this.setData({
        province:this.data.cityData[j].name,
        city:citys[0],
        citys: citys,
        countys: countys,
        county: countys[0].name,
        values: val,
        value: [val[0], 0, 0]
      })
    }

    if (val[1] != t[1]) {
      const countys = [];
      var county="";
      for (let i = 0; i < cityData[val[0]].subs[val[1]].subs.length; i++) {
        countys.push(cityData[val[0]].subs[val[1]].subs[i]);
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].subs[val[1]].subs[0].name,
        countys: countys,
        id: cityData[val[0]].subs[val[1]].subs[0].code,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      this.setData({
        county: this.data.countys[val[2]].name,
        values: val,
        id: this.data.countys[val[2]].code
      })
      return;
    }
  },

  open:function(){
    this.setData({
      condition:!this.data.condition
    })
  },

  confirm: function (e) {
    var index = this.data.values;
    var province = this.data.province;
    var chooseCity = this.data.citys
    var chooseCounty = this.data.countys;
    var resultCity = this.data.citys[index[1]];
    var resultCountys = this.data.countys[index[2]].name;

    wx.navigateTo({
      url: 'community/community?province=' + province + '&resultCity=' + resultCity + '&resultCountys=' + resultCountys + '&id=' + this.data.id,
    })
  },

  querenxq:function(){
    var userInfo = app.globalData.userInfo;
    var temp = app.globalData.temp;

    wx.request({
      url: url + '/users/' + userInfo.id,
      method: 'PUT',
      header: {
        'Accept': "*/*",
        'Authorization': 'Token ' + userInfo.thirdkey + ',userid=' + userInfo.id
      },
      data: {
        xiaoqu_id: temp.xqid
      },
      success: function (res) {
        userInfo.xqid = temp.xqid
        userInfo.xqname = temp.xqname
        userInfo.sqname = temp.sqname
        wx.setStorage({
          "key": "userInfo",
          "data": userInfo
        })
        app.globalData.userInfo = userInfo;

        wx.reLaunch({
          url: '/pages/home/home',
        })
      }
    })
  },
  
  onShow:function(){
    var temp = app.globalData.temp
    if(temp.xqname != null){
      this.setData({
        condition: !this.data.condition
      })
    }
  },
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: '加入认识邻居'
    })
    var that = this;
    tcity.init(that);
    var cityData = that.data.cityData;
    const citys = [];
    const countys = [];

    if (JSON.stringify(options) != "{}") {
      that.setData({
        province: options.province,
        city: options.resultCity,
        county: options.resultCountys,
        Community: options.Community,
      })
    }

    var userInfo = app.globalData.userInfo
    that.setData({
      name: userInfo.name,
      avatar: userInfo.avatar,
      gender: userInfo.gender
    })

    for (let i = 0; i < cityData[0].subs.length; i++) {
      citys.push(cityData[0].subs[i].name)
    }

    for (let i = 0; i < cityData[0].subs[0].subs.length; i++) {
      countys.push(cityData[0].subs[0].subs[i])
    }

    that.setData({
      'citys': citys,
      'countys': countys
    })
    console.log('初始化完成');
  },


})
