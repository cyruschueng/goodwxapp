var postsData = require('../../data/posts-data.js');
var app = getApp();
var windowWidth = app.globalData.windowWidth;
var windowHeight = app.globalData.windowHeight;
var scoreArr = [0, 0, 0];//得分数组
var queNum = [3, 3, 4];
var that;
var curMid;
const ImgLoader = require('../../img-loader/img-loader.js')
Page({
  data: {
    userInfo: null,
    resultInfo: postsData.resultInfo,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    userInfo: app.globalData.userInfo,
    circleSize: windowWidth * 185 / 750,
    canvasHeight: windowWidth * 185 / 750 * 22 / 8,
  },

  onLoad: function(options){
    that = this
    console.log(options);
    curMid = options.mid;
    that.imgLoader = new ImgLoader(this);
    that.setData({
      userInfo: app.globalData.userInfo,
      wxUserInfo: app.globalData.wxUserInfo
    });

    if (options.mid == app.globalData.mid){
      wx.setNavigationBarTitle({
        title: "个人"
      })
    } else {
      wx.setNavigationBarTitle({
        title: options.displayName
      });
      console.log(app.globalData.otherUserInfo);
      that.setData({
        userInfo: app.globalData.otherUserInfo
      })
    }

    wx.getImageInfo({
      src: that.data.userInfo.avatar,
      success: function (res) {
        console.log(res);
        that.imgLoader.load(res.path, (err, data) => {
          app.abilityMap("my_canvas", that.resultRandom(that.data.userInfo.result, that.data.resultInfo), that.data.circleSize, that.data.windowWidth, data.src, Math.PI / 6);

          //保存图片canvas
          var gradeText1 = "", gradeText2 = "";
          var grade = that.data.userInfo.grade ? that.data.userInfo.grade : "";
          if (that.data.userInfo.gradeText) {
            if (that.data.userInfo.gradeText.indexOf("\n") != -1) {
              gradeText1 = that.data.userInfo.gradeText.split("\n")[0];
              gradeText2 = that.data.userInfo.gradeText.split("\n")[1];
            }
          }

          setTimeout(function () {
            app.saveAbilityPhoto("save_canvas", that.resultRandom(that.data.userInfo.result, that.data.resultInfo), that.data.circleSize, that.data.windowWidth, that.data.windowHeight, data.src, Math.PI / 6, grade, gradeText1, gradeText2);
          }, 500)
        }); 
      },
      fail: function(res){
        console.log(res);
      }
    })
   
  },
  //随机选项
  resultRandom: function (resultScore, resultInfo) {
    var mapAry = [];
    var result = [];

    if (!resultScore){
      for (var i = 0; i < resultInfo.length; i++) {
        var name = resultInfo[i][parseInt(Math.random() * 2)];
        result[i] = {
          'name': name,
        };
      }
      return result;
    }

    for (var j = 0; j < queNum.length; j++) {
      var score = 1 - (resultScore[j]) / queNum[j];
      mapAry.push(score);
      mapAry.push(0);
    }
    for (var i = 0; i < resultInfo.length; i++) {
      if (i % 2 != 0) {
        mapAry[i] = (mapAry[i - 1] + mapAry[(i + 1) % 6]) / 2;
      }
      var name = resultInfo[i][parseInt(Math.random() * 2)];
      result[i] = {
        'name': name,
        'score': mapAry[i]
      };
    }
    return result;
  },

  //继续挑战
  continueTap: function(event){
    wx.navigateTo({
      url: '../question/question',
    })
  },

  //分享好友点击事件
  shareTap: function(event){
    this.onShareAppMessage();
  },

  //保存相册按钮点击事件
  saveTap: function(event){
    console.log(event);
    wx.canvasToTempFilePath({
      quality: 1,
      canvasId: 'save_canvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
            wx.hideLoading();
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.mid == curMid){
      that.setData({
        userInfo: app.globalData.userInfo
      })
    } else {
      that.setData({
        userInfo: app.globalData.otherUserInfo
      })
    }
  },

    /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    return {
      title: app.shareFun(that.data.userInfo.grade),
      path: '/pages/index/index?mid=' + that.data.userInfo.mid,
      success: function (res) {
        wx.hideLoading();
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})