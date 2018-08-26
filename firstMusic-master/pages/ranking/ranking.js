// pages/ranking/ranking.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({

  data: {
    type:'friend',
    page: 1,
    formNum: 0
  },
  onLoad: function (options) {
  
  },
  onShow: function () {
    let that = this;
    wx.request({
      url: app.data.apiurl2 + "guessmc/rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        type: that.data.type,
        guess_type:'music',
        limit: 20
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("提示信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
              list:res.data.data
          })
        } else {
          that.setData({
            list: false
          })
        }
      }
    })
  },
  navbar(e){
    let that = this;
    that.setData({
      type : e.currentTarget.dataset.type
    })
    wx.request({
      url: app.data.apiurl2 + "guessmc/rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        type: that.data.type,
        guess_type: 'music',
        limit: 20
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("提示信息:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            list: res.data.data
          })
        } else {
          that.setData({
            list: false
          })
        }
      }
    })
  },
  // 下拉分页
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("下拉分页")
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    var that = this;
    var oldGoodsList = that.data.list;
    console.log("oldGoodsList:" + oldGoodsList);
    var list = [];
    var oldPage = that.data.page;
    var reqPage = oldPage + 1;
    console.log(that.data.page);
    wx.request({
      url: app.data.apiurl2 + "guessmc/rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        type: that.data.type,
        guess_type: 'music',
        limit: 20,
        page: reqPage
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log('新res', res);
        var list = res.data.data;
        if (res.data.msg == 0) {
          tips.alert('没有更多数据了')
        }
        if (res.data.data.length == 0)
          tips.alert('没有更多数据了')
        var page = oldPage + 1;
        var newContent = oldGoodsList.concat(list);

        that.setData({
          list: newContent,
          page: reqPage
        });
        wx.hideLoading();
        if (newContent == undefined) {
          wx.showToast({
            title: '没有更多数据',
            duration: 800
          })
        }
        console.log("newContent:" + that.data.newContent);

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    });
  },
  // 保存formid
  formSubmit(e) {
    let that = this;
    let form_id = e.detail.formId;
    let formNum = that.data.formNum + 1;
    if (formNum > 3) {
      return;
    }
    wx.request({
      url: "https://w.kuaiduodian.com/api/save-form?sign=" + wx.getStorageSync('sign') + '&operator_id=' + app.data.kid,
      data: {
        form_id: form_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          formNum: formNum
        })
      }
    })
  },
})