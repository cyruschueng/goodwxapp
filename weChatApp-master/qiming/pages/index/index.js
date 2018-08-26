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
    searchType=0,
    len=2,
    flag=0;

Page({
  data: {
      sex:app.config.sex,
      disabled:false,
      isLoading: false,
      lifa:app.config.lifa,
      pianhao1Index:1,
      pianhao2Index:0,
      lifaIndex:0,
      pianhao1:app.config.pianhao1,
      pianhao2: app.config.pianhao2
  },
    onShareAppMessage: function () {
        var shareText = '免费起名，生辰八字起名，宝宝起名。名字打分，三才配置解析和五格命理分析';
        return {
            title: shareText,
            path: "/pages/index/index"
        }
    },
  onLoad: function () {
    api.empty(function (data) {
    },function () {
    },function () {
    })
      this.setData({
          //date: currentdate.toString()
      })
  },
    sexChange: function(e) {
        this.setData({
            sexIndex: e.detail.value
        })
        gender = e.detail.value;
    },
    lifaChange: function(e) {
        this.setData({
            lifaIndex: e.detail.value
        })
        timeType = e.detail.value
    },
    pianhao1Change: function(e) {
        this.setData({
            pianhao1Index: parseInt(e.detail.value)-1
        })
        searchType=0
        len = parseInt(e.detail.value)
        console.log(len)
        if(len==1){
            this.setData({
                disabled: true
            })
            this.setData({
                pianhao2Index: 0
            })
        }else{
            this.setData({
                disabled: false
            })
        }
    },
    pianhao2Change: function(e) {
      console.log(e.detail.value)
        this.setData({
            pianhao2Index: e.detail.value
        })
        if(e.detail.value==1){
            this.setData({
                wordTitle: '首字'
            })
        }
        else if(e.detail.value==2){
            this.setData({
                wordTitle: '尾字'
            })
        }else{
            this.setData({
                wordTitle: ''
            })
        }
        searchType = e.detail.value
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
        var searchInfo = e.detail.value.searchInfo;

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

        if((searchType == 1 )&&!searchInfo){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '首字必填哦',
                duration: 1000
            });
            return;
        }
        if((searchType == 2)&&!searchInfo){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '尾字必填哦',
                duration: 1000
            });
            return;
        }

        if((!reg.test(searchInfo) || searchInfo.length>1) && (searchType == 1 )){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '首字只能是一个中文字哦',
                duration: 1000
            });
            return;
        }
        if((!reg.test(searchInfo) || searchInfo.length>1) && (searchType == 2 )){
            wx.showToast({
                image:'../../styles/info_icon.png',
                title: '尾字只能是一个中文字哦',
                duration: 1000
            });
            return;
        }


        this.setData({isLoading: true });
        var that =this;
        wx.showNavigationBarLoading();
        wx.showToast({
            title: 'Loading……',
            duration:2000,
            icon: 'loading'
        });
        api.qiming(fName,year,month,day,hour,min,timeType,gender,searchType,searchInfo,len,flag, function (res) {
            console.log(res)
            that.setData({isLoading: false});

                wx.setStorageSync("qiming_info",res.data[0])

                var list = [];
                for (var i = 0; i < res.data[1].length; i++) {
                    var _arr = res.data[1][i];
                    for (var j = 0; j < _arr.length; j++) {
                        list.push(_arr[j])
                    };
                };

                wx.setStorageSync("qiming_data", list)

                wx.setStorageSync("fName", res.fName)
                wx.setStorageSync("gender", res.gender)
                wx.setStorageSync("flag", res.flag)
                wx.setStorageSync("timeType", res.timeType)
                wx.setStorageSync("year", res.year)
                wx.setStorageSync("month", res.month)
                wx.setStorageSync("day", res.day)
                wx.setStorageSync("hour", res.hour)
                wx.setStorageSync("min", res.min)
                wx.hideNavigationBarLoading();
                wx.hideToast();
                console.log(that.data.pianhao1)
                console.log(that.data.pianhao1Index)
                console.log(that.data.pianhao1[that.data.pianhao1Index])
                wx.navigateTo({
                    url: '/pages/list/list?xingshi='+that.data.pianhao1[that.data.pianhao1Index].name+'&pianhao='+that.data.pianhao2[that.data.pianhao2Index].name+'&xingbie='+that.data.sex[gender].name
                })

        },function (res) {
            that.setData({isLoading: false});
            wx.hideNavigationBarLoading();
            wx.hideToast();
            if(res){
                wx.showToast({
                    image:'../../styles/info_icon.png',
                    title: '输入有误，请检查下哦',
                    duration: 1000
                });
            }
        });
    },
})
