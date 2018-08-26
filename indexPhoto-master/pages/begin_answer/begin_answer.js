//index.js
//获取应用实例
var app = getApp();
var util = require("../../utils/util.js");
var tunji = require('../../utils/tunji.js');
Page({
  data: {
    background: wx.getStorageSync('background'),
    backgroundColor: wx.getStorageSync('bgColor'),
    border: wx.getStorageSync('border'),
    userImg: wx.getStorageSync('userImg'),
    userIcon: wx.getStorageSync('userIcon')
  },
  onLoad: function (options) {
    console.log(options,"begin_answer");
    // 统计
    tunji.statistic();
    tunji.fromPageData();
    tunji.userEvent();
    
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: wx.getStorageSync('bgColor'),
    })
    if (options.sex) {
      if (options.sex==1){
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#73bce9',
        })
      }else{
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#e48599',
        })
      }
     
    }
    var that = this;
    var uid = options.uid;
    var set_number = options.set_number;
    
    that.setData({
      uid: uid,
      set_number: set_number,
      _sex : options.sex
    })    
    wx.hideShareMenu({})
  },
  onShow: function(){
    var that = this;
    that.setData({
      background: wx.getStorageSync('background'),
      backgroundColor: wx.getStorageSync('bgColor'),
      border: wx.getStorageSync('border'),
      userImg: wx.getStorageSync('userImg'),
      userIcon: wx.getStorageSync('userIcon'),
      sex: wx.getStorageSync('sex'),//"sex":1,//1 男 2女
    })
    if (that.data._sex){
      let sex = that.data._sex;
      if (sex == 1) { //1 男 2女
        that.setData({
          background: 'http://ovhvevt35.bkt.clouddn.com/moqi/bg2.png',
          backgroundColor:'#73bce9',
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
          background: 'http://ovhvevt35.bkt.clouddn.com/moqi/background.png',
          bgColor: '#e48599',
          backgroundColor: '#e48599',
          border: '#d26c81',
          userImg: 'http://ovhvevt35.bkt.clouddn.com/moqi/bgGail.png',
          userIcon: 'http://ovhvevt35.bkt.clouddn.com/moqi/girl.png',
          color: '#e83656'
        })
        wx.setStorageSync('background', 'http://ovhvevt35.bkt.clouddn.com/moqi/background.png');
        wx.setStorageSync('bgColor', '#e48599');
        wx.setStorageSync('border', '#d26c81');
        wx.setStorageSync('userImg', 'http://ovhvevt35.bkt.clouddn.com/moqi/bgGail.png');
        wx.setStorageSync('userIcon', 'http://ovhvevt35.bkt.clouddn.com/moqi/girl.png');
        wx.setStorageSync('color', '#e83656');
      } else {
        console.log(sex)
      }
    }
    
    var music_play = app.data.music_play;
    that.setData({
      music_play: music_play
    })
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
  naviSubject: function (e) {
    var _formId = e.detail.formId;
    var that = this;
  
    var sharecode = app.data.sharecode;
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
   

    var avatar = wx.getStorageSync("avatarUrl");
    var nickname = wx.getStorageSync("nickName");
    var uid = that.data.uid;
    var set_number = that.data.set_number;
console.log("跳转前now",uid,set_number)
    if (nickname && avatar) {
      wx.showLoading({
        title: '跳转中',
      })  
      wx.navigateTo({
        url: '../answer/answer?uid=' + uid + '&set_number=' + set_number, 
      })    
    } else {
      util.auth(function(){
        wx.navigateTo({
          url: '../answer/answer?uid=' + uid + '&set_number=' + set_number, 
        })
      });
    }

      
  }
})
