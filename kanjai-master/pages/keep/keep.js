const app = getApp()
const apiurl = 'https://pet.zealcdn.cn/index.php/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({
  data: {
    page:1
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    wx.request({
      url: apiurl + "bargain/bargain-record?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log(res)
        let status = res.data.status;
        if (status==1){
          //时间戳转化
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
            res.data.data[i].time = toDate(res.data.data[i].time)
          }
          console.log("砍价列表", res.data.data);
          that.setData({
            informAll: res.data.data
          })
        }else{
          that.setData({
            informAll: false
          })
        }
        
        wx.hideLoading()
      }
    })
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    let sign = wx.getStorageSync('sign');
    let oldGoodsList = that.data.informAll;
    console.log("oldGoodsList:" + oldGoodsList);
    var oldPage = that.data.page;
    var reqPage = oldPage + 1;
    console.log(that.data.page);
    wx.request({
      url: apiurl + "bargain/bargain-record?sign=" + sign + '&operator_id=' + app.data.kid,
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
        let status = res.data.status;
        if (status == 1) {
          
          //时间戳转化
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
            res.data.data[i].time = toDate(res.data.data[i].time)
          }
          var informAll = res.data.data;
          that.setData({
            informAll: res.data.data
          })
          if (informAll.length == 0) {
            tips.alert('没有更多数据了');
            return;
          }
          var page = oldPage + 1;
          var newContent = oldGoodsList.concat(informAll);
          that.setData({
            informAll: newContent,
            page: reqPage
          })
          wx.hideLoading();
          if (newContent == undefined) {
            tips.alert('没有更多数据')
          }
        } else {
          tips.alert('没有更多数据了');
        }

      }
    })
    wx.hideLoading()
  }

})