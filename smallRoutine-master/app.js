var util = require('/utils/util.js');
var postsData = require('/data/posts-data.js');
var time = null;
var that;
var curTime = 0;

App({
    globalData:{
        uid: null,
        mid: null,
        wxUserInfo: null,
        darwinUserInfo: null,
        userInfo: null,
        windowHeight: null,
        windowWidth: null,
        backstage: false,
    },
    setGlobalData: function(key, value){
      that.globalData[key] = value;
    },
    setDarwinUserInfo: function (key, value) {
      // var userInfo = that.globalData.darwinUserInfo;
      // user
      that.globalData.darwinUserInfo[key] = value;
      console.log(that.globalData.darwinUserInfo);
      // that.darwinUserInfo[key] = value;
    },
    onLaunch:function(ops){
      that = this;
      if (ops.query.mid){
        that.globalData.uid = ops.query.mid;
      }
      // wx.getSystemInfo({
      //   success: function (res) {
      //     // check sdk version
      //     console.log('SDKVersion:' + res.SDKVersion)
      //     if (res.SDKVersion < '1.6.0') {
      //       wx.showModal({
      //         title: '提示',
      //         showCancel: false,
      //         content: '当前微信版本过低，无法使用某些功能，请升级到最新微信版本后重试。'
      //       })
      //     }
      //   },
      // })
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.windowWidth = res.windowWidth;
          that.globalData.windowHeight = res.windowHeight;
        }
      });

      if (ops.scene == 1044) {
        console.log(ops.shareTicket)
      }

      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                console.log("已经同意获取用户信息")
              },
              fail(){
                wx.showModal({
                  title: '设置用户信息授权',
                  content: '',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                      wx.openSetting({
                        success: (res) => {
                          console.log(res);
                        }
                      });
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            })
          }
        }
      })
    },
    onShow: function(ops){
      console.log("show :   " + JSON.stringify(ops));
      if (ops.query.mid) {
        that.globalData.uid = ops.query.mid;
        that.userInfoData(function(res){
          console.log(res);
        }, function(){

        });
      }

      if (that.globalData.backstage){
        console.log("首页")
        that.globalData.backstage = false;
        wx.redirectTo({
          url: '../../pages/index/index'
        })
      }
    },

    abilityMap: function (id, arr, circleSize, windowWidth, curAvatar, angle){
      var ctx = wx.createCanvasContext(id);
      ctx.clearRect(0, 0, 3*circleSize, 3*circleSize)
      var r = circleSize;
      ctx.translate(windowWidth / 2, windowWidth * 185 / 750 * 22 / 16);
      var mult = 0;
      for (var n = 1; n<= 3; n++){
        //绘制六边形
        ctx.beginPath();
        if (n == 2){
          mult = 0;
        } else {
          mult = n
        }
        for(var m = 0; m<6; m++){
          ctx.lineTo((r * (6 - mult) / 6) * Math.cos(m * Math.PI / 3 + angle), (r * (6 - mult) / 6) * Math.sin(m * Math.PI/3 + angle));
        }
        ctx.closePath();
        ctx.setStrokeStyle("white");
        ctx.stroke();
      }

      //绘制六条线
      ctx.beginPath();
      for (var k = 0; k < 6; k++) {
        ctx.moveTo(r / 2 * Math.cos(k * Math.PI / 3 + angle), r / 2 * Math.sin(k * Math.PI / 3 + angle));
        ctx.lineTo(r * Math.cos(k * Math.PI / 3 + angle), r * Math.sin(k * Math.PI / 3 + angle));
      }
      ctx.setStrokeStyle("white");
      ctx.stroke();

      //分数点和文字
      var dis;
      ctx.beginPath();
      for (var j = 0; j< 6; j ++){
        if (arr[j].score != null){
          ctx.lineTo((r / 2 + (r / 2) * arr[j].score) * Math.cos(j * Math.PI / 3 + angle), (r / 2 + (r / 2) * arr[j].score) * Math.sin(j * Math.PI / 3 + angle));
        }
        ctx.setFillStyle("white");
        if (j == 1 || j == 4) {
          dis = r / 6;
        } else {
          dis = r / 3;
        }
        ctx.setFontSize(r * 28 / 185);
        ctx.setTextAlign("center");
        ctx.setTextBaseline("middle");
        ctx.fillText(arr[j].name, (r + dis) * Math.cos(j * Math.PI / 3 + angle), (r + dis) * Math.sin(j * Math.PI / 3 + angle))
      }
      ctx.closePath();
      ctx.setGlobalAlpha(0.3)
      ctx.setFillStyle("#e5e5e5");
      ctx.fill();
      
      ctx.beginPath()
      ctx.setGlobalAlpha(0)
      ctx.arc(0, 0, r/3, 0, 2 * Math.PI)
      ctx.stroke();
      ctx.clip()
      ctx.setGlobalAlpha(1)
      ctx.drawImage(curAvatar, -r/3, -r/3,r*2/3, r*2/3)
      ctx.draw()
    },


    //保存到相册canvas
    saveAbilityPhoto: function (id, arr, circleSize, windowWidth, windowHeight,curAvatar, angle, grade, gradeText1, gradeText2) {
      var ctx = wx.createCanvasContext(id);
      ctx.clearRect(0, 0, 3 * circleSize, 3 * circleSize);
      var r = circleSize;
      var rang = windowHeight/6;//向上平移的距离
      var codeWidth = windowWidth*2/6;//小程序码的宽高

      ctx.translate(windowWidth / 2, windowHeight/2 );

      //绘制背景
      ctx.beginPath();
      ctx.setFillStyle("#92a0ff");
      ctx.fillRect(-windowWidth / 2, -windowHeight /2, windowWidth, windowHeight);
      ctx.fill()

      ctx.beginPath();
      ctx.setFontSize(30);
      ctx.setFillStyle("white");
      ctx.setTextAlign("center");
      ctx.setTextBaseline("middle");
      ctx.fillText("章鱼答答堂", windowWidth/2 - 90, windowHeight/2 - 30);
      ctx.fill();

      ctx.beginPath();
      ctx.setFontSize(20);
      ctx.setFillStyle("white");
      ctx.setTextAlign("center");
      ctx.setTextBaseline("middle");

      ctx.fillText(grade, 0, windowHeight / 6 - 50);
      ctx.fillText(gradeText1, 0, windowHeight / 6);
      ctx.fillText(gradeText2, 0, windowHeight / 6 + 30);
      ctx.fill();

      ctx.beginPath();
      ctx.drawImage("../../images/userInfo/user_header_bg.png", -windowWidth/2, windowHeight/2 - r/2, windowWidth, r  / 2);

      ctx.save();
      ctx.beginPath();
      ctx.arc(-windowWidth/2 + codeWidth/2, windowHeight/2 - codeWidth/2, codeWidth/2, 0, 2 * Math.PI)
      ctx.setStrokeStyle("white");
      ctx.stroke();
      ctx.clip()
      ctx.drawImage("../../images/code.jpg", -windowWidth / 2, windowHeight / 2 - codeWidth, codeWidth, codeWidth);
      ctx.restore()

      var mult = 0;
      for (var n = 1; n <= 3; n++) {
        //绘制六边形
        ctx.beginPath();
        if (n == 2) {
          mult = 0;
        } else {
          mult = n
        }
        for (var m = 0; m < 6; m++) {
          ctx.lineTo((r * (6 - mult) / 6) * Math.cos(m * Math.PI / 3 + angle), (r * (6 - mult) / 6) * Math.sin(m * Math.PI / 3 + angle) - rang);
        }
        ctx.closePath();
        ctx.setStrokeStyle("white");
        ctx.stroke();
      }

      //绘制六条线
      ctx.beginPath();
      for (var k = 0; k < 6; k++) {
        ctx.moveTo(r / 2 * Math.cos(k * Math.PI / 3 + angle), r / 2 * Math.sin(k * Math.PI / 3 + angle) - rang);
        ctx.lineTo(r * Math.cos(k * Math.PI / 3 + angle), r * Math.sin(k * Math.PI / 3 + angle)- rang);
      }
      ctx.setStrokeStyle("white");
      ctx.stroke();

      //分数点和文字
      var dis;
      ctx.beginPath();
      for (var j = 0; j < arr.length; j++) {
        ctx.lineTo((r / 2 + (r / 2) * arr[j].score) * Math.cos(j * Math.PI / 3 + angle), (r / 2 + (r / 2) * arr[j].score) * Math.sin(j * Math.PI / 3 + angle) -rang);
        ctx.setFontSize(r * 28 / 185);
        ctx.setFillStyle("white");
        ctx.setTextAlign("center");
        ctx.setTextBaseline("middle");
        if (j == 1 || j == 4) {
          dis = r / 6;
        } else {
          dis = r / 3;
        }
        ctx.fillText(arr[j].name, (r + dis) * Math.cos(j * Math.PI / 3 + angle), (r + dis) * Math.sin(j * Math.PI / 3 + angle) -rang)
      }
      ctx.closePath();
      ctx.setGlobalAlpha(0.3)
      ctx.setFillStyle("#e5e5e5");
      ctx.fill();

      ctx.beginPath()
      ctx.setGlobalAlpha(0)
      ctx.arc(0, 0 - rang, r / 3, 0, 2 * Math.PI)
      ctx.stroke();
      ctx.clip()
      ctx.setGlobalAlpha(1)
      ctx.drawImage(curAvatar, -r / 3, -r / 3 -rang, r * 2 / 3, r * 2 / 3)
      ctx.draw()
    },



    countDown: function (id, circleSize, lineWidth, totalTime, callBack){
      var ctx = wx.createCanvasContext(id);
      var num = 0;
      clearInterval(time);
      time = setInterval(function () {
        ctx.clearRect(0, 0, 2*circleSize, 2*circleSize);
        num++
        if (num == 50 * totalTime + 1) {
          num = 1;
        }

        ctx.save();
        ctx.translate(circleSize + (lineWidth+6)/2, circleSize + (lineWidth+6)/2);

        ctx.beginPath();
        ctx.arc(0,0, circleSize, 0, 2*Math.PI);
        ctx.setFillStyle("white");
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, circleSize, 0, 2 * Math.PI);
        ctx.setStrokeStyle("#ff7676");
        ctx.setLineWidth(lineWidth);
        ctx.stroke();

        ctx.beginPath();
        ctx.setFontSize(lineWidth * 4.75);
        ctx.setFillStyle("#ff7676"); 
        ctx.setTextAlign("center");
        ctx.setTextBaseline("middle");
        if (num == 50 * totalTime) {
          ctx.fillText(0, 0, 0);
          clearInterval(time);
          curTime = 10;
          callBack();
        } else {
          ctx.fillText((totalTime + 1) - Math.ceil(num / 50), 0, 0);
          curTime = Math.ceil(num / 50) - 1;
        }
        
        ctx.beginPath();
        ctx.rotate(-90 * Math.PI / 180);
        ctx.arc(0, 0, circleSize, 0, num * 2 * Math.PI / (50 * totalTime), false);
        ctx.setStrokeStyle("#a5b5fe"); 
        ctx.setLineWidth(lineWidth)
        ctx.stroke();
        ctx.draw();
        ctx.restore();
      }, 20);
    },
    clearTime: function(callBack){
      clearInterval(time);
      callBack(curTime)
    },
    //打乱选项
    random: function(arr){
      var statusArr = [];
      arr.sort(function(){
        return 0.5 - Math.random();
      });
      for (var i = 0; i< arr.length; i++){
        var obj = {name: arr[i], select: 0};
        statusArr.push(obj);
      }
      return statusArr;
    },
    //获取本地数据
    getStorage: function(key, success, fail){
      wx.getStorage({
        key: key,
        success: function (res) {
          success(res);
        },
        fail: function (res) {
          fail(res);
        }
      })
    },
    //保存数据到本地
    setStorage: function(key, value){
      wx.setStorage({
        key: key,
        data: value,
      })
    },


    userInfoData: function (darwinCB, wxCB) {
      console.log(this);
      //登录
      wx.showLoading({
        title: '加载中...',
      })
      wx.login({
        success: function (res) {
          console.log(res);
         
          wx.getUserInfo({
            success: function (data) {
              console.log(data);
              wxCB(data.userInfo);

              console.log(that.globalData.uid);
              var url = "/weichar/getAppletWeMember?JscodeCode=" + res.code + "&nickname=" + data.userInfo.nickName + "&headimgurl=" + data.userInfo.avatarUrl;
              if (that.globalData.uid) {
                url += "&uid=" + that.globalData.uid;
              }
              console.log(url)
              util.httpPost(url, function (data) {
                wx.hideLoading();
                console.log(data);
                if (data.mid == "" || data.mid == null) {
                  wx.navigateTo({
                    url: '../phone/phone?unionid=' + data.unionid,
                  })
                } else {
                  that.globalData.mid = data.mid;
                  darwinCB(data.userInfo, data.mid);
                }
              });
            }
          })
        }
      });
    },
    fadeAnimation: function (fadeStatus) {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      })
      if (fadeStatus) {
        animation.opacity(1).step();
      } else {
        animation.opacity(0).step();
      }
      return animation;
    },
    popupOpacityAnimation: function (fadeStatus){
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      if (fadeStatus) {
        animation.opacity(1).step();
      } else {
        animation.opacity(0).step();
      }
      return animation;
    },
    //分享内容
    shareFun: function (content) {
      var shareContent;
      var share = postsData.gradeInfo;
      for (var i = 0; i < share.length; i++) {
        if (share[i].grade == content) {
          shareContent = share[i].share;
          return shareContent
        }
      }
    },
})