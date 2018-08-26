//index.js
//获取应用实例
var app = getApp();
var api = require('../../api.js')
var system = require('../../utils/system.js')
var util = require('../../utils/util.js')

var gender=0,
    year,
    month,
    day,
    hour='00',
    min='00',
    timeType=0,
    flag=0;

Page({
  data: {
      sex:app.config.sex,
      disabled:false,
      isLoading: false,
      lifa:app.config.lifa,
      lifaIndex:0
  },
    onShareAppMessage: function () {
        var shareText = '免费起名，生辰八字起名，宝宝起名。名字打分，三才配置解析和五格命理分析';
        return {
            title: shareText,
            path: "/pages/ceming/ceming"
        }
    },
  onLoad: function () {
      this.setData({
          //date: currentdate.toString()
      })
  },
    sexChange: function(e) {
      console.log(e)
        this.setData({
            sexIndex: e.detail.value
        })
        gender = e.detail.value;
    },
    lifaChange: function(e) {
      console.log(e)
        this.setData({
            lifaIndex: e.detail.value
        })
        timeType = e.detail.value
    },
    bindTimeChange: function (e) {
        var timeArr = e.detail.value.split(":")
        this.setData({
            time: e.detail.value
        })
        hour = timeArr[0]
        min  = timeArr[1]
    },
    bindDateChange: function (e) {
        var dateArr = e.detail.value.split("-")
        this.setData({
            date: e.detail.value
        })
        year = dateArr[0]
        month  = dateArr[1]
        day  = dateArr[2]
        flag = 1
    },
    formSubmit: function (e) {
        var fName = e.detail.value.fName;
        var lName = e.detail.value.lName;

        var reg = /^[\u4E00-\u9FA5]+$/;

        if(!fName){
             wx.showToast({
                 image:'../../styles/info_icon.png',
                 title: '姓氏必填哦',
                 duration: 1000
             });
            return;
        }
        if(fName.length>2){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '姓氏不能多于2个中文字哦',
                duration: 1000
            });
            return;
        }
        if(!reg.test(fName)){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '姓氏只能是中文字哦',
                duration: 1000
            });
            return;
        }

        if(!lName){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '名字必填哦',
                duration: 1000
            });
            return;
        }
        if(lName.length>2){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '名字不能多于2个中文字哦',
                duration: 1000
            });
            return;
        }
        if(!reg.test(lName)){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '名字只能是中文字哦',
                duration: 1000
            });
            return;
        }


        wx.setStorageSync("fName", fName)
        wx.setStorageSync("gender", gender)
        wx.setStorageSync("flag", flag)
        wx.setStorageSync("timeType", timeType)
        wx.setStorageSync("year", year)
        wx.setStorageSync("month", month)
        wx.setStorageSync("day", day)
        wx.setStorageSync("hour", hour)
        wx.setStorageSync("min", min)

        wx.navigateTo({
            url: '/pages/detail/detail?lName='+lName
        })
    },
})
