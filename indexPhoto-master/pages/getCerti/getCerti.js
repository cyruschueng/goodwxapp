// pages/getCerti/getCerti.js
var app = getApp();
var tunji = require('../../utils/tunji.js');
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
    console.log("options:", options);
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('bgColor'),
    })
    var that = this;
    var set_number = options.set_number;
    var makerId = options.makerId;
    var uid = options.uid;
    that.setData({
      set_number: set_number,
      makerId: makerId,
      uid: uid, 
      diploma_number: options.diploma_number
    })

    var sign = wx.getStorageSync("sign");
    wx.hideShareMenu({})
    wx.showLoading({
      title: '加载中',
    })
    //生成默契证书
    console.log('https://friend-check.playonwechat.com/api/create-diploma' + '?operator_id=' + wx.getStorageSync("operator_id") + '&sign=' + sign + '&anotherUserId=' + makerId + '&set_number=' + set_number)
    wx.request({
      url: app.data.apiurl+'api/create-diploma' + '?operator_id=' + wx.getStorageSync("operator_id"),
      data: {
        sign: sign,
        anotherUserId: makerId,
        set_number: set_number,
      },
      success: function (res) {
        console.log(res,'生成默契证书');
        wx.hideLoading();
        if(res.data.status){
          var imgUrl = res.data.data.url;
          that.setData({
            imgUrl: imgUrl,
            diploma_number: res.data.diplomaNumber,
            _diploma_number: res.data.diplomaNumber            
          })
        }else{
          wx.showToast({
            title: '当前请求出错，稍后再试',
          })
        }
        
        
      }
    })
  },

  // 我也要玩
  wantSet:function(){
    wx.switchTab({
      url: '../before/before',
    })
  },


  // getCerti: function () {
  //   var service = this.data.service;
  //   var sign = app.data.sign;
  //   wx.request({
  //     url: 'https://friend-check.playonwechat.com/api/service-weixin?sign=' + sign,
  //     method: "GET",
  //     success: function (res) {
  //       var service = res.data.data;

  //       wx.showModal({
  //         title: '温馨提示',
  //         content: '添加客服微信号：' + service + '，发送证书编号数字即可自动生成答案，（提示：证书编号在默契证书图片左下角）',
  //         confirmText: "复制微信",
  //         success: function (res) {
  //           if (res.confirm) {

  //             wx.setClipboardData({
  //               data: service,
  //               success: function (res) {
  //                 wx.getClipboardData({
  //                   success: function (res) {
  //                     wx.showToast({
  //                       title: '复制成功',
  //                       icon: "success",
  //                       duration: 800
  //                     })
  //                   },
  //                   fail: function () {
  //                     wx.showToast({
  //                       title: '复制失败',
  //                       image: "../../resource/images/warn.png",
  //                       duration: 800
  //                     })
  //                   }
  //                 })
  //               }
  //             })

  //           }
  //         }
  //       })
  //     }
  //   })

  // },
  // 取消
  catale(){
      this.setData({
        zindex:false
      })
  },
  // 支付
  ok(e){
    
    wx.showLoading({
      title: '加载中!',
    })
    console.log(e)
    let that = this;
    console.log('支付', that.data.diploma_number)
    wx.request({
      url: app.data.apiurl + "api/create-order?sign=" + wx.getStorageSync("sign") + "&operator_id=" + wx.getStorageSync("operator_id"),
      data: {
        diploma_number: that.data.diploma_number
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
              wx.navigateTo({
                url: '../answer_list/answer_list?diploma_number=' + that.data.diploma_number,
              })
            },
            'fail': function (res) {
                console.log('取消支付')
            }
          })
        }
        that.setData({
          zindex:false
        })
      }
    })
  },
  // 偷看答案，支付
  getCerti(){
    var sign = app.data.sign;
    let that =this;
    
    wx.request({
      url: app.data.apiurl +"api/payment-status?sign=" + wx.getStorageSync("sign") + "&operator_id=" + wx.getStorageSync("operator_id"),
      data:{
        diploma_number: that.data.diploma_number
      },
      success:function(res){
        console.log("是否需要支付",res);
        console.log("cansee:",res.data.data.can_peep_answer);
        if(res.data.status){
          var canSee = res.data.data.can_peep_answer;
          if(canSee == false){
            console.log(canSee)
            that.setData({
              zindex: true
            })
          }else{
           wx.navigateTo({
             url: '../answer_list/answer_list?diploma_number='+that.data.diploma_number,
           })
          }
        }
      }
    })
    
  },
  
  prewImg: function () {
    var that = this;
    var imgUrl = that.data.imgUrl;
    wx.previewImage({
      current: imgUrl, // 当前显示图片的http链接
      urls: [imgUrl] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('bgColor'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      sex: wx.getStorageSync('sex'),//"sex":1,//1 男 2女
    })
    var sign = app.data.sign;
    var makerId = that.data.makerId;
    var set_number = that.data.set_number;
    var uid = that.data.uid;
    wx.request({
      url: 'https://friend-check.playonwechat.com/api/quality-checking-list',
      data: {
        sign: sign,
        problemMakerId: uid,
        set_number: set_number
      },
      success:function(res){
        console.log("质检列表",res);
        var qualityCheckingList = res.data.qualityCheckingList;
        that.setData({
          array: qualityCheckingList
        })
      }
    })

  },
  backHome: function () {
    wx.switchTab({
      url: '../before/before'
    })
  },
  // 偷看答案，添加客服
  // getCerti:function(){
  //   var service = this.data.service;
  //   var sign = app.data.sign;
  //   wx.request({
  //     url: 'https://friend-check.playonwechat.com/api/service-weixin?sign=' + sign + '&operator_id=' + wx.getStorageSync("operator_id"),
  //     method: "GET",
  //     success: function (res) {
  //       var service =  res.data.data;

  //       wx.showModal({
  //         title: '温馨提示',
  //         content: '添加客服微信号：'+ service +'，发送证书编号数字即可自动生成答案，（提示：证书编号在默契证书图片左下角）',
  //         confirmText: "复制微信",
  //         success: function (res) {
  //           if (res.confirm) {

  //             wx.setClipboardData({
  //               data: service,
  //               success: function (res) {
  //                 wx.getClipboardData({
  //                   success: function (res) {
  //                     wx.showToast({
  //                       title: '复制成功',
  //                       icon: "success",
  //                       duration: 800
  //                     })
  //                   },
  //                   fail: function () {
  //                     wx.showToast({
  //                       title: '复制失败',
  //                       image: "../../resource/images/warn.png",
  //                       duration: 800
  //                     })
  //                   }
  //                 })
  //               }
  //             })

  //           }
  //         }
  //       })
  //     }
  //   })

  // }
})