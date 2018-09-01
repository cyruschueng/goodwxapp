// pages/ranking/ranking.js
var app = getApp();
var util = require('../../utils/util.js');
import tips from '../../utils/tips.js'
Page({
  data: {
    type:'friend',
    page: 1,
    formNum:0
  },
  onLoad: function (options) {
    wx.updateShareMenu({
      withShareTicket: true,
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
      let that = this;
      that.setData({
        allPoint: wx.getStorageSync('allPoint')
      })
      wx.request({
        url: app.data.apiurl + "guessipk/rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          type: that.data.type,
          guess_type: 'idiom',
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
            console.log(res.data.msg)
          }
        }
      })
      // 我的排名
      wx.request({
        url: app.data.apiurl + "guessipk/my-rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
        data: {
          type: that.data.type,
          guess_type: 'idiom'
        },
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("我的排名:", res);
          var status = res.data.status;
          if (status == 1) {
            that.setData({
              mine: res.data.data
            })
          } else {
            console.log(res.data.msg)
          }
        }
      })
  },
  navbar(e) {
    let that = this;
    that.setData({
      type: e.currentTarget.dataset.type
    })
    wx.request({
      url: app.data.apiurl + "guessipk/rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        type: that.data.type,
        guess_type: 'idiom',
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
          console.log(res.data.msg)
        }
      }
    })
    // 我的排名
    wx.request({
      url: app.data.apiurl + "guessipk/my-rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        type: that.data.type,
        guess_type: 'idiom'
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("我的排名:", res);
        var status = res.data.status;
        if (status == 1) {
          that.setData({
            mine: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }
      }
    })
  },
  // 下拉分页
  onReachBottom: function () {
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
      url: app.data.apiurl + "guessipk/rank?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("kid"),
      data: {
        type: that.data.type,
        guess_type: 'idiom',
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
    let formNum = that.data.formNum + 1;
    if (formNum > 6) {
      return;
    }
    util.formSubmit(e);
    that.setData({
      formNum: formNum
    })
  },
  // 转发群加金币 个人不加
  onShareAppMessage() {
    let that = this;
    let sign = wx.getStorageSync("sign");
    return {
      title: '不服来战',
      path: '/pages/share/share',
      success(res) {
        console.log("shareTickets:", res);
        console.log("shareTickets:", res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          complete(res) {
            console.log(res,'请求加金币接口');
            if (res.encryptedData){ //分享群加积分
              wx.request({
                url: app.data.apiurl + "guessipk/share-add-point?sign=" + sign + '&operator_id=' + app.data.kid,
                data: {
                  guess_type: 'idiom'
                },
                header: {
                  'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                  var status = res.data.status;
                  if (status == 1) {
                    that.setData({
                      point: res.data.data.point + that.data.allPoint.share_point 
                    })
                    wx.setStorageSync('point', res.data.data.point + that.data.allPoint.share_point)
                    tips.success('积分+' + that.data.allPoint.share_point);
                  } else {
                    //console.log(res.data.msg)
                    //tips.error(res.data.msg)
                  }
                }
              })
            }
           
          }

        })
      }
    }
  },
})