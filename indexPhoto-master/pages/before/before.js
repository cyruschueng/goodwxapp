//index.js
var utils = require("../../utils/util.js");
import { md5 } from '../../utils/md5.js';
var tunji = require('../../utils/tunji.js');
//获取应用实例
var app = getApp();

Page({
  data: {
    showAd: true,
    music_play:true
  },
  onLoad: function (options) {
    let that = this;
    that.setData({
      music_play: true
    })
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    console.log("options:", options);
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
    })

    if (wx.getStorageSync('sex')==1){
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#73bce9',
      })
      that.setData({
        backgroundColor: '#73bce9'
      })
    } else if(wx.getStorageSync('sex') == 2){
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#e48599',
      })
      that.setData({
        backgroundColor: '#e48599'
      })
    } else if (wx.getStorageSync('sex')==0){
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
      })
    }
    
  },

  onShow: function () {
    // wx.showLoading({
    //   title: '加载中',
    // });
    var that = this;
    if (wx.getStorageSync('sex') == 1) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#73bce9',
      })
      that.setData({
        backgroundColor: '#73bce9'
      })
    } else if (wx.getStorageSync('sex') == 2) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#e48599',
      })
      that.setData({
        backgroundColor: '#e48599'
      })
    } else if (wx.getStorageSync('sex') == 0) {
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#000000',
      })
    }
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('border'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      sex: wx.getStorageSync('sex'),//"sex":1,//1 男 2女
    })
    var music_play = app.data.music_play;
    var scene = that.data.scene;
    var uid = that.data.uid;
    var set_number = that.data.set_number;
    var operator_id = wx.getStorageSync("operator_id");
    that.setData({
      music_play: music_play
    })
    // 授权
    app.getUserInfo(function () {
      // shifoushez
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: app.data.apiurl + "api/is-set-gender?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("operator_id"),
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          console.log("flag:", res);
          console.log("1111", res.data.flag)
          var status = res.data.status;
          let flag = res.data.flag; //"flag":1,//1是 0 否
          if (status == 1) {
            
            if (res.data.flag==0){
              wx.reLaunch({
                url: '../choose/choose'
              })
            }
          } else {
            console.log(res.data.msg)
          }
          wx.hideLoading()
        }
      })
      let sex = wx.getStorageSync('sex');
      console.log("sex:", sex);
      if (sex == 1) { //1 男 2女
        that.setData({
          background: 'http://ovhvevt35.bkt.clouddn.com/moqi/bg2.png',
          backgroundColor:'#73bce9',
          bgColor: '#73bce9',
          border: '#5e9fc9',
          userImg:'http://ovhvevt35.bkt.clouddn.com/moqi/boya.png',
          userIcon: 'http://ovhvevt35.bkt.clouddn.com/moqi/boy.png',
          color: '#5fa0ca'
        })
        wx.setStorageSync('background', 'http://ovhvevt35.bkt.clouddn.com/moqi/bg2.png');
        wx.setStorageSync('bgColor', '#73bce9');
        wx.setStorageSync('border', '#5e9fc9');
        wx.setStorageSync('userImg', 'http://ovhvevt35.bkt.clouddn.com/moqi/boya.png');
        wx.setStorageSync('userIcon', 'http://ovhvevt35.bkt.clouddn.com/moqi/boy.png');
        wx.setStorageSync('color', '#5fa0ca');
      }else if (sex == 2){
        that.setData({
          background: 'http://p1jrmxejh.bkt.clouddn.com/moqi/bg1.png',
          bgColor: '#e48599',
          backgroundColor: '#e48599',
          border: '#d26c81',
          userImg: 'http://ovhvevt35.bkt.clouddn.com/moqi/bgGail.png',
          userIcon: 'http://ovhvevt35.bkt.clouddn.com/moqi/girl.png',
          color: '#e83656'
        })
        wx.setStorageSync('background', 'http://p1jrmxejh.bkt.clouddn.com/moqi/bg1.png');
        wx.setStorageSync('bgColor', '#e48599');
        wx.setStorageSync('border', '#d26c81');
        wx.setStorageSync('userImg', 'http://ovhvevt35.bkt.clouddn.com/moqi/bgGail.png');
        wx.setStorageSync('userIcon', 'http://ovhvevt35.bkt.clouddn.com/moqi/girl.png');
        wx.setStorageSync('color', '#e83656');
      }else if(sex == 0){
        console.log(sex)
        wx.reLaunch({
          url: '../choose/choose'
        })
      }
    })
    //获取性别
    wx.request({
      url: app.data.apiurl + "api/get-gender?sign=" + wx.getStorageSync('sign') + '&operator_id=' + wx.getStorageSync("operator_id"),
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("获取性别:", res);
        var status = res.data.status;
        let sex = res.data.sex;
        if (status == 1) {
          that.setData({
            sex: res.data.sex,
          })
          if (sex == 1) { //1 男 2女
            that.setData({
              background: 'http://ovhvevt35.bkt.clouddn.com/moqi/bg2.png',
              bgColor: '#73bce9',
              border: '#5e9fc9',
              userImg: 'http://ovhvevt35.bkt.clouddn.com/moqi/boya.png',
              userIcon: 'http://ovhvevt35.bkt.clouddn.com/moqi/boy.png',
              color: '#5fa0ca'
            })
            wx.setStorageSync('background', 'http://ovhvevt35.bkt.clouddn.com/moqi/bg2.png');
            wx.setStorageSync('bgColor', '#73bce9');
            wx.setStorageSync('border', '#5e9fc9');
            wx.setStorageSync('userImg', 'http://ovhvevt35.bkt.clouddn.com/moqi/boya.png');
            wx.setStorageSync('userIcon', 'http://ovhvevt35.bkt.clouddn.com/moqi/boy.png');
            wx.setStorageSync('color', '#5fa0ca');
          } else if (sex == 2) {
            that.setData({
              background: 'http://p1jrmxejh.bkt.clouddn.com/moqi/bg1.png',
              bgColor: '#e48599',
              border: '#d26c81',
              userImg: 'http://ovhvevt35.bkt.clouddn.com/moqi/bgGail.png',
              userIcon: 'http://ovhvevt35.bkt.clouddn.com/moqi/girl.png',
              color: '#e83656'
            })
            wx.setStorageSync('background', 'http://p1jrmxejh.bkt.clouddn.com/moqi/bg1.png');
            wx.setStorageSync('bgColor', '#e48599');
            wx.setStorageSync('border', '#d26c81');
            wx.setStorageSync('userImg', 'http://ovhvevt35.bkt.clouddn.com/moqi/bgGail.png');
            wx.setStorageSync('userIcon', 'http://ovhvevt35.bkt.clouddn.com/moqi/girl.png');
            wx.setStorageSync('color', '#e83656');
          } else {
            console.log(sex)
          }
          wx.setStorageSync('sex', res.data.sex);
        } else {
          console.log(res.data.msg)
        }
        
      }
    })
    

    // app.getUserInfo(function () {
    //   var sign = app.data.sign;
    //   wx.request({
    //     url: 'https://friend-check.playonwechat.com/api/show-model?sign=' + sign,
    //     success: function (res) {
    //       console.log(res);
    //       var showModel = res.data.data.showModel;

    //       if (showModel) {
    //         wx.showModal({
    //           title: '温馨提示',
    //           content: scene,
    //         })
    //       }
    //     }
    //   })
    // })

  },
  bindPlay: function () {
    var that = this;

    if (that.data.music_play == true) {
      wx.pauseBackgroundAudio();
      app.data.music_play = false;
      that.setData({
        music_play: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: app.data.dataUrl
      })
      app.data.music_play = true;
      that.setData({
        music_play: true
      })
    }
  },
  formSubmit: function (e) {
    var that = this;
    var _formId = e.detail.formId;
    var sign = app.data.sign;

    // 模板消息
    wx.request({
      url: 'https://friend-check.playonwechat.com/api/save-form-id?sign=' + sign,
      data: {
        form_id: _formId
      },
      success: function (res) {
        console.log("表单", res);

      }
    })

    // var nickName = wx.getStorageSync("nickName");
    // var avatarUrl = wx.getStorageSync("avatarUrl");

    // if (avatarUrl && nickName) {
    //   wx.navigateTo({
    //     url: '../subject/subject'
    //   })
    // }else{
    utils.auth(function () {
      wx.navigateTo({
        url: '../subject/subject'
      })
    })
    // }

    // if (avatarUrl && nickName) {
    //   wx.showLoading({
    //     title: '跳转中',
    //   })      

    //   wx.request({
    //     url: 'https://friend-check.playonwechat.com/api/change-question',
    //     data: {
    //       sign: sign
    //     },
    //     success: function (res) {
    //       wx.hideLoading();
    //       if(res.data.status){
    //         wx.navigateTo({
    //           url: '../subject/subject'
    //         })
    //       }else{
    //         wx.showToast({
    //           title: res.data.msg,
    //         })
    //       }         

    //     }
    //   })
    // } else {
    //   wx.hideLoading();
    //   utils.auth(function(){
    //     wx.request({
    //       url: 'https://friend-check.playonwechat.com/api/change-question',
    //       data: {
    //         sign: sign
    //       },
    //       success: function (res) {
    //         wx.hideLoading();
    //         if (res.data.status) {
    //           wx.navigateTo({
    //             url: '../subject/subject'
    //           })
    //         } else {
    //           wx.showToast({
    //             title: res.data.msg,
    //           })
    //         }
    //       }
    //     })
    //   });
    // }  
  },
  onShareAppMessage: function () {
    return {
      title: '默契大考验',
      path: '/pages/index/index'
    }
  },
  backHome: function () {
    wx.switchTab({
      url: '../before/before'
    })
  }
})
