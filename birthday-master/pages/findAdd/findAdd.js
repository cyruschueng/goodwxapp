// pages/use/use.js
let tcity = require("../../utils/citys.js");
let app = getApp();
let sign = wx.getStorageSync('sign');
let common = require('../../common.js');
let apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js' 
Page({
  data: {
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    date: '点击设置生日',
    gender:1,
    birth_year: '2016',
    birth_month: '09',
    birth_day: '01'
  },
  onLoad: function (options) {
    console.log("onLoad");
    let that = this;
    tcity.init(that);
    let cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    let userInfo = wx.getStorageSync('userInfo');
    that.setData({
        provinces: provinces,
        citys: citys,
        countys: countys,
        province: cityData[0].name,
        city: cityData[0].sub[0].name,
        county: cityData[0].sub[0].sub[0].name,
        userInfo: userInfo
    })
    console.log('初始化完成');
  },
  onShow(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let keyword = wx.getStorageSync('keyword');
    that.setData({
      keyword: keyword
    })
  },
  //地址
  bindChange:function (e) {
    console.log(e);
    let val = e.detail.value
    let t = this.data.values;
    let cityData = this.data.cityData;
    if (val[0] != t[0]) {
      const citys = [];
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }
      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })
      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];
      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }
  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  // name
  nameOnTouch:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  //male
  male(e){
    // gender性别0未知 1男 2女
    let gender = e.currentTarget.dataset.gender;
    this.setData({
      gender: gender
    })
  },
  // 生日
  bindDateChange: function (e) {
    console.log(e.detail.value);
    let date = e.detail.value;
    var strs = new Array(); //定义一数组 
    strs = date.split("-"); //字符分割 
    this.setData({
      date: e.detail.value,
      birth_year: strs[0],
      birth_month: strs[1],
      birth_day: strs[2]
    })
  },
  // 头像
  niceimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({ //上传图片
          url: apiurl + "red/upload-image?sign=" + sign + ' & operator_id=' + app.data.kid,
          data: {
            file: tempFilePaths
          },
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res);
            let data = JSON.parse(res.data);
            if (data.status == 1) {
              tempFilePaths = data.data;
              that.setData({
                tempFilePaths: data.data
              })
              console.log("tempFilePaths:", tempFilePaths);
            } else {
              tips.alert(res.data.msg)
            }

          }
        })
      }
    })
  },
  //phone
  phoneOnTouch(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //relative
  relative(){
    console.log("relation");
    // redirectTo
    wx.navigateTo({
      url: '../relation/relation'
    })
  },
  
  // 保存
  save(){
    
    let that = this;
    let sign = wx.getStorageSync('sign');
    //判断
    if (!that.data.name) {
      tips.alert("您没有填写姓名");
      return false;
    }
    if (!that.data.gender) {
      tips.alert("您没有选择性别");
      return false;
    }
    if (!that.data.date) {
      tips.alert("您没有选择生日");
      return false;
    }
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(that.data.phone)) {
      tips.alert("手机号有误！");
      return false;
    }
    if (!myreg.test(that.data.phone)) {
      tips.alert("手机号有误！");
      return false;
    }
    tips.toast('保存中')
    //保存朋友信息
        wx.request({
          url: apiurl + "birth/manual-add-birth?sign=" + sign + '&operator_id=' + app.data.kid + '&type=friend',
          data: {
            name: that.data.name,
            birth_year: that.data.birth_year,
            birth_month: that.data.birth_month,
            birth_day: that.data.birth_day,
            gender: that.data.gender,
            phone: that.data.phone,
            day_type: 'solar',
            relation: that.data.keyword,
            avatar: that.data.tempFilePaths,
            birth_time: ''
          },
          header: {  //POST
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (res) {
            console.log("保存朋友:", res);
            var status = res.data.status;
            if (status == 1) {
              tips.success('保存成功');
              wx.removeStorageSync('keyword');
              that.setData({
                mf_id: res.data.data,
                keyword: ''
              })
              // 跳转
              wx.redirectTo({
                url: '../hinform/hinform?mf_id=' + that.data.mf_id + '&url=' + that.data.tempFilePaths
              })
            } else {
              console.log(res.data.msg)
            }
          }
        })
    wx.hideLoading()
  },
})
