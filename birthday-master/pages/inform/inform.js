// pages/inform/inform.js
const app = getApp();
const common = require('../../common.js');
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js' 
Page({
  data: {
    before:false
  },
  onLoad: function (options) {
    let day = decodeURIComponent(options.day);
    wx.setStorageSync('day', day); 
    this.setData({
       day : day      
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 历史上的今天详情
    wx.request({
      url: apiurl + "birth/day-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data:{
          day: that.data.day
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("历史上的今天详情:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            history: res.data.data,
            history1: res.data.data.day_list[0],
            history2: res.data.data.day_list.slice(1)
          })
          console.log(that.data.history1);
          console.log(that.data.history2);
        } else {
          console.log(res.data.msg)
        }
      }
    })
    wx.hideLoading();
  },
  //inforBefore
  inforBefore(e){
    let that = this;
    let _day1 ='';
    let _money1 ='';
    let sign = wx.getStorageSync('sign');
    var strs = new Array(); //定义一数组 存放日期
    strs = that.data.day.split("/"); //字符分割
    let _money = strs[0]; 
    let _day = strs[1];
    console.log("_money:", _money);
    console.log("_day:", _day);
    if (_day>1){
      _day1 = _day - 1;
      _money1 = _money;
      // console.log(_day1);
      // console.log(_money1);
    }else{
      _money1 = _money-1; 
      // 月份总天数
      if (_money1 == 1 || _money1 == 3 || _money1 == 5 || _money1 == 7 || _money1 == 8 || _money1 == 10 || _money1 == 12) {
         _day1 = 31;
      } else if (_money1 == 4 || _money1 == 6 || _money1 == 9 || _money1 == 11) {
         _day1 = 30;
      } else if (_money1 == 2) {
        // 计算是否是闰年,如果是二月份则是29天
        let today = new Date();//获得当前日期
        let year = today.getFullYear();//年
        if ((year - 2000) % 4 == 0) {
          _day1 = 29;
        } else {
          _day1 = 28;
        }
      };
    }
    let day = _money1 +'/'+ _day1;
    that.setData({
      day: _money1 + '/' + _day1
    })
    console.log(that.data.day);
    wx.request({
      url: apiurl + "birth/day-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        day: that.data.day
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("历史上的Before:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            history: res.data.data,
            history1: res.data.data.day_list[0],
            history2: res.data.data.day_list.slice(1),
          })
        } else {
          console.log(res.data.msg)
        }
        that.setData({
            before: true
        })
      }
    })
  },  
  inforAfter(e) {
    console.log('历史inforAfter');
    let that = this;
    let _day1 = '';
    let _money1 = '';
    let sign = wx.getStorageSync('sign');
    var strs = new Array(); //定义一数组 存放日期
    strs = that.data.day.split("/"); //字符分割
    let _money = strs[0];
    let _day = strs[1];
    console.log("_money:", _money);
    console.log("_day:", _day);
    _money1 = _money;
    _day1 = _day;
    let strongeDay = wx.getStorageSync('day'); 
    if (that.data.day == strongeDay){
       tips.alert('已经是今天');
       that.setData({
         before:false
       })
        return;
    }
    // 月份总天数
    if (_money1 == 1 || _money1 == 3 || _money1 == 5 || _money1 == 7 || _money1 == 8 || _money1 == 10 || _money1 == 12) {
      //_day1 = 31;
      console.log("dayss", "31")
      if (_day1 >= 31){
        _money = parseInt(_money) + 1;
        _day1 = 1;
      }else{
        _day1 = parseInt(_day1) + 1
      }
      
    } else if (_money1 == 4 || _money1 == 6 || _money1 == 9 || _money1 == 11) {
      //_day1 = 30;
      console.log("dayss","30")
      if (_day1 >= 30) {
        _money = parseInt(_money) + 1;
        _day1 = 1;
      } else {
        _day1 = parseInt(_day1) + 1
      }
    } else if (_money1 == 2) {
        // 计算是否是闰年,如果是二月份则是29天
        let today = new Date();//获得当前日期
        let year = today.getFullYear();//年
        if ((year - 2000) % 4 == 0) {
          _day1 = 29;
          console.log("dayss", "29")
          if (_day1 >= 29) {
            _money = parseInt(_money) + 1;
            _day1 = 1;
          } else {
            _day1 = parseInt(_day1) + 1
          }
        } else {
          console.log("dayss", "28")
          _day1 = 28;
          if (_day1 >= 28) {
            _money = parseInt(_money) + 1;
            _day1 = 1;
          } else {
            _day1 = parseInt(_day1) + 1
          }
        }
    };
    
    let day = _money1 + '/' + _day1;
    that.setData({
      day: _money1 + '/' + _day1
    })
    console.log(that.data.day);
    wx.request({
      url: apiurl + "birth/day-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        day: that.data.day
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("历史上的After:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            history: res.data.data,
            history1: res.data.data.day_list[0],
            history2: res.data.data.day_list.slice(1),
          })
        } else {
          console.log(res.data.msg)
        }
        that.setData({
          before: true
        })
      }
    })
  }
})