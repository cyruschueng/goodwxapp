// pages/answer_list/answer_list.js
var tunji = require('../../utils/tunji.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: wx.getStorageSync('background'),
    backgroundColor: wx.getStorageSync('bgColor'),
    border: wx.getStorageSync('border')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('bgColor'),
    })
    var source = options.source;
    that.setData({
      source: options.source,
      diploma_number: options.diploma_number
    })
    if (options.diploma_number){
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: app.data.apiurl + 'api/peep-answer?diploma_number=' + options.diploma_number + '&sign=' + wx.getStorageSync('sign'),
        success: function (res) {
          console.log("答案", res);
          if (res.data.status) {
            wx.hideLoading();
            var list = res.data.data.question_answer_list;
            that.setData({
              list: list
            })
          } else {
            wx.showToast({
              title: res.data.msg,
            })
          }
          wx.hideLoading()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var sign = wx.getStorageSync("sign");
    var diploma_number = wx.getStorageSync("diploma_number");
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('bgColor'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      sex: wx.getStorageSync('sex'),//"sex":1,//1 男 2女
    })
    var source = that.data.source;
    if (source == "end"){
      wx.request({
        url: app.data.apiurl + 'api/peep-answer?diploma_number=' + diploma_number + '&sign=' + sign,
        success: function (res) {
          console.log("答案", res);
          if (res.data.status) {
            wx.hideLoading();
            var list = res.data.data.question_answer_list;
            that.setData({
              list: list
            })
          }
        }
      })
    }
  },


  getNumber(e){
    var number = e.detail.value;
    this.setData({
      number
    })
  },

  search(){
    var that = this;
    var number = this.data.number;
    var sign = wx.getStorageSync("sign");
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: app.data.apiurl + 'api/peep-answer?diploma_number=' + number + '&sign=' + sign,
      success: function (res) {
        console.log("答案", res);
        if (res.data.status) {
          wx.hideLoading();
          var list = res.data.data.question_answer_list;
          that.setData({
            list: list
          })
        }else{
          wx.showToast({
            title: res.data.msg,
          })
          if (res.data.msg=='还未支付偷看答案费用，无法偷看答案'){
              that.setData({
                zindex:true
              })
          }
        }
      }
    })
  },
  // 取消
  catale() {
    this.setData({
      zindex: false
    })
  },
  // 支付
  ok(e) {
    wx.showLoading({
      title: '加载中!',
    })
    console.log(e)
    let that = this;
    wx.request({
      url: app.data.apiurl + "api/create-order?sign=" + wx.getStorageSync("sign") + "&operator_id=" + wx.getStorageSync("operator_id"),
      data: {
        diploma_number: that.data.number
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res);
        if (res.data.status) {
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (res) {
              console.log('支付成功!')
              // wx.navigateTo({
              //   url: '../answer_list/answer_list',
              // })
              wx.request({
                url: app.data.apiurl + 'api/peep-answer?diploma_number=' + that.data.number + '&sign=' + wx.getStorageSync('sign'),
                success: function (res) {
                  console.log("答案", res);
                  if (res.data.status) {
                    wx.hideLoading();
                    var list = res.data.data.question_answer_list;
                    that.setData({
                      list: list
                    })
                  } else {
                    wx.showToast({
                      title: res.data.msg,
                    })
                  }
                }
              })
            },
            'fail': function (res) {
              console.log('取消支付')
            }
          })
        }
        that.setData({
          zindex: false
        })
      }
    })
  },
})