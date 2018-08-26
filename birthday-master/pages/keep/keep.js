let tcity = require("../../utils/citys.js");
let app = getApp();
let sign = wx.getStorageSync('sign');
let common = require('../../common.js');
let apiurl = 'https://friend-guess.playonwechat.com/';
import tips from '../../utils/tips.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 明细
    wx.request({
      url: apiurl + "birth/account-details?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        count: 20
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("明细:", res);
        var status = res.data.status;
        if (status == 1) {
          function toDate(number){
            var n = number * 1000;
            var date = new Date(n);
            console.log("date", date)
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
          }
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].add_time = toDate(res.data.data[i].add_time)
          }
          that.setData({
            tableCell: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  /**
  *   下拉分页
  */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    let sign = wx.getStorageSync('sign');
    let oldGoodsList = that.data.tableCell;
    console.log("oldGoodsList:" + oldGoodsList);
    var oldPage = that.data.page;
    var reqPage = oldPage + 1;
    console.log(that.data.page);
    wx.request({
      url: apiurl + "birth/account-details?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        page: reqPage,
        count: 10
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("新可能认识的人:", res);
        if (tableCell.length == 0) {
          tips.alert('没有更多数据了');
          return;
        }
        function toDate(number) {
          var n = number * 1000;
          var date = new Date(n);
          console.log("date", date)
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].add_time = toDate(res.data.data[i].add_time)
        }
        let tableCell = res.data.data; 
        that.setData({
          tableCell: res.data.data
        })
        
        var page = oldPage + 1;
        var newContent = oldGoodsList.concat(tableCell);
        that.setData({
          tableCell: newContent,
          page: reqPage
        })
        wx.hideLoading();
        if (newContent == undefined) {
          tips.alert('没有更多数据')
        }
      }
    })
    wx.hideLoading()
  }

  
 
})