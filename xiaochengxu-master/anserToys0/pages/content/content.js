// pages/content/content.js
const itemUrl = require('../../config').config.itemUrl;
const shareUrl = require('../../config').config.shareUrl;
const overplayUrl = require('../../config').config.overplayUrl;
var x = 1
var length = 0
var arr=new Array()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pic:'',
    name:'',
    second: 10,  
    second1: 3,
    show: false,
    show1:false,
    show2:false,
    current:'',
    arr:[],
    x: 1,
    length:0,
    _num:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  anser:function(e){
    var _this = this
    var second = this.data.second
    var length = this.data.length
    var x = this.data.x
    //console.log(second)
    var anser = e.currentTarget.dataset.anser
    var _num = e.currentTarget.dataset.num
    if (getApp().globalData.answer == anser && second>0){
      clearTimeout(getApp().globalData.time);
      _this.setData({
        _num: e.currentTarget.dataset.num
      })
      //题目选择
      length+=1
      //当前题目序号
      x+=1
      if(x==13){
        wx.request({
          url: overplayUrl,
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            openid: getApp().globalData.openid,
          },
          success: function (res) {
            wx.playBackgroundAudio({
              dataUrl: 'http://shops.mqvt6.cn/victory.mp3',
              title: '',
              coverImgUrl: '',
              success: function (res) {
                wx.onBackgroundAudioStop(function () {
                })
              },
            })
            var sdk = res.data.data
            //console.log(res.data.data)
            _this.setData({
              show2:true,
              sdk:sdk,
              x:1,
              length:0,
              arr: [],
            })
          }
        })
      }else{
      wx.showToast({
        title: '回答正确',
        icon: '',
        image: '',
        duration: 2000,
        mask: true,
        success: function (res) {
          setTimeout(function () {
            _this.setData({
              x: x,
              second: 10,
              _num: '',
              length: length
            })
            countdown(_this);
            next(_this);   
          }, 2000) //延迟时间 这里是3秒  
          },
      })
      }
    }else{
      wx.playBackgroundAudio({
        dataUrl: 'http://shops.mqvt6.cn/failure.mp3',
        title: '',
        coverImgUrl: '',
        success: function (res) {
          wx.onBackgroundAudioStop(function () {
          })
        },
      }) 
      _this.setData({
        show: true,
      })
    }
   
  },
  yincang: function () {
    var that = this
    that.setData({ 
      show: false,
      show2: false,
      x: 1,
      length: 0,
      arr: [],
    })
    wx.reLaunch ({
      url: '../index/index', 
      success: function (res) {       
      }
    })
  },
  onLoad: function (res) {  
    wx.playBackgroundAudio({
      dataUrl: 'http://shops.mqvt6.cn/clock1.mp3',
      title: '',
      coverImgUrl: '',
      success: function (res) {
        wx.onBackgroundAudioStop(function () {
        })
      },
    }) 
    var that = this
    //分享群获得标签
    wx.showShareMenu({
      withShareTicket: true,
    })
    that.setData({
      pic: getApp().globalData.avatarUrl,
      name: getApp().globalData.nickName,
      show1:true
    })
    //开始三秒倒计时
    countdown1(that)
  },
   
  //分享群
  onShareAppMessage: function (res) {
    return {
      title: '答题送娃娃',
      path: '/pages/index/index?hid=' + getApp().globalData.openid,
      imageUrl: '../images/share_img.jpg',
      success: function (res) {
        // console.log(res)
        // console.log(res.shareTickets)       
        var shareTickets = res.shareTickets;
        if (res.shareTickets == null) {
          wx.showModal({
            title: '分享失败',
            content: "需分享到群才能获得挑战机会哦~",
            showCancel: false,
            success: function (res) {
            },
          })
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            //console.log(res)
            wx.request({
              url: 'https://yangzhiou.mqvt1.cn/yangziou/demo.php',
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              data: {
                sessionKey: getApp().globalData.session_key,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              success: function (res) {
                //console.log(res.data)
                var gid = res.data
                wx.request({
                  url: shareUrl,
                  method: 'POST',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  data: {
                    openid: getApp().globalData.openid,
                    jopenid: gid,
                  },
                  success: function (res) {
                    //console.log(res)
                    if(res.data.code==0){
                      wx.showModal({
                        title: '分享失败',
                        content: res.data.msg,
                        showCancel: false,
                        success: function(res) {
                        },                       
                      })
                    }else{
                      wx.showToast({
                        title: res.data.msg,
                        icon: '',
                        duration: 2000,
                        success: function(res) {
                          setTimeout(function () {
                            wx.reLaunch({
                              url: '../index/index',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
                            })
                          }, 2000) //延迟时间 这里是3秒  
                        },
                      })
                    }
                  },
                })
              },
              fail: function (res) {
                //console.log("0000000")
              }
            })
            //console.log(res)
            // var encryptedData = res.encryptedData;
            // var iv = res.iv;
          },fail: function (res) {
            // wx.showModal({
            //   title: '分享失败',
            //   content: "请分享到群",
            //   showCancel: false,
            //   success: function (res) {
            //   },
            // })
          }
        })
      },fail: function (res) {
        // console.log("0000000")
      }
    }
  }
})
// 从从10到到0倒计时  
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      show: true
    });
    return;
  }
  getApp().globalData.time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }, 1000)
}
// 从从3到到0倒计时  
function countdown1(that) {
  var second1 = that.data.second1
  if (second1 == 0) {
    that.setData({
      show1: false
    });
    next(that)
    countdown(that);
    return;
  }
  getApp().globalData.time1 = setTimeout(function () {
    that.setData({
      second1: second1 - 1
    });
    countdown1(that);
  }, 1000)
}

//获取下一题渲染
function next(that) {
  wx.request({
    url: itemUrl,
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: {
    },
    success: function (res) {
      var length = that.data.length
      console.log(res)
      arr = res.data.data;
      arr = arr[length]; 
      var answer = arr.answer;
      getApp().globalData.answer = arr.answer
      //console.log(answer)
      that.setData({
        title: arr.title,
        a: arr.a,
        b: arr.b,
        c: arr.c,
        d: arr.d,
      })
    },
  }) 
}


